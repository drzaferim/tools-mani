import type { ToolContentMap } from "@/components/ToolContent";

/**
 * PDF Sıkıştırma sayfasının SEO içeriği.
 * Hedef sorgular: comprimir pdf (PT/ES — en yüksek gösterim), compress pdf,
 * reduzir tamanho pdf, pdf verkleinern, réduire taille pdf, pdf sıkıştırma.
 */
export const pdfCompressContent: ToolContentMap = {
  en: {
    intro: [
      "PDF compression reduces file size so a document fits an email attachment limit or an upload form. This tool rewrites the PDF structure: it removes unused objects, drops redundant metadata and re-serializes the file with object streams, which is the safest kind of compression because it never touches your text or images.",
      "That safety has a trade-off worth stating plainly: if your PDF is large because it contains high-resolution scans or photos, structural compression alone will only save a modest amount. Files heavy with metadata, form fields, revision history or embedded fonts shrink much more.",
      "Everything happens in your browser. Contracts, invoices, medical reports and ID scans are exactly the documents people compress most often, and they are also the ones you should never upload to an unknown server.",
    ],
    howToTitle: "How to compress a PDF",
    howToSteps: [
      "Drop your PDF onto the upload area, or click it to pick a file. Nothing is uploaded — the file is opened by your browser.",
      "Click Compress. Processing time depends on your device and the document's size, usually a second or two.",
      "Compare the before and after sizes shown on screen to see how much was saved.",
      "Download the compressed PDF. If the saving was minimal, your file is probably image-heavy — see the FAQ below.",
    ],
    featuresTitle: "What this tool does",
    features: [
      {
        title: "Lossless structural compression",
        desc: "Removes unused objects and redundant metadata, then rewrites the file efficiently. Your text stays sharp and your images keep their original resolution.",
      },
      {
        title: "No file size limit",
        desc: "Because there is no upload, there is no 10 or 25 MB cap like most online compressors impose. The only limit is your device's memory.",
      },
      {
        title: "Honest before/after numbers",
        desc: "You see the exact original size, the new size and the percentage saved. If a file cannot be compressed further, the tool says so instead of pretending.",
      },
      {
        title: "Completely private",
        desc: "The document never leaves your device, so confidential contracts and personal records stay confidential. The tool even works offline once loaded.",
      },
    ],
    faqTitle: "Frequently asked questions",
    faq: [
      {
        q: "How much smaller will my PDF get?",
        a: "It depends entirely on what is inside. Text-based documents, exported reports and files with lots of metadata or form data often shrink noticeably. PDFs whose size comes from scanned pages or high-resolution photos will shrink much less, because this tool deliberately does not degrade image quality.",
      },
      {
        q: "Does compressing reduce the quality of my PDF?",
        a: "No. This is structural compression only: text, fonts and images come out identical to the original. Nothing is downsampled or re-encoded, which is why the result is always safe to send or archive.",
      },
      {
        q: "My file barely got smaller. Why?",
        a: "Your PDF is almost certainly image-heavy — typically a scan, where each page is a large photo. Reducing that requires downsampling the images, which lowers visual quality. A practical workaround: convert the pages to images, compress those, then rebuild the PDF using our PDF to Image and Image to PDF tools.",
      },
      {
        q: "Is there a maximum file size?",
        a: "No artificial limit. Most online compressors cap uploads at 10–25 MB because they pay for bandwidth; here the work happens on your own device, so a 200 MB PDF is fine as long as your browser has the memory for it.",
      },
      {
        q: "Is my PDF uploaded to a server?",
        a: "No. The file is read and rewritten entirely inside your browser using JavaScript. Nothing is transmitted, logged or stored — you can verify it by opening your browser's network tab while compressing, or by disconnecting from the internet after the page has loaded.",
      },
      {
        q: "Can it compress password-protected PDFs?",
        a: "No. Encrypted PDFs cannot be read without the password, so you will need to remove the protection first using the application that created the file.",
      },
    ],
    relatedTitle: "Related tools",
    related: [
      { href: "/tools/pdf-merge", label: "Merge PDF" },
      { href: "/tools/pdf-split", label: "Split PDF" },
      { href: "/tools/pdf-to-image", label: "PDF to Image" },
      { href: "/tools/image-compress", label: "Compress Images" },
      { href: "/tools/pdf", label: "All PDF Tools" },
    ],
  },
  tr: {
    intro: [
      "PDF sıkıştırma, bir belgenin e-posta eki sınırına veya yükleme formuna sığması için dosya boyutunu küçültür. Bu araç PDF'in yapısını yeniden yazar: kullanılmayan nesneleri kaldırır, gereksiz meta verileri atar ve dosyayı nesne akışlarıyla yeniden serileştirir. Bu, metninize ve görsellerinize hiç dokunmadığı için en güvenli sıkıştırma türüdür.",
      "Bu güvenliğin açıkça söylenmesi gereken bir bedeli var: PDF'iniz yüksek çözünürlüklü tarama veya fotoğraf içerdiği için büyükse, yalnızca yapısal sıkıştırma mütevazı bir kazanç sağlar. Meta veri, form alanı, revizyon geçmişi veya gömülü yazı tipi ağırlıklı dosyalar çok daha fazla küçülür.",
      "Her şey tarayıcınızda olur. Sözleşmeler, faturalar, tıbbi raporlar ve kimlik taramaları en sık sıkıştırılan belgelerdir — ve aynı zamanda bilinmeyen bir sunucuya asla yüklenmemesi gerekenlerdir.",
    ],
    howToTitle: "PDF nasıl sıkıştırılır",
    howToSteps: [
      "PDF'inizi yükleme alanına bırakın veya tıklayıp dosya seçin. Hiçbir şey yüklenmez — dosya tarayıcınız tarafından açılır.",
      "Sıkıştır düğmesine basın. İşlem süresi cihazınıza ve belgenin boyutuna bağlıdır, genellikle bir iki saniyedir.",
      "Ne kadar kazanç sağlandığını görmek için ekranda gösterilen önce/sonra boyutlarını karşılaştırın.",
      "Sıkıştırılmış PDF'i indirin. Kazanç çok azsa dosyanız büyük olasılıkla görsel ağırlıklıdır — aşağıdaki SSS'e bakın.",
    ],
    featuresTitle: "Bu araç ne yapar",
    features: [
      {
        title: "Kayıpsız yapısal sıkıştırma",
        desc: "Kullanılmayan nesneleri ve gereksiz meta verileri kaldırır, ardından dosyayı verimli biçimde yeniden yazar. Metniniz net kalır, görselleriniz orijinal çözünürlüğünü korur.",
      },
      {
        title: "Dosya boyutu sınırı yok",
        desc: "Yükleme olmadığı için çoğu online sıkıştırıcının koyduğu 10 veya 25 MB sınırı yoktur. Tek sınır cihazınızın belleğidir.",
      },
      {
        title: "Dürüst önce/sonra rakamları",
        desc: "Orijinal boyutu, yeni boyutu ve kazanılan yüzdeyi tam olarak görürsünüz. Bir dosya daha fazla sıkıştırılamıyorsa araç bunu gizlemez, açıkça söyler.",
      },
      {
        title: "Tamamen gizli",
        desc: "Belge cihazınızdan hiç çıkmaz; gizli sözleşmeler ve kişisel kayıtlar gizli kalır. Araç bir kez yüklendikten sonra çevrimdışı bile çalışır.",
      },
    ],
    faqTitle: "Sık sorulan sorular",
    faq: [
      {
        q: "PDF'im ne kadar küçülür?",
        a: "Tamamen içeriğine bağlıdır. Metin tabanlı belgeler, dışa aktarılmış raporlar ve bol meta veri veya form verisi taşıyan dosyalar genellikle belirgin şekilde küçülür. Boyutu taranmış sayfalardan veya yüksek çözünürlüklü fotoğraflardan gelen PDF'ler çok daha az küçülür; çünkü bu araç bilinçli olarak görsel kalitesini düşürmez.",
      },
      {
        q: "Sıkıştırma PDF'imin kalitesini düşürür mü?",
        a: "Hayır. Bu yalnızca yapısal bir sıkıştırmadır: metin, yazı tipleri ve görseller orijinaliyle birebir aynı çıkar. Hiçbir şey yeniden örneklenmez veya yeniden kodlanmaz; bu yüzden sonuç her zaman gönderilmeye ve arşivlenmeye uygundur.",
      },
      {
        q: "Dosyam neredeyse hiç küçülmedi, neden?",
        a: "PDF'iniz neredeyse kesin olarak görsel ağırlıklıdır — genellikle her sayfası büyük bir fotoğraf olan bir tarama. Bunu küçültmek görselleri yeniden örneklemeyi, yani görüntü kalitesini düşürmeyi gerektirir. Pratik bir yol: sayfaları görsele çevirip onları sıkıştırın, sonra PDF'i yeniden oluşturun — PDF'i Resme Çevirme ve Resimden PDF araçlarımızı kullanabilirsiniz.",
      },
      {
        q: "Maksimum dosya boyutu var mı?",
        a: "Yapay bir sınır yok. Çoğu online sıkıştırıcı bant genişliği maliyeti yüzünden yüklemeleri 10–25 MB ile sınırlar; burada işlem kendi cihazınızda yapıldığı için tarayıcınızın belleği yettiği sürece 200 MB'lık bir PDF sorun değildir.",
      },
      {
        q: "PDF'im bir sunucuya yükleniyor mu?",
        a: "Hayır. Dosya tamamen tarayıcınızın içinde JavaScript ile okunur ve yeniden yazılır. Hiçbir şey iletilmez, kaydedilmez veya saklanmaz — sıkıştırma sırasında tarayıcınızın ağ sekmesini açarak ya da sayfa yüklendikten sonra internet bağlantınızı keserek doğrulayabilirsiniz.",
      },
      {
        q: "Şifre korumalı PDF'leri sıkıştırabilir mi?",
        a: "Hayır. Şifreli PDF'ler parola olmadan okunamaz; korumayı önce dosyayı oluşturan uygulamayla kaldırmanız gerekir.",
      },
    ],
    relatedTitle: "İlgili araçlar",
    related: [
      { href: "/tools/pdf-merge", label: "PDF Birleştirme" },
      { href: "/tools/pdf-split", label: "PDF Bölme" },
      { href: "/tools/pdf-to-image", label: "PDF'i Resme Çevirme" },
      { href: "/tools/image-compress", label: "Resim Sıkıştırma" },
      { href: "/tools/pdf", label: "Tüm PDF Araçları" },
    ],
  },
  es: {
    intro: [
      "Comprimir un PDF reduce su tamaño para que quepa en el límite de un adjunto de correo o en un formulario de subida. Esta herramienta reescribe la estructura del PDF: elimina objetos sin usar, descarta metadatos redundantes y vuelve a serializar el archivo con flujos de objetos. Es el tipo de compresión más seguro porque nunca toca tu texto ni tus imágenes.",
      "Esa seguridad tiene una contrapartida que conviene decir claramente: si tu PDF es grande porque contiene escaneos o fotos de alta resolución, la compresión estructural por sí sola ahorrará poco. Los archivos con muchos metadatos, campos de formulario, historial de revisiones o fuentes incrustadas se reducen mucho más.",
      "Todo ocurre en tu navegador. Contratos, facturas, informes médicos y escaneos de documentos de identidad son justo los archivos que más se comprimen, y también los que nunca deberías subir a un servidor desconocido.",
    ],
    howToTitle: "Cómo comprimir un PDF",
    howToSteps: [
      "Arrastra tu PDF al área de carga o haz clic para elegir un archivo. Nada se sube: el archivo lo abre tu navegador.",
      "Pulsa Comprimir. El tiempo depende de tu dispositivo y del tamaño del documento, normalmente uno o dos segundos.",
      "Compara los tamaños antes y después que aparecen en pantalla para ver cuánto se ha ahorrado.",
      "Descarga el PDF comprimido. Si el ahorro fue mínimo, tu archivo probablemente tiene muchas imágenes: mira las preguntas frecuentes.",
    ],
    featuresTitle: "Qué hace esta herramienta",
    features: [
      {
        title: "Compresión estructural sin pérdidas",
        desc: "Elimina objetos sin usar y metadatos redundantes, y reescribe el archivo de forma eficiente. Tu texto sigue nítido y tus imágenes conservan su resolución original.",
      },
      {
        title: "Sin límite de tamaño",
        desc: "Como no hay subida, no existe el tope de 10 o 25 MB que imponen la mayoría de compresores online. El único límite es la memoria de tu dispositivo.",
      },
      {
        title: "Cifras honestas de antes y después",
        desc: "Ves el tamaño original exacto, el nuevo y el porcentaje ahorrado. Si un archivo no se puede comprimir más, la herramienta lo dice en lugar de disimularlo.",
      },
      {
        title: "Totalmente privado",
        desc: "El documento nunca sale de tu dispositivo, así que los contratos confidenciales y los datos personales siguen siendo confidenciales. La herramienta funciona incluso sin conexión una vez cargada.",
      },
    ],
    faqTitle: "Preguntas frecuentes",
    faq: [
      {
        q: "¿Cuánto se reducirá mi PDF?",
        a: "Depende por completo de su contenido. Los documentos de texto, los informes exportados y los archivos con muchos metadatos o datos de formulario suelen reducirse de forma notable. Los PDF cuyo peso viene de páginas escaneadas o fotos de alta resolución se reducirán mucho menos, porque esta herramienta deliberadamente no degrada la calidad de imagen.",
      },
      {
        q: "¿Comprimir reduce la calidad de mi PDF?",
        a: "No. Es solo compresión estructural: el texto, las fuentes y las imágenes salen idénticos al original. Nada se reescala ni se recodifica, y por eso el resultado siempre es seguro para enviar o archivar.",
      },
      {
        q: "Mi archivo apenas se redujo, ¿por qué?",
        a: "Tu PDF casi con seguridad tiene muchas imágenes, normalmente un escaneo en el que cada página es una foto grande. Reducirlo exige reescalar las imágenes, lo que baja la calidad visual. Una solución práctica: convierte las páginas a imágenes, comprímelas y reconstruye el PDF con nuestras herramientas PDF a Imagen e Imagen a PDF.",
      },
      {
        q: "¿Hay un tamaño máximo de archivo?",
        a: "Ningún límite artificial. La mayoría de compresores online limitan la subida a 10–25 MB porque pagan el ancho de banda; aquí el trabajo se hace en tu propio dispositivo, así que un PDF de 200 MB está bien si tu navegador tiene memoria suficiente.",
      },
      {
        q: "¿Se sube mi PDF a un servidor?",
        a: "No. El archivo se lee y se reescribe íntegramente dentro de tu navegador con JavaScript. Nada se transmite, registra ni almacena: compruébalo abriendo la pestaña de red mientras comprimes, o desconectando internet después de cargar la página.",
      },
      {
        q: "¿Puede comprimir PDF protegidos con contraseña?",
        a: "No. Los PDF cifrados no se pueden leer sin la contraseña, así que primero tendrás que quitar la protección con la aplicación que creó el archivo.",
      },
    ],
    relatedTitle: "Herramientas relacionadas",
    related: [
      { href: "/tools/pdf-merge", label: "Unir PDF" },
      { href: "/tools/pdf-split", label: "Dividir PDF" },
      { href: "/tools/pdf-to-image", label: "PDF a Imagen" },
      { href: "/tools/image-compress", label: "Comprimir imágenes" },
      { href: "/tools/pdf", label: "Todas las herramientas PDF" },
    ],
  },
  de: {
    intro: [
      "PDF-Komprimierung reduziert die Dateigröße, damit ein Dokument in ein E-Mail-Anhangslimit oder ein Upload-Formular passt. Dieses Tool schreibt die PDF-Struktur neu: es entfernt unbenutzte Objekte, verwirft überflüssige Metadaten und serialisiert die Datei mit Objektströmen neu. Das ist die sicherste Art der Komprimierung, weil Ihr Text und Ihre Bilder unangetastet bleiben.",
      "Diese Sicherheit hat einen Preis, den man klar benennen sollte: Ist Ihr PDF groß, weil es hochauflösende Scans oder Fotos enthält, bringt die strukturelle Komprimierung allein nur wenig. Dateien mit vielen Metadaten, Formularfeldern, Revisionsverlauf oder eingebetteten Schriften schrumpfen deutlich stärker.",
      "Alles passiert in Ihrem Browser. Verträge, Rechnungen, Arztberichte und Ausweis-Scans sind genau die Dokumente, die am häufigsten komprimiert werden – und genau die, die man niemals auf einen unbekannten Server laden sollte.",
    ],
    howToTitle: "PDF komprimieren – so geht's",
    howToSteps: [
      "Ziehen Sie Ihr PDF in den Upload-Bereich oder klicken Sie, um eine Datei zu wählen. Nichts wird hochgeladen – die Datei wird von Ihrem Browser geöffnet.",
      "Klicken Sie auf Komprimieren. Die Dauer hängt von Ihrem Gerät und der Dokumentgröße ab, meist eine bis zwei Sekunden.",
      "Vergleichen Sie die angezeigten Größen vor und nach der Komprimierung, um die Einsparung zu sehen.",
      "Laden Sie das komprimierte PDF herunter. Fiel die Einsparung gering aus, ist Ihre Datei wahrscheinlich bildlastig – siehe FAQ unten.",
    ],
    featuresTitle: "Was dieses Tool kann",
    features: [
      {
        title: "Verlustfreie strukturelle Komprimierung",
        desc: "Entfernt unbenutzte Objekte und überflüssige Metadaten und schreibt die Datei effizient neu. Ihr Text bleibt scharf, Ihre Bilder behalten ihre Originalauflösung.",
      },
      {
        title: "Keine Größenbeschränkung",
        desc: "Da nichts hochgeladen wird, gibt es kein 10- oder 25-MB-Limit wie bei den meisten Online-Komprimierern. Die einzige Grenze ist der Speicher Ihres Geräts.",
      },
      {
        title: "Ehrliche Vorher/Nachher-Zahlen",
        desc: "Sie sehen die exakte Ausgangsgröße, die neue Größe und die prozentuale Einsparung. Lässt sich eine Datei nicht weiter komprimieren, sagt das Tool das offen.",
      },
      {
        title: "Vollständig privat",
        desc: "Das Dokument verlässt Ihr Gerät nie, vertrauliche Verträge und persönliche Unterlagen bleiben vertraulich. Nach dem Laden funktioniert das Tool sogar offline.",
      },
    ],
    faqTitle: "Häufige Fragen",
    faq: [
      {
        q: "Wie viel kleiner wird mein PDF?",
        a: "Das hängt vollständig vom Inhalt ab. Textbasierte Dokumente, exportierte Berichte und Dateien mit vielen Metadaten oder Formulardaten schrumpfen oft deutlich. PDFs, deren Größe von gescannten Seiten oder hochauflösenden Fotos kommt, schrumpfen viel weniger – denn dieses Tool verschlechtert die Bildqualität bewusst nicht.",
      },
      {
        q: "Verringert das Komprimieren die Qualität meines PDFs?",
        a: "Nein. Es handelt sich ausschließlich um strukturelle Komprimierung: Text, Schriften und Bilder kommen identisch zum Original heraus. Nichts wird herunterskaliert oder neu kodiert – deshalb ist das Ergebnis immer sicher zum Versenden und Archivieren.",
      },
      {
        q: "Meine Datei wurde kaum kleiner. Warum?",
        a: "Ihr PDF ist mit hoher Wahrscheinlichkeit bildlastig – typischerweise ein Scan, bei dem jede Seite ein großes Foto ist. Das zu reduzieren erfordert das Herunterskalieren der Bilder, was die Qualität senkt. Praktischer Umweg: Seiten in Bilder umwandeln, diese komprimieren und das PDF mit unseren Tools „PDF in Bild\" und „Bild in PDF\" neu aufbauen.",
      },
      {
        q: "Gibt es eine maximale Dateigröße?",
        a: "Kein künstliches Limit. Die meisten Online-Komprimierer begrenzen Uploads auf 10–25 MB, weil sie Bandbreite bezahlen; hier läuft die Arbeit auf Ihrem eigenen Gerät, sodass ein 200-MB-PDF kein Problem ist, solange der Browser genug Speicher hat.",
      },
      {
        q: "Wird mein PDF auf einen Server hochgeladen?",
        a: "Nein. Die Datei wird vollständig in Ihrem Browser per JavaScript gelesen und neu geschrieben. Nichts wird übertragen, protokolliert oder gespeichert – prüfen Sie es im Netzwerk-Tab während des Komprimierens oder trennen Sie nach dem Laden die Internetverbindung.",
      },
      {
        q: "Kann es passwortgeschützte PDFs komprimieren?",
        a: "Nein. Verschlüsselte PDFs lassen sich ohne Passwort nicht lesen; entfernen Sie den Schutz zuerst mit der Anwendung, die die Datei erstellt hat.",
      },
    ],
    relatedTitle: "Verwandte Tools",
    related: [
      { href: "/tools/pdf-merge", label: "PDF zusammenfügen" },
      { href: "/tools/pdf-split", label: "PDF teilen" },
      { href: "/tools/pdf-to-image", label: "PDF in Bild" },
      { href: "/tools/image-compress", label: "Bilder komprimieren" },
      { href: "/tools/pdf", label: "Alle PDF-Tools" },
    ],
  },
  pt: {
    intro: [
      "Comprimir PDF reduz o tamanho do arquivo para que o documento caiba no limite de um anexo de e-mail ou em um formulário de envio. Esta ferramenta reescreve a estrutura do PDF: remove objetos não usados, descarta metadados redundantes e serializa o arquivo novamente com fluxos de objetos. É o tipo mais seguro de compressão, porque nunca mexe no seu texto nem nas suas imagens.",
      "Essa segurança tem um custo que vale dizer com clareza: se o seu PDF é grande porque contém digitalizações ou fotos em alta resolução, a compressão estrutural sozinha economizará pouco. Arquivos cheios de metadados, campos de formulário, histórico de revisões ou fontes incorporadas diminuem muito mais.",
      "Tudo acontece no seu navegador. Contratos, notas fiscais, laudos médicos e digitalizações de documentos são justamente os arquivos que as pessoas mais comprimem — e também os que nunca deveriam ser enviados a um servidor desconhecido.",
    ],
    howToTitle: "Como comprimir um PDF",
    howToSteps: [
      "Arraste seu PDF para a área de upload ou clique para escolher um arquivo. Nada é enviado — o arquivo é aberto pelo seu navegador.",
      "Clique em Comprimir. O tempo depende do seu dispositivo e do tamanho do documento, normalmente um ou dois segundos.",
      "Compare os tamanhos antes e depois mostrados na tela para ver quanto foi economizado.",
      "Baixe o PDF comprimido. Se a economia foi mínima, seu arquivo provavelmente tem muitas imagens — veja as perguntas frequentes.",
    ],
    featuresTitle: "O que esta ferramenta faz",
    features: [
      {
        title: "Compressão estrutural sem perdas",
        desc: "Remove objetos não usados e metadados redundantes, e reescreve o arquivo de forma eficiente. Seu texto continua nítido e suas imagens mantêm a resolução original.",
      },
      {
        title: "Sem limite de tamanho",
        desc: "Como não há envio, não existe o limite de 10 ou 25 MB que a maioria dos compressores online impõe. O único limite é a memória do seu dispositivo.",
      },
      {
        title: "Números honestos de antes e depois",
        desc: "Você vê o tamanho original exato, o novo tamanho e a porcentagem economizada. Se um arquivo não pode ser comprimido mais, a ferramenta avisa em vez de fingir.",
      },
      {
        title: "Totalmente privado",
        desc: "O documento nunca sai do seu dispositivo, então contratos confidenciais e registros pessoais permanecem confidenciais. A ferramenta funciona até offline depois de carregada.",
      },
    ],
    faqTitle: "Perguntas frequentes",
    faq: [
      {
        q: "Quanto o meu PDF vai diminuir?",
        a: "Depende inteiramente do conteúdo. Documentos de texto, relatórios exportados e arquivos com muitos metadados ou dados de formulário costumam diminuir de forma perceptível. PDFs cujo peso vem de páginas digitalizadas ou fotos em alta resolução diminuirão muito menos, porque esta ferramenta deliberadamente não degrada a qualidade das imagens.",
      },
      {
        q: "Comprimir reduz a qualidade do meu PDF?",
        a: "Não. É apenas compressão estrutural: texto, fontes e imagens saem idênticos ao original. Nada é redimensionado ou recodificado, e é por isso que o resultado é sempre seguro para enviar ou arquivar.",
      },
      {
        q: "Meu arquivo quase não diminuiu. Por quê?",
        a: "Seu PDF quase certamente tem muitas imagens — normalmente uma digitalização em que cada página é uma foto grande. Reduzir isso exige redimensionar as imagens, o que baixa a qualidade visual. Uma solução prática: converta as páginas em imagens, comprima-as e reconstrua o PDF com nossas ferramentas PDF para Imagem e Imagem para PDF.",
      },
      {
        q: "Existe tamanho máximo de arquivo?",
        a: "Nenhum limite artificial. A maioria dos compressores online limita o envio a 10–25 MB porque paga pela banda; aqui o trabalho é feito no seu próprio dispositivo, então um PDF de 200 MB funciona bem se o navegador tiver memória.",
      },
      {
        q: "Meu PDF é enviado para um servidor?",
        a: "Não. O arquivo é lido e reescrito inteiramente dentro do seu navegador com JavaScript. Nada é transmitido, registrado ou armazenado — verifique abrindo a aba de rede durante a compressão, ou desconectando a internet depois de a página carregar.",
      },
      {
        q: "Ela comprime PDFs protegidos por senha?",
        a: "Não. PDFs criptografados não podem ser lidos sem a senha, então será preciso remover a proteção primeiro no aplicativo que criou o arquivo.",
      },
    ],
    relatedTitle: "Ferramentas relacionadas",
    related: [
      { href: "/tools/pdf-merge", label: "Juntar PDF" },
      { href: "/tools/pdf-split", label: "Dividir PDF" },
      { href: "/tools/pdf-to-image", label: "PDF para Imagem" },
      { href: "/tools/image-compress", label: "Comprimir imagens" },
      { href: "/tools/pdf", label: "Todas as ferramentas PDF" },
    ],
  },
  fr: {
    intro: [
      "La compression PDF réduit la taille du fichier pour qu'un document tienne dans la limite d'une pièce jointe ou d'un formulaire d'envoi. Cet outil réécrit la structure du PDF : il supprime les objets inutilisés, élimine les métadonnées redondantes et ré-sérialise le fichier avec des flux d'objets. C'est le type de compression le plus sûr, car il ne touche jamais à votre texte ni à vos images.",
      "Cette sûreté a une contrepartie qu'il faut dire clairement : si votre PDF est volumineux parce qu'il contient des scans ou des photos haute résolution, la compression structurelle seule n'économisera que peu. Les fichiers chargés de métadonnées, de champs de formulaire, d'historique de révisions ou de polices intégrées se réduisent beaucoup plus.",
      "Tout se passe dans votre navigateur. Contrats, factures, comptes rendus médicaux et scans de pièces d'identité sont précisément les documents que l'on compresse le plus — et ceux qu'il ne faut jamais envoyer sur un serveur inconnu.",
    ],
    howToTitle: "Comment compresser un PDF",
    howToSteps: [
      "Déposez votre PDF dans la zone d'envoi ou cliquez pour choisir un fichier. Rien n'est envoyé — le fichier est ouvert par votre navigateur.",
      "Cliquez sur Compresser. La durée dépend de votre appareil et de la taille du document, généralement une à deux secondes.",
      "Comparez les tailles avant et après affichées à l'écran pour voir le gain obtenu.",
      "Téléchargez le PDF compressé. Si le gain est faible, votre fichier contient probablement beaucoup d'images — voir la FAQ ci-dessous.",
    ],
    featuresTitle: "Ce que fait cet outil",
    features: [
      {
        title: "Compression structurelle sans perte",
        desc: "Supprime les objets inutilisés et les métadonnées redondantes, puis réécrit le fichier efficacement. Votre texte reste net et vos images conservent leur résolution d'origine.",
      },
      {
        title: "Aucune limite de taille",
        desc: "Comme il n'y a pas d'envoi, il n'y a pas de plafond de 10 ou 25 Mo comme chez la plupart des compresseurs en ligne. La seule limite est la mémoire de votre appareil.",
      },
      {
        title: "Des chiffres avant/après honnêtes",
        desc: "Vous voyez la taille d'origine exacte, la nouvelle taille et le pourcentage gagné. Si un fichier ne peut pas être compressé davantage, l'outil le dit au lieu de faire semblant.",
      },
      {
        title: "Totalement privé",
        desc: "Le document ne quitte jamais votre appareil : contrats confidentiels et documents personnels restent confidentiels. Une fois chargé, l'outil fonctionne même hors ligne.",
      },
    ],
    faqTitle: "Questions fréquentes",
    faq: [
      {
        q: "De combien mon PDF va-t-il diminuer ?",
        a: "Cela dépend entièrement de son contenu. Les documents textuels, les rapports exportés et les fichiers riches en métadonnées ou en données de formulaire diminuent souvent nettement. Les PDF dont le poids vient de pages scannées ou de photos haute résolution diminueront beaucoup moins, car cet outil ne dégrade volontairement pas la qualité des images.",
      },
      {
        q: "La compression réduit-elle la qualité de mon PDF ?",
        a: "Non. Il s'agit uniquement de compression structurelle : texte, polices et images ressortent identiques à l'original. Rien n'est sous-échantillonné ni ré-encodé, c'est pourquoi le résultat est toujours sûr à envoyer ou à archiver.",
      },
      {
        q: "Mon fichier a à peine diminué. Pourquoi ?",
        a: "Votre PDF contient presque certainement beaucoup d'images — typiquement un scan où chaque page est une grande photo. Le réduire exige de sous-échantillonner les images, ce qui baisse la qualité visuelle. Solution pratique : convertissez les pages en images, compressez-les, puis reconstruisez le PDF avec nos outils PDF en image et Image en PDF.",
      },
      {
        q: "Y a-t-il une taille de fichier maximale ?",
        a: "Aucune limite artificielle. La plupart des compresseurs en ligne plafonnent les envois à 10–25 Mo parce qu'ils paient la bande passante ; ici le travail se fait sur votre appareil, donc un PDF de 200 Mo passe très bien si votre navigateur a la mémoire nécessaire.",
      },
      {
        q: "Mon PDF est-il envoyé sur un serveur ?",
        a: "Non. Le fichier est lu et réécrit entièrement dans votre navigateur en JavaScript. Rien n'est transmis, journalisé ni stocké — vérifiez-le en ouvrant l'onglet réseau pendant la compression, ou en coupant votre connexion après le chargement de la page.",
      },
      {
        q: "Peut-il compresser des PDF protégés par mot de passe ?",
        a: "Non. Les PDF chiffrés ne peuvent pas être lus sans le mot de passe ; retirez d'abord la protection avec l'application qui a créé le fichier.",
      },
    ],
    relatedTitle: "Outils associés",
    related: [
      { href: "/tools/pdf-merge", label: "Fusionner PDF" },
      { href: "/tools/pdf-split", label: "Diviser PDF" },
      { href: "/tools/pdf-to-image", label: "PDF en image" },
      { href: "/tools/image-compress", label: "Compresser des images" },
      { href: "/tools/pdf", label: "Tous les outils PDF" },
    ],
  },
};
