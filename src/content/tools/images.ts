import type { ToolContentMap } from "@/components/ToolContent";

/**
 * Resim Sıkıştırma sayfasının SEO içeriği.
 * Hedef sorgular: resim sıkıştırma (TR), compress image, comprimir imagen,
 * bild verkleinern, compresser image, comprimir imagem.
 */
export const imageCompressContent: ToolContentMap = {
  en: {
    intro: [
      "Image compression lowers file size by re-encoding the picture at a chosen quality level. At around 75–85% quality, the data that gets discarded is detail the human eye cannot distinguish anyway — which is why a photo can lose 70% of its file size and still look identical side by side.",
      "This matters for three everyday situations: attaching photos to an email with a size cap, uploading to a form that rejects large files, and speeding up a website where oversized images are the main cause of slow loading.",
      "Compression happens on your own device using the browser's canvas engine. Your photos are never uploaded, which is the point — holiday pictures, ID documents and family photos are not files you want sitting on someone else's server.",
    ],
    howToTitle: "How to compress images",
    howToSteps: [
      "Drop one or more images onto the upload area — JPG, PNG and WebP are all supported.",
      "Pick a quality level. 75–85% is the sweet spot for photographs; go higher for images with text or fine lines.",
      "Compare the original and compressed sizes shown for each file.",
      "Download the compressed images individually, or all at once if you processed several.",
    ],
    featuresTitle: "What this tool does",
    features: [
      {
        title: "Batch compression",
        desc: "Drop a whole folder of photos at once. Each image is processed independently and reported with its own before/after size.",
      },
      {
        title: "Adjustable quality",
        desc: "You control the trade-off instead of accepting a fixed preset, so you can push for maximum savings or maximum fidelity depending on the image.",
      },
      {
        title: "Dimensions preserved",
        desc: "Compression only re-encodes; width and height stay exactly the same. Use the Image Resizer if you also want smaller dimensions.",
      },
      {
        title: "Nothing is uploaded",
        desc: "All processing runs locally in your browser, so there is no file size limit and no privacy risk with personal photos.",
      },
    ],
    faqTitle: "Frequently asked questions",
    faq: [
      {
        q: "How much smaller will my images get?",
        a: "Photographs typically shrink by 60–80% at 80% quality with no visible difference. Screenshots, logos and graphics with flat colour compress less, because they contain less of the fine detail that lossy compression discards.",
      },
      {
        q: "Will compression visibly reduce quality?",
        a: "At 75% quality and above, differences are essentially invisible in normal viewing. Below about 60% you start to see softness and blocky artefacts, especially in skies and smooth gradients. The tool lets you test and compare before downloading.",
      },
      {
        q: "What is the difference between compressing and resizing?",
        a: "Compressing keeps the same pixel dimensions and re-encodes the image data more efficiently. Resizing reduces the actual width and height. For web use, doing both gives the biggest savings — resize first, then compress.",
      },
      {
        q: "Which format should I use?",
        a: "JPG for photographs, PNG when you need transparency or crisp screenshots, and WebP when the target is a modern website — WebP is roughly 25–30% smaller than JPG at equal quality. Our Image Converter switches between them.",
      },
      {
        q: "Are my photos uploaded anywhere?",
        a: "No. Compression runs in your browser through the canvas API. Your images never leave your device and nothing is stored — you can confirm it by disconnecting from the internet after the page loads; the tool keeps working.",
      },
    ],
    relatedTitle: "Related tools",
    related: [
      { href: "/tools/image-resize", label: "Resize Images" },
      { href: "/tools/image-convert", label: "Convert Image Format" },
      { href: "/tools/heic-convert", label: "HEIC to JPG" },
      { href: "/tools/exif-cleaner", label: "Remove EXIF Data" },
      { href: "/tools/image-to-pdf", label: "Image to PDF" },
    ],
  },
  tr: {
    intro: [
      "Resim sıkıştırma, görüntüyü seçtiğiniz kalite düzeyinde yeniden kodlayarak dosya boyutunu düşürür. %75–85 kalite civarında atılan veri, insan gözünün zaten ayırt edemediği ayrıntılardır — bu yüzden bir fotoğraf boyutunun %70'ini kaybedip yan yana bakıldığında birebir aynı görünebilir.",
      "Bu üç günlük durumda önemlidir: boyut sınırı olan bir e-postaya fotoğraf eklemek, büyük dosyaları reddeden bir forma yükleme yapmak ve yavaş açılmanın baş sebebi büyük görseller olan bir web sitesini hızlandırmak.",
      "Sıkıştırma, tarayıcının canvas motoruyla kendi cihazınızda yapılır. Fotoğraflarınız asla yüklenmez — asıl nokta da bu: tatil fotoğrafları, kimlik belgeleri ve aile resimleri başkasının sunucusunda durmasını isteyeceğiniz dosyalar değildir.",
    ],
    howToTitle: "Resimler nasıl sıkıştırılır",
    howToSteps: [
      "Bir veya daha fazla resmi yükleme alanına bırakın — JPG, PNG ve WebP desteklenir.",
      "Bir kalite düzeyi seçin. Fotoğraflar için %75–85 ideal aralıktır; metin veya ince çizgi içeren görsellerde daha yükseğe çıkın.",
      "Her dosya için gösterilen orijinal ve sıkıştırılmış boyutları karşılaştırın.",
      "Sıkıştırılmış resimleri tek tek indirin veya birkaç dosya işlediyseniz hepsini birlikte alın.",
    ],
    featuresTitle: "Bu araç ne yapar",
    features: [
      {
        title: "Toplu sıkıştırma",
        desc: "Bir klasör dolusu fotoğrafı aynı anda bırakın. Her resim bağımsız işlenir ve kendi önce/sonra boyutuyla raporlanır.",
      },
      {
        title: "Ayarlanabilir kalite",
        desc: "Sabit bir hazır ayarı kabul etmek yerine dengeyi siz kurarsınız; görsele göre maksimum kazanca ya da maksimum sadakate yönelebilirsiniz.",
      },
      {
        title: "Boyutlar korunur",
        desc: "Sıkıştırma yalnızca yeniden kodlar; genişlik ve yükseklik birebir aynı kalır. Ölçüleri de küçültmek istiyorsanız Resim Boyutlandırma aracını kullanın.",
      },
      {
        title: "Hiçbir şey yüklenmez",
        desc: "Tüm işlem tarayıcınızda yerel çalışır; bu yüzden dosya boyutu sınırı yoktur ve kişisel fotoğraflarda gizlilik riski oluşmaz.",
      },
    ],
    faqTitle: "Sık sorulan sorular",
    faq: [
      {
        q: "Resimlerim ne kadar küçülür?",
        a: "Fotoğraflar %80 kalitede genellikle %60–80 küçülür ve gözle fark edilir bir değişiklik olmaz. Ekran görüntüleri, logolar ve düz renkli grafikler daha az küçülür; çünkü kayıplı sıkıştırmanın attığı ince ayrıntıyı daha az içerirler.",
      },
      {
        q: "Sıkıştırma kaliteyi görünür şekilde düşürür mü?",
        a: "%75 ve üzeri kalitede normal izlemede farklar neredeyse görünmezdir. Yaklaşık %60'ın altında özellikle gökyüzü ve yumuşak geçişlerde yumuşama ve blok bozulmaları görmeye başlarsınız. Araç, indirmeden önce deneyip karşılaştırmanıza olanak verir.",
      },
      {
        q: "Sıkıştırma ile boyutlandırma arasındaki fark nedir?",
        a: "Sıkıştırma aynı piksel ölçülerini korur ve görüntü verisini daha verimli yeniden kodlar. Boyutlandırma ise gerçek genişlik ve yüksekliği küçültür. Web kullanımı için ikisini birlikte yapmak en büyük kazancı verir — önce boyutlandırın, sonra sıkıştırın.",
      },
      {
        q: "Hangi formatı kullanmalıyım?",
        a: "Fotoğraflar için JPG, şeffaflık veya net ekran görüntüsü gerektiğinde PNG, hedef modern bir web sitesiyse WebP — WebP aynı kalitede JPG'den kabaca %25–30 daha küçüktür. Resim Dönüştürücümüz aralarında geçiş yapar.",
      },
      {
        q: "Fotoğraflarım bir yere yükleniyor mu?",
        a: "Hayır. Sıkıştırma tarayıcınızda canvas API'si ile çalışır. Resimleriniz cihazınızdan hiç çıkmaz ve hiçbir şey saklanmaz — sayfa yüklendikten sonra internet bağlantınızı keserek doğrulayabilirsiniz; araç çalışmaya devam eder.",
      },
    ],
    relatedTitle: "İlgili araçlar",
    related: [
      { href: "/tools/image-resize", label: "Resim Boyutlandırma" },
      { href: "/tools/image-convert", label: "Resim Format Dönüştürücü" },
      { href: "/tools/heic-convert", label: "HEIC'i JPG'ye Çevirme" },
      { href: "/tools/exif-cleaner", label: "EXIF Temizleyici" },
      { href: "/tools/image-to-pdf", label: "Resimden PDF" },
    ],
  },
  es: {
    intro: [
      "La compresión de imágenes reduce el tamaño del archivo recodificando la imagen con un nivel de calidad elegido. Alrededor del 75–85% de calidad, los datos que se descartan son detalles que el ojo humano no distingue, por eso una foto puede perder el 70% de su peso y verse idéntica al compararla.",
      "Esto importa en tres situaciones cotidianas: adjuntar fotos a un correo con límite de tamaño, subir archivos a un formulario que rechaza los grandes y acelerar una web donde las imágenes sobredimensionadas son la causa principal de la lentitud.",
      "La compresión ocurre en tu propio dispositivo con el motor canvas del navegador. Tus fotos nunca se suben, y ese es el punto: fotos de vacaciones, documentos de identidad y retratos familiares no son archivos que quieras dejar en el servidor de otra persona.",
    ],
    howToTitle: "Cómo comprimir imágenes",
    howToSteps: [
      "Arrastra una o varias imágenes al área de carga: se admiten JPG, PNG y WebP.",
      "Elige un nivel de calidad. El 75–85% es el punto óptimo para fotografías; sube más si la imagen tiene texto o líneas finas.",
      "Compara los tamaños original y comprimido que se muestran para cada archivo.",
      "Descarga las imágenes comprimidas de una en una, o todas juntas si procesaste varias.",
    ],
    featuresTitle: "Qué hace esta herramienta",
    features: [
      {
        title: "Compresión por lotes",
        desc: "Suelta una carpeta entera de fotos a la vez. Cada imagen se procesa por separado y se informa con su propio tamaño antes y después.",
      },
      {
        title: "Calidad ajustable",
        desc: "Tú controlas el equilibrio en lugar de aceptar un ajuste fijo, así puedes buscar el máximo ahorro o la máxima fidelidad según la imagen.",
      },
      {
        title: "Dimensiones intactas",
        desc: "La compresión solo recodifica; el ancho y el alto siguen siendo los mismos. Usa el Redimensionador si también quieres reducir las dimensiones.",
      },
      {
        title: "Nada se sube",
        desc: "Todo el procesamiento se ejecuta localmente en tu navegador, así que no hay límite de tamaño ni riesgo de privacidad con fotos personales.",
      },
    ],
    faqTitle: "Preguntas frecuentes",
    faq: [
      {
        q: "¿Cuánto se reducirán mis imágenes?",
        a: "Las fotografías suelen reducirse entre un 60 y un 80% al 80% de calidad sin diferencia visible. Las capturas de pantalla, logotipos y gráficos con colores planos se comprimen menos, porque contienen menos del detalle fino que descarta la compresión con pérdida.",
      },
      {
        q: "¿La compresión reduce la calidad de forma visible?",
        a: "Al 75% de calidad o más, las diferencias son prácticamente invisibles en una visualización normal. Por debajo del 60% empiezan a notarse suavizado y artefactos en bloques, sobre todo en cielos y degradados. La herramienta te permite probar y comparar antes de descargar.",
      },
      {
        q: "¿Cuál es la diferencia entre comprimir y redimensionar?",
        a: "Comprimir mantiene las mismas dimensiones en píxeles y recodifica los datos de forma más eficiente. Redimensionar reduce el ancho y el alto reales. Para uso web, hacer ambas cosas da el mayor ahorro: primero redimensiona, luego comprime.",
      },
      {
        q: "¿Qué formato debo usar?",
        a: "JPG para fotografías, PNG cuando necesitas transparencia o capturas nítidas, y WebP cuando el destino es una web moderna: WebP es aproximadamente un 25–30% más pequeño que JPG con la misma calidad. Nuestro Conversor de Imágenes cambia entre ellos.",
      },
      {
        q: "¿Se suben mis fotos a algún sitio?",
        a: "No. La compresión se ejecuta en tu navegador mediante la API canvas. Tus imágenes nunca salen de tu dispositivo y nada se almacena: puedes comprobarlo desconectando internet tras cargar la página; la herramienta seguirá funcionando.",
      },
    ],
    relatedTitle: "Herramientas relacionadas",
    related: [
      { href: "/tools/image-resize", label: "Redimensionar imágenes" },
      { href: "/tools/image-convert", label: "Convertir formato" },
      { href: "/tools/heic-convert", label: "HEIC a JPG" },
      { href: "/tools/exif-cleaner", label: "Eliminar EXIF" },
      { href: "/tools/image-to-pdf", label: "Imagen a PDF" },
    ],
  },
  de: {
    intro: [
      "Bildkomprimierung senkt die Dateigröße, indem das Bild mit einer gewählten Qualitätsstufe neu kodiert wird. Bei etwa 75–85% Qualität sind die verworfenen Daten Details, die das menschliche Auge ohnehin nicht unterscheidet – deshalb kann ein Foto 70% seiner Dateigröße verlieren und im direkten Vergleich identisch aussehen.",
      "Das ist in drei Alltagssituationen wichtig: Fotos an eine E-Mail mit Größenlimit anhängen, in ein Formular hochladen, das große Dateien ablehnt, und eine Website beschleunigen, bei der übergroße Bilder die Hauptursache für lange Ladezeiten sind.",
      "Die Komprimierung läuft auf Ihrem Gerät über die Canvas-Engine des Browsers. Ihre Fotos werden nie hochgeladen – genau darum geht es: Urlaubsbilder, Ausweisdokumente und Familienfotos sind keine Dateien, die auf einem fremden Server liegen sollten.",
    ],
    howToTitle: "Bilder komprimieren – so geht's",
    howToSteps: [
      "Ziehen Sie ein oder mehrere Bilder in den Upload-Bereich – JPG, PNG und WebP werden unterstützt.",
      "Wählen Sie eine Qualitätsstufe. 75–85% ist der optimale Bereich für Fotos; bei Bildern mit Text oder feinen Linien höher gehen.",
      "Vergleichen Sie die angezeigten Original- und komprimierten Größen jeder Datei.",
      "Laden Sie die komprimierten Bilder einzeln herunter oder alle zusammen, wenn Sie mehrere verarbeitet haben.",
    ],
    featuresTitle: "Was dieses Tool kann",
    features: [
      {
        title: "Stapelverarbeitung",
        desc: "Legen Sie einen ganzen Ordner Fotos auf einmal ab. Jedes Bild wird einzeln verarbeitet und mit eigener Vorher/Nachher-Größe ausgewiesen.",
      },
      {
        title: "Einstellbare Qualität",
        desc: "Sie steuern den Kompromiss selbst statt eine feste Voreinstellung zu akzeptieren – je nach Bild auf maximale Einsparung oder maximale Treue.",
      },
      {
        title: "Abmessungen bleiben erhalten",
        desc: "Komprimierung kodiert nur neu; Breite und Höhe bleiben exakt gleich. Wenn Sie auch die Abmessungen verkleinern wollen, nutzen Sie den Bild-Skalierer.",
      },
      {
        title: "Nichts wird hochgeladen",
        desc: "Die gesamte Verarbeitung läuft lokal im Browser – daher keine Größenbeschränkung und kein Datenschutzrisiko bei privaten Fotos.",
      },
    ],
    faqTitle: "Häufige Fragen",
    faq: [
      {
        q: "Wie viel kleiner werden meine Bilder?",
        a: "Fotos schrumpfen bei 80% Qualität typischerweise um 60–80% ohne sichtbaren Unterschied. Screenshots, Logos und Grafiken mit flachen Farben komprimieren weniger, weil sie weniger der feinen Details enthalten, die verlustbehaftete Komprimierung verwirft.",
      },
      {
        q: "Verringert die Komprimierung die Qualität sichtbar?",
        a: "Ab 75% Qualität sind Unterschiede bei normaler Betrachtung praktisch unsichtbar. Unter etwa 60% zeigen sich Weichzeichnung und Blockartefakte, besonders in Himmel und weichen Verläufen. Das Tool erlaubt Testen und Vergleichen vor dem Download.",
      },
      {
        q: "Was ist der Unterschied zwischen Komprimieren und Skalieren?",
        a: "Komprimieren behält die Pixelabmessungen und kodiert die Bilddaten effizienter. Skalieren verringert die tatsächliche Breite und Höhe. Für Webnutzung bringt beides zusammen die größte Ersparnis – erst skalieren, dann komprimieren.",
      },
      {
        q: "Welches Format soll ich verwenden?",
        a: "JPG für Fotos, PNG wenn Sie Transparenz oder scharfe Screenshots brauchen, und WebP wenn das Ziel eine moderne Website ist – WebP ist bei gleicher Qualität rund 25–30% kleiner als JPG. Unser Bildkonverter wechselt zwischen den Formaten.",
      },
      {
        q: "Werden meine Fotos irgendwohin hochgeladen?",
        a: "Nein. Die Komprimierung läuft im Browser über die Canvas-API. Ihre Bilder verlassen Ihr Gerät nie und nichts wird gespeichert – prüfen Sie es, indem Sie nach dem Laden die Internetverbindung trennen: das Tool funktioniert weiter.",
      },
    ],
    relatedTitle: "Verwandte Tools",
    related: [
      { href: "/tools/image-resize", label: "Bilder skalieren" },
      { href: "/tools/image-convert", label: "Format konvertieren" },
      { href: "/tools/heic-convert", label: "HEIC in JPG" },
      { href: "/tools/exif-cleaner", label: "EXIF entfernen" },
      { href: "/tools/image-to-pdf", label: "Bild in PDF" },
    ],
  },
  pt: {
    intro: [
      "A compressão de imagens reduz o tamanho do arquivo recodificando a imagem em um nível de qualidade escolhido. Em torno de 75–85% de qualidade, os dados descartados são detalhes que o olho humano não distingue — por isso uma foto pode perder 70% do seu peso e parecer idêntica lado a lado.",
      "Isso importa em três situações do dia a dia: anexar fotos a um e-mail com limite de tamanho, enviar para um formulário que rejeita arquivos grandes e acelerar um site onde imagens superdimensionadas são a principal causa da lentidão.",
      "A compressão acontece no seu próprio dispositivo com o motor canvas do navegador. Suas fotos nunca são enviadas, e esse é o ponto: fotos de viagem, documentos de identidade e retratos de família não são arquivos que você queira no servidor de outra pessoa.",
    ],
    howToTitle: "Como comprimir imagens",
    howToSteps: [
      "Arraste uma ou mais imagens para a área de upload — JPG, PNG e WebP são suportados.",
      "Escolha um nível de qualidade. 75–85% é o ponto ideal para fotografias; use mais para imagens com texto ou linhas finas.",
      "Compare os tamanhos original e comprimido exibidos para cada arquivo.",
      "Baixe as imagens comprimidas uma a uma, ou todas juntas se processou várias.",
    ],
    featuresTitle: "O que esta ferramenta faz",
    features: [
      {
        title: "Compressão em lote",
        desc: "Solte uma pasta inteira de fotos de uma vez. Cada imagem é processada separadamente e reportada com seu próprio tamanho antes e depois.",
      },
      {
        title: "Qualidade ajustável",
        desc: "Você controla o equilíbrio em vez de aceitar um preset fixo, podendo buscar economia máxima ou fidelidade máxima conforme a imagem.",
      },
      {
        title: "Dimensões preservadas",
        desc: "A compressão apenas recodifica; largura e altura permanecem exatamente iguais. Use o Redimensionador se também quiser dimensões menores.",
      },
      {
        title: "Nada é enviado",
        desc: "Todo o processamento roda localmente no navegador, então não há limite de tamanho nem risco de privacidade com fotos pessoais.",
      },
    ],
    faqTitle: "Perguntas frequentes",
    faq: [
      {
        q: "Quanto minhas imagens vão diminuir?",
        a: "Fotografias normalmente diminuem 60–80% com 80% de qualidade, sem diferença visível. Capturas de tela, logotipos e gráficos de cores planas comprimem menos, porque contêm menos do detalhe fino que a compressão com perdas descarta.",
      },
      {
        q: "A compressão reduz a qualidade visivelmente?",
        a: "Com 75% de qualidade ou mais, as diferenças são praticamente invisíveis na visualização normal. Abaixo de cerca de 60% começam a aparecer suavização e artefatos em blocos, especialmente em céus e gradientes. A ferramenta permite testar e comparar antes de baixar.",
      },
      {
        q: "Qual a diferença entre comprimir e redimensionar?",
        a: "Comprimir mantém as mesmas dimensões em pixels e recodifica os dados de forma mais eficiente. Redimensionar reduz a largura e a altura reais. Para uso web, fazer os dois dá a maior economia — primeiro redimensione, depois comprima.",
      },
      {
        q: "Qual formato devo usar?",
        a: "JPG para fotografias, PNG quando precisa de transparência ou capturas nítidas, e WebP quando o destino é um site moderno — WebP é cerca de 25–30% menor que JPG na mesma qualidade. Nosso Conversor de Imagens alterna entre eles.",
      },
      {
        q: "Minhas fotos são enviadas para algum lugar?",
        a: "Não. A compressão roda no seu navegador pela API canvas. Suas imagens nunca saem do dispositivo e nada é armazenado — confirme desconectando a internet após a página carregar; a ferramenta continua funcionando.",
      },
    ],
    relatedTitle: "Ferramentas relacionadas",
    related: [
      { href: "/tools/image-resize", label: "Redimensionar imagens" },
      { href: "/tools/image-convert", label: "Converter formato" },
      { href: "/tools/heic-convert", label: "HEIC para JPG" },
      { href: "/tools/exif-cleaner", label: "Remover EXIF" },
      { href: "/tools/image-to-pdf", label: "Imagem para PDF" },
    ],
  },
  fr: {
    intro: [
      "La compression d'images réduit la taille du fichier en ré-encodant l'image à un niveau de qualité choisi. Autour de 75–85% de qualité, les données supprimées sont des détails que l'œil humain ne distingue pas — c'est pourquoi une photo peut perdre 70% de son poids et paraître identique côte à côte.",
      "Cela compte dans trois situations quotidiennes : joindre des photos à un e-mail limité en taille, envoyer un fichier dans un formulaire qui refuse les gros fichiers, et accélérer un site où les images surdimensionnées sont la cause principale de la lenteur.",
      "La compression s'effectue sur votre appareil via le moteur canvas du navigateur. Vos photos ne sont jamais envoyées, et c'est tout l'intérêt : photos de vacances, pièces d'identité et portraits de famille ne sont pas des fichiers à laisser sur le serveur d'un tiers.",
    ],
    howToTitle: "Comment compresser des images",
    howToSteps: [
      "Déposez une ou plusieurs images dans la zone d'envoi — JPG, PNG et WebP sont pris en charge.",
      "Choisissez un niveau de qualité. 75–85% est l'idéal pour les photographies ; montez plus haut pour les images contenant du texte ou des lignes fines.",
      "Comparez les tailles d'origine et compressée affichées pour chaque fichier.",
      "Téléchargez les images compressées une par une, ou toutes ensemble si vous en avez traité plusieurs.",
    ],
    featuresTitle: "Ce que fait cet outil",
    features: [
      {
        title: "Compression par lots",
        desc: "Déposez un dossier entier de photos d'un coup. Chaque image est traitée séparément et affichée avec sa propre taille avant/après.",
      },
      {
        title: "Qualité réglable",
        desc: "Vous maîtrisez le compromis au lieu d'accepter un réglage fixe : viser l'économie maximale ou la fidélité maximale selon l'image.",
      },
      {
        title: "Dimensions préservées",
        desc: "La compression ne fait que ré-encoder ; largeur et hauteur restent identiques. Utilisez le redimensionneur si vous voulez aussi réduire les dimensions.",
      },
      {
        title: "Rien n'est envoyé",
        desc: "Tout le traitement s'exécute localement dans votre navigateur : aucune limite de taille et aucun risque pour vos photos personnelles.",
      },
    ],
    faqTitle: "Questions fréquentes",
    faq: [
      {
        q: "De combien mes images vont-elles diminuer ?",
        a: "Les photographies diminuent généralement de 60 à 80% à 75–80% de qualité sans différence visible. Captures d'écran, logos et graphiques en couleurs plates se compressent moins, car ils contiennent moins des détails fins que la compression avec perte supprime.",
      },
      {
        q: "La compression dégrade-t-elle visiblement la qualité ?",
        a: "À partir de 75% de qualité, les différences sont pratiquement invisibles en visionnage normal. En dessous de 60% environ, un lissage et des artefacts en blocs apparaissent, surtout dans les ciels et les dégradés. L'outil permet de tester et comparer avant de télécharger.",
      },
      {
        q: "Quelle différence entre compresser et redimensionner ?",
        a: "Compresser conserve les mêmes dimensions en pixels et ré-encode les données plus efficacement. Redimensionner réduit la largeur et la hauteur réelles. Pour le web, faire les deux donne le plus grand gain — redimensionnez d'abord, compressez ensuite.",
      },
      {
        q: "Quel format choisir ?",
        a: "JPG pour les photographies, PNG si vous avez besoin de transparence ou de captures nettes, et WebP si la destination est un site moderne — WebP est environ 25–30% plus léger que JPG à qualité égale. Notre convertisseur d'images passe de l'un à l'autre.",
      },
      {
        q: "Mes photos sont-elles envoyées quelque part ?",
        a: "Non. La compression s'exécute dans votre navigateur via l'API canvas. Vos images ne quittent jamais votre appareil et rien n'est stocké — vérifiez-le en coupant votre connexion après le chargement : l'outil continue de fonctionner.",
      },
    ],
    relatedTitle: "Outils associés",
    related: [
      { href: "/tools/image-resize", label: "Redimensionner des images" },
      { href: "/tools/image-convert", label: "Convertir le format" },
      { href: "/tools/heic-convert", label: "HEIC en JPG" },
      { href: "/tools/exif-cleaner", label: "Supprimer les EXIF" },
      { href: "/tools/image-to-pdf", label: "Image en PDF" },
    ],
  },
};

/**
 * Resim Boyutlandırma sayfasının SEO içeriği.
 * Hedef sorgular: redimensionner image (FR — gösterim lideri), resize image,
 * redimensionar imagem, bild größe ändern, resim boyutlandırma.
 */
export const imageResizeContent: ToolContentMap = {
  en: {
    intro: [
      "Resizing changes an image's actual pixel dimensions — a 4000 × 3000 phone photo becomes 1920 × 1440, for example. This is different from compression, which keeps the dimensions and only re-encodes the data. Resizing usually saves far more space, because file size scales with the number of pixels.",
      "Most images people upload are far larger than they need to be. A profile picture displayed at 400 px wide does not benefit from being 4000 px, and a website that serves full-resolution camera files to phones wastes both bandwidth and loading time.",
      "The aspect ratio is always preserved, so nothing gets stretched. Everything runs locally in your browser: no upload, no size cap, no waiting.",
    ],
    howToTitle: "How to resize an image",
    howToSteps: [
      "Drop one or more images onto the upload area — JPG, PNG and WebP are supported, and batches are fine.",
      "Choose your method: a target width in pixels, or a percentage of the original size.",
      "Set the output quality. Higher keeps more detail; 85% is a good default for photographs.",
      "Check the reported dimensions and file size for each image, then download individually or all at once.",
    ],
    featuresTitle: "What this tool does",
    features: [
      {
        title: "Resize by width or percentage",
        desc: "Enter an exact pixel width for precise requirements, or scale by percentage when you just need everything smaller.",
      },
      {
        title: "Aspect ratio locked",
        desc: "Height is calculated automatically from the width so images never appear stretched or squashed.",
      },
      {
        title: "Batch processing",
        desc: "Resize a whole set of images to the same width in one pass — useful for preparing product photos or a gallery.",
      },
      {
        title: "High-quality scaling",
        desc: "Uses the browser's high-quality image smoothing when downscaling, so results stay sharp rather than pixelated.",
      },
    ],
    faqTitle: "Frequently asked questions",
    faq: [
      {
        q: "What size should I resize my images to?",
        a: "For full-width website images, 1600–1920 px wide is plenty. For blog content images, 800–1200 px. For thumbnails and avatars, 200–400 px. For email attachments, 1200 px is usually a good compromise between quality and size.",
      },
      {
        q: "Will resizing reduce the quality?",
        a: "Making an image smaller looks excellent because you are discarding pixels you were not displaying anyway. Enlarging is the problem: scaling up cannot invent detail that was never captured, so the result looks soft. Always resize down, never up.",
      },
      {
        q: "Should I resize or compress?",
        a: "Resize when the image's dimensions are larger than needed — this is the bigger win. Compress when the dimensions are already right but the file is still heavy. For web images, do both: resize first, then compress.",
      },
      {
        q: "Does it keep transparency in PNG files?",
        a: "Yes. PNG files are re-encoded as PNG, so alpha transparency is preserved. JPG has no transparency support, which is why we keep each file in its original format.",
      },
      {
        q: "Are my images uploaded?",
        a: "No. Resizing happens in your browser using the canvas API, so images never leave your device. There is no file size limit and nothing is stored or logged.",
      },
    ],
    relatedTitle: "Related tools",
    related: [
      { href: "/tools/image-compress", label: "Compress Images" },
      { href: "/tools/image-convert", label: "Convert Image Format" },
      { href: "/tools/favicon-generator", label: "Favicon Generator" },
      { href: "/tools/exif-cleaner", label: "Remove EXIF Data" },
      { href: "/tools/heic-convert", label: "HEIC to JPG" },
    ],
  },
  tr: {
    intro: [
      "Boyutlandırma, bir resmin gerçek piksel ölçülerini değiştirir — örneğin 4000 × 3000 bir telefon fotoğrafı 1920 × 1440 olur. Bu, ölçüleri koruyup yalnızca veriyi yeniden kodlayan sıkıştırmadan farklıdır. Boyutlandırma genellikle çok daha fazla yer kazandırır, çünkü dosya boyutu piksel sayısıyla ölçeklenir.",
      "İnsanların yüklediği resimlerin çoğu gerektiğinden kat kat büyüktür. 400 piksel genişliğinde gösterilen bir profil fotoğrafının 4000 piksel olmasının hiçbir faydası yoktur; telefonlara tam çözünürlüklü kamera dosyaları sunan bir web sitesi de hem bant genişliği hem yükleme süresi harcar.",
      "En-boy oranı her zaman korunur, yani hiçbir şey gerilmez. Her şey tarayıcınızda yerel çalışır: yükleme yok, boyut sınırı yok, bekleme yok.",
    ],
    howToTitle: "Bir resim nasıl boyutlandırılır",
    howToSteps: [
      "Bir veya daha fazla resmi yükleme alanına bırakın — JPG, PNG ve WebP desteklenir, toplu işlem sorun değildir.",
      "Yönteminizi seçin: piksel cinsinden hedef genişlik ya da orijinal boyutun yüzdesi.",
      "Çıktı kalitesini ayarlayın. Yüksek değer daha fazla ayrıntı korur; fotoğraflar için %85 iyi bir başlangıçtır.",
      "Her resim için bildirilen ölçüleri ve dosya boyutunu kontrol edin, sonra tek tek veya toplu indirin.",
    ],
    featuresTitle: "Bu araç ne yapar",
    features: [
      {
        title: "Genişliğe veya yüzdeye göre boyutlandırma",
        desc: "Kesin gereksinimler için tam piksel genişliği girin ya da sadece her şeyi küçültmek istediğinizde yüzdeyle ölçekleyin.",
      },
      {
        title: "En-boy oranı kilitli",
        desc: "Yükseklik genişlikten otomatik hesaplanır; resimler asla gerilmiş veya sıkışmış görünmez.",
      },
      {
        title: "Toplu işlem",
        desc: "Bir resim setinin tamamını tek geçişte aynı genişliğe getirin — ürün fotoğrafları veya galeri hazırlarken işe yarar.",
      },
      {
        title: "Yüksek kaliteli ölçekleme",
        desc: "Küçültürken tarayıcının yüksek kaliteli görüntü yumuşatmasını kullanır; sonuç pikselli değil net kalır.",
      },
    ],
    faqTitle: "Sık sorulan sorular",
    faq: [
      {
        q: "Resimlerimi hangi boyuta getirmeliyim?",
        a: "Tam genişlik web sitesi görselleri için 1600–1920 piksel genişlik fazlasıyla yeterlidir. Blog içeriği görselleri için 800–1200 piksel. Küçük resimler ve avatarlar için 200–400 piksel. E-posta ekleri için 1200 piksel genellikle kalite ile boyut arasında iyi bir uzlaşmadır.",
      },
      {
        q: "Boyutlandırma kaliteyi düşürür mü?",
        a: "Bir resmi küçültmek mükemmel görünür; çünkü zaten göstermediğiniz pikselleri atıyorsunuz. Sorun büyütmektir: ölçeği yukarı çekmek hiç yakalanmamış ayrıntıyı uyduramaz, sonuç yumuşak görünür. Her zaman küçültün, asla büyütmeyin.",
      },
      {
        q: "Boyutlandırmalı mıyım yoksa sıkıştırmalı mıyım?",
        a: "Resmin ölçüleri gerekenden büyükse boyutlandırın — asıl kazanç budur. Ölçüler doğru ama dosya hâlâ ağırsa sıkıştırın. Web görselleri için ikisini birlikte yapın: önce boyutlandırın, sonra sıkıştırın.",
      },
      {
        q: "PNG dosyalarında şeffaflık korunuyor mu?",
        a: "Evet. PNG dosyaları PNG olarak yeniden kodlanır, bu yüzden alfa şeffaflığı korunur. JPG şeffaflığı desteklemez; bu yüzden her dosyayı orijinal formatında tutuyoruz.",
      },
      {
        q: "Resimlerim yükleniyor mu?",
        a: "Hayır. Boyutlandırma tarayıcınızda canvas API'si ile yapılır, resimler cihazınızdan hiç çıkmaz. Dosya boyutu sınırı yoktur ve hiçbir şey saklanmaz veya kaydedilmez.",
      },
    ],
    relatedTitle: "İlgili araçlar",
    related: [
      { href: "/tools/image-compress", label: "Resim Sıkıştırma" },
      { href: "/tools/image-convert", label: "Resim Format Dönüştürücü" },
      { href: "/tools/favicon-generator", label: "Favicon Üretici" },
      { href: "/tools/exif-cleaner", label: "EXIF Temizleyici" },
      { href: "/tools/heic-convert", label: "HEIC'i JPG'ye Çevirme" },
    ],
  },
  es: {
    intro: [
      "Redimensionar cambia las dimensiones reales en píxeles de una imagen: una foto de móvil de 4000 × 3000 pasa a 1920 × 1440, por ejemplo. Es distinto de comprimir, que mantiene las dimensiones y solo recodifica los datos. Redimensionar suele ahorrar mucho más espacio, porque el tamaño del archivo escala con el número de píxeles.",
      "La mayoría de las imágenes que la gente sube son mucho más grandes de lo necesario. Una foto de perfil que se muestra a 400 px de ancho no gana nada por tener 4000 px, y una web que sirve archivos de cámara a resolución completa a los móviles desperdicia ancho de banda y tiempo de carga.",
      "La proporción se conserva siempre, así que nada se deforma. Todo se ejecuta localmente en tu navegador: sin subida, sin límite de tamaño, sin esperas.",
    ],
    howToTitle: "Cómo redimensionar una imagen",
    howToSteps: [
      "Arrastra una o varias imágenes al área de carga: se admiten JPG, PNG y WebP, y los lotes no son problema.",
      "Elige tu método: un ancho objetivo en píxeles o un porcentaje del tamaño original.",
      "Ajusta la calidad de salida. Más alta conserva más detalle; el 85% es un buen valor por defecto para fotografías.",
      "Revisa las dimensiones y el tamaño indicados para cada imagen y descarga una a una o todas juntas.",
    ],
    featuresTitle: "Qué hace esta herramienta",
    features: [
      {
        title: "Por ancho o porcentaje",
        desc: "Introduce un ancho exacto en píxeles para requisitos precisos, o escala por porcentaje cuando solo necesitas que todo sea más pequeño.",
      },
      {
        title: "Proporción bloqueada",
        desc: "La altura se calcula automáticamente a partir del ancho, así que las imágenes nunca se ven estiradas ni achatadas.",
      },
      {
        title: "Procesamiento por lotes",
        desc: "Redimensiona un conjunto entero de imágenes al mismo ancho en una pasada: útil para preparar fotos de producto o una galería.",
      },
      {
        title: "Escalado de alta calidad",
        desc: "Usa el suavizado de imagen de alta calidad del navegador al reducir, de modo que el resultado se mantiene nítido y no pixelado.",
      },
    ],
    faqTitle: "Preguntas frecuentes",
    faq: [
      {
        q: "¿A qué tamaño debo redimensionar mis imágenes?",
        a: "Para imágenes web a todo el ancho, 1600–1920 px de ancho es más que suficiente. Para imágenes de artículos, 800–1200 px. Para miniaturas y avatares, 200–400 px. Para adjuntos de correo, 1200 px suele ser un buen equilibrio entre calidad y tamaño.",
      },
      {
        q: "¿Redimensionar reduce la calidad?",
        a: "Reducir una imagen se ve excelente, porque descartas píxeles que no estabas mostrando. El problema es ampliar: escalar hacia arriba no puede inventar detalle que nunca se capturó, así que el resultado se ve borroso. Reduce siempre, nunca amplíes.",
      },
      {
        q: "¿Redimensionar o comprimir?",
        a: "Redimensiona cuando las dimensiones son mayores de lo necesario: esa es la mayor ganancia. Comprime cuando las dimensiones ya son correctas pero el archivo sigue pesando. Para imágenes web, haz ambas: primero redimensionar, luego comprimir.",
      },
      {
        q: "¿Mantiene la transparencia de los PNG?",
        a: "Sí. Los archivos PNG se recodifican como PNG, así que se conserva la transparencia alfa. JPG no admite transparencia, por eso mantenemos cada archivo en su formato original.",
      },
      {
        q: "¿Se suben mis imágenes?",
        a: "No. El redimensionado ocurre en tu navegador con la API canvas, así que las imágenes nunca salen de tu dispositivo. No hay límite de tamaño y nada se almacena ni registra.",
      },
    ],
    relatedTitle: "Herramientas relacionadas",
    related: [
      { href: "/tools/image-compress", label: "Comprimir imágenes" },
      { href: "/tools/image-convert", label: "Convertir formato" },
      { href: "/tools/favicon-generator", label: "Generador de favicon" },
      { href: "/tools/exif-cleaner", label: "Eliminar EXIF" },
      { href: "/tools/heic-convert", label: "HEIC a JPG" },
    ],
  },
  de: {
    intro: [
      "Skalieren ändert die tatsächlichen Pixelabmessungen eines Bildes – aus einem 4000 × 3000 Handyfoto wird zum Beispiel 1920 × 1440. Das unterscheidet sich von Komprimierung, die die Abmessungen behält und nur die Daten neu kodiert. Skalieren spart meist deutlich mehr Platz, denn die Dateigröße skaliert mit der Pixelanzahl.",
      "Die meisten Bilder, die hochgeladen werden, sind weit größer als nötig. Ein Profilbild, das 400 px breit dargestellt wird, gewinnt nichts dadurch, 4000 px zu haben, und eine Website, die Kameradateien in voller Auflösung an Smartphones ausliefert, verschwendet Bandbreite und Ladezeit.",
      "Das Seitenverhältnis bleibt immer erhalten, nichts wird verzerrt. Alles läuft lokal in Ihrem Browser: kein Upload, keine Größenbeschränkung, keine Wartezeit.",
    ],
    howToTitle: "Bildgröße ändern – so geht's",
    howToSteps: [
      "Ziehen Sie ein oder mehrere Bilder in den Upload-Bereich – JPG, PNG und WebP werden unterstützt, Stapel sind kein Problem.",
      "Wählen Sie die Methode: eine Zielbreite in Pixeln oder einen Prozentwert der Originalgröße.",
      "Legen Sie die Ausgabequalität fest. Höher bewahrt mehr Details; 85% ist ein guter Standardwert für Fotos.",
      "Prüfen Sie die angezeigten Abmessungen und Dateigrößen und laden Sie einzeln oder alle zusammen herunter.",
    ],
    featuresTitle: "Was dieses Tool kann",
    features: [
      {
        title: "Nach Breite oder Prozent",
        desc: "Geben Sie für präzise Anforderungen eine exakte Pixelbreite ein oder skalieren Sie prozentual, wenn einfach alles kleiner werden soll.",
      },
      {
        title: "Seitenverhältnis fixiert",
        desc: "Die Höhe wird automatisch aus der Breite berechnet, sodass Bilder nie gestreckt oder gequetscht wirken.",
      },
      {
        title: "Stapelverarbeitung",
        desc: "Skalieren Sie einen ganzen Bildersatz in einem Durchgang auf dieselbe Breite – praktisch für Produktfotos oder eine Galerie.",
      },
      {
        title: "Hochwertige Skalierung",
        desc: "Nutzt beim Verkleinern die hochwertige Bildglättung des Browsers, damit Ergebnisse scharf statt verpixelt bleiben.",
      },
    ],
    faqTitle: "Häufige Fragen",
    faq: [
      {
        q: "Auf welche Größe soll ich meine Bilder bringen?",
        a: "Für Website-Bilder in voller Breite genügen 1600–1920 px Breite. Für Bilder in Artikeln 800–1200 px. Für Thumbnails und Avatare 200–400 px. Für E-Mail-Anhänge sind 1200 px meist ein guter Kompromiss zwischen Qualität und Größe.",
      },
      {
        q: "Verschlechtert Skalieren die Qualität?",
        a: "Ein Bild kleiner zu machen sieht ausgezeichnet aus, denn Sie verwerfen Pixel, die ohnehin nicht dargestellt wurden. Problematisch ist das Vergrößern: Hochskalieren kann keine Details erfinden, die nie aufgenommen wurden – das Ergebnis wirkt weich. Immer verkleinern, nie vergrößern.",
      },
      {
        q: "Skalieren oder komprimieren?",
        a: "Skalieren Sie, wenn die Abmessungen größer als nötig sind – das ist der größere Gewinn. Komprimieren Sie, wenn die Abmessungen stimmen, die Datei aber noch schwer ist. Für Webbilder beides: erst skalieren, dann komprimieren.",
      },
      {
        q: "Bleibt Transparenz in PNG-Dateien erhalten?",
        a: "Ja. PNG-Dateien werden als PNG neu kodiert, die Alpha-Transparenz bleibt erhalten. JPG unterstützt keine Transparenz – deshalb behalten wir jede Datei in ihrem Originalformat.",
      },
      {
        q: "Werden meine Bilder hochgeladen?",
        a: "Nein. Das Skalieren läuft im Browser über die Canvas-API, Bilder verlassen Ihr Gerät nie. Es gibt keine Größenbeschränkung und nichts wird gespeichert oder protokolliert.",
      },
    ],
    relatedTitle: "Verwandte Tools",
    related: [
      { href: "/tools/image-compress", label: "Bilder komprimieren" },
      { href: "/tools/image-convert", label: "Format konvertieren" },
      { href: "/tools/favicon-generator", label: "Favicon-Generator" },
      { href: "/tools/exif-cleaner", label: "EXIF entfernen" },
      { href: "/tools/heic-convert", label: "HEIC in JPG" },
    ],
  },
  pt: {
    intro: [
      "Redimensionar altera as dimensões reais em pixels de uma imagem — uma foto de celular de 4000 × 3000 passa a 1920 × 1440, por exemplo. É diferente de comprimir, que mantém as dimensões e apenas recodifica os dados. Redimensionar geralmente economiza muito mais espaço, porque o tamanho do arquivo escala com o número de pixels.",
      "A maioria das imagens que as pessoas enviam é bem maior do que precisa ser. Uma foto de perfil exibida com 400 px de largura não ganha nada por ter 4000 px, e um site que entrega arquivos de câmera em resolução total para celulares desperdiça banda e tempo de carregamento.",
      "A proporção é sempre preservada, então nada fica esticado. Tudo roda localmente no seu navegador: sem upload, sem limite de tamanho, sem espera.",
    ],
    howToTitle: "Como redimensionar uma imagem",
    howToSteps: [
      "Arraste uma ou mais imagens para a área de upload — JPG, PNG e WebP são suportados, e lotes não são problema.",
      "Escolha o método: uma largura alvo em pixels ou uma porcentagem do tamanho original.",
      "Defina a qualidade de saída. Mais alta preserva mais detalhe; 85% é um bom padrão para fotografias.",
      "Verifique as dimensões e o tamanho informados para cada imagem e baixe uma a uma ou todas juntas.",
    ],
    featuresTitle: "O que esta ferramenta faz",
    features: [
      {
        title: "Por largura ou porcentagem",
        desc: "Informe uma largura exata em pixels para requisitos precisos, ou escale por porcentagem quando você só precisa de tudo menor.",
      },
      {
        title: "Proporção travada",
        desc: "A altura é calculada automaticamente a partir da largura, então as imagens nunca aparecem esticadas ou achatadas.",
      },
      {
        title: "Processamento em lote",
        desc: "Redimensione um conjunto inteiro de imagens para a mesma largura de uma vez — útil para preparar fotos de produto ou uma galeria.",
      },
      {
        title: "Escala de alta qualidade",
        desc: "Usa a suavização de imagem de alta qualidade do navegador ao reduzir, mantendo o resultado nítido em vez de pixelado.",
      },
    ],
    faqTitle: "Perguntas frequentes",
    faq: [
      {
        q: "Para qual tamanho devo redimensionar minhas imagens?",
        a: "Para imagens de site em largura total, 1600–1920 px de largura é bastante. Para imagens de artigos, 800–1200 px. Para miniaturas e avatares, 200–400 px. Para anexos de e-mail, 1200 px costuma ser um bom equilíbrio entre qualidade e tamanho.",
      },
      {
        q: "Redimensionar reduz a qualidade?",
        a: "Diminuir uma imagem fica excelente, porque você descarta pixels que não estavam sendo exibidos. O problema é ampliar: aumentar não inventa detalhe que nunca foi capturado, então o resultado fica borrado. Sempre reduza, nunca amplie.",
      },
      {
        q: "Redimensionar ou comprimir?",
        a: "Redimensione quando as dimensões são maiores do que o necessário — esse é o maior ganho. Comprima quando as dimensões já estão certas mas o arquivo continua pesado. Para imagens web, faça os dois: primeiro redimensionar, depois comprimir.",
      },
      {
        q: "Mantém a transparência em arquivos PNG?",
        a: "Sim. Arquivos PNG são recodificados como PNG, então a transparência alfa é preservada. JPG não suporta transparência, e é por isso que mantemos cada arquivo no formato original.",
      },
      {
        q: "Minhas imagens são enviadas?",
        a: "Não. O redimensionamento acontece no seu navegador pela API canvas, então as imagens nunca saem do dispositivo. Não há limite de tamanho e nada é armazenado ou registrado.",
      },
    ],
    relatedTitle: "Ferramentas relacionadas",
    related: [
      { href: "/tools/image-compress", label: "Comprimir imagens" },
      { href: "/tools/image-convert", label: "Converter formato" },
      { href: "/tools/favicon-generator", label: "Gerador de favicon" },
      { href: "/tools/exif-cleaner", label: "Remover EXIF" },
      { href: "/tools/heic-convert", label: "HEIC para JPG" },
    ],
  },
  fr: {
    intro: [
      "Redimensionner change les dimensions réelles en pixels d'une image : une photo de téléphone de 4000 × 3000 devient 1920 × 1440, par exemple. C'est différent de la compression, qui conserve les dimensions et ne fait que ré-encoder les données. Redimensionner économise généralement bien plus de place, car la taille du fichier évolue avec le nombre de pixels.",
      "La plupart des images envoyées sont bien plus grandes que nécessaire. Une photo de profil affichée en 400 px de large ne gagne rien à peser 4000 px, et un site qui livre des fichiers d'appareil photo en pleine résolution aux mobiles gaspille bande passante et temps de chargement.",
      "Les proportions sont toujours conservées, rien n'est déformé. Tout s'exécute localement dans votre navigateur : aucun envoi, aucune limite de taille, aucune attente.",
    ],
    howToTitle: "Comment redimensionner une image",
    howToSteps: [
      "Déposez une ou plusieurs images dans la zone d'envoi — JPG, PNG et WebP sont pris en charge, les lots ne posent pas de problème.",
      "Choisissez votre méthode : une largeur cible en pixels ou un pourcentage de la taille d'origine.",
      "Réglez la qualité de sortie. Plus élevée conserve plus de détails ; 85% est une bonne valeur par défaut pour les photographies.",
      "Vérifiez les dimensions et la taille indiquées pour chaque image, puis téléchargez une par une ou toutes ensemble.",
    ],
    featuresTitle: "Ce que fait cet outil",
    features: [
      {
        title: "Par largeur ou pourcentage",
        desc: "Saisissez une largeur exacte en pixels pour des besoins précis, ou réduisez en pourcentage quand il faut simplement que tout soit plus petit.",
      },
      {
        title: "Proportions verrouillées",
        desc: "La hauteur est calculée automatiquement à partir de la largeur : les images n'apparaissent jamais étirées ni écrasées.",
      },
      {
        title: "Traitement par lots",
        desc: "Redimensionnez tout un ensemble d'images à la même largeur en une passe — pratique pour préparer des photos produit ou une galerie.",
      },
      {
        title: "Mise à l'échelle de qualité",
        desc: "Utilise le lissage d'image haute qualité du navigateur lors de la réduction, pour un résultat net plutôt que pixelisé.",
      },
    ],
    faqTitle: "Questions fréquentes",
    faq: [
      {
        q: "À quelle taille redimensionner mes images ?",
        a: "Pour des images pleine largeur sur un site, 1600–1920 px de large suffisent largement. Pour des images d'articles, 800–1200 px. Pour des vignettes et avatars, 200–400 px. Pour des pièces jointes, 1200 px est souvent un bon compromis entre qualité et poids.",
      },
      {
        q: "Le redimensionnement dégrade-t-il la qualité ?",
        a: "Réduire une image donne un excellent résultat, car vous supprimez des pixels qui n'étaient de toute façon pas affichés. C'est l'agrandissement qui pose problème : augmenter la taille ne peut pas inventer des détails jamais capturés, le rendu devient flou. Réduisez toujours, n'agrandissez jamais.",
      },
      {
        q: "Redimensionner ou compresser ?",
        a: "Redimensionnez quand les dimensions dépassent le besoin — c'est le gain le plus important. Compressez quand les dimensions sont bonnes mais le fichier reste lourd. Pour le web, faites les deux : redimensionnez d'abord, compressez ensuite.",
      },
      {
        q: "La transparence des PNG est-elle conservée ?",
        a: "Oui. Les fichiers PNG sont ré-encodés en PNG, la transparence alpha est donc préservée. JPG ne gère pas la transparence, c'est pourquoi nous conservons chaque fichier dans son format d'origine.",
      },
      {
        q: "Mes images sont-elles envoyées ?",
        a: "Non. Le redimensionnement a lieu dans votre navigateur via l'API canvas : les images ne quittent jamais votre appareil. Aucune limite de taille, et rien n'est stocké ni journalisé.",
      },
    ],
    relatedTitle: "Outils associés",
    related: [
      { href: "/tools/image-compress", label: "Compresser des images" },
      { href: "/tools/image-convert", label: "Convertir le format" },
      { href: "/tools/favicon-generator", label: "Générateur de favicon" },
      { href: "/tools/exif-cleaner", label: "Supprimer les EXIF" },
      { href: "/tools/heic-convert", label: "HEIC en JPG" },
    ],
  },
};
