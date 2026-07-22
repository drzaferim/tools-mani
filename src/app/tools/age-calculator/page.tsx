"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useLanguage, pick } from "@/lib/language-context";
import { useTrackToolUseOnce } from "@/lib/track";

const labels = {
  en: {
    back: "← Back to Tools",
    title: "Age Calculator",
    subtitle:
      "Find your exact age in years, months and days — plus total days lived and time until your next birthday.",
    birth: "Date of birth",
    asOf: "Calculate as of",
    resultTitle: "Your age",
    years: "years",
    months: "months",
    days: "days",
    totals: "Totals",
    totalDays: "days",
    totalWeeks: "weeks",
    totalMonths: "months",
    totalHours: "hours",
    nextBirthday: "Next birthday",
    inDays: (d: number) => `in ${d} day${d === 1 ? "" : "s"}`,
    today: "Happy birthday! 🎉",
    invalid: "Birth date must be before the target date.",
  },
  tr: {
    back: "← Araçlara Dön",
    title: "Yaş Hesaplama",
    subtitle:
      "Yaşınızı yıl, ay ve gün olarak tam hesaplayın — ayrıca toplam yaşanan gün ve bir sonraki doğum gününüze kalan süre.",
    birth: "Doğum tarihi",
    asOf: "Hangi tarihe göre",
    resultTitle: "Yaşınız",
    years: "yıl",
    months: "ay",
    days: "gün",
    totals: "Toplamlar",
    totalDays: "gün",
    totalWeeks: "hafta",
    totalMonths: "ay",
    totalHours: "saat",
    nextBirthday: "Sonraki doğum günü",
    inDays: (d: number) => `${d} gün sonra`,
    today: "Doğum gününüz kutlu olsun! 🎉",
    invalid: "Doğum tarihi, hedef tarihten önce olmalı.",
  },
};

function diffYmd(from: Date, to: Date) {
  let years = to.getFullYear() - from.getFullYear();
  let months = to.getMonth() - from.getMonth();
  let days = to.getDate() - from.getDate();
  if (days < 0) {
    months -= 1;
    // önceki ayın gün sayısı kadar ekle
    days += new Date(to.getFullYear(), to.getMonth(), 0).getDate();
  }
  if (months < 0) {
    years -= 1;
    months += 12;
  }
  return { years, months, days };
}

export default function AgeCalculatorPage() {
  const { locale, localePath } = useLanguage();
  const l = pick(labels, locale);
  const markToolUsed = useTrackToolUseOnce("age-calculator");

  const todayStr = new Date().toISOString().slice(0, 10);
  const [birth, setBirth] = useState("");
  const [asOf, setAsOf] = useState(todayStr);

  const result = useMemo(() => {
    if (!birth) return null;
    const b = new Date(birth + "T00:00:00");
    const t = new Date((asOf || todayStr) + "T00:00:00");
    if (isNaN(b.getTime()) || isNaN(t.getTime())) return null;
    if (b > t) return { invalid: true } as const;

    const { years, months, days } = diffYmd(b, t);
    const ms = t.getTime() - b.getTime();
    const totalDays = Math.floor(ms / 86400000);

    // sonraki doğum günü
    let next = new Date(t.getFullYear(), b.getMonth(), b.getDate());
    if (next <= t) next = new Date(t.getFullYear() + 1, b.getMonth(), b.getDate());
    const nextIn = Math.round((next.getTime() - t.getTime()) / 86400000);
    const isBirthday = t.getMonth() === b.getMonth() && t.getDate() === b.getDate();

    return {
      invalid: false as const,
      years,
      months,
      days,
      totalDays,
      totalWeeks: Math.floor(totalDays / 7),
      totalMonths: years * 12 + months,
      totalHours: totalDays * 24,
      nextIn,
      isBirthday,
    };
  }, [birth, asOf, todayStr]);

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-6">
        <Link href={localePath("/")} className="text-primary-600 hover:text-primary-700 text-sm">
          {l.back}
        </Link>
      </div>

      <h1 className="text-3xl font-bold text-gray-900 mb-2">{l.title}</h1>
      <p className="text-gray-600 mb-8">{l.subtitle}</p>

      <div className="flex flex-wrap gap-6 mb-8">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">{l.birth}</label>
          <input
            type="date"
            value={birth}
            max={todayStr}
            onChange={(e) => {
              setBirth(e.target.value);
              if (e.target.value) markToolUsed();
            }}
            className="p-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">{l.asOf}</label>
          <input
            type="date"
            value={asOf}
            onChange={(e) => setAsOf(e.target.value)}
            className="p-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
          />
        </div>
      </div>

      {result && result.invalid && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl">{l.invalid}</div>
      )}

      {result && !result.invalid && (
        <div className="space-y-6">
          <div className="bg-primary-50 rounded-2xl p-8 text-center">
            <p className="text-sm font-medium text-gray-500 mb-3">{l.resultTitle}</p>
            <div className="flex items-end justify-center gap-6 flex-wrap">
              {[
                [result.years, l.years],
                [result.months, l.months],
                [result.days, l.days],
              ].map(([val, unit]) => (
                <div key={String(unit)}>
                  <span className="text-5xl font-bold text-primary-600">{val}</span>
                  <span className="text-gray-500 ml-1.5">{unit}</span>
                </div>
              ))}
            </div>
            {result.isBirthday && <p className="mt-4 text-lg font-medium text-primary-700">{l.today}</p>}
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              [result.totalDays, l.totalDays],
              [result.totalWeeks, l.totalWeeks],
              [result.totalMonths, l.totalMonths],
              [result.totalHours, l.totalHours],
            ].map(([val, unit]) => (
              <div key={String(unit)} className="bg-white border border-gray-100 rounded-xl p-4 text-center shadow-sm">
                <p className="text-xl font-bold text-gray-900">{Number(val).toLocaleString(locale)}</p>
                <p className="text-xs text-gray-500">{unit}</p>
              </div>
            ))}
          </div>

          <div className="bg-white border border-gray-100 rounded-xl p-4 text-center shadow-sm">
            <p className="text-sm text-gray-500">{l.nextBirthday}</p>
            <p className="text-lg font-semibold text-gray-900">
              {result.isBirthday ? l.today : l.inDays(result.nextIn)}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
