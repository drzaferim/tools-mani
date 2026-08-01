"use client";

import { useLanguage, pick } from "@/lib/language-context";

const content = {
  en: {
    title: "Privacy Policy",
    updated: "Last updated: August 1, 2026",
    sections: [
      {
        h: "The short version",
        p: [
          "Your files never leave your device. Every tool on ToolsMani (PDF merge, image compression, converters and the rest) runs entirely inside your browser using JavaScript. Nothing you open in a tool is uploaded to, stored on, or visible to our servers.",
          "We collect only minimal, mostly anonymous usage data to understand which tools are useful and to keep the site working well. We never sell data to anyone.",
        ],
      },
      {
        h: "What we do NOT collect",
        p: [
          "We do not collect or store your files or their contents. We do not require an account, so we hold no names, passwords or profiles. We do not collect payment information — the site is free.",
        ],
      },
      {
        h: "What we do collect",
        p: [
          "Analytics: we use Google Analytics 4 to measure page visits and tool usage (for example, that the PDF merge tool was used, never what was in the PDF). Google Analytics sets cookies and may process your IP address and device information according to Google's own privacy policy.",
          "Anonymous product measurement: we record funnel steps such as opening a tool, selecting an input, starting or completing processing, errors, and download or copy actions. Events may include coarse file-size, batch-size, duration, and reduction buckets, plus the tool, language, mode, and a generic error code. We never record file names, exact sizes, file contents, entered text, or an account identifier. Successful uses also increment an aggregate daily counter in our database.",
          "Feedback: if you use the feedback or contact form, we store the message you write, the page it was sent from and your language preference. The form is anonymous unless you choose to include contact details in your message.",
        ],
      },
      {
        h: "Cookies",
        p: [
          "We use cookies only for Google Analytics measurement and a single localStorage key that remembers your language choice. You can block cookies in your browser settings; the tools will keep working normally.",
        ],
      },
      {
        h: "Third-party services",
        p: [
          "Google Analytics (usage measurement) and Firebase Hosting and Firestore by Google (site hosting and storage of anonymous counters and feedback). Each processes data under its own privacy policy. Site text uses your device's local system fonts. No tool sends your content to any third-party service — all processing, including QR code generation, happens locally in your browser.",
        ],
      },
      {
        h: "Data retention & your rights",
        p: [
          "Analytics data is retained according to Google Analytics defaults. Feedback messages are kept until they have been read and acted upon, then may be deleted. Since we hold no account data about you, there is usually nothing personal for us to delete — but if you believe we hold something related to you (for example a feedback message with your email), contact us via the contact page and we will remove it.",
        ],
      },
      {
        h: "Changes to this policy",
        p: [
          "If we change how the site handles data (for example, if we ever introduce advertising), we will update this page and the date at the top before the change takes effect.",
        ],
      },
    ],
  },
  tr: {
    title: "Gizlilik Politikası",
    updated: "Son güncelleme: 1 Ağustos 2026",
    sections: [
      {
        h: "Kısa özet",
        p: [
          "Dosyalarınız cihazınızdan asla çıkmaz. ToolsMani'deki her araç (PDF birleştirme, resim sıkıştırma, dönüştürücüler ve diğerleri) tamamen tarayıcınızın içinde JavaScript ile çalışır. Bir araçta açtığınız hiçbir şey sunucularımıza yüklenmez, saklanmaz ve bizim tarafımızdan görülemez.",
          "Yalnızca hangi araçların işe yaradığını anlamak ve siteyi düzgün çalıştırmak için asgari düzeyde, çoğunlukla anonim kullanım verisi toplarız. Verilerinizi hiç kimseye satmayız.",
        ],
      },
      {
        h: "Toplamadıklarımız",
        p: [
          "Dosyalarınızı veya içeriklerini toplamayız ve saklamayız. Hesap gerektirmediğimiz için isim, şifre veya profil tutmayız. Site ücretsiz olduğu için ödeme bilgisi toplamayız.",
        ],
      },
      {
        h: "Topladıklarımız",
        p: [
          "Analitik: sayfa ziyaretlerini ve araç kullanımını ölçmek için Google Analytics 4 kullanırız (örneğin PDF birleştirme aracının kullanıldığını görürüz; PDF'in içinde ne olduğunu asla göremeyiz). Google Analytics çerez kullanır ve IP adresinizi ve cihaz bilgilerinizi Google'ın kendi gizlilik politikasına göre işleyebilir.",
          "Anonim ürün ölçümü: bir aracı açma, girdi seçme, işlemi başlatma veya tamamlama, hata ve indirme ya da kopyalama gibi huni adımlarını kaydederiz. Olaylar araç, dil, kip ve genel hata kodunun yanında yalnızca yaklaşık dosya boyutu, toplu dosya sayısı, süre ve küçülme aralıklarını içerebilir. Dosya adı, kesin boyut, dosya içeriği, girilen metin veya hesap kimliği kaydetmeyiz. Başarılı işlemler ayrıca veritabanımızdaki toplu günlük sayacı artırır.",
          "Geri bildirim: geri bildirim veya iletişim formunu kullanırsanız yazdığınız mesajı, gönderildiği sayfayı ve dil tercihinizi saklarız. Mesajınıza iletişim bilgisi eklemediğiniz sürece form anonimdir.",
        ],
      },
      {
        h: "Çerezler",
        p: [
          "Çerezleri yalnızca Google Analytics ölçümü için kullanırız; ayrıca dil seçiminizi hatırlayan tek bir localStorage kaydı vardır. Tarayıcı ayarlarınızdan çerezleri engelleyebilirsiniz; araçlar normal çalışmaya devam eder.",
        ],
      },
      {
        h: "Üçüncü taraf servisler",
        p: [
          "Google Analytics (kullanım ölçümü) ile Google Firebase Hosting ve Firestore (site barındırma, anonim sayaçların ve geri bildirimlerin saklanması). Her biri veriyi kendi gizlilik politikasına göre işler. Site yazıları cihazınızdaki yerel sistem fontlarını kullanır. Hiçbir araç içeriğinizi üçüncü taraf bir servise göndermez — QR kod üretimi dahil tüm işlemler tarayıcınızda yerel olarak yapılır.",
        ],
      },
      {
        h: "Veri saklama ve haklarınız",
        p: [
          "Analitik veriler Google Analytics varsayılanlarına göre saklanır. Geri bildirim mesajları okunup gereği yapılana kadar tutulur, sonrasında silinebilir. Hakkınızda hesap verisi tutmadığımız için genellikle silinecek kişisel bir şey yoktur — ancak sizinle ilişkili bir veri tuttuğumuzu düşünüyorsanız (örneğin e-postanızı içeren bir geri bildirim mesajı) iletişim sayfasından bize ulaşın, kaldıralım.",
        ],
      },
      {
        h: "Bu politikadaki değişiklikler",
        p: [
          "Sitenin veri işleme biçimi değişirse (örneğin ileride reklam eklersek), değişiklik yürürlüğe girmeden önce bu sayfayı ve üstteki tarihi güncelleriz.",
        ],
      },
    ],
  },

  es: {
    title: "Política de privacidad",
    updated: "Última actualización: 1 de agosto de 2026",
    sections: [
      {
        h: "La versión corta",
        p: [
          "Tus archivos nunca salen de tu dispositivo. Todas las herramientas de ToolsMani (unir PDF, comprimir imágenes, conversores y el resto) se ejecutan por completo dentro de tu navegador mediante JavaScript. Nada de lo que abras en una herramienta se sube a nuestros servidores, ni se almacena en ellos, ni es visible para nosotros.",
          "Solo recopilamos datos de uso mínimos y en su mayoría anónimos, para entender qué herramientas resultan útiles y mantener el sitio funcionando bien. Nunca vendemos datos a nadie.",
        ],
      },
      {
        h: "Lo que NO recopilamos",
        p: [
          "No recopilamos ni almacenamos tus archivos ni su contenido. No exigimos una cuenta, así que no guardamos nombres, contraseñas ni perfiles. No recopilamos datos de pago: el sitio es gratuito.",
        ],
      },
      {
        h: "Lo que sí recopilamos",
        p: [
          "Analítica: usamos Google Analytics 4 para medir las visitas de página y el uso de las herramientas (por ejemplo, que se usó la herramienta de unir PDF, nunca qué contenía el PDF). Google Analytics instala cookies y puede tratar tu dirección IP e información del dispositivo conforme a la propia política de privacidad de Google.",
          "Medición anónima del producto: registramos pasos del embudo como abrir una herramienta, seleccionar una entrada, iniciar o completar el proceso, errores y acciones de descarga o copia. Los eventos pueden incluir intervalos aproximados de tamaño, cantidad de archivos, duración y reducción, además de la herramienta, el idioma, el modo y un código de error genérico. Nunca registramos nombres de archivo, tamaños exactos, contenido, texto introducido ni identificadores de cuenta. Los usos correctos también incrementan un contador diario agregado.",
          "Comentarios: si usas el formulario de contacto o de comentarios, guardamos el mensaje que escribes, la página desde la que se envió y tu preferencia de idioma. El formulario es anónimo salvo que decidas incluir datos de contacto en el mensaje.",
        ],
      },
      {
        h: "Cookies",
        p: [
          "Usamos cookies únicamente para la medición de Google Analytics y una sola clave de localStorage que recuerda tu elección de idioma. Puedes bloquear las cookies en la configuración de tu navegador; las herramientas seguirán funcionando con normalidad.",
        ],
      },
      {
        h: "Servicios de terceros",
        p: [
          "Google Analytics (medición de uso) y Firebase Hosting y Firestore de Google (alojamiento del sitio y almacenamiento de contadores anónimos y comentarios). Cada uno trata los datos conforme a su propia política de privacidad. El sitio usa las fuentes del sistema instaladas en tu dispositivo. Ninguna herramienta envía tu contenido a un servicio externo: todo el procesamiento, incluida la generación de códigos QR, ocurre localmente en tu navegador.",
        ],
      },
      {
        h: "Conservación de datos y tus derechos",
        p: [
          "Los datos analíticos se conservan según los valores predeterminados de Google Analytics. Los mensajes de comentarios se guardan hasta haberlos leído y atendido, y después pueden eliminarse. Como no guardamos datos de cuenta sobre ti, normalmente no hay nada personal que borrar; pero si crees que conservamos algo relacionado contigo (por ejemplo, un mensaje con tu correo), escríbenos desde la página de contacto y lo eliminaremos.",
        ],
      },
      {
        h: "Cambios en esta política",
        p: [
          "Si cambiamos la forma en que el sitio trata los datos (por ejemplo, si algún día introducimos publicidad), actualizaremos esta página y la fecha superior antes de que el cambio entre en vigor.",
        ],
      },
    ],
  },
  de: {
    title: "Datenschutzerklärung",
    updated: "Zuletzt aktualisiert: 1. August 2026",
    sections: [
      {
        h: "Die Kurzfassung",
        p: [
          "Ihre Dateien verlassen Ihr Gerät nie. Jedes Tool auf ToolsMani (PDF zusammenführen, Bildkomprimierung, Konverter und alle übrigen) läuft vollständig in Ihrem Browser mit JavaScript. Nichts, was Sie in einem Tool öffnen, wird auf unsere Server hochgeladen, dort gespeichert oder ist für uns sichtbar.",
          "Wir erheben nur minimale, überwiegend anonyme Nutzungsdaten, um zu verstehen, welche Tools nützlich sind, und die Website funktionsfähig zu halten. Wir verkaufen niemals Daten an Dritte.",
        ],
      },
      {
        h: "Was wir NICHT erheben",
        p: [
          "Wir erheben und speichern weder Ihre Dateien noch deren Inhalte. Ein Konto ist nicht erforderlich, daher liegen uns keine Namen, Passwörter oder Profile vor. Zahlungsdaten erheben wir nicht – die Website ist kostenlos.",
        ],
      },
      {
        h: "Was wir erheben",
        p: [
          "Analyse: Wir verwenden Google Analytics 4, um Seitenaufrufe und die Tool-Nutzung zu messen (zum Beispiel, dass das PDF-Zusammenführen genutzt wurde – niemals, was im PDF stand). Google Analytics setzt Cookies und verarbeitet ggf. Ihre IP-Adresse und Geräteinformationen gemäß der eigenen Datenschutzerklärung von Google.",
          "Anonyme Produktmessung: Wir erfassen Funnel-Schritte wie das Öffnen eines Tools, die Auswahl einer Eingabe, Start oder Abschluss der Verarbeitung, Fehler sowie Download- oder Kopieraktionen. Ereignisse können grobe Größen-, Mengen-, Dauer- und Reduktionsbereiche sowie Tool, Sprache, Modus und einen allgemeinen Fehlercode enthalten. Dateinamen, exakte Größen, Inhalte, eingegebenen Text oder Konto-IDs erfassen wir nie. Erfolgreiche Nutzungen erhöhen zusätzlich einen aggregierten Tageszähler.",
          "Feedback: Wenn Sie das Feedback- oder Kontaktformular nutzen, speichern wir die von Ihnen verfasste Nachricht, die Seite, von der sie gesendet wurde, und Ihre Spracheinstellung. Das Formular ist anonym, sofern Sie nicht selbst Kontaktdaten in die Nachricht schreiben.",
        ],
      },
      {
        h: "Cookies",
        p: [
          "Wir verwenden Cookies ausschließlich für die Messung mit Google Analytics sowie einen einzigen localStorage-Eintrag, der Ihre Sprachwahl speichert. Sie können Cookies in Ihren Browsereinstellungen blockieren; die Tools funktionieren weiterhin normal.",
        ],
      },
      {
        h: "Dienste von Drittanbietern",
        p: [
          "Google Analytics (Nutzungsmessung) sowie Firebase Hosting und Firestore von Google (Hosting der Website und Speicherung anonymer Zähler und Feedback). Jeder Dienst verarbeitet Daten nach seiner eigenen Datenschutzerklärung. Die Website verwendet lokale Systemschriften Ihres Geräts. Kein Tool sendet Ihre Inhalte an einen Drittanbieter – die gesamte Verarbeitung, einschließlich der QR-Code-Erzeugung, erfolgt lokal in Ihrem Browser.",
        ],
      },
      {
        h: "Speicherdauer und Ihre Rechte",
        p: [
          "Analysedaten werden gemäß den Standardeinstellungen von Google Analytics aufbewahrt. Feedback-Nachrichten werden aufbewahrt, bis sie gelesen und bearbeitet wurden, und können danach gelöscht werden. Da wir keine Kontodaten über Sie führen, gibt es in der Regel nichts Personenbezogenes zu löschen – falls Sie jedoch glauben, dass uns etwas zu Ihrer Person vorliegt (etwa eine Feedback-Nachricht mit Ihrer E-Mail-Adresse), kontaktieren Sie uns über die Kontaktseite, und wir entfernen es.",
        ],
      },
      {
        h: "Änderungen dieser Erklärung",
        p: [
          "Wenn wir ändern, wie die Website mit Daten umgeht (zum Beispiel, falls wir je Werbung einführen), aktualisieren wir diese Seite und das Datum oben, bevor die Änderung wirksam wird.",
        ],
      },
    ],
  },
  pt: {
    title: "Política de privacidade",
    updated: "Última atualização: 1 de agosto de 2026",
    sections: [
      {
        h: "A versão curta",
        p: [
          "Seus arquivos nunca saem do seu dispositivo. Todas as ferramentas do ToolsMani (juntar PDF, comprimir imagens, conversores e as demais) rodam inteiramente dentro do seu navegador usando JavaScript. Nada do que você abre em uma ferramenta é enviado para os nossos servidores, armazenado neles ou visível para nós.",
          "Coletamos apenas dados de uso mínimos e majoritariamente anônimos, para entender quais ferramentas são úteis e manter o site funcionando bem. Nunca vendemos dados a ninguém.",
        ],
      },
      {
        h: "O que NÃO coletamos",
        p: [
          "Não coletamos nem armazenamos seus arquivos ou o conteúdo deles. Não exigimos conta, portanto não guardamos nomes, senhas ou perfis. Não coletamos dados de pagamento — o site é gratuito.",
        ],
      },
      {
        h: "O que coletamos",
        p: [
          "Análise: usamos o Google Analytics 4 para medir visitas às páginas e uso das ferramentas (por exemplo, que a ferramenta de juntar PDF foi usada, nunca o que havia no PDF). O Google Analytics define cookies e pode tratar seu endereço IP e informações do dispositivo conforme a política de privacidade do próprio Google.",
          "Medição anônima do produto: registramos etapas do funil, como abrir uma ferramenta, selecionar uma entrada, iniciar ou concluir o processamento, erros e ações de download ou cópia. Os eventos podem incluir faixas aproximadas de tamanho, quantidade de arquivos, duração e redução, além da ferramenta, idioma, modo e um código de erro genérico. Nunca registramos nomes de arquivo, tamanhos exatos, conteúdo, texto digitado ou identificador de conta. Usos concluídos também incrementam um contador diário agregado.",
          "Feedback: se você usar o formulário de contato ou de feedback, guardamos a mensagem escrita, a página de onde ela foi enviada e sua preferência de idioma. O formulário é anônimo, a menos que você opte por incluir dados de contato na mensagem.",
        ],
      },
      {
        h: "Cookies",
        p: [
          "Usamos cookies apenas para a medição do Google Analytics e uma única chave de localStorage que lembra sua escolha de idioma. Você pode bloquear cookies nas configurações do navegador; as ferramentas continuarão funcionando normalmente.",
        ],
      },
      {
        h: "Serviços de terceiros",
        p: [
          "Google Analytics (medição de uso) e Firebase Hosting e Firestore, do Google (hospedagem do site e armazenamento de contadores anônimos e feedback). Cada um trata os dados sob sua própria política de privacidade. O site usa as fontes locais do sistema do seu dispositivo. Nenhuma ferramenta envia seu conteúdo para serviços de terceiros — todo o processamento, inclusive a geração de QR codes, acontece localmente no seu navegador.",
        ],
      },
      {
        h: "Retenção de dados e seus direitos",
        p: [
          "Os dados analíticos são retidos conforme os padrões do Google Analytics. As mensagens de feedback são mantidas até serem lidas e tratadas, podendo então ser excluídas. Como não guardamos dados de conta sobre você, normalmente não há nada pessoal para apagar — mas, se você acredita que temos algo relacionado a você (por exemplo, uma mensagem de feedback com seu e-mail), fale conosco pela página de contato e removeremos.",
        ],
      },
      {
        h: "Alterações nesta política",
        p: [
          "Se mudarmos a forma como o site lida com dados (por exemplo, caso um dia introduzamos publicidade), atualizaremos esta página e a data no topo antes de a mudança entrar em vigor.",
        ],
      },
    ],
  },
  fr: {
    title: "Politique de confidentialité",
    updated: "Dernière mise à jour : 1 août 2026",
    sections: [
      {
        h: "En bref",
        p: [
          "Vos fichiers ne quittent jamais votre appareil. Chaque outil de ToolsMani (fusion de PDF, compression d'images, convertisseurs et les autres) s'exécute entièrement dans votre navigateur au moyen de JavaScript. Rien de ce que vous ouvrez dans un outil n'est envoyé à nos serveurs, ni stocké chez nous, ni visible par nous.",
          "Nous ne collectons que des données d'usage minimales et essentiellement anonymes, afin de comprendre quels outils sont utiles et de maintenir le site en bon état de marche. Nous ne vendons jamais de données à quiconque.",
        ],
      },
      {
        h: "Ce que nous ne collectons PAS",
        p: [
          "Nous ne collectons ni ne stockons vos fichiers ou leur contenu. Aucun compte n'est requis, nous ne détenons donc ni noms, ni mots de passe, ni profils. Nous ne collectons aucune donnée de paiement : le site est gratuit.",
        ],
      },
      {
        h: "Ce que nous collectons",
        p: [
          "Mesure d'audience : nous utilisons Google Analytics 4 pour mesurer les visites de pages et l'utilisation des outils (par exemple, que l'outil de fusion de PDF a été utilisé, jamais ce que contenait le PDF). Google Analytics dépose des cookies et peut traiter votre adresse IP et des informations sur votre appareil conformément à sa propre politique de confidentialité.",
          "Mesure anonyme du produit : nous enregistrons les étapes du parcours, telles que l'ouverture d'un outil, la sélection d'une entrée, le démarrage ou la réussite du traitement, les erreurs et les actions de téléchargement ou de copie. Les événements peuvent inclure des tranches approximatives de taille, de nombre de fichiers, de durée et de réduction, ainsi que l'outil, la langue, le mode et un code d'erreur générique. Nous n'enregistrons jamais les noms de fichiers, les tailles exactes, le contenu, le texte saisi ou un identifiant de compte. Les utilisations réussies incrémentent aussi un compteur quotidien agrégé.",
          "Retours : si vous utilisez le formulaire de contact ou de retour, nous conservons le message que vous rédigez, la page depuis laquelle il a été envoyé et votre préférence de langue. Le formulaire est anonyme, sauf si vous choisissez d'y indiquer des coordonnées.",
        ],
      },
      {
        h: "Cookies",
        p: [
          "Nous utilisons des cookies uniquement pour la mesure Google Analytics, ainsi qu'une seule clé localStorage qui mémorise votre choix de langue. Vous pouvez bloquer les cookies dans les réglages de votre navigateur ; les outils continueront de fonctionner normalement.",
        ],
      },
      {
        h: "Services tiers",
        p: [
          "Google Analytics (mesure d'usage), ainsi que Firebase Hosting et Firestore de Google (hébergement du site et stockage des compteurs anonymes et des retours). Chacun traite les données selon sa propre politique de confidentialité. Le site utilise les polices système locales de votre appareil. Aucun outil n'envoie votre contenu à un service tiers : tout le traitement, y compris la génération de QR codes, se fait localement dans votre navigateur.",
        ],
      },
      {
        h: "Conservation des données et vos droits",
        p: [
          "Les données de mesure d'audience sont conservées selon les paramètres par défaut de Google Analytics. Les messages de retour sont conservés jusqu'à leur lecture et leur traitement, puis peuvent être supprimés. Comme nous ne détenons aucune donnée de compte vous concernant, il n'y a généralement rien de personnel à supprimer ; mais si vous pensez que nous détenons un élément vous concernant (par exemple un message contenant votre e-mail), contactez-nous via la page de contact et nous le supprimerons.",
        ],
      },
      {
        h: "Modifications de cette politique",
        p: [
          "Si nous modifions la manière dont le site traite les données (par exemple si nous introduisons un jour de la publicité), nous mettrons à jour cette page ainsi que la date en haut avant l'entrée en vigueur du changement.",
        ],
      },
    ],
  },
};

export default function PrivacyPage() {
  const { locale } = useLanguage();
  const c = pick(content, locale);

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">{c.title}</h1>
      <p className="text-sm text-gray-400 mb-10">{c.updated}</p>

      <div className="space-y-8">
        {c.sections.map((s) => (
          <section key={s.h}>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">{s.h}</h2>
            {s.p.map((para, i) => (
              <p key={i} className="text-gray-600 leading-relaxed mb-3">
                {para}
              </p>
            ))}
          </section>
        ))}
      </div>
    </div>
  );
}
