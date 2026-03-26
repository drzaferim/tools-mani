import Link from "next/link";
import { tools } from "@/lib/tools";

export default function HomePage() {
  return (
    <>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-50 via-white to-accent-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
            Free Online Tools
            <br />
            <span className="text-primary-600">for Everyone</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
            Fast, private, and easy-to-use tools. No sign-up required.
            All processing happens in your browser — your data stays yours.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="#tools" className="btn-primary text-lg">
              Explore Tools
            </Link>
            <Link href="/pricing" className="btn-secondary text-lg">
              View Pricing
            </Link>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-primary-600">6+</div>
              <div className="text-gray-500 mt-1">Online Tools</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary-600">100%</div>
              <div className="text-gray-500 mt-1">Privacy Focused</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary-600">0</div>
              <div className="text-gray-500 mt-1">Data Stored</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-accent-600">Free</div>
              <div className="text-gray-500 mt-1">Core Tools</div>
            </div>
          </div>
        </div>
      </section>

      {/* Tools Grid */}
      <section id="tools" className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Our Tools
            </h2>
            <p className="text-gray-600 max-w-xl mx-auto">
              Choose from our growing collection of tools designed to make your
              daily tasks easier.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tools.map((tool) => (
              <Link key={tool.id} href={tool.href} className="tool-card group">
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 bg-primary-50 rounded-xl flex items-center justify-center group-hover:bg-primary-100 transition-colors">
                    <span className="text-primary-600 text-xl font-bold">
                      {tool.icon.charAt(0)}
                    </span>
                  </div>
                  {tool.isFree ? (
                    <span className="text-xs font-medium bg-accent-50 text-accent-700 px-2 py-1 rounded-full">
                      Free
                    </span>
                  ) : (
                    <span className="text-xs font-medium bg-primary-50 text-primary-700 px-2 py-1 rounded-full">
                      Premium
                    </span>
                  )}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {tool.name}
                </h3>
                <p className="text-gray-500 text-sm">{tool.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-primary-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Need More Power?
          </h2>
          <p className="text-primary-100 text-lg mb-8 max-w-2xl mx-auto">
            Unlock premium tools, batch processing, and API access with our
            affordable plans. Support ethical development.
          </p>
          <Link
            href="/pricing"
            className="inline-block bg-white text-primary-600 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-primary-50 transition-colors"
          >
            See Pricing Plans
          </Link>
        </div>
      </section>
    </>
  );
}
