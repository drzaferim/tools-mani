import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-white border-t border-gray-100 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">HT</span>
              </div>
              <span className="font-bold text-xl text-gray-900">
                HelperTools
              </span>
            </div>
            <p className="text-gray-500 max-w-md">
              Free online tools that respect your privacy. No data is stored on
              our servers — all processing happens in your browser.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-gray-900 mb-3">Tools</h3>
            <ul className="space-y-2 text-gray-500">
              <li>
                <Link
                  href="/tools/text-counter"
                  className="hover:text-primary-600"
                >
                  Text Counter
                </Link>
              </li>
              <li>
                <Link
                  href="/tools/json-formatter"
                  className="hover:text-primary-600"
                >
                  JSON Formatter
                </Link>
              </li>
              <li>
                <Link
                  href="/tools/qr-generator"
                  className="hover:text-primary-600"
                >
                  QR Generator
                </Link>
              </li>
              <li>
                <Link
                  href="/tools/password-generator"
                  className="hover:text-primary-600"
                >
                  Password Generator
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-gray-900 mb-3">Company</h3>
            <ul className="space-y-2 text-gray-500">
              <li>
                <Link href="/pricing" className="hover:text-primary-600">
                  Pricing
                </Link>
              </li>
              <li>
                <Link href="/#tools" className="hover:text-primary-600">
                  All Tools
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-100 mt-8 pt-8 text-center text-gray-400 text-sm">
          <p>&copy; {new Date().getFullYear()} HelperTools. All rights reserved.</p>
          <p className="mt-1">
            Built with ethical principles. Providing value, earning honestly.
          </p>
        </div>
      </div>
    </footer>
  );
}
