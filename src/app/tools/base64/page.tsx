"use client";

import { useState } from "react";
import Link from "next/link";
import { trackToolUse } from "@/lib/track";

export default function Base64Page() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");

  const encode = () => {
    try {
      const encoded = btoa(
        new TextEncoder()
          .encode(input)
          .reduce((acc, byte) => acc + String.fromCharCode(byte), "")
      );
      setOutput(encoded);
      setError("");
      void trackToolUse("base64");
    } catch {
      setError("Failed to encode text.");
      setOutput("");
    }
  };

  const decode = () => {
    try {
      const bytes = Uint8Array.from(atob(input), (c) => c.charCodeAt(0));
      const decoded = new TextDecoder().decode(bytes);
      setOutput(decoded);
      setError("");
      void trackToolUse("base64");
    } catch {
      setError("Invalid Base64 string.");
      setOutput("");
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-6">
        <Link href="/" className="text-primary-600 hover:text-primary-700 text-sm">
          &larr; Back to Tools
        </Link>
      </div>

      <h1 className="text-3xl font-bold text-gray-900 mb-2">Base64 Encoder/Decoder</h1>
      <p className="text-gray-600 mb-8">
        Encode text to Base64 or decode Base64 back to plain text. Supports UTF-8.
      </p>

      <div className="flex flex-wrap gap-3 mb-6">
        <button onClick={encode} className="btn-primary text-sm">Encode</button>
        <button onClick={decode} className="btn-secondary text-sm">Decode</button>
        <button
          onClick={() => { setInput(""); setOutput(""); setError(""); }}
          className="btn-secondary text-sm"
        >
          Clear
        </button>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl mb-4">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Input</label>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Enter text to encode or Base64 to decode..."
            className="w-full h-64 p-4 bg-white border border-gray-200 rounded-xl font-mono text-sm resize-y focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Output</label>
          <textarea
            value={output}
            readOnly
            placeholder="Result will appear here..."
            className="w-full h-64 p-4 bg-gray-50 border border-gray-200 rounded-xl font-mono text-sm resize-y focus:outline-none"
          />
        </div>
      </div>

      {output && (
        <div className="mt-4">
          <button
            onClick={() => navigator.clipboard.writeText(output)}
            className="btn-primary text-sm"
          >
            Copy Output
          </button>
        </div>
      )}
    </div>
  );
}
