"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { useTrackToolUseOnce } from "@/lib/track";

type UnitCategory = "length" | "weight" | "temperature" | "volume" | "speed" | "data";

interface UnitDef {
  name: string;
  toBase: (v: number) => number;
  fromBase: (v: number) => number;
}

const units: Record<UnitCategory, Record<string, UnitDef>> = {
  length: {
    mm: { name: "Millimeters", toBase: (v) => v / 1000, fromBase: (v) => v * 1000 },
    cm: { name: "Centimeters", toBase: (v) => v / 100, fromBase: (v) => v * 100 },
    m: { name: "Meters", toBase: (v) => v, fromBase: (v) => v },
    km: { name: "Kilometers", toBase: (v) => v * 1000, fromBase: (v) => v / 1000 },
    in: { name: "Inches", toBase: (v) => v * 0.0254, fromBase: (v) => v / 0.0254 },
    ft: { name: "Feet", toBase: (v) => v * 0.3048, fromBase: (v) => v / 0.3048 },
    mi: { name: "Miles", toBase: (v) => v * 1609.344, fromBase: (v) => v / 1609.344 },
  },
  weight: {
    mg: { name: "Milligrams", toBase: (v) => v / 1000000, fromBase: (v) => v * 1000000 },
    g: { name: "Grams", toBase: (v) => v / 1000, fromBase: (v) => v * 1000 },
    kg: { name: "Kilograms", toBase: (v) => v, fromBase: (v) => v },
    lb: { name: "Pounds", toBase: (v) => v * 0.453592, fromBase: (v) => v / 0.453592 },
    oz: { name: "Ounces", toBase: (v) => v * 0.0283495, fromBase: (v) => v / 0.0283495 },
    t: { name: "Metric Tons", toBase: (v) => v * 1000, fromBase: (v) => v / 1000 },
  },
  temperature: {
    c: { name: "Celsius", toBase: (v) => v, fromBase: (v) => v },
    f: { name: "Fahrenheit", toBase: (v) => (v - 32) * 5 / 9, fromBase: (v) => v * 9 / 5 + 32 },
    k: { name: "Kelvin", toBase: (v) => v - 273.15, fromBase: (v) => v + 273.15 },
  },
  volume: {
    ml: { name: "Milliliters", toBase: (v) => v / 1000, fromBase: (v) => v * 1000 },
    l: { name: "Liters", toBase: (v) => v, fromBase: (v) => v },
    gal: { name: "Gallons (US)", toBase: (v) => v * 3.78541, fromBase: (v) => v / 3.78541 },
    qt: { name: "Quarts (US)", toBase: (v) => v * 0.946353, fromBase: (v) => v / 0.946353 },
    cup: { name: "Cups (US)", toBase: (v) => v * 0.236588, fromBase: (v) => v / 0.236588 },
  },
  speed: {
    mps: { name: "Meters/sec", toBase: (v) => v, fromBase: (v) => v },
    kmh: { name: "km/h", toBase: (v) => v / 3.6, fromBase: (v) => v * 3.6 },
    mph: { name: "Miles/h", toBase: (v) => v * 0.44704, fromBase: (v) => v / 0.44704 },
    kn: { name: "Knots", toBase: (v) => v * 0.514444, fromBase: (v) => v / 0.514444 },
  },
  data: {
    b: { name: "Bytes", toBase: (v) => v, fromBase: (v) => v },
    kb: { name: "Kilobytes", toBase: (v) => v * 1024, fromBase: (v) => v / 1024 },
    mb: { name: "Megabytes", toBase: (v) => v * 1048576, fromBase: (v) => v / 1048576 },
    gb: { name: "Gigabytes", toBase: (v) => v * 1073741824, fromBase: (v) => v / 1073741824 },
    tb: { name: "Terabytes", toBase: (v) => v * 1099511627776, fromBase: (v) => v / 1099511627776 },
  },
};

const categoryNames: Record<UnitCategory, string> = {
  length: "Length",
  weight: "Weight",
  temperature: "Temperature",
  volume: "Volume",
  speed: "Speed",
  data: "Data",
};

export default function UnitConverterPage() {
  const [category, setCategory] = useState<UnitCategory>("length");
  const [fromUnit, setFromUnit] = useState("m");
  const [toUnit, setToUnit] = useState("km");
  const [value, setValue] = useState("1");
  const markToolUsed = useTrackToolUseOnce("unit-converter");

  const unitKeys = Object.keys(units[category]);

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
        <Link href="/" className="text-primary-600 hover:text-primary-700 text-sm">
          &larr; Back to Tools
        </Link>
      </div>

      <h1 className="text-3xl font-bold text-gray-900 mb-2">Unit Converter</h1>
      <p className="text-gray-600 mb-8">
        Convert between units of length, weight, temperature, volume, speed, and data.
      </p>

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
            {categoryNames[cat]}
          </button>
        ))}
      </div>

      <div className="bg-white rounded-2xl border border-gray-200 p-6">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-end">
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">From</label>
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
                  {units[category][key].name} ({key})
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
              aria-label="Swap units"
            >
              ⇄
            </button>
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">To</label>
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
                  {units[category][key].name} ({key})
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
          {value} {units[category][fromUnit].name} = {result} {units[category][toUnit].name}
        </div>
      )}
    </div>
  );
}
