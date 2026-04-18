import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <div className="text-8xl font-extrabold bg-gradient-to-r from-primary-600 to-primary-400 bg-clip-text text-transparent mb-4">
          404
        </div>
        <h1 className="text-2xl font-bold text-gray-900 mb-3">
          Page Not Found
        </h1>
        <p className="text-gray-500 mb-8 leading-relaxed">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
          Try one of our free tools instead!
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/" className="btn-primary text-sm !py-3 !px-6">
            Go Home
          </Link>
          <Link href="/tools/pdf/" className="btn-secondary text-sm !py-3 !px-6">
            PDF Tools
          </Link>
        </div>

        <div className="mt-12 grid grid-cols-2 gap-3 text-left">
          <Link href="/tools/pdf-merge/" className="p-3 rounded-xl border border-gray-100 hover:border-primary-200 hover:bg-primary-50/50 transition-all text-sm">
            <div className="font-semibold text-gray-900">PDF Merger</div>
            <div className="text-xs text-gray-400">Combine PDFs</div>
          </Link>
          <Link href="/tools/pdf-split/" className="p-3 rounded-xl border border-gray-100 hover:border-primary-200 hover:bg-primary-50/50 transition-all text-sm">
            <div className="font-semibold text-gray-900">PDF Splitter</div>
            <div className="text-xs text-gray-400">Split PDFs</div>
          </Link>
          <Link href="/tools/image-convert/" className="p-3 rounded-xl border border-gray-100 hover:border-primary-200 hover:bg-primary-50/50 transition-all text-sm">
            <div className="font-semibold text-gray-900">Image Converter</div>
            <div className="text-xs text-gray-400">PNG, JPG, WebP</div>
          </Link>
          <Link href="/tools/json-formatter/" className="p-3 rounded-xl border border-gray-100 hover:border-primary-200 hover:bg-primary-50/50 transition-all text-sm">
            <div className="font-semibold text-gray-900">JSON Formatter</div>
            <div className="text-xs text-gray-400">Format & validate</div>
          </Link>
        </div>
      </div>
    </div>
  );
}
