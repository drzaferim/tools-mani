"use client";

import { useState, useCallback } from "react";
import { useLanguage, pick } from "@/lib/language-context";
import Link from "next/link";
import { trackToolUse } from "@/lib/track";

const labels = {
  en: {
    back: "← Back to Tools",
    title: "Password Generator",
    subtitle: "Generate strong, secure passwords using cryptographic randomness.",
    placeholder: "Click Generate to create a password",
    copy: "Copy",
    copied: "Copied!",
    strength: "Strength",
    weak: "Weak",
    fair: "Fair",
    strong: "Strong",
    veryStrong: "Very Strong",
    settings: "Settings",
    length: "Length",
    uppercase: "Uppercase (A-Z)",
    lowercase: "Lowercase (a-z)",
    numbers: "Numbers (0-9)",
    symbols: "Symbols (!@#$...)",
    generate: "Generate Password",
    selectOne: "Please select at least one character type",
    faqTitle: "Frequently Asked Questions",
    faq: [
      {
        q: "Are the generated passwords secure?",
        a: "Yes. Passwords are generated using the Web Crypto API (crypto.getRandomValues), which is cryptographically secure.",
      },
      {
        q: "Are my passwords sent to a server?",
        a: "No. Password generation happens entirely in your browser. Nothing is transmitted over the internet.",
      },
      {
        q: "What character types can I include?",
        a: "You can include uppercase letters, lowercase letters, numbers, and special symbols. Each type can be toggled on or off.",
      },
      {
        q: "What is the maximum password length?",
        a: "You can generate passwords between 4 and 64 characters long.",
      },
    ],
  },
  tr: {
    back: "← Araçlara Dön",
    title: "Şifre Üretici",
    subtitle: "Kriptografik rastgelelik kullanarak güçlü ve güvenli şifreler üretin.",
    placeholder: "Şifre oluşturmak için Üret'e tıklayın",
    copy: "Kopyala",
    copied: "Kopyalandı!",
    strength: "Güç",
    weak: "Zayıf",
    fair: "Orta",
    strong: "Güçlü",
    veryStrong: "Çok Güçlü",
    settings: "Ayarlar",
    length: "Uzunluk",
    uppercase: "Büyük harf (A-Z)",
    lowercase: "Küçük harf (a-z)",
    numbers: "Rakam (0-9)",
    symbols: "Sembol (!@#$...)",
    generate: "Şifre Üret",
    selectOne: "Lütfen en az bir karakter türü seçin",
    faqTitle: "Sık Sorulan Sorular",
    faq: [
      {
        q: "Oluşturulan şifreler güvenli mi?",
        a: "Evet. Şifreler, kriptografik olarak güvenli olan Web Crypto API (crypto.getRandomValues) kullanılarak oluşturulur.",
      },
      {
        q: "Şifrelerim sunucuya gönderiliyor mu?",
        a: "Hayır. Şifre oluşturma tamamen tarayıcınızda gerçekleşir. İnternet üzerinden hiçbir şey iletilmez.",
      },
      {
        q: "Hangi karakter türlerini dahil edebilirim?",
        a: "Büyük harfler, küçük harfler, rakamlar ve özel semboller ekleyebilirsiniz. Her tür açılıp kapatılabilir.",
      },
      {
        q: "Maksimum şifre uzunluğu nedir?",
        a: "4 ile 64 karakter arasında şifre oluşturabilirsiniz.",
      },
    ],
  },
  es: {
    back: "← Volver a las herramientas",
    title: "Generador de contraseñas",
    subtitle: "Genera contraseñas fuertes y seguras con aleatoriedad criptográfica.",
    placeholder: "Haz clic en Generar para crear una contraseña",
    copy: "Copiar",
    copied: "¡Copiado!",
    strength: "Seguridad",
    weak: "Débil",
    fair: "Aceptable",
    strong: "Fuerte",
    veryStrong: "Muy fuerte",
    settings: "Ajustes",
    length: "Longitud",
    uppercase: "Mayúsculas (A-Z)",
    lowercase: "Minúsculas (a-z)",
    numbers: "Números (0-9)",
    symbols: "Símbolos (!@#$...)",
    generate: "Generar contraseña",
    selectOne: "Selecciona al menos un tipo de carácter",
    faqTitle: "Preguntas frecuentes",
    faq: [
      {
        q: "¿Son seguras las contraseñas generadas?",
        a: "Sí. Las contraseñas se generan con la Web Crypto API (crypto.getRandomValues), que es criptográficamente segura.",
      },
      {
        q: "¿Se envían mis contraseñas a un servidor?",
        a: "No. La generación ocurre por completo en tu navegador. No se transmite nada por internet.",
      },
      {
        q: "¿Qué tipos de caracteres puedo incluir?",
        a: "Puedes incluir mayúsculas, minúsculas, números y símbolos especiales. Cada tipo se puede activar o desactivar.",
      },
      {
        q: "¿Cuál es la longitud máxima de la contraseña?",
        a: "Puedes generar contraseñas de entre 4 y 64 caracteres.",
      },
    ],
  },
  de: {
    back: "← Zurück zu den Tools",
    title: "Passwort-Generator",
    subtitle: "Erzeugen Sie starke, sichere Passwörter mit kryptografischer Zufälligkeit.",
    placeholder: "Auf Erzeugen klicken, um ein Passwort zu erstellen",
    copy: "Kopieren",
    copied: "Kopiert!",
    strength: "Stärke",
    weak: "Schwach",
    fair: "Mittel",
    strong: "Stark",
    veryStrong: "Sehr stark",
    settings: "Einstellungen",
    length: "Länge",
    uppercase: "Großbuchstaben (A-Z)",
    lowercase: "Kleinbuchstaben (a-z)",
    numbers: "Zahlen (0-9)",
    symbols: "Sonderzeichen (!@#$...)",
    generate: "Passwort erzeugen",
    selectOne: "Bitte mindestens einen Zeichentyp auswählen",
    faqTitle: "Häufig gestellte Fragen",
    faq: [
      {
        q: "Sind die erzeugten Passwörter sicher?",
        a: "Ja. Die Passwörter werden mit der Web Crypto API (crypto.getRandomValues) erzeugt, die kryptografisch sicher ist.",
      },
      {
        q: "Werden meine Passwörter an einen Server gesendet?",
        a: "Nein. Die Erzeugung findet vollständig in Ihrem Browser statt. Es wird nichts über das Internet übertragen.",
      },
      {
        q: "Welche Zeichentypen kann ich einbeziehen?",
        a: "Groß- und Kleinbuchstaben, Zahlen und Sonderzeichen. Jeder Typ lässt sich einzeln ein- und ausschalten.",
      },
      {
        q: "Wie lang darf das Passwort maximal sein?",
        a: "Sie können Passwörter mit 4 bis 64 Zeichen erzeugen.",
      },
    ],
  },
  pt: {
    back: "← Voltar às ferramentas",
    title: "Gerador de senhas",
    subtitle: "Gere senhas fortes e seguras com aleatoriedade criptográfica.",
    placeholder: "Clique em Gerar para criar uma senha",
    copy: "Copiar",
    copied: "Copiado!",
    strength: "Força",
    weak: "Fraca",
    fair: "Razoável",
    strong: "Forte",
    veryStrong: "Muito forte",
    settings: "Configurações",
    length: "Comprimento",
    uppercase: "Maiúsculas (A-Z)",
    lowercase: "Minúsculas (a-z)",
    numbers: "Números (0-9)",
    symbols: "Símbolos (!@#$...)",
    generate: "Gerar senha",
    selectOne: "Selecione pelo menos um tipo de caractere",
    faqTitle: "Perguntas frequentes",
    faq: [
      {
        q: "As senhas geradas são seguras?",
        a: "Sim. As senhas são geradas com a Web Crypto API (crypto.getRandomValues), que é criptograficamente segura.",
      },
      {
        q: "Minhas senhas são enviadas para um servidor?",
        a: "Não. A geração acontece inteiramente no seu navegador. Nada é transmitido pela internet.",
      },
      {
        q: "Que tipos de caracteres posso incluir?",
        a: "Você pode incluir letras maiúsculas, minúsculas, números e símbolos especiais. Cada tipo pode ser ativado ou desativado.",
      },
      {
        q: "Qual é o comprimento máximo da senha?",
        a: "Você pode gerar senhas de 4 a 64 caracteres.",
      },
    ],
  },
  fr: {
    back: "← Retour aux outils",
    title: "Générateur de mots de passe",
    subtitle: "Générez des mots de passe forts et sûrs grâce à un aléa cryptographique.",
    placeholder: "Cliquez sur Générer pour créer un mot de passe",
    copy: "Copier",
    copied: "Copié !",
    strength: "Robustesse",
    weak: "Faible",
    fair: "Moyen",
    strong: "Fort",
    veryStrong: "Très fort",
    settings: "Paramètres",
    length: "Longueur",
    uppercase: "Majuscules (A-Z)",
    lowercase: "Minuscules (a-z)",
    numbers: "Chiffres (0-9)",
    symbols: "Symboles (!@#$...)",
    generate: "Générer un mot de passe",
    selectOne: "Veuillez sélectionner au moins un type de caractère",
    faqTitle: "Questions fréquentes",
    faq: [
      {
        q: "Les mots de passe générés sont-ils sûrs ?",
        a: "Oui. Ils sont générés avec la Web Crypto API (crypto.getRandomValues), qui est cryptographiquement sûre.",
      },
      {
        q: "Mes mots de passe sont-ils envoyés à un serveur ?",
        a: "Non. La génération a lieu entièrement dans votre navigateur. Rien n'est transmis sur Internet.",
      },
      {
        q: "Quels types de caractères puis-je inclure ?",
        a: "Majuscules, minuscules, chiffres et symboles spéciaux. Chaque type peut être activé ou désactivé.",
      },
      {
        q: "Quelle est la longueur maximale du mot de passe ?",
        a: "Vous pouvez générer des mots de passe de 4 à 64 caractères.",
      },
    ],
  },
};

export default function PasswordGeneratorPage() {
  const { locale, localePath } = useLanguage();
  const l = pick(labels, locale);
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
      setPassword(l.selectOne);
      return;
    }

    const array = new Uint32Array(length);
    crypto.getRandomValues(array);
    const result = Array.from(array, (x) => chars[x % chars.length]).join("");
    setPassword(result);
    setCopied(false);
    void trackToolUse("password-generator");
  }, [length, includeUppercase, includeLowercase, includeNumbers, includeSymbols, l]);

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

    if (score <= 2) return { label: l.weak, color: "bg-red-500", width: "w-1/4" };
    if (score <= 3) return { label: l.fair, color: "bg-yellow-500", width: "w-2/4" };
    if (score <= 4) return { label: l.strong, color: "bg-blue-500", width: "w-3/4" };
    return { label: l.veryStrong, color: "bg-green-500", width: "w-full" };
  };

  const strength = getStrength();

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-6">
        <Link
          href={localePath("/")}
          className="text-primary-600 hover:text-primary-700 text-sm"
        >
          {l.back}
        </Link>
      </div>

      <h1 className="text-3xl font-bold text-gray-900 mb-2">{l.title}</h1>
      <p className="text-gray-600 mb-8">{l.subtitle}</p>

      {/* Generated Password */}
      <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm mb-6">
        <div className="flex items-center gap-3">
          <input
            type="text"
            value={password}
            readOnly
            placeholder={l.placeholder}
            className="flex-1 font-mono text-lg p-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none"
          />
          <button
            onClick={copyPassword}
            className="btn-secondary text-sm whitespace-nowrap"
          >
            {copied ? l.copied : l.copy}
          </button>
        </div>

        {password && (
          <div className="mt-4">
            <div className="flex justify-between text-sm mb-1">
              <span className="text-gray-500">{l.strength}</span>
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
        <h3 className="font-semibold text-gray-900 mb-4">{l.settings}</h3>

        <div className="mb-6">
          <div className="flex justify-between mb-2">
            <label className="text-sm text-gray-700">{l.length}</label>
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
            { label: l.uppercase, checked: includeUppercase, setter: setIncludeUppercase },
            { label: l.lowercase, checked: includeLowercase, setter: setIncludeLowercase },
            { label: l.numbers, checked: includeNumbers, setter: setIncludeNumbers },
            { label: l.symbols, checked: includeSymbols, setter: setIncludeSymbols },
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
        {l.generate}
      </button>

      {/* FAQ */}
      <div className="mt-16 border-t border-gray-100 pt-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">{l.faqTitle}</h2>
        <div className="space-y-5">
          {l.faq.map(({ q, a }, i) => (
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
