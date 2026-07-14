"use client";

import { useState, useEffect, useCallback } from "react";
import { auth, googleProvider, db } from "@/lib/firebase";
import { getRecentStatsDateKeys } from "@/lib/track";
import { signInWithPopup, signOut, onAuthStateChanged, User } from "firebase/auth";
import { collection, query, orderBy, getDocs, deleteDoc, doc, limit, documentId, startAt, endAt } from "firebase/firestore";

const ADMIN_EMAIL = "drzaferhabip@gmail.com";

const TOOL_LABELS: Record<string, string> = {
  "pdf-merge": "PDF Birleştir",
  "pdf-split": "PDF Böl",
  "pdf-compress": "PDF Sıkıştır",
  "pdf-rotate": "PDF Döndür",
  "pdf-pages": "Sayfa Yöneticisi",
  "pdf-watermark": "PDF Filigran",
  "pdf-pagenumber": "Sayfa Numarası",
  "pdf-to-image": "PDF → Resim",
  "image-to-pdf": "Resim → PDF",
  "image-convert": "Resim Dönüştür",
  "image-compress": "Resim Sıkıştır",
  "heic-convert": "HEIC Dönüştür",
  "text-counter": "Kelime Sayacı",
  "json-formatter": "JSON Biçimlendirici",
  "qr-generator": "QR Kod",
  "password-generator": "Şifre Üretici",
  "base64": "Base64",
  "color-picker": "Renk Seçici",
  "lorem-ipsum": "Lorem Ipsum",
  "markdown-preview": "Markdown",
  "unit-converter": "Birim Çevirici",
  "image-resize": "Resim Boyutlandır",
  "uuid-generator": "UUID & Hash",
};

interface Feedback {
  id: string;
  type: string;
  message: string;
  page: string;
  locale: string;
  createdAt: { seconds: number } | null;
}

interface DailyStat {
  date: string;
  [toolId: string]: string | number;
}

const STATS_WINDOW_DAYS = 30;
const CHART_WINDOW_DAYS = 7;

function getDayTotal(row: DailyStat) {
  return Object.entries(row).reduce((sum, [key, value]) => {
    if (key !== "date" && key !== "_updatedAt" && typeof value === "number") {
      return sum + value;
    }
    return sum;
  }, 0);
}

export default function AdminPage() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"stats" | "feedback">("stats");
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
  const [dailyStats, setDailyStats] = useState<DailyStat[]>([]);
  const [fetching, setFetching] = useState(false);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      setUser(u);
      setLoading(false);
    });
    return unsub;
  }, []);

  const fetchFeedbacks = useCallback(async () => {
    const q = query(collection(db, "feedback"), orderBy("createdAt", "desc"), limit(100));
    const snap = await getDocs(q);
    setFeedbacks(snap.docs.map(d => ({ id: d.id, ...d.data() } as Feedback)));
  }, []);

  const fetchStats = useCallback(async () => {
    const dateKeys = getRecentStatsDateKeys(STATS_WINDOW_DAYS);
    const q = query(
      collection(db, "toolStats"),
      orderBy(documentId()),
      startAt(dateKeys[0]),
      endAt(dateKeys[dateKeys.length - 1])
    );
    const snap = await getDocs(q);
    const rowsByDate = new Map(
      snap.docs.map(d => [d.id, { date: d.id, ...d.data() } as DailyStat])
    );
    const rows: DailyStat[] = dateKeys.map((date) => rowsByDate.get(date) ?? { date });
    setDailyStats(rows);
  }, []);

  useEffect(() => {
    if (user?.email === ADMIN_EMAIL) {
      setFetching(true);
      Promise.all([fetchFeedbacks(), fetchStats()]).finally(() => setFetching(false));
    }
  }, [user, fetchFeedbacks, fetchStats]);

  const handleLogin = async () => {
    try { await signInWithPopup(auth, googleProvider); } catch {}
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Bu geri bildirimi silmek istediğine emin misin?")) return;
    await deleteDoc(doc(db, "feedback", id));
    setFeedbacks(prev => prev.filter(f => f.id !== id));
  };

  const formatDate = (ts: { seconds: number } | null) => {
    if (!ts) return "—";
    return new Date(ts.seconds * 1000).toLocaleString("tr-TR");
  };

  const typeBadge = (type: string) => {
    const styles: Record<string, string> = {
      bug: "bg-red-100 text-red-700",
      feature: "bg-blue-100 text-blue-700",
      general: "bg-gray-100 text-gray-700",
    };
    const labels: Record<string, string> = { bug: "Hata", feature: "Öneri", general: "Genel" };
    return (
      <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${styles[type] || styles.general}`}>
        {labels[type] || type}
      </span>
    );
  };

  // Araç başına toplam kullanım (son 30 takvim günü)
  const toolTotals = Object.entries(
    dailyStats.reduce((acc, row) => {
      Object.entries(row).forEach(([k, v]) => {
        if (k !== "date" && k !== "_updatedAt" && typeof v === "number") {
          acc[k] = (acc[k] || 0) + v;
        }
      });
      return acc;
    }, {} as Record<string, number>)
  ).sort((a, b) => b[1] - a[1]);

  const totalUses = toolTotals.reduce((s, [, v]) => s + v, 0);
  const maxUse = toolTotals[0]?.[1] || 1;
  const activeDays = dailyStats.filter((row) => getDayTotal(row) > 0).length;

  // Son 7 takvim günü günlük toplam
  const last7 = dailyStats.slice(-CHART_WINDOW_DAYS).map(row => ({
    date: row.date.slice(5), // MM-DD
    total: getDayTotal(row),
  }));
  const maxDay = Math.max(...last7.map(d => d.total), 1);
  const tableRows = [...dailyStats].reverse();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-4 border-primary-500 border-t-transparent rounded-full" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-sm w-full text-center">
          <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <h1 className="text-xl font-bold text-gray-900 mb-2">Admin Panel</h1>
          <p className="text-gray-500 text-sm mb-6">İstatistikleri ve geri bildirimleri görüntülemek için giriş yapın.</p>
          <button onClick={handleLogin} className="w-full flex items-center justify-center gap-3 bg-white border-2 border-gray-200 rounded-xl px-4 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:border-gray-300 transition-colors">
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            Google ile Giriş Yap
          </button>
        </div>
      </div>
    );
  }

  if (user.email !== ADMIN_EMAIL) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-sm w-full text-center">
          <h1 className="text-xl font-bold text-gray-900 mb-2">Erişim Engellendi</h1>
          <p className="text-gray-400 text-xs mb-6">{user.email}</p>
          <button onClick={() => signOut(auth)} className="btn-primary text-sm">Çıkış Yap</button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 py-8">

        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-gray-900">ToolsMani Admin</h1>
          <div className="flex items-center gap-4">
            {fetching && <span className="text-xs text-gray-400">Yükleniyor...</span>}
            <span className="text-sm text-gray-500">{user.email}</span>
            <button onClick={() => signOut(auth)} className="text-sm text-red-500 hover:text-red-600 font-medium">Çıkış</button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 bg-gray-100 rounded-xl p-1 mb-6 w-fit">
          {(["stats", "feedback"] as const).map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-5 py-2 rounded-lg text-sm font-medium transition-all ${activeTab === tab ? "bg-white text-gray-900 shadow-sm" : "text-gray-500 hover:text-gray-700"}`}
            >
              {tab === "stats" ? `📊 İstatistikler` : `💬 Geri Bildirimler (${feedbacks.length})`}
            </button>
          ))}
        </div>

        {/* STATS TAB */}
        {activeTab === "stats" && (
          <div className="space-y-6">

            {/* Özet kartlar */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
                <div className="text-3xl font-bold text-primary-600">{totalUses.toLocaleString("tr-TR")}</div>
                <div className="text-sm text-gray-500 mt-1">Toplam İşlem (Son 30 Gün)</div>
              </div>
              <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
                <div className="text-3xl font-bold text-green-600">{activeDays}</div>
                <div className="text-sm text-gray-500 mt-1">Aktif Gün (Son 30 Gün)</div>
              </div>
              <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
                <div className="text-3xl font-bold text-orange-500">{toolTotals.length}</div>
                <div className="text-sm text-gray-500 mt-1">Kullanılan Araç</div>
              </div>
              <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
                <div className="text-3xl font-bold text-purple-600">
                  {dailyStats.length > 0 ? Math.round(totalUses / dailyStats.length) : 0}
                </div>
                <div className="text-sm text-gray-500 mt-1">Ort. Günlük İşlem</div>
              </div>
            </div>

            {/* Son 7 gün bar chart */}
            {last7.length > 0 && (
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <h2 className="text-sm font-semibold text-gray-700 mb-4">Son 7 Takvim Günü — Günlük Toplam İşlem</h2>
                <div className="flex items-end gap-3 h-32">
                  {last7.map(({ date, total }) => (
                    <div key={date} className="flex-1 flex flex-col items-center gap-1">
                      <span className="text-xs text-gray-500 font-medium">{total}</span>
                      <div
                        className="w-full rounded-t-md bg-primary-500 transition-all"
                        style={{ height: `${(total / maxDay) * 96}px`, minHeight: total > 0 ? 4 : 0 }}
                      />
                      <span className="text-xs text-gray-400">{date}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Araç başına kullanım */}
            {toolTotals.length > 0 ? (
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <h2 className="text-sm font-semibold text-gray-700 mb-4">Araç Başına Kullanım (Son 30 Takvim Günü)</h2>
                <div className="space-y-3">
                  {toolTotals.map(([toolId, count]) => (
                    <div key={toolId} className="flex items-center gap-3">
                      <span className="text-sm text-gray-600 w-40 shrink-0">
                        {TOOL_LABELS[toolId] || toolId}
                      </span>
                      <div className="flex-1 bg-gray-100 rounded-full h-2.5">
                        <div
                          className="bg-primary-500 h-2.5 rounded-full transition-all"
                          style={{ width: `${(count / maxUse) * 100}%` }}
                        />
                      </div>
                      <span className="text-sm font-semibold text-gray-700 w-10 text-right">{count}</span>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-xl p-12 shadow-sm border border-gray-100 text-center">
                <p className="text-gray-400 text-sm">Henüz kullanım verisi yok.</p>
                <p className="text-gray-300 text-xs mt-1">Araçlar kullanıldıkça burada görünecek.</p>
              </div>
            )}

            {/* Son 30 gün günlük tablo */}
            {dailyStats.length > 0 && (
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 overflow-x-auto">
                <h2 className="text-sm font-semibold text-gray-700 mb-4">Son 30 Günlük Detay</h2>
                <table className="w-full text-xs">
                  <thead>
                    <tr className="text-gray-400 border-b border-gray-100">
                      <th className="text-left py-2 pr-4 font-medium">Tarih</th>
                      {toolTotals.slice(0, 6).map(([id]) => (
                        <th key={id} className="text-right py-2 px-2 font-medium">
                          {TOOL_LABELS[id]?.split(" ")[0] || id}
                        </th>
                      ))}
                      <th className="text-right py-2 pl-2 font-medium">Toplam</th>
                    </tr>
                  </thead>
                  <tbody>
                    {tableRows.map(row => {
                      const dayTotal = getDayTotal(row);
                      return (
                        <tr key={row.date} className="border-b border-gray-50 hover:bg-gray-50">
                          <td className="py-2 pr-4 text-gray-500">{row.date}</td>
                          {toolTotals.slice(0, 6).map(([id]) => (
                            <td key={id} className="text-right py-2 px-2 text-gray-600">
                              {(row[id] as number) || "—"}
                            </td>
                          ))}
                          <td className="text-right py-2 pl-2 font-semibold text-gray-800">{dayTotal}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* FEEDBACK TAB */}
        {activeTab === "feedback" && (
          <div className="space-y-4">
            <div className="grid grid-cols-3 gap-4 mb-6">
              {[
                { label: "Hata", count: feedbacks.filter(f => f.type === "bug").length, color: "red" },
                { label: "Öneri", count: feedbacks.filter(f => f.type === "feature").length, color: "blue" },
                { label: "Genel", count: feedbacks.filter(f => f.type === "general").length, color: "gray" },
              ].map(s => (
                <div key={s.label} className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                  <div className={`text-2xl font-bold text-${s.color}-600`}>{s.count}</div>
                  <div className="text-sm text-gray-500">{s.label}</div>
                </div>
              ))}
            </div>

            {feedbacks.length === 0 ? (
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-12 text-center">
                <p className="text-gray-400">Henüz geri bildirim yok.</p>
              </div>
            ) : (
              feedbacks.map(fb => (
                <div key={fb.id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 mb-2">
                        {typeBadge(fb.type)}
                        <span className="text-xs text-gray-400">{formatDate(fb.createdAt)}</span>
                        <span className="text-xs text-gray-300">{fb.page}</span>
                        <span className="text-xs text-gray-300 uppercase">{fb.locale}</span>
                      </div>
                      <p className="text-gray-700 text-sm whitespace-pre-wrap">{fb.message}</p>
                    </div>
                    <button onClick={() => handleDelete(fb.id)} className="text-gray-300 hover:text-red-500 transition-colors flex-shrink-0" title="Sil">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
}
