"use client";

import { useState } from "react";
import { useLanguage } from "@/lib/language-context";
import { db } from "@/lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { trackEvent } from "@/lib/track";

export function FeedbackWidget() {
  const [open, setOpen] = useState(false);
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const { locale } = useLanguage();

  const labels = {
    en: {
      button: "Feedback",
      title: "Send Feedback",
      subtitle: "Help us improve ToolsMani. Your feedback is anonymous.",
      placeholder: "What can we do better? Report a bug or suggest a feature...",
      send: "Send Feedback",
      sending: "Sending...",
      thanks: "Thank you for your feedback!",
      error: "Something went wrong. Please try again.",
      close: "Close",
    },
    tr: {
      button: "Geri Bildirim",
      title: "Geri Bildirim Gönder",
      subtitle: "ToolsMani'yi geliştirmemize yardımcı olun. Geri bildiriminiz anonimdir.",
      placeholder: "Neyi daha iyi yapabiliriz? Bir hata bildirin veya öneride bulunun...",
      send: "Gönder",
      sending: "Gönderiliyor...",
      thanks: "Geri bildiriminiz için teşekkürler!",
      error: "Bir hata oluştu. Lütfen tekrar deneyin.",
      close: "Kapat",
    },
  };

  const l = labels[locale];

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const message = data.get("message") as string;
    const type = data.get("type") as string;

    if (!message.trim()) return;

    setSending(true);
    try {
      await addDoc(collection(db, "feedback"), {
        type,
        message: message.trim(),
        page: window.location.pathname,
        locale,
        createdAt: serverTimestamp(),
      });
      trackEvent("feedback_submitted", { feedback_type: type });
      setSent(true);
      setTimeout(() => { setSent(false); setOpen(false); }, 3000);
    } catch {
      alert(l.error);
    } finally {
      setSending(false);
    }
  };

  return (
    <>
      {/* Floating button */}
      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 right-6 z-50 bg-gradient-to-r from-primary-600 to-primary-500 text-white px-4 py-2.5 rounded-full shadow-lg shadow-primary-200/50 hover:shadow-xl hover:shadow-primary-300/50 transition-all text-sm font-medium flex items-center gap-2"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
        {l.button}
      </button>

      {/* Modal */}
      {open && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" onClick={() => setOpen(false)} />
          <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md p-6 animate-fade-in-up">
            {sent ? (
              <div className="text-center py-8">
                <div className="text-4xl mb-3">&#10004;&#65039;</div>
                <p className="text-lg font-semibold text-gray-900">{l.thanks}</p>
              </div>
            ) : (
              <>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold text-gray-900">{l.title}</h3>
                  <button onClick={() => setOpen(false)} className="text-gray-400 hover:text-gray-600">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                <p className="text-sm text-gray-500 mb-4">{l.subtitle}</p>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="flex gap-2">
                    {[
                      { value: "bug", label: "&#128027; Bug", labelTr: "&#128027; Hata" },
                      { value: "feature", label: "&#128161; Feature", labelTr: "&#128161; Öneri" },
                      { value: "general", label: "&#128172; General", labelTr: "&#128172; Genel" },
                    ].map((t) => (
                      <label key={t.value} className="flex-1">
                        <input type="radio" name="type" value={t.value} defaultChecked={t.value === "general"} className="peer hidden" />
                        <div className="text-center text-xs py-2 rounded-lg border-2 border-gray-200 peer-checked:border-primary-500 peer-checked:bg-primary-50 peer-checked:text-primary-700 cursor-pointer transition-colors font-medium"
                          dangerouslySetInnerHTML={{ __html: locale === "tr" ? t.labelTr : t.label }} />
                      </label>
                    ))}
                  </div>

                  <textarea
                    name="message"
                    rows={4}
                    placeholder={l.placeholder}
                    required
                    className="w-full p-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
                  />

                  <button type="submit" disabled={sending} className="btn-primary w-full text-sm disabled:opacity-60">
                    {sending ? l.sending : l.send}
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}
