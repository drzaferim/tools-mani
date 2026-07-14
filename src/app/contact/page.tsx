"use client";

import { useState } from "react";
import { useLanguage } from "@/lib/language-context";
import { db } from "@/lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { trackEvent } from "@/lib/track";

const content = {
  en: {
    title: "Contact Us",
    intro:
      "Found a bug? Have an idea for a new tool? Want to say hi? Use the form below — every message lands directly in front of us and we read all of them.",
    anonNote:
      "The form is anonymous by default. If you'd like a reply, include your email address in the message.",
    typeLabel: "Topic",
    types: { bug: "Bug report", feature: "Tool suggestion", other: "Other" },
    placeholder: "Write your message here...",
    send: "Send Message",
    sending: "Sending...",
    thanks: "Thank you! Your message has been received.",
    error: "Something went wrong. Please try again.",
  },
  tr: {
    title: "İletişim",
    intro:
      "Bir hata mı buldunuz? Yeni bir araç fikriniz mi var? Merhaba mı demek istiyorsunuz? Aşağıdaki formu kullanın — her mesaj doğrudan önümüze düşer ve hepsini okuruz.",
    anonNote:
      "Form varsayılan olarak anonimdir. Yanıt almak isterseniz mesajınıza e-posta adresinizi ekleyin.",
    typeLabel: "Konu",
    types: { bug: "Hata bildirimi", feature: "Araç önerisi", other: "Diğer" },
    placeholder: "Mesajınızı buraya yazın...",
    send: "Mesaj Gönder",
    sending: "Gönderiliyor...",
    thanks: "Teşekkürler! Mesajınız alındı.",
    error: "Bir hata oluştu. Lütfen tekrar deneyin.",
  },
};

export default function ContactPage() {
  const { locale } = useLanguage();
  const c = content[locale];
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const message = data.get("message") as string;
    const type = data.get("type") as string;
    if (!message.trim()) return;

    setSending(true);
    try {
      await addDoc(collection(db, "feedback"), {
        type,
        message: message.trim(),
        page: "/contact",
        locale,
        createdAt: serverTimestamp(),
      });
      trackEvent("feedback_submitted", { feedback_type: type, source: "contact_page" });
      setSent(true);
    } catch {
      alert(c.error);
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">{c.title}</h1>
      <p className="text-lg text-gray-600 leading-relaxed mb-3">{c.intro}</p>
      <p className="text-sm text-gray-400 mb-10">{c.anonNote}</p>

      {sent ? (
        <div className="bg-accent-50 border border-accent-200 text-accent-800 rounded-2xl p-8 text-center text-lg font-medium">
          {c.thanks}
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-5 bg-white border border-gray-100 rounded-2xl p-6 sm:p-8 shadow-sm">
          <div>
            <label htmlFor="type" className="block text-sm font-medium text-gray-700 mb-1.5">
              {c.typeLabel}
            </label>
            <select
              id="type"
              name="type"
              className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <option value="bug">{c.types.bug}</option>
              <option value="feature">{c.types.feature}</option>
              <option value="other">{c.types.other}</option>
            </select>
          </div>
          <div>
            <textarea
              name="message"
              rows={6}
              required
              placeholder={c.placeholder}
              className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 resize-y"
            />
          </div>
          <button type="submit" disabled={sending} className="btn-primary w-full disabled:opacity-60">
            {sending ? c.sending : c.send}
          </button>
        </form>
      )}
    </div>
  );
}
