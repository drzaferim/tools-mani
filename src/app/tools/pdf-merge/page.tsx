"use client";

import Link from "next/link";

export default function PdfMergePage() {
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

      <h1 className="text-3xl font-bold text-gray-900 mb-2">PDF Merger</h1>
      <p className="text-gray-600 mb-8">
        Merge multiple PDF files into one document. Reorder pages and customize
        your output.
      </p>

      {/* Premium Lock */}
      <div className="bg-gradient-to-br from-primary-50 to-accent-50 rounded-2xl p-12 text-center border border-primary-100">
        <div className="text-6xl mb-6">🔒</div>
        <h2 className="text-2xl font-bold text-gray-900 mb-3">
          Premium Feature
        </h2>
        <p className="text-gray-600 max-w-md mx-auto mb-6">
          PDF Merger is available with our Premium plan. Get unlimited PDF
          merging along with all other premium tools.
        </p>
        <Link href="/pricing" className="btn-primary text-lg">
          Upgrade to Premium
        </Link>
        <p className="text-sm text-gray-500 mt-4">Starting at $4.99/month</p>
      </div>
    </div>
  );
}
