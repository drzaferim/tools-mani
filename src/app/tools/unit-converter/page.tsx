"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { useLanguage, pick } from "@/lib/language-context";
import { useTrackToolUseOnce } from "@/lib/track";

type UnitCategory = "length" | "weight" | "temperature" | "volume" | "speed" | "data";

interface UnitDef {
  toBase: (v: number) => number;
  fromBase: (v: number) => number;
}

const units: Record<UnitCategory, Record<string, UnitDef>> = {
  length: {
    mm: { toBase: (v) => v / 1000, fromBase: (v) => v * 1000 },
    cm: { toBase: (v) => v / 100, fromBase: (v) => v * 100 },
    m: { toBase: (v) => v, fromBase: (v) => v },
    km: { toBase: (v) => v * 1000, fromBase: (v) => v / 1000 },
    in: { toBase: (v) => v * 0.0254, fromBase: (v) => v / 0.0254 },
    ft: { toBase: (v) => v * 0.3048, fromBase: (v) => v / 0.3048 },
    mi: { toBase: (v) => v * 1609.344, fromBase: (v) => v / 1609.344 },
  },
  weight: {
    mg: { toBase: (v) => v / 1000000, fromBase: (v) => v * 1000000 },
    g: { toBase: (v) => v / 1000, fromBase: (v) => v * 1000 },
    kg: { toBase: (v) => v, fromBase: (v) => v },
    lb: { toBase: (v) => v * 0.453592, fromBase: (v) => v / 0.453592 },
    oz: { toBase: (v) => v * 0.0283495, fromBase: (v) => v / 0.0283495 },
    t: { toBase: (v) => v * 1000, fromBase: (v) => v / 1000 },
  },
  temperature: {
    c: { toBase: (v) => v, fromBase: (v) => v },
    f: { toBase: (v) => (v - 32) * 5 / 9, fromBase: (v) => v * 9 / 5 + 32 },
    k: { toBase: (v) => v - 273.15, fromBase: (v) => v + 273.15 },
  },
  volume: {
    ml: { toBase: (v) => v / 1000, fromBase: (v) => v * 1000 },
    l: { toBase: (v) => v, fromBase: (v) => v },
    gal: { toBase: (v) => v * 3.78541, fromBase: (v) => v / 3.78541 },
    qt: { toBase: (v) => v * 0.946353, fromBase: (v) => v / 0.946353 },
    cup: { toBase: (v) => v * 0.236588, fromBase: (v) => v / 0.236588 },
  },
  speed: {
    mps: { toBase: (v) => v, fromBase: (v) => v },
    kmh: { toBase: (v) => v / 3.6, fromBase: (v) => v * 3.6 },
    mph: { toBase: (v) => v * 0.44704, fromBase: (v) => v / 0.44704 },
    kn: { toBase: (v) => v * 0.514444, fromBase: (v) => v / 0.514444 },
  },
  data: {
    b: { toBase: (v) => v, fromBase: (v) => v },
    kb: { toBase: (v) => v * 1024, fromBase: (v) => v / 1024 },
    mb: { toBase: (v) => v * 1048576, fromBase: (v) => v / 1048576 },
    gb: { toBase: (v) => v * 1073741824, fromBase: (v) => v / 1073741824 },
    tb: { toBase: (v) => v * 1099511627776, fromBase: (v) => v / 1099511627776 },
  },
};

const labels = {
  en: {
    back: "← Back to Tools",
    title: "Unit Converter",
    subtitle: "Convert between units of length, weight, temperature, volume, speed, and data.",
    from: "From",
    to: "To",
    swap: "Swap units",
    categories: {
      length: "Length", weight: "Weight", temperature: "Temperature",
      volume: "Volume", speed: "Speed", data: "Data",
    },
    units: {
      mm: "Millimeters", cm: "Centimeters", m: "Meters", km: "Kilometers",
      in: "Inches", ft: "Feet", mi: "Miles",
      mg: "Milligrams", g: "Grams", kg: "Kilograms", lb: "Pounds", oz: "Ounces", t: "Metric Tons",
      c: "Celsius", f: "Fahrenheit", k: "Kelvin",
      ml: "Milliliters", l: "Liters", gal: "Gallons (US)", qt: "Quarts (US)", cup: "Cups (US)",
      mps: "Meters/sec", kmh: "km/h", mph: "Miles/h", kn: "Knots",
      b: "Bytes", kb: "Kilobytes", mb: "Megabytes", gb: "Gigabytes", tb: "Terabytes",
    },
  },
  tr: {
    back: "← Araçlara Dön",
    title: "Birim Dönüştürücü",
    subtitle: "Uzunluk, ağırlık, sıcaklık, hacim, hız ve veri birimleri arasında dönüşüm yapın.",
    from: "Kaynak",
    to: "Hedef",
    swap: "Birimleri değiştir",
    categories: {
      length: "Uzunluk", weight: "Ağırlık", temperature: "Sıcaklık",
      volume: "Hacim", speed: "Hız", data: "Veri",
    },
    units: {
      mm: "Milimetre", cm: "Santimetre", m: "Metre", km: "Kilometre",
      in: "İnç", ft: "Fit", mi: "Mil",
      mg: "Miligram", g: "Gram", kg: "Kilogram", lb: "Pound", oz: "Ons", t: "Metrik Ton",
      c: "Santigrat", f: "Fahrenhayt", k: "Kelvin",
      ml: "Mililitre", l: "Litre", gal: "Galon (ABD)", qt: "Kuart (ABD)", cup: "Su Bardağı (ABD)",
      mps: "Metre/sn", kmh: "km/sa", mph: "Mil/sa", kn: "Deniz Mili/sa",
      b: "Bayt", kb: "Kilobayt", mb: "Megabayt", gb: "Gigabayt", tb: "Terabayt",
    },
  },
  es: {
    back: "← Volver a las herramientas",
    title: "Conversor de unidades",
    subtitle: "Convierte entre unidades de longitud, peso, temperatura, volumen, velocidad y datos.",
    from: "De",
    to: "A",
    swap: "Intercambiar unidades",
    categories: {
      length: "Longitud", weight: "Peso", temperature: "Temperatura",
      volume: "Volumen", speed: "Velocidad", data: "Datos",
    },
    units: {
      mm: "Milímetros", cm: "Centímetros", m: "Metros", km: "Kilómetros",
      in: "Pulgadas", ft: "Pies", mi: "Millas",
      mg: "Miligramos", g: "Gramos", kg: "Kilogramos", lb: "Libras", oz: "Onzas", t: "Toneladas métricas",
      c: "Celsius", f: "Fahrenheit", k: "Kelvin",
      ml: "Mililitros", l: "Litros", gal: "Galones (EE. UU.)", qt: "Cuartos (EE. UU.)", cup: "Tazas (EE. UU.)",
      mps: "Metros/s", kmh: "km/h", mph: "Millas/h", kn: "Nudos",
      b: "Bytes", kb: "Kilobytes", mb: "Megabytes", gb: "Gigabytes", tb: "Terabytes",
    },
  },
  de: {
    back: "← Zurück zu den Tools",
    title: "Einheitenrechner",
    subtitle: "Rechnen Sie zwischen Längen-, Gewichts-, Temperatur-, Volumen-, Geschwindigkeits- und Dateneinheiten um.",
    from: "Von",
    to: "Nach",
    swap: "Einheiten tauschen",
    categories: {
      length: "Länge", weight: "Gewicht", temperature: "Temperatur",
      volume: "Volumen", speed: "Geschwindigkeit", data: "Daten",
    },
    units: {
      mm: "Millimeter", cm: "Zentimeter", m: "Meter", km: "Kilometer",
      in: "Zoll", ft: "Fuß", mi: "Meilen",
      mg: "Milligramm", g: "Gramm", kg: "Kilogramm", lb: "Pfund", oz: "Unzen", t: "Tonnen",
      c: "Celsius", f: "Fahrenheit", k: "Kelvin",
      ml: "Milliliter", l: "Liter", gal: "Gallonen (US)", qt: "Quart (US)", cup: "Cups (US)",
      mps: "Meter/Sek.", kmh: "km/h", mph: "Meilen/h", kn: "Knoten",
      b: "Bytes", kb: "Kilobytes", mb: "Megabytes", gb: "Gigabytes", tb: "Terabytes",
    },
  },
  pt: {
    back: "← Voltar às ferramentas",
    title: "Conversor de unidades",
    subtitle: "Converta entre unidades de comprimento, peso, temperatura, volume, velocidade e dados.",
    from: "De",
    to: "Para",
    swap: "Trocar unidades",
    categories: {
      length: "Comprimento", weight: "Peso", temperature: "Temperatura",
      volume: "Volume", speed: "Velocidade", data: "Dados",
    },
    units: {
      mm: "Milímetros", cm: "Centímetros", m: "Metros", km: "Quilômetros",
      in: "Polegadas", ft: "Pés", mi: "Milhas",
      mg: "Miligramas", g: "Gramas", kg: "Quilogramas", lb: "Libras", oz: "Onças", t: "Toneladas",
      c: "Celsius", f: "Fahrenheit", k: "Kelvin",
      ml: "Mililitros", l: "Litros", gal: "Galões (EUA)", qt: "Quartos (EUA)", cup: "Xícaras (EUA)",
      mps: "Metros/s", kmh: "km/h", mph: "Milhas/h", kn: "Nós",
      b: "Bytes", kb: "Kilobytes", mb: "Megabytes", gb: "Gigabytes", tb: "Terabytes",
    },
  },
  fr: {
    back: "← Retour aux outils",
    title: "Convertisseur d'unités",
    subtitle: "Convertissez des unités de longueur, poids, température, volume, vitesse et données.",
    from: "De",
    to: "Vers",
    swap: "Inverser les unités",
    categories: {
      length: "Longueur", weight: "Poids", temperature: "Température",
      volume: "Volume", speed: "Vitesse", data: "Données",
    },
    units: {
      mm: "Millimètres", cm: "Centimètres", m: "Mètres", km: "Kilomètres",
      in: "Pouces", ft: "Pieds", mi: "Miles",
      mg: "Milligrammes", g: "Grammes", kg: "Kilogrammes", lb: "Livres", oz: "Onces", t: "Tonnes",
      c: "Celsius", f: "Fahrenheit", k: "Kelvin",
      ml: "Millilitres", l: "Litres", gal: "Gallons (US)", qt: "Quarts (US)", cup: "Tasses (US)",
      mps: "Mètres/s", kmh: "km/h", mph: "Miles/h", kn: "Nœuds",
      b: "Octets", kb: "Kilooctets", mb: "Mégaoctets", gb: "Gigaoctets", tb: "Téraoctets",
    },
  },
};

export default function UnitConverterPage() {
  const { locale, localePath } = useLanguage();
  const l = pick(labels, locale);
  const [category, setCategory] = useState<UnitCategory>("length");
  const [fromUnit, setFromUnit] = useState("m");
  const [toUnit, setToUnit] = useState("km");
  const [value, setValue] = useState("1");
  const markToolUsed = useTrackToolUseOnce("unit-converter");

  const unitKeys = Object.keys(units[category]);
  const unitName = (key: string) => l.units[key as keyof typeof l.units] ?? key;

  const result = useMemo(() => {
    const num = parseFloat(value);
    if (isNaN(num)) return "";
    const base = units[category][fromUnit].toBase(num);
    const converted = units[category][toUnit].fromBase(base);
    return converted % 1 === 0 ? converted.toString() : converted.toPrecision(8).replace(/\.?0+$/, "");
  }, [category, fromUnit, toUnit, value]);

  const handleCategoryChange = (cat: UnitCategory) => {
    setCategory(cat);
    const keys = Object.keys(units[cat]);
    setFromUnit(keys[0]);
    setToUnit(keys[1] || keys[0]);
    markToolUsed();
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-6">
        <Link href={localePath("/")} className="text-primary-600 hover:text-primary-700 text-sm">
          {l.back}
        </Link>
      </div>

      <h1 className="text-3xl font-bold text-gray-900 mb-2">{l.title}</h1>
      <p className="text-gray-600 mb-8">{l.subtitle}</p>

      <div className="flex flex-wrap gap-2 mb-8">
        {(Object.keys(units) as UnitCategory[]).map((cat) => (
          <button
            key={cat}
            onClick={() => handleCategoryChange(cat)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              category === cat
                ? "bg-primary-600 text-white"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            {l.categories[cat]}
          </button>
        ))}
      </div>

      <div className="bg-white rounded-2xl border border-gray-200 p-6">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-end">
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">{l.from}</label>
            <select
              value={fromUnit}
              onChange={(e) => {
                setFromUnit(e.target.value);
                markToolUsed();
              }}
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm mb-2"
            >
              {unitKeys.map((key) => (
                <option key={key} value={key}>
                  {unitName(key)} ({key})
                </option>
              ))}
            </select>
            <input
              type="number"
              value={value}
              onChange={(e) => {
                setValue(e.target.value);
                if (e.target.value !== "") {
                  markToolUsed();
                }
              }}
              className="w-full p-3 bg-white border border-gray-200 rounded-xl text-lg font-mono focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>

          <div className="flex justify-center">
            <button
              onClick={() => {
                setFromUnit(toUnit);
                setToUnit(fromUnit);
                markToolUsed();
              }}
              className="w-10 h-10 bg-primary-50 rounded-full flex items-center justify-center text-primary-600 hover:bg-primary-100 transition-colors"
              aria-label={l.swap}
            >
              ⇄
            </button>
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">{l.to}</label>
            <select
              value={toUnit}
              onChange={(e) => {
                setToUnit(e.target.value);
                markToolUsed();
              }}
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm mb-2"
            >
              {unitKeys.map((key) => (
                <option key={key} value={key}>
                  {unitName(key)} ({key})
                </option>
              ))}
            </select>
            <div className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl text-lg font-mono min-h-[50px]">
              {result || "—"}
            </div>
          </div>
        </div>
      </div>

      {result && (
        <div className="mt-4 text-center text-gray-500 text-sm">
          {value} {unitName(fromUnit)} = {result} {unitName(toUnit)}
        </div>
      )}
    </div>
  );
}
