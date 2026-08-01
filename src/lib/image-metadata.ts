export type ImageMetadata = {
  width: number;
  height: number;
  make?: string;
  model?: string;
  capturedAt?: string;
  software?: string;
  orientation?: number;
  hasGps: boolean;
  exifDetected: boolean;
};

const TAG_MAKE = 0x010f;
const TAG_MODEL = 0x0110;
const TAG_ORIENTATION = 0x0112;
const TAG_SOFTWARE = 0x0131;
const TAG_EXIF_IFD = 0x8769;
const TAG_GPS_IFD = 0x8825;
const TAG_DATE_TIME_ORIGINAL = 0x9003;

function readAscii(view: DataView, start: number, length: number): string {
  let value = "";
  const end = Math.min(start + length, view.byteLength);
  for (let index = start; index < end; index += 1) {
    const byte = view.getUint8(index);
    if (byte === 0) break;
    value += String.fromCharCode(byte);
  }
  return value.trim();
}

function typeSize(type: number): number {
  if (type === 1 || type === 2 || type === 7) return 1;
  if (type === 3) return 2;
  if (type === 4 || type === 9) return 4;
  if (type === 5 || type === 10) return 8;
  return 0;
}

function readJpegExif(buffer: ArrayBuffer): Omit<ImageMetadata, "width" | "height"> {
  const view = new DataView(buffer);
  const empty = { hasGps: false, exifDetected: false };
  if (view.byteLength < 4 || view.getUint16(0, false) !== 0xffd8) return empty;

  let markerOffset = 2;
  while (markerOffset + 4 <= view.byteLength) {
    if (view.getUint8(markerOffset) !== 0xff) break;
    const marker = view.getUint8(markerOffset + 1);
    if (marker === 0xda || marker === 0xd9) break;
    const segmentLength = view.getUint16(markerOffset + 2, false);
    if (segmentLength < 2 || markerOffset + segmentLength + 2 > view.byteLength) break;

    if (marker === 0xe1 && readAscii(view, markerOffset + 4, 6) === "Exif") {
      const tiffStart = markerOffset + 10;
      if (tiffStart + 8 > view.byteLength) return empty;
      const byteOrder = view.getUint16(tiffStart, false);
      const littleEndian = byteOrder === 0x4949;
      if (!littleEndian && byteOrder !== 0x4d4d) return empty;
      if (view.getUint16(tiffStart + 2, littleEndian) !== 42) return empty;

      const result: Omit<ImageMetadata, "width" | "height"> = {
        hasGps: false,
        exifDetected: true,
      };
      const visited = new Set<number>();

      const parseIfd = (relativeOffset: number) => {
        if (relativeOffset <= 0 || visited.has(relativeOffset)) return;
        visited.add(relativeOffset);
        const ifdStart = tiffStart + relativeOffset;
        if (ifdStart + 2 > view.byteLength) return;
        const entryCount = view.getUint16(ifdStart, littleEndian);

        for (let index = 0; index < entryCount; index += 1) {
          const entry = ifdStart + 2 + index * 12;
          if (entry + 12 > view.byteLength) break;
          const tag = view.getUint16(entry, littleEndian);
          const type = view.getUint16(entry + 2, littleEndian);
          const count = view.getUint32(entry + 4, littleEndian);
          const size = typeSize(type) * count;
          const valueOffset =
            size <= 4 ? entry + 8 : tiffStart + view.getUint32(entry + 8, littleEndian);
          if (valueOffset < 0 || valueOffset + Math.max(1, size) > view.byteLength) continue;

          if (tag === TAG_EXIF_IFD) {
            parseIfd(view.getUint32(entry + 8, littleEndian));
          } else if (tag === TAG_GPS_IFD) {
            result.hasGps = true;
          } else if (type === 2 && count > 0) {
            const value = readAscii(view, valueOffset, count);
            if (tag === TAG_MAKE) result.make = value;
            else if (tag === TAG_MODEL) result.model = value;
            else if (tag === TAG_SOFTWARE) result.software = value;
            else if (tag === TAG_DATE_TIME_ORIGINAL) result.capturedAt = value;
          } else if (tag === TAG_ORIENTATION && type === 3) {
            result.orientation = view.getUint16(valueOffset, littleEndian);
          }
        }
      };

      parseIfd(view.getUint32(tiffStart + 4, littleEndian));
      return result;
    }

    markerOffset += segmentLength + 2;
  }

  return empty;
}

export async function inspectImageMetadata(file: File): Promise<ImageMetadata> {
  const [bitmap, buffer] = await Promise.all([createImageBitmap(file), file.arrayBuffer()]);
  const dimensions = { width: bitmap.width, height: bitmap.height };
  bitmap.close();
  const exif = file.type === "image/jpeg" ? readJpegExif(buffer) : { hasGps: false, exifDetected: false };
  return { ...dimensions, ...exif };
}
