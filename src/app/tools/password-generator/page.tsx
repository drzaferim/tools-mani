"use client";

import { useState, useCallback } from "react";
import { useLanguage } from "@/lib/language-context";
import Link from "next/link";
import { trackToolUse } from "@/lib/track";

export default function PasswordGeneratorPage() {
  const { locale } = useLanguage();
  const [password, setPassword] = useState("");
  const [length, setLength] = useState(16);
  const [includeUppercase, setIncludeUppercase] = useState(true);
  const [includeLowercase, setIncludeLowercase] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(true);
  const [copied, setCopied] = useState(false);

  const generatePassword = useCallback(() => {
    let chars = "";
    if (includeLowercase) chars += "abcdefghijklmnopqrstuvwxyz";
    if (includeUppercase) chars += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (includeNumbers) chars += "0123456789";
    if (includeSymbols) chars += "!@#$%^&*()_+-=[]{}|;:,.<>?";

    if (chars === "") {
      setPassword("Please select at least one character type");
      return;
    }

    const array = new Uint32Array(length);
    crypto.getRandomValues(array);
    const result = Array.from(array, (x) => chars[x % chars.length]).join("");
    setPassword(result);
    setCopied(false);
    void trackToolUse("password-generator");
  }, [length, includeUppercase, includeLowercase, includeNumbers, includeSymbols]);

  const copyPassword = () => {
    if (password) {
      navigator.clipboard.writeText(password);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const getStrength = () => {
    let score = 0;
    if (includeLowercase) score++;
    if (includeUppercase) score++;
    if (includeNumbers) score++;
    if (includeSymbols) score++;
    if (length >= 12) score++;
    if (length >= 20) score++;

    if (score <= 2) return { label: "Weak", color: "bg-red-500", width: "w-1/4" };
    if (score <= 3) return { label: "Fair", color: "bg-yellow-500", width: "w-2/4" };
    if (score <= 4) return { label: "Strong", color: "bg-blue-500", width: "w-3/4" };
    return { label: "Very Strong", color: "bg-green-500", width: "w-full" };
  };

  const strength = getStrength();

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-6">
        <Link
          href="/"
          className="text-primary-600 hover:text-primary-700 text-sm"
        >
          &larr; Back to Tools
        </Link>
      </div>

      <h1 className="text-3xl font-bold text-gray-900 mb-2">
        Password Generator
      </h1>
      <p className="text-gray-600 mb-8">
        Generate strong, secure passwords using cryptographic randomness.
      </p>

      {/* Generated Password */}
      <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm mb-6">
        <div className="flex items-center gap-3">
          <input
            type="text"
            value={password}
            readOnly
            placeholder="Click Generate to create a password"
            className="flex-1 font-mono text-lg p-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none"
          />
          <button
            onClick={copyPassword}
            className="btn-secondary text-sm whitespace-nowrap"
          >
            {copied ? "Copied!" : "Copy"}
          </button>
        </div>

        {password && (
          <div className="mt-4">
            <div className="flex justify-between text-sm mb-1">
              <span className="text-gray-500">Strength</span>
              <span className="font-medium">{strength.label}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className={`h-2 rounded-full transition-all ${strength.color} ${strength.width}`}
              />
            </div>
          </div>
        )}
      </div>

      {/* Settings */}
      <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm mb-6">
        <h3 className="font-semibold text-gray-900 mb-4">Settings</h3>

        <div className="mb-6">
          <div className="flex justify-between mb-2">
            <label className="text-sm text-gray-700">Length</label>
            <span className="text-sm font-medium text-primary-600">
              {length}
            </span>
          </div>
          <input
            type="range"
            min={4}
            max={64}
            value={length}
            onChange={(e) => setLength(Number(e.target.value))}
            className="w-full"
          />
        </div>

        <div className="space-y-3">
          {[
            { label: "Uppercase (A-Z)", checked: includeUppercase, setter: setIncludeUppercase },
            { label: "Lowercase (a-z)", checked: includeLowercase, setter: setIncludeLowercase },
            { label: "Numbers (0-9)", checked: includeNumbers, setter: setIncludeNumbers },
            { label: "Symbols (!@#$...)", checked: includeSymbols, setter: setIncludeSymbols },
          ].map((opt) => (
            <label key={opt.label} className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={opt.checked}
                onChange={(e) => opt.setter(e.target.checked)}
                className="w-4 h-4 text-primary-600 rounded"
              />
              <span className="text-gray-700">{opt.label}</span>
            </label>
          ))}
        </div>
      </div>

      <button onClick={generatePassword} className="btn-primary w-full text-lg">
        Generate Password
      </button>

      {/* FAQ */}
      <div className="mt-16 border-t border-gray-100 pt-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          {locale === "tr" ? "Sık Sorulan Sorular" : "Frequently Asked Questions"}
        </h2>
        <div className="space-y-5">
          {[
            { q: locale === "tr" ? "Oluşturulan şifreler güvenli mi?" : "Are the generated passwords secure?", a: locale === "tr" ? "Evet. Şifreler, kriptografik olarak güvenli olan Web Crypto API (crypto.getRandomValues) kullanılarak oluşturulur." : "Yes. Passwords are generated using the Web Crypto API (crypto.getRandomValues), which is cryptographically secure." },
            { q: locale === "tr" ? "Şifrelerim sunucuya gönderiliyor mu?" : "Are my passwords sent to a server?", a: locale === "tr" ? "Hayır. Şifre oluşturma tamamen tarayıcınızda gerçekleşir. İnternet üzerinden hiçbir şey iletilmez." : "No. Password generation happens entirely in your browser. Nothing is transmitted over the internet." },
            { q: locale === "tr" ? "Hangi karakter türlerini dahil edebilirim?" : "What character types can I include?", a: locale === "tr" ? "Büyük harfler, küçük harfler, sayılar ve özel semboller ekleyebilirsiniz. Her tür açılıp kapatılabilir." : "You can include uppercase letters, lowercase letters, numbers, and special symbols. Each type can be toggled on or off." },
            { q: locale === "tr" ? "Maksimum şifre uzunluğu nedir?" : "What is the maximum password length?", a: locale === "tr" ? "128 karaktere kadar şifre oluşturabilirsiniz." : "You can generate passwords up to 128 characters long." },
          ].map(({ q, a }, i) => (
            <div key={i} className="bg-gray-50 rounded-xl p-5">
              <h3 className="font-semibold text-gray-900 mb-2">{q}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{a}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
