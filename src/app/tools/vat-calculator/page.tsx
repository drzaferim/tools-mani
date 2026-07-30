"use client";

import { useState } from "react";
import Link from "next/link";
import { useLanguage, pick, localeTag } from "@/lib/language-context";
import type { Locale } from "@/lib/translations";
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
    pct: (v: string) => `${v}%`,
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
    pct: (v: string) => `%${v}`,
  },
  es: {
    back: "← Volver a las herramientas",
    title: "Calculadora de IVA",
    subtitle:
      "Añade el IVA a un precio sin impuestos o extrae el IVA de un precio final. Tipos de España predefinidos (4%, 10%, 21%) y tipo personalizado.",
    amount: "Importe",
    rate: "Tipo de IVA",
    custom: "Personalizado",
    modeAdd: "Añadir IVA (base → total)",
    modeExtract: "Extraer IVA (total → base)",
    net: "Base imponible (sin IVA)",
    vat: "IVA",
    gross: "Total (con IVA)",
    pct: (v: string) => `${v} %`,
  },
  de: {
    back: "← Zurück zu den Tools",
    title: "Mehrwertsteuer-Rechner",
    subtitle:
      "Rechnen Sie die Mehrwertsteuer auf einen Nettopreis auf oder aus einem Bruttopreis heraus. Deutsche Sätze voreingestellt (7%, 19%) plus eigener Satz.",
    amount: "Betrag",
    rate: "MwSt.-Satz",
    custom: "Eigener Satz",
    modeAdd: "MwSt. aufschlagen (netto → brutto)",
    modeExtract: "MwSt. herausrechnen (brutto → netto)",
    net: "Netto (ohne MwSt.)",
    vat: "MwSt.",
    gross: "Brutto (inkl. MwSt.)",
    pct: (v: string) => `${v} %`,
  },
  pt: {
    back: "← Voltar às ferramentas",
    title: "Calculadora de IVA",
    subtitle:
      "Adicione IVA a um preço sem imposto ou extraia o IVA de um preço final. Taxas de Portugal predefinidas (6%, 13%, 23%) e taxa personalizada.",
    amount: "Valor",
    rate: "Taxa de IVA",
    custom: "Personalizada",
    modeAdd: "Adicionar IVA (sem → com)",
    modeExtract: "Extrair IVA (com → sem)",
    net: "Valor sem IVA",
    vat: "IVA",
    gross: "Valor com IVA",
    pct: (v: string) => `${v}%`,
  },
  fr: {
    back: "← Retour aux outils",
    title: "Calculateur de TVA",
    subtitle:
      "Ajoutez la TVA à un prix hors taxes ou extrayez-la d'un prix TTC. Taux français prédéfinis (5,5%, 10%, 20%) et taux personnalisé.",
    amount: "Montant",
    rate: "Taux de TVA",
    custom: "Personnalisé",
    modeAdd: "Ajouter la TVA (HT → TTC)",
    modeExtract: "Extraire la TVA (TTC → HT)",
    net: "HT (hors taxes)",
    vat: "TVA",
    gross: "TTC (toutes taxes comprises)",
    pct: (v: string) => `${v} %`,
  },
};

/**
 * Ön tanımlı oranlar ülkeye göre değişir — Alman kullanıcıya Türkiye oranı
 * göstermenin anlamı yok. `en` uluslararası sayfa olduğu için Türkiye
 * oranlarında bırakıldı (metin de bunu böyle söylüyor); her dilde özel oran
 * girme seçeneği zaten var.
 */
const PRESET_RATES: Record<Locale, number[]> = {
  en: [1, 10, 20],
  tr: [1, 10, 20],
  es: [4, 10, 21],
  de: [7, 19],
  pt: [6, 13, 23],
  fr: [5.5, 10, 20],
};

export default function VatCalculatorPage() {
  const { locale, localePath } = useLanguage();
  const l = pick(labels, locale);
  const markToolUsed = useTrackToolUseOnce("vat-calculator");

  const presets = PRESET_RATES[locale] ?? PRESET_RATES.en;
  const [amount, setAmount] = useState("");
  // Varsayılan, o ülkenin genel oranı: listedeki en yüksek oran.
  const [rate, setRate] = useState(() => presets[presets.length - 1]);
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
    n.toLocaleString(localeTag(locale), {
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
            {presets.map((p) => (
              <button
                key={p}
                onClick={() => { setRate(p); setUseCustom(false); }}
                className={`px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  !useCustom && rate === p
                    ? "bg-primary-600 text-white shadow-md shadow-primary-200/50"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {l.pct(p.toLocaleString(localeTag(locale)))}
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
