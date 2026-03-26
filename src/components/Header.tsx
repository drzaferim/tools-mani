"use client";

import Link from "next/link";
import { useState } from "react";

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="bg-white border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">TM</span>
            </div>
            <span className="font-bold text-xl text-gray-900">
              ToolsMani
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            <Link
              href="/#tools"
              className="text-gray-600 hover:text-primary-600 transition-colors"
            >
              Tools
            </Link>
            <Link
              href="/pricing"
              className="text-gray-600 hover:text-primary-600 transition-colors"
            >
              Pricing
            </Link>
          </nav>

          <div className="hidden md:flex items-center gap-3">
            <Link href="/pricing" className="btn-primary text-sm">
              Go Premium
            </Link>
          </div>

          <button
            className="md:hidden p-2"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {menuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {menuOpen && (
          <div className="md:hidden pb-4 border-t border-gray-100 mt-2 pt-4">
            <nav className="flex flex-col gap-3">
              <Link
                href="/#tools"
                className="text-gray-600 hover:text-primary-600"
                onClick={() => setMenuOpen(false)}
              >
                Tools
              </Link>
              <Link
                href="/pricing"
                className="text-gray-600 hover:text-primary-600"
                onClick={() => setMenuOpen(false)}
              >
                Pricing
              </Link>
              <Link href="/pricing" className="btn-primary text-sm text-center">
                Go Premium
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
