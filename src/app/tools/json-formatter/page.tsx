"use client";

import { useState } from "react";
import Link from "next/link";

export default function JsonFormatterPage() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");
  const [indentSize, setIndentSize] = useState(2);

  const formatJson = () => {
    try {
      const parsed = JSON.parse(input);
      setOutput(JSON.stringify(parsed, null, indentSize));
      setError("");
    } catch (e) {
      setError(e instanceof Error ? e.message : "Invalid JSON");
      setOutput("");
    }
  };

  const minifyJson = () => {
    try {
      const parsed = JSON.parse(input);
      setOutput(JSON.stringify(parsed));
      setError("");
    } catch (e) {
      setError(e instanceof Error ? e.message : "Invalid JSON");
      setOutput("");
    }
  };

  const validateJson = () => {
    try {
      JSON.parse(input);
      setError("");
      setOutput("Valid JSON!");
    } catch (e) {
      setError(e instanceof Error ? e.message : "Invalid JSON");
      setOutput("");
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-6">
        <Link
          href="/"
          className="text-primary-600 hover:text-primary-700 text-sm"
        >
          &larr; Back to Tools
        </Link>
      </div>

      <h1 className="text-3xl font-bold text-gray-900 mb-2">JSON Formatter</h1>
      <p className="text-gray-600 mb-8">
        Format, validate, and beautify your JSON data instantly.
      </p>

      <div className="flex flex-wrap gap-3 mb-6">
        <button onClick={formatJson} className="btn-primary text-sm">
          Format
        </button>
        <button onClick={minifyJson} className="btn-secondary text-sm">
          Minify
        </button>
        <button onClick={validateJson} className="btn-secondary text-sm">
          Validate
        </button>
        <select
          value={indentSize}
          onChange={(e) => setIndentSize(Number(e.target.value))}
          className="border border-gray-200 rounded-lg px-3 py-2 text-sm"
        >
          <option value={2}>2 spaces</option>
          <option value={4}>4 spaces</option>
          <option value={8}>Tab (8)</option>
        </select>
        <button
          onClick={() => {
            setInput("");
            setOutput("");
            setError("");
          }}
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
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Input
          </label>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder='{"key": "value"}'
            className="w-full h-96 p-4 bg-white border border-gray-200 rounded-xl font-mono text-sm resize-y focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Output
          </label>
          <textarea
            value={output}
            readOnly
            placeholder="Formatted output will appear here..."
            className="w-full h-96 p-4 bg-gray-50 border border-gray-200 rounded-xl font-mono text-sm resize-y focus:outline-none"
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
