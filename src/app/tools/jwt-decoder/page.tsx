"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useLanguage, pick, localeTag } from "@/lib/language-context";
import { useTrackToolUseOnce } from "@/lib/track";

const labels = {
  en: {
    back: "← Back to Tools",
    title: "JWT Decoder",
    subtitle:
      "Paste a JSON Web Token to inspect its header and payload. Decoding happens locally — the token never leaves your browser.",
    note: "This tool decodes but does not verify the signature. Never treat a decoded token as trusted.",
    placeholder: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIn0.signature",
    header: "Header",
    payload: "Payload",
    signature: "Signature (raw)",
    invalid: "This does not look like a valid JWT (expected 3 dot-separated base64url parts).",
    expired: "expired",
    valid: "valid",
    expiresAt: "Expires",
    issuedAt: "Issued",
    notBefore: "Not before",
  },
  tr: {
    back: "← Araçlara Dön",
    title: "JWT Çözücü",
    subtitle:
      "Bir JSON Web Token yapıştırın; başlık ve içerik bölümlerini inceleyin. Çözme yerel yapılır — token tarayıcınızdan çıkmaz.",
    note: "Bu araç imzayı doğrulamaz, yalnızca çözer. Çözülmüş bir token'a asla güvenilir gözüyle bakmayın.",
    placeholder: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIn0.imza",
    header: "Başlık (Header)",
    payload: "İçerik (Payload)",
    signature: "İmza (ham)",
    invalid: "Bu geçerli bir JWT'ye benzemiyor (nokta ile ayrılmış 3 base64url parçası bekleniyor).",
    expired: "süresi dolmuş",
    valid: "geçerli",
    expiresAt: "Son geçerlilik",
    issuedAt: "Oluşturulma",
    notBefore: "Başlangıç",
  },
  es: {
    back: "← Volver a las herramientas",
    title: "Decodificador de JWT",
    subtitle:
      "Pega un JSON Web Token para inspeccionar su cabecera y su carga útil. La decodificación es local: el token nunca sale de tu navegador.",
    note: "Esta herramienta decodifica pero no verifica la firma. Nunca consideres fiable un token solo por haberlo decodificado.",
    placeholder: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIn0.firma",
    header: "Cabecera (header)",
    payload: "Carga útil (payload)",
    signature: "Firma (en bruto)",
    invalid: "Esto no parece un JWT válido (se esperaban 3 partes base64url separadas por puntos).",
    expired: "caducado",
    valid: "válido",
    expiresAt: "Caduca",
    issuedAt: "Emitido",
    notBefore: "No antes de",
  },
  de: {
    back: "← Zurück zu den Tools",
    title: "JWT-Decoder",
    subtitle:
      "Fügen Sie ein JSON Web Token ein, um Header und Payload zu untersuchen. Die Dekodierung erfolgt lokal – das Token verlässt Ihren Browser nicht.",
    note: "Dieses Tool dekodiert, prüft aber die Signatur nicht. Betrachten Sie ein dekodiertes Token niemals als vertrauenswürdig.",
    placeholder: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIn0.signatur",
    header: "Header",
    payload: "Payload",
    signature: "Signatur (roh)",
    invalid: "Das sieht nicht nach einem gültigen JWT aus (erwartet werden 3 durch Punkte getrennte base64url-Teile).",
    expired: "abgelaufen",
    valid: "gültig",
    expiresAt: "Läuft ab",
    issuedAt: "Ausgestellt",
    notBefore: "Nicht vor",
  },
  pt: {
    back: "← Voltar às ferramentas",
    title: "Decodificador de JWT",
    subtitle:
      "Cole um JSON Web Token para inspecionar o cabeçalho e o payload. A decodificação é local — o token nunca sai do seu navegador.",
    note: "Esta ferramenta decodifica, mas não verifica a assinatura. Nunca trate um token decodificado como confiável.",
    placeholder: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIn0.assinatura",
    header: "Cabeçalho (header)",
    payload: "Payload",
    signature: "Assinatura (bruta)",
    invalid: "Isto não parece um JWT válido (esperavam-se 3 partes base64url separadas por pontos).",
    expired: "expirado",
    valid: "válido",
    expiresAt: "Expira em",
    issuedAt: "Emitido em",
    notBefore: "Não antes de",
  },
  fr: {
    back: "← Retour aux outils",
    title: "Décodeur JWT",
    subtitle:
      "Collez un JSON Web Token pour inspecter son en-tête et sa charge utile. Le décodage est local — le token ne quitte jamais votre navigateur.",
    note: "Cet outil décode mais ne vérifie pas la signature. Ne considérez jamais un token décodé comme fiable.",
    placeholder: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIn0.signature",
    header: "En-tête (header)",
    payload: "Charge utile (payload)",
    signature: "Signature (brute)",
    invalid: "Cela ne ressemble pas à un JWT valide (3 parties base64url séparées par des points sont attendues).",
    expired: "expiré",
    valid: "valide",
    expiresAt: "Expire le",
    issuedAt: "Émis le",
    notBefore: "Pas avant le",
  },
};

function b64urlDecode(s: string): string {
  const pad = s.length % 4 === 2 ? "==" : s.length % 4 === 3 ? "=" : "";
  const b64 = s.replace(/-/g, "+").replace(/_/g, "/") + pad;
  const bin = atob(b64);
  const bytes = Uint8Array.from(bin, (c) => c.charCodeAt(0));
  return new TextDecoder().decode(bytes);
}

export default function JwtDecoderPage() {
  const { locale, localePath } = useLanguage();
  const l = pick(labels, locale);
  const markToolUsed = useTrackToolUseOnce("jwt-decoder");

  const [token, setToken] = useState("");

  const decoded = useMemo(() => {
    const t = token.trim();
    if (!t) return null;
    const parts = t.split(".");
    if (parts.length !== 3) return { invalid: true } as const;
    try {
      const header = JSON.parse(b64urlDecode(parts[0]));
      const payload = JSON.parse(b64urlDecode(parts[1]));
      return { invalid: false as const, header, payload, signature: parts[2] };
    } catch {
      return { invalid: true } as const;
    }
  }, [token]);

  const fmtDate = (sec: number) =>
    new Date(sec * 1000).toLocaleString(localeTag(locale), {
      dateStyle: "medium",
      timeStyle: "medium",
    });

  const claims: [string, string][] = [];
  if (decoded && !decoded.invalid) {
    const p = decoded.payload as Record<string, unknown>;
    if (typeof p.exp === "number") {
      const isExpired = p.exp * 1000 < Date.now();
      claims.push([l.expiresAt, `${fmtDate(p.exp)} (${isExpired ? l.expired : l.valid})`]);
    }
    if (typeof p.iat === "number") claims.push([l.issuedAt, fmtDate(p.iat)]);
    if (typeof p.nbf === "number") claims.push([l.notBefore, fmtDate(p.nbf)]);
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-6">
        <Link href={localePath("/")} className="text-primary-600 hover:text-primary-700 text-sm">
          {l.back}
        </Link>
      </div>

      <h1 className="text-3xl font-bold text-gray-900 mb-2">{l.title}</h1>
      <p className="text-gray-600 mb-2">{l.subtitle}</p>
      <p className="text-xs text-amber-600 mb-8">⚠ {l.note}</p>

      <textarea
        value={token}
        onChange={(e) => {
          setToken(e.target.value);
          if (e.target.value.trim()) markToolUsed();
        }}
        placeholder={l.placeholder}
        spellCheck={false}
        className="w-full h-32 p-4 bg-white border border-gray-200 rounded-xl font-mono text-xs resize-y focus:outline-none focus:ring-2 focus:ring-primary-500 mb-6 break-all"
      />

      {decoded && decoded.invalid && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl">{l.invalid}</div>
      )}

      {decoded && !decoded.invalid && (
        <div className="space-y-6">
          {claims.length > 0 && (
            <div className="space-y-2">
              {claims.map(([k, v]) => (
                <div key={k} className="flex flex-wrap justify-between gap-2 bg-white border border-gray-100 rounded-xl px-4 py-2.5 shadow-sm text-sm">
                  <span className="text-gray-500">{k}</span>
                  <span className="font-medium text-gray-900">{v}</span>
                </div>
              ))}
            </div>
          )}
          <div>
            <h2 className="font-semibold text-gray-900 mb-2">{l.header}</h2>
            <pre className="bg-gray-900 text-green-300 rounded-xl p-4 text-xs overflow-x-auto">
              {JSON.stringify(decoded.header, null, 2)}
            </pre>
          </div>
          <div>
            <h2 className="font-semibold text-gray-900 mb-2">{l.payload}</h2>
            <pre className="bg-gray-900 text-blue-300 rounded-xl p-4 text-xs overflow-x-auto">
              {JSON.stringify(decoded.payload, null, 2)}
            </pre>
          </div>
          <div>
            <h2 className="font-semibold text-gray-900 mb-2">{l.signature}</h2>
            <pre className="bg-gray-50 border border-gray-200 text-gray-500 rounded-xl p-4 text-xs overflow-x-auto break-all whitespace-pre-wrap">
              {decoded.signature}
            </pre>
          </div>
        </div>
      )}
    </div>
  );
}
