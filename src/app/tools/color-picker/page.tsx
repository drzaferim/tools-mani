"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import { useLanguage } from "@/lib/language-context";
import { useTrackToolUseOnce } from "@/lib/track";
import { ToolContent } from "@/components/ToolContent";
import { colorPickerContent } from "@/content/tools/text-color";

function hexToRgb(hex: string) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return { r, g, b };
}

function rgbToHsl(r: number, g: number, b: number) {
  r /= 255; g /= 255; b /= 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  const l = (max + min) / 2;
  let h = 0, s = 0;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break;
      case g: h = ((b - r) / d + 2) / 6; break;
      case b: h = ((r - g) / d + 4) / 6; break;
    }
  }

  return {
    h: Math.round(h * 360),
    s: Math.round(s * 100),
    l: Math.round(l * 100),
  };
}

export default function ColorPickerPage() {
  const { t, localePath } = useLanguage();
  const [hex, setHex] = useState("#3b82f6");
  const markToolUsed = useTrackToolUseOnce("color-picker");

  const rgb = hexToRgb(hex);
  const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);

  const copyToClipboard = useCallback((text: string) => {
    navigator.clipboard.writeText(text);
    markToolUsed();
  }, [markToolUsed]);

  const colorValues = [
    { label: "HEX", value: hex.toUpperCase() },
    { label: "RGB", value: `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})` },
    { label: "HSL", value: `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)` },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-6">
        <Link href="/" className="text-primary-600 hover:text-primary-700 text-sm">
          &larr; {t("pdfHub.backToAll")}
        </Link>
      </div>

      <h1 className="text-3xl font-bold text-gray-900 mb-2">Color Picker & Converter</h1>
      <p className="text-gray-600 mb-8">
        Pick a color and convert between HEX, RGB, and HSL formats instantly.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Pick a Color</label>
          <input
            type="color"
            value={hex}
            onChange={(e) => {
              setHex(e.target.value);
              markToolUsed();
            }}
            className="w-full h-48 rounded-xl cursor-pointer border border-gray-200"
          />
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">HEX Value</label>
            <input
              type="text"
              value={hex}
              onChange={(e) => {
                const v = e.target.value;
                if (/^#[0-9a-fA-F]{0,6}$/.test(v)) {
                  setHex(v);
                  if (v.length > 1) {
                    markToolUsed();
                  }
                }
              }}
              className="w-full p-3 bg-white border border-gray-200 rounded-xl font-mono text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Color Values</label>
          <div
            className="w-full h-24 rounded-xl border border-gray-200 mb-6"
            style={{ backgroundColor: hex }}
          />
          <div className="space-y-3">
            {colorValues.map((cv) => (
              <div key={cv.label} className="flex items-center gap-3">
                <span className="text-sm font-medium text-gray-500 w-10">{cv.label}</span>
                <div className="flex-1 bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 font-mono text-sm">
                  {cv.value}
                </div>
                <button
                  onClick={() => copyToClipboard(cv.value)}
                  className="btn-secondary text-xs"
                >
                  Copy
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      <ToolContent content={colorPickerContent} />
    </div>
  );
}
