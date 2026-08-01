export type DiffType = "same" | "add" | "del";

export type DiffPart = {
  type: DiffType;
  value: string;
  leftNumber?: number;
  rightNumber?: number;
};

type DiffOptions = {
  ignoreCase: boolean;
  ignoreWhitespace: boolean;
};

const MAX_DP_CELLS = 2_000_000;
const LOOKAHEAD = 60;

function normalized(value: string, options: DiffOptions): string {
  let result = options.ignoreWhitespace ? value.replace(/\s+/g, " ").trim() : value;
  if (options.ignoreCase) result = result.toLocaleLowerCase();
  return result;
}

function greedyDiff(a: string[], b: string[], keysA: string[], keysB: string[]): DiffPart[] {
  const result: DiffPart[] = [];
  let left = 0;
  let right = 0;
  while (left < a.length && right < b.length) {
    if (keysA[left] === keysB[right]) {
      result.push({ type: "same", value: a[left] });
      left += 1;
      right += 1;
      continue;
    }

    let nextLeft = -1;
    let nextRight = -1;
    for (let offset = 1; offset <= LOOKAHEAD; offset += 1) {
      if (nextLeft === -1 && left + offset < a.length && keysA[left + offset] === keysB[right]) nextLeft = offset;
      if (nextRight === -1 && right + offset < b.length && keysA[left] === keysB[right + offset]) nextRight = offset;
      if (nextLeft !== -1 || nextRight !== -1) break;
    }

    if (nextRight !== -1 && (nextLeft === -1 || nextRight <= nextLeft)) {
      for (let count = 0; count < nextRight; count += 1) result.push({ type: "add", value: b[right++] });
    } else if (nextLeft !== -1) {
      for (let count = 0; count < nextLeft; count += 1) result.push({ type: "del", value: a[left++] });
    } else {
      result.push({ type: "del", value: a[left++] });
      result.push({ type: "add", value: b[right++] });
    }
  }
  while (left < a.length) result.push({ type: "del", value: a[left++] });
  while (right < b.length) result.push({ type: "add", value: b[right++] });
  return result;
}

function diffSequence(a: string[], b: string[], options: DiffOptions): DiffPart[] {
  const keysA = a.map((value) => normalized(value, options));
  const keysB = b.map((value) => normalized(value, options));
  const rows = a.length + 1;
  const columns = b.length + 1;
  if (rows * columns > MAX_DP_CELLS) return greedyDiff(a, b, keysA, keysB);

  const table = new Uint32Array(rows * columns);
  for (let left = a.length - 1; left >= 0; left -= 1) {
    for (let right = b.length - 1; right >= 0; right -= 1) {
      const index = left * columns + right;
      table[index] = keysA[left] === keysB[right]
        ? table[(left + 1) * columns + right + 1] + 1
        : Math.max(table[(left + 1) * columns + right], table[left * columns + right + 1]);
    }
  }

  const result: DiffPart[] = [];
  let left = 0;
  let right = 0;
  while (left < a.length && right < b.length) {
    if (keysA[left] === keysB[right]) {
      result.push({ type: "same", value: a[left] });
      left += 1;
      right += 1;
    } else if (table[(left + 1) * columns + right] >= table[left * columns + right + 1]) {
      result.push({ type: "del", value: a[left++] });
    } else {
      result.push({ type: "add", value: b[right++] });
    }
  }
  while (left < a.length) result.push({ type: "del", value: a[left++] });
  while (right < b.length) result.push({ type: "add", value: b[right++] });
  return result;
}

export function diffLines(leftText: string, rightText: string, options: DiffOptions): DiffPart[] {
  const parts = diffSequence(leftText.split("\n"), rightText.split("\n"), options);
  let leftNumber = 1;
  let rightNumber = 1;
  return parts.map((part) => {
    const numbered = {
      ...part,
      leftNumber: part.type === "add" ? undefined : leftNumber,
      rightNumber: part.type === "del" ? undefined : rightNumber,
    };
    if (part.type !== "add") leftNumber += 1;
    if (part.type !== "del") rightNumber += 1;
    return numbered;
  });
}

export function diffWords(leftText: string, rightText: string, options: DiffOptions): DiffPart[] {
  const tokenize = (value: string) =>
    value.match(/\s+|[\w\u00c0-\u024f\u1e00-\u1eff]+|[^\s\w]/g) ?? [];
  return diffSequence(tokenize(leftText), tokenize(rightText), options);
}
