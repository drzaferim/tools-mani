"use client";

import Link from "next/link";
import { useLanguage, pick } from "@/lib/language-context";

const content = {
  en: {
    title: "About ToolsMani",
    intro:
      "ToolsMani is a collection of free online tools for everyday file and text tasks: merging and splitting PDFs, compressing images, generating QR codes, formatting JSON and more. No sign-up, no limits, no cost.",
    privacyTitle: "Privacy comes first",
    privacyText:
      "Every tool on ToolsMani runs entirely in your browser. When you merge a PDF or compress an image, the file is processed on your own device — it is never uploaded to a server. We simply cannot see your files, and that is by design.",
    freeTitle: "Free means free",
    freeText:
      "All tools are free with no usage limits and no locked features. We keep costs near zero by serving a static site and doing all computation client-side, so we don't need to charge you to cover infrastructure.",
    ethicsTitle: "Ethical by principle",
    ethicsText:
      "ToolsMani is run as an ethical project: no dark patterns, no selling of user data, no misleading buttons and no paywalls that appear after you've done the work. If we ever show ads, they will be clearly marked and never disguised as tool functions.",
    ctaTitle: "Try the tools",
    ctaText: "Browse all tools and start using them instantly — no account needed.",
    ctaButton: "Browse All Tools",
  },
  tr: {
    title: "ToolsMani Hakkında",
    intro:
      "ToolsMani; PDF birleştirme ve bölme, resim sıkıştırma, QR kod oluşturma, JSON biçimlendirme gibi günlük dosya ve metin işleri için ücretsiz online araçlar sunar. Kayıt yok, limit yok, ücret yok.",
    privacyTitle: "Önce gizlilik",
    privacyText:
      "ToolsMani'deki her araç tamamen tarayıcınızda çalışır. Bir PDF birleştirdiğinizde veya resim sıkıştırdığınızda dosya kendi cihazınızda işlenir — hiçbir sunucuya yüklenmez. Dosyalarınızı görmemiz teknik olarak mümkün değildir; sistem bilinçli olarak böyle tasarlandı.",
    freeTitle: "Ücretsiz gerçekten ücretsiz",
    freeText:
      "Tüm araçlar limitsiz ve kilitli özellik olmadan ücretsizdir. Statik bir site sunup tüm hesaplamayı istemci tarafında yaptığımız için maliyetimiz sıfıra yakındır; bu yüzden sizden ücret almamız gerekmez.",
    ethicsTitle: "İlkeli ve etik",
    ethicsText:
      "ToolsMani etik bir proje olarak yürütülür: karanlık desen yok, kullanıcı verisi satışı yok, yanıltıcı düğme yok, iş bittikten sonra karşınıza çıkan ödeme duvarı yok. Bir gün reklam gösterirsek açıkça işaretlenecek ve asla araç işlevi gibi gizlenmeyecektir.",
    ctaTitle: "Araçları deneyin",
    ctaText: "Tüm araçlara göz atın ve hesap açmadan hemen kullanmaya başlayın.",
    ctaButton: "Tüm Araçlar",
  },
  es: {
    title: "Sobre ToolsMani",
    intro:
      "ToolsMani es una colección de herramientas online gratuitas para tareas cotidianas con archivos y texto: unir y dividir PDF, comprimir imágenes, generar códigos QR, formatear JSON y más. Sin registro, sin límites y sin coste.",
    privacyTitle: "La privacidad es lo primero",
    privacyText:
      "Todas las herramientas de ToolsMani se ejecutan por completo en tu navegador. Cuando unes un PDF o comprimes una imagen, el archivo se procesa en tu propio dispositivo: nunca se sube a un servidor. Sencillamente no podemos ver tus archivos, y así está diseñado a propósito.",
    freeTitle: "Gratis significa gratis",
    freeText:
      "Todas las herramientas son gratuitas, sin límites de uso ni funciones bloqueadas. Mantenemos los costes casi a cero sirviendo un sitio estático y haciendo todo el cálculo en el lado del cliente, así que no necesitamos cobrarte para cubrir la infraestructura.",
    ethicsTitle: "Ético por principio",
    ethicsText:
      "ToolsMani se gestiona como un proyecto ético: sin patrones oscuros, sin venta de datos de usuarios, sin botones engañosos y sin muros de pago que aparecen cuando ya has hecho el trabajo. Si algún día mostramos anuncios, estarán claramente marcados y nunca disfrazados de funciones de la herramienta.",
    ctaTitle: "Prueba las herramientas",
    ctaText: "Explora todas las herramientas y empieza a usarlas al instante, sin necesidad de cuenta.",
    ctaButton: "Ver todas las herramientas",
  },
  de: {
    title: "Über ToolsMani",
    intro:
      "ToolsMani ist eine Sammlung kostenloser Online-Tools für alltägliche Datei- und Textaufgaben: PDFs zusammenführen und teilen, Bilder komprimieren, QR-Codes erzeugen, JSON formatieren und mehr. Ohne Anmeldung, ohne Limits, ohne Kosten.",
    privacyTitle: "Datenschutz zuerst",
    privacyText:
      "Jedes Tool auf ToolsMani läuft vollständig in Ihrem Browser. Wenn Sie ein PDF zusammenführen oder ein Bild komprimieren, wird die Datei auf Ihrem eigenen Gerät verarbeitet – sie wird nie auf einen Server hochgeladen. Wir können Ihre Dateien schlicht nicht sehen, und das ist so gewollt.",
    freeTitle: "Kostenlos heißt kostenlos",
    freeText:
      "Alle Tools sind kostenlos, ohne Nutzungsgrenzen und ohne gesperrte Funktionen. Wir halten die Kosten nahe null, indem wir eine statische Website ausliefern und sämtliche Berechnungen clientseitig ausführen – deshalb müssen wir Ihnen nichts berechnen, um die Infrastruktur zu decken.",
    ethicsTitle: "Ethisch aus Prinzip",
    ethicsText:
      "ToolsMani wird als ethisches Projekt betrieben: keine Dark Patterns, kein Verkauf von Nutzerdaten, keine irreführenden Schaltflächen und keine Bezahlschranken, die erst auftauchen, wenn die Arbeit getan ist. Sollten wir je Werbung zeigen, wird sie klar gekennzeichnet und niemals als Tool-Funktion getarnt.",
    ctaTitle: "Tools ausprobieren",
    ctaText: "Sehen Sie sich alle Tools an und nutzen Sie sie sofort – ganz ohne Konto.",
    ctaButton: "Alle Tools ansehen",
  },
  pt: {
    title: "Sobre o ToolsMani",
    intro:
      "O ToolsMani é uma coleção de ferramentas online gratuitas para tarefas diárias com arquivos e texto: juntar e dividir PDFs, comprimir imagens, gerar QR codes, formatar JSON e muito mais. Sem cadastro, sem limites e sem custo.",
    privacyTitle: "Privacidade em primeiro lugar",
    privacyText:
      "Todas as ferramentas do ToolsMani rodam inteiramente no seu navegador. Quando você junta um PDF ou comprime uma imagem, o arquivo é processado no seu próprio dispositivo — ele nunca é enviado para um servidor. Simplesmente não conseguimos ver seus arquivos, e isso é intencional.",
    freeTitle: "Gratuito é gratuito mesmo",
    freeText:
      "Todas as ferramentas são gratuitas, sem limites de uso e sem recursos bloqueados. Mantemos o custo perto de zero servindo um site estático e fazendo todo o processamento no lado do cliente, então não precisamos cobrar de você para pagar a infraestrutura.",
    ethicsTitle: "Ético por princípio",
    ethicsText:
      "O ToolsMani é conduzido como um projeto ético: sem padrões enganosos, sem venda de dados de usuários, sem botões que induzem ao erro e sem paywalls que aparecem depois que você já fez o trabalho. Se um dia exibirmos anúncios, eles serão claramente identificados e nunca disfarçados de funções da ferramenta.",
    ctaTitle: "Experimente as ferramentas",
    ctaText: "Explore todas as ferramentas e comece a usar na hora — sem precisar de conta.",
    ctaButton: "Ver todas as ferramentas",
  },
  fr: {
    title: "À propos de ToolsMani",
    intro:
      "ToolsMani est un ensemble d'outils en ligne gratuits pour vos tâches quotidiennes sur les fichiers et le texte : fusionner et diviser des PDF, compresser des images, générer des QR codes, formater du JSON et bien plus. Sans inscription, sans limites, sans frais.",
    privacyTitle: "La confidentialité d'abord",
    privacyText:
      "Chaque outil de ToolsMani s'exécute entièrement dans votre navigateur. Quand vous fusionnez un PDF ou compressez une image, le fichier est traité sur votre propre appareil — il n'est jamais envoyé à un serveur. Nous ne pouvons tout simplement pas voir vos fichiers, et c'est voulu.",
    freeTitle: "Gratuit veut dire gratuit",
    freeText:
      "Tous les outils sont gratuits, sans limite d'utilisation ni fonctionnalité verrouillée. Nous maintenons des coûts proches de zéro en servant un site statique et en effectuant tous les calculs côté client : nous n'avons donc pas besoin de vous facturer pour couvrir l'infrastructure.",
    ethicsTitle: "Éthique par principe",
    ethicsText:
      "ToolsMani est mené comme un projet éthique : pas de dark patterns, pas de revente de données, pas de boutons trompeurs et pas de paywall qui apparaît une fois le travail fait. Si nous affichons un jour de la publicité, elle sera clairement identifiée et jamais déguisée en fonction de l'outil.",
    ctaTitle: "Essayez les outils",
    ctaText: "Parcourez tous les outils et utilisez-les immédiatement — aucun compte requis.",
    ctaButton: "Voir tous les outils",
  },
};

export default function AboutPage() {
  const { locale, localePath } = useLanguage();
  const c = pick(content, locale);

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">{c.title}</h1>
      <p className="text-lg text-gray-600 leading-relaxed mb-10">{c.intro}</p>

      <div className="space-y-8">
        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">{c.privacyTitle}</h2>
          <p className="text-gray-600 leading-relaxed">{c.privacyText}</p>
        </section>
        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">{c.freeTitle}</h2>
          <p className="text-gray-600 leading-relaxed">{c.freeText}</p>
        </section>
        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">{c.ethicsTitle}</h2>
          <p className="text-gray-600 leading-relaxed">{c.ethicsText}</p>
        </section>
      </div>

      <div className="mt-12 bg-primary-50 rounded-2xl p-8 text-center">
        <h2 className="text-xl font-semibold text-gray-900 mb-2">{c.ctaTitle}</h2>
        <p className="text-gray-600 mb-6">{c.ctaText}</p>
        <Link href={`${localePath("/")}#tools`} className="btn-primary inline-block">
          {c.ctaButton}
        </Link>
      </div>
    </div>
  );
}
