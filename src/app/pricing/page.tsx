"use client";

import Link from "next/link";

const plans = [
  {
    name: "Free",
    price: "$0",
    period: "forever",
    description: "Essential tools for everyday use",
    features: [
      "Text Counter",
      "JSON Formatter",
      "QR Code Generator",
      "Password Generator",
      "Image Compressor",
      "Browser-based processing",
      "No sign-up required",
    ],
    limitations: ["Ads supported", "Basic features only"],
    cta: "Get Started Free",
    href: "/#tools",
    highlight: false,
  },
  {
    name: "Premium",
    price: "$4.99",
    period: "/month",
    yearlyPrice: "$39.99/year (save 33%)",
    description: "Full access to all tools and features",
    features: [
      "Everything in Free",
      "PDF Merger & Splitter",
      "Batch processing",
      "Ad-free experience",
      "Priority new tools",
      "Advanced options for all tools",
      "Email support",
    ],
    limitations: [],
    cta: "Start Premium",
    href: "#",
    highlight: true,
  },
  {
    name: "API Pro",
    price: "$19.99",
    period: "/month",
    description: "For developers and businesses",
    features: [
      "Everything in Premium",
      "REST API access",
      "25,000 requests/month",
      "Webhook support",
      "API documentation",
      "Priority support",
      "Commercial license",
    ],
    limitations: [],
    cta: "Contact Us",
    href: "#",
    highlight: false,
  },
];

export default function PricingPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Simple, Transparent Pricing
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Start free, upgrade when you need more. No hidden fees, no surprises.
          Cancel anytime.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
        {plans.map((plan) => (
          <div
            key={plan.name}
            className={`rounded-2xl p-8 ${
              plan.highlight
                ? "bg-primary-600 text-white ring-4 ring-primary-200 scale-105"
                : "bg-white border border-gray-200"
            }`}
          >
            <h3
              className={`text-lg font-semibold mb-2 ${
                plan.highlight ? "text-primary-100" : "text-gray-500"
              }`}
            >
              {plan.name}
            </h3>

            <div className="mb-1">
              <span className="text-4xl font-bold">{plan.price}</span>
              <span
                className={`text-sm ${
                  plan.highlight ? "text-primary-200" : "text-gray-500"
                }`}
              >
                {plan.period}
              </span>
            </div>

            {plan.yearlyPrice && (
              <p
                className={`text-sm mb-4 ${
                  plan.highlight ? "text-primary-200" : "text-gray-500"
                }`}
              >
                {plan.yearlyPrice}
              </p>
            )}

            <p
              className={`text-sm mb-6 ${
                plan.highlight ? "text-primary-100" : "text-gray-600"
              }`}
            >
              {plan.description}
            </p>

            <Link
              href={plan.href}
              className={`block text-center py-3 px-6 rounded-xl font-medium transition-colors ${
                plan.highlight
                  ? "bg-white text-primary-600 hover:bg-primary-50"
                  : "bg-primary-600 text-white hover:bg-primary-700"
              }`}
            >
              {plan.cta}
            </Link>

            <ul className="mt-8 space-y-3">
              {plan.features.map((feature) => (
                <li key={feature} className="flex items-start gap-2 text-sm">
                  <span
                    className={`mt-0.5 ${
                      plan.highlight ? "text-primary-200" : "text-accent-500"
                    }`}
                  >
                    &#10003;
                  </span>
                  <span>{feature}</span>
                </li>
              ))}
              {plan.limitations.map((limitation) => (
                <li
                  key={limitation}
                  className={`flex items-start gap-2 text-sm ${
                    plan.highlight ? "text-primary-300" : "text-gray-400"
                  }`}
                >
                  <span className="mt-0.5">&#8212;</span>
                  <span>{limitation}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* FAQ */}
      <div className="max-w-3xl mx-auto mt-20">
        <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">
          Frequently Asked Questions
        </h2>

        <div className="space-y-6">
          {[
            {
              q: "Is the free plan really free?",
              a: "Yes! Our core tools are completely free with no sign-up required. We believe in providing value first. Free tools are supported by non-intrusive ads.",
            },
            {
              q: "Can I cancel my subscription anytime?",
              a: "Absolutely. You can cancel your Premium or API Pro subscription at any time. No contracts, no cancellation fees.",
            },
            {
              q: "Is my data safe?",
              a: "Yes. All our tools process data directly in your browser. Your files and text never leave your device — we never see or store your data.",
            },
            {
              q: "What payment methods do you accept?",
              a: "We accept all major credit/debit cards through Stripe, our secure payment processor. All transactions are encrypted and PCI compliant.",
            },
            {
              q: "Do you offer refunds?",
              a: "Yes. If you're not satisfied within the first 7 days, we'll provide a full refund — no questions asked.",
            },
          ].map((faq) => (
            <div
              key={faq.q}
              className="bg-white rounded-xl p-6 border border-gray-100"
            >
              <h3 className="font-semibold text-gray-900 mb-2">{faq.q}</h3>
              <p className="text-gray-600 text-sm">{faq.a}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
