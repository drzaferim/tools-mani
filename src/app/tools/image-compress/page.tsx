"use client";

import { useState, useRef } from "react";
import Link from "next/link";

interface CompressedImage {
  original: { name: string; size: number; url: string };
  compressed: { size: number; url: string };
  savings: number;
}

export default function ImageCompressPage() {
  const [images, setImages] = useState<CompressedImage[]>([]);
  const [quality, setQuality] = useState(80);
  const [processing, setProcessing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const compressImage = (file: File): Promise<CompressedImage> => {
    return new Promise((resolve) => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d")!;
      const img = new Image();
      const originalUrl = URL.createObjectURL(file);

      img.onload = () => {
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0);

        canvas.toBlob(
          (blob) => {
            if (blob) {
              const compressedUrl = URL.createObjectURL(blob);
              resolve({
                original: { name: file.name, size: file.size, url: originalUrl },
                compressed: { size: blob.size, url: compressedUrl },
                savings: Math.round((1 - blob.size / file.size) * 100),
              });
            }
          },
          "image/jpeg",
          quality / 100
        );
      };
      img.src = originalUrl;
    });
  };

  const handleFiles = async (files: FileList | null) => {
    if (!files || files.length === 0) return;
    setProcessing(true);

    const results: CompressedImage[] = [];
    for (const file of Array.from(files)) {
      if (file.type.startsWith("image/")) {
        const result = await compressImage(file);
        results.push(result);
      }
    }
    setImages((prev) => [...prev, ...results]);
    setProcessing(false);
  };

  const formatSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  const downloadImage = (image: CompressedImage) => {
    const link = document.createElement("a");
    link.href = image.compressed.url;
    link.download = `compressed-${image.original.name}`;
    link.click();
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-6">
        <Link
          href="/"
          className="text-primary-600 hover:text-primary-700 text-sm"
        >
          &larr; Back to Tools
        </Link>
      </div>

      <h1 className="text-3xl font-bold text-gray-900 mb-2">
        Image Compressor
      </h1>
      <p className="text-gray-600 mb-8">
        Compress images right in your browser. No uploads, your files stay
        private.
      </p>

      {/* Quality Setting */}
      <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm mb-6">
        <div className="flex justify-between mb-2">
          <label className="text-sm font-medium text-gray-700">
            Quality
          </label>
          <span className="text-sm font-medium text-primary-600">
            {quality}%
          </span>
        </div>
        <input
          type="range"
          min={10}
          max={100}
          value={quality}
          onChange={(e) => setQuality(Number(e.target.value))}
          className="w-full"
        />
        <p className="text-xs text-gray-400 mt-1">
          Lower quality = smaller file size
        </p>
      </div>

      {/* Upload Area */}
      <div
        onClick={() => fileInputRef.current?.click()}
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => {
          e.preventDefault();
          handleFiles(e.dataTransfer.files);
        }}
        className="border-2 border-dashed border-gray-300 rounded-2xl p-12 text-center cursor-pointer hover:border-primary-400 transition-colors bg-white"
      >
        <div className="text-4xl text-gray-300 mb-4">📷</div>
        <p className="text-gray-600 font-medium">
          Click or drag images here to compress
        </p>
        <p className="text-gray-400 text-sm mt-1">
          Supports JPEG, PNG, WebP
        </p>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          multiple
          onChange={(e) => handleFiles(e.target.files)}
          className="hidden"
        />
      </div>

      {processing && (
        <div className="mt-6 text-center text-primary-600 font-medium">
          Compressing...
        </div>
      )}

      {/* Results */}
      {images.length > 0 && (
        <div className="mt-8 space-y-4">
          <h3 className="font-semibold text-gray-900">Results</h3>
          {images.map((image, index) => (
            <div
              key={index}
              className="bg-white rounded-xl p-4 border border-gray-100 flex items-center justify-between"
            >
              <div className="flex-1 min-w-0">
                <p className="font-medium text-gray-900 truncate">
                  {image.original.name}
                </p>
                <p className="text-sm text-gray-500">
                  {formatSize(image.original.size)} → {formatSize(image.compressed.size)}
                  <span className="text-accent-600 font-medium ml-2">
                    -{image.savings}%
                  </span>
                </p>
              </div>
              <button
                onClick={() => downloadImage(image)}
                className="btn-primary text-sm ml-4"
              >
                Download
              </button>
            </div>
          ))}
          <button
            onClick={() => setImages([])}
            className="btn-secondary text-sm"
          >
            Clear All
          </button>
        </div>
      )}
    </div>
  );
}
