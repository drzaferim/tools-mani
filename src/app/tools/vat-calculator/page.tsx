"use client";

import { useState } from "react";
import Link from "next/link";
import { useLanguage } from "@/lib/language-context";
import { useTrackToolUseOnce } from "@/lib/track";

const labels = {
  en: {
    back: "← Back to Tools",
    title: "VAT Calculator",
    subtitle:
      "Add VAT to a net price or extract VAT from a gross price. Preset rates for Türkiye (1%, 10%, 20%) plus custom rates.",
    amount: "Amount",
    rate: "VAT rate",
    custom: "Custom",
    modeAdd: "Add VAT (net → gross)",
    modeExtract: "Extract VAT (gross → net)",
    net: "Net (excl. VAT)",
    vat: "VAT",
    gross: "Gross (incl. VAT)",
  },
  tr: {
    back: "← Araçlara Dön",
    title: "KDV Hesaplama",
    subtitle:
      "Net fiyata KDV ekleyin veya KDV dahil fiyattan KDV'yi ayırın. Türkiye oranları hazır (%1, %10, %20), özel oran da girebilirsiniz.",
    amount: "Tutar",
    rate: "KDV oranı",
    custom: "Özel",
    modeAdd: "KDV Ekle (hariç → dahil)",
    modeExtract: "KDV Ayır (dahil → hariç)",
    net: "Net (KDV hariç)",
    vat: "KDV",
    gross: "Brüt (KDV dahil)",
  },
};

const PRESET_RATES = [1, 10, 20];

export default function VatCalculatorPage() {
  const { locale, localePath } = useLanguage();
  const l = labels[locale];
  const markToolUsed = useTrackToolUseOnce("vat-calculator");

  const [amount, setAmount] = useState("");
  const [rate, setRate] = useState(20);
  const [customRate, setCustomRate] = useState("");
  const [useCustom, setUseCustom] = useState(false);
  const [mode, setMode] = useState<"add" | "extract">("add");

  const amt = Number(amount.replace(",", "."));
  const r = useCustom ? Number(customRate.replace(",", ".")) : rate;
  const validAmt = amount.trim() !== "" && !isNaN(amt) && amt >= 0;
  const validRate = !isNaN(r) && r >= 0;

  let net = 0, vat = 0, gross = 0;
  if (validAmt && validRate) {
    if (mode === "add") {
      net = amt;
      vat = (amt * r) / 100;
      gross = net + vat;
    } else {
      gross = amt;
      net = amt / (1 + r / 100);
      vat = gross - net;
    }
  }

  const fmt = (n: number) =>
    n.toLocaleString(locale === "tr" ? "tr-TR" : "en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-6">
        <Link href={localePath("/")} className="text-primary-600 hover:text-primary-700 text-sm">
          {l.back}
        </Link>
      </div>

      <h1 className="text-3xl font-bold text-gray-900 mb-2">{l.title}</h1>
      <p className="text-gray-600 mb-10">{l.subtitle}</p>

      <div className="flex gap-2 mb-6">
        {(["add", "extract"] as const).map((m) => (
          <button
            key={m}
            onClick={() => setMode(m)}
            className={`px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
              mode === m
                ? "bg-primary-600 text-white shadow-md shadow-primary-200/50"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            {m === "add" ? l.modeAdd : l.modeExtract}
          </button>
        ))}
      </div>

      <div className="flex flex-wrap items-end gap-4 mb-8">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">{l.amount}</label>
          <input
            type="text"
            inputMode="decimal"
            value={amount}
            onChange={(e) => { setAmount(e.target.value); if (e.target.value) markToolUsed(); }}
            placeholder="1000"
            className="w-40 p-3 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">{l.rate}</label>
          <div className="flex gap-1.5 items-center">
            {PRESET_RATES.map((p) => (
              <button
                key={p}
                onClick={() => { setRate(p); setUseCustom(false); }}
                className={`px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  !useCustom && rate === p
                    ? "bg-primary-600 text-white shadow-md shadow-primary-200/50"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                %{p}
              </button>
            ))}
            <input
              type="text"
              inputMode="decimal"
              value={customRate}
              onChange={(e) => { setCustomRate(e.target.value); setUseCustom(e.target.value.trim() !== ""); }}
              placeholder={l.custom}
              className={`w-20 p-2.5 border rounded-xl text-sm text-center focus:outline-none focus:ring-2 focus:ring-primary-500 ${
                useCustom ? "border-primary-400 bg-primary-50" : "border-gray-200 bg-white"
              }`}
            />
          </div>
        </div>
      </div>

      {validAmt && validRate && (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {[
            [l.net, net, false],
            [l.vat, vat, true],
            [l.gross, gross, false],
          ].map(([label, val, highlight]) => (
            <div
              key={String(label)}
              className={`rounded-2xl p-5 text-center border ${
                highlight ? "bg-primary-50 border-primary-100" : "bg-white border-gray-100 shadow-sm"
              }`}
            >
              <p className="text-xs text-gray-500 mb-1">{String(label)}</p>
              <p className={`text-xl font-bold ${highlight ? "text-primary-600" : "text-gray-900"}`}>
                {fmt(Number(val))}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
