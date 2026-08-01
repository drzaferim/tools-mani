import type { ToolContentMap } from "@/components/ToolContent";

/**
 * Metin Karşılaştırma sayfasının SEO içeriği.
 * Hedef sorgular: text diff, compare text online, online text difference checker,
 * diff checker, text comparison tool.
 */
export const textDiffContent: ToolContentMap = {
  en: {
    intro: [
      "A text difference checker compares two versions of the same text and shows you exactly which lines were added, removed or left untouched. Instead of re-reading both versions side by side, you see a colour-coded diff: green for additions, red for deletions.",
      "This tool uses a longest-common-subsequence algorithm — the same family of algorithms behind git diff — so it aligns matching lines intelligently rather than comparing line 1 to line 1. Insert a paragraph in the middle and the rest of the document still lines up correctly.",
      "The comparison runs entirely in your browser. That matters when you are diffing contract drafts, medical notes, source code or anything else you would rather not paste into someone else's server.",
    ],
    howToTitle: "How to compare two texts",
    howToSteps: [
      "Paste the original version into the left box — the earlier draft, the deployed config, the file you started with.",
      "Paste the changed version into the right box. The diff appears immediately; there is no button to press.",
      "Read the result: green lines with a + were added, red lines with a − were removed, and unmarked lines are identical in both versions.",
      "Check the summary counts above the diff to see how many lines changed in total.",
    ],
    featuresTitle: "What this tool does",
    features: [
      {
        title: "Line-by-line diff",
        desc: "Additions and deletions are highlighted in place, with the surrounding unchanged context kept visible so you can see where each change belongs.",
      },
      {
        title: "Smart line alignment",
        desc: "An LCS algorithm matches identical lines even when content is inserted or deleted earlier in the text, so a single added paragraph does not mark everything after it as changed.",
      },
      {
        title: "Live comparison",
        desc: "The diff recalculates as you type or paste. No submit button, no page reload, no waiting for a server round trip.",
      },
      {
        title: "Nothing is uploaded",
        desc: "Both texts stay in your browser's memory and are discarded when you close the tab. Suitable for confidential documents, contracts and source code.",
      },
    ],
    faqTitle: "Frequently asked questions",
    faq: [
      {
        q: "How does a text difference checker work?",
        a: "It splits both texts into lines and finds the longest sequence of lines that appear in both, in the same order. Everything outside that sequence is reported as either an addition (present only in the second text) or a deletion (present only in the first).",
      },
      {
        q: "Can I compare two documents like Word files?",
        a: "This tool compares plain text. To diff documents, copy the text out of each document and paste it into the two boxes. Formatting, fonts and images are not compared — only the words.",
      },
      {
        q: "Does it show differences within a line?",
        a: "Yes. Choose Line for paragraph and code changes, or Word to highlight the exact words and punctuation that were added or removed.",
      },
      {
        q: "Is there a limit on text length?",
        a: "There is no artificial line limit. For very large inputs, the tool automatically switches to a memory-bounded comparison strategy so the browser stays responsive; practical limits depend on your device.",
      },
      {
        q: "Is my text sent to a server?",
        a: "No. The entire comparison happens in your browser with JavaScript. Nothing is uploaded, stored or logged — you can confirm this by disconnecting from the internet after the page loads; the tool keeps working.",
      },
      {
        q: "Can I use it to compare code?",
        a: "Yes. Line-based diffing is exactly how version control systems compare source files, so it works well for code, configuration, JSON, CSV and logs. Whitespace differences are treated as real differences, as they are in git.",
      },
      {
        q: "Why do two lines that look identical show as different?",
        a: "Almost always invisible characters: trailing spaces, a tab instead of spaces, or different line endings (CRLF from Windows versus LF from Unix). The comparison is exact, so these count as changes.",
      },
      {
        q: "Does it work on mobile?",
        a: "Yes. The two input areas stack vertically on small screens and the diff output scrolls horizontally when lines are long.",
      },
    ],
    relatedTitle: "Related tools",
    related: [
      { href: "/tools/text-counter", label: "Word & Character Counter" },
      { href: "/tools/case-converter", label: "Case Converter" },
      { href: "/tools/json-formatter", label: "JSON Formatter" },
      { href: "/tools/markdown-preview", label: "Markdown Preview" },
      { href: "/tools/csv-json", label: "CSV ↔ JSON Converter" },
    ],
  },
  tr: {
    intro: [
      "Metin karşılaştırma aracı, aynı metnin iki sürümünü karşılaştırır ve hangi satırların eklendiğini, silindiğini veya değişmediğini tam olarak gösterir. İki sürümü yan yana tekrar okumak yerine renkli bir fark listesi görürsünüz: eklemeler yeşil, silmeler kırmızı.",
      "Bu araç en uzun ortak alt dizi (LCS) algoritmasını kullanır — git diff'in arkasındaki algoritma ailesinin aynısı. Böylece satırları körlemesine 1'e 1 karşılaştırmak yerine eşleşen satırları akıllıca hizalar. Metnin ortasına bir paragraf eklerseniz geri kalan belge yine doğru hizalanır.",
      "Karşılaştırma tamamen tarayıcınızda çalışır. Sözleşme taslakları, hasta notları, kaynak kodu veya başkasının sunucusuna yapıştırmak istemeyeceğiniz her şeyi karşılaştırırken bu önemlidir.",
    ],
    howToTitle: "İki metin nasıl karşılaştırılır",
    howToSteps: [
      "Orijinal sürümü soldaki alana yapıştırın — önceki taslak, yayındaki yapılandırma veya başladığınız dosya.",
      "Değişmiş sürümü sağdaki alana yapıştırın. Fark listesi anında görünür; basılacak bir düğme yoktur.",
      "Sonucu okuyun: + işaretli yeşil satırlar eklenmiş, − işaretli kırmızı satırlar silinmiş, işaretsiz satırlar her iki sürümde aynıdır.",
      "Toplam kaç satırın değiştiğini görmek için fark listesinin üstündeki özet sayılara bakın.",
    ],
    featuresTitle: "Bu araç ne yapar",
    features: [
      {
        title: "Satır satır fark",
        desc: "Eklemeler ve silmeler yerinde vurgulanır; çevresindeki değişmemiş bağlam görünür kalır, böylece her değişikliğin nereye ait olduğunu görebilirsiniz.",
      },
      {
        title: "Akıllı satır hizalama",
        desc: "LCS algoritması, metnin başına içerik eklenmiş veya silinmiş olsa bile aynı satırları eşleştirir; tek bir eklenen paragraf, sonrasındaki her şeyi değişmiş göstermez.",
      },
      {
        title: "Canlı karşılaştırma",
        desc: "Fark listesi yazdıkça veya yapıştırdıkça yeniden hesaplanır. Gönder düğmesi yok, sayfa yenilenmiyor, sunucu turu beklenmiyor.",
      },
      {
        title: "Hiçbir şey yüklenmez",
        desc: "İki metin de tarayıcınızın belleğinde kalır ve sekmeyi kapattığınızda silinir. Gizli belgeler, sözleşmeler ve kaynak kodu için uygundur.",
      },
    ],
    faqTitle: "Sık sorulan sorular",
    faq: [
      {
        q: "Metin karşılaştırma aracı nasıl çalışır?",
        a: "İki metni satırlara böler ve her ikisinde de aynı sırayla görünen en uzun satır dizisini bulur. Bu dizinin dışında kalan her şey ya ekleme (yalnızca ikinci metinde var) ya da silme (yalnızca birinci metinde var) olarak bildirilir.",
      },
      {
        q: "Word dosyası gibi iki belgeyi karşılaştırabilir miyim?",
        a: "Bu araç düz metni karşılaştırır. Belgeleri karşılaştırmak için metni her belgeden kopyalayıp iki alana yapıştırın. Biçimlendirme, yazı tipleri ve görseller karşılaştırılmaz — yalnızca kelimeler.",
      },
      {
        q: "Satır içindeki farkları gösteriyor mu?",
        a: "Evet. Paragraf ve kod değişiklikleri için Satır'ı, eklenen veya silinen kelime ve noktalama işaretlerini görmek için Kelime'yi seçin.",
      },
      {
        q: "Metin uzunluğu sınırı var mı?",
        a: "Yapay bir satır sınırı yoktur. Çok büyük metinlerde araç, tarayıcıyı akıcı tutmak için otomatik olarak bellek sınırlı karşılaştırmaya geçer; pratik sınır cihazınıza bağlıdır.",
      },
      {
        q: "Metnim bir sunucuya gönderiliyor mu?",
        a: "Hayır. Karşılaştırmanın tamamı tarayıcınızda JavaScript ile yapılır. Hiçbir şey yüklenmez, saklanmaz veya kaydedilmez — sayfa yüklendikten sonra internet bağlantınızı keserek doğrulayabilirsiniz; araç çalışmaya devam eder.",
      },
      {
        q: "Kod karşılaştırmak için kullanabilir miyim?",
        a: "Evet. Satır tabanlı karşılaştırma, sürüm kontrol sistemlerinin kaynak dosyaları karşılaştırma biçiminin aynısıdır; kod, yapılandırma, JSON, CSV ve günlük dosyaları için iyi çalışır. Boşluk farkları, git'te olduğu gibi gerçek fark sayılır.",
      },
      {
        q: "Aynı görünen iki satır neden farklı çıkıyor?",
        a: "Neredeyse her zaman görünmez karakterler yüzünden: satır sonundaki boşluklar, boşluk yerine sekme veya farklı satır sonu karakterleri (Windows'un CRLF'i ile Unix'in LF'i). Karşılaştırma birebir olduğu için bunlar değişiklik sayılır.",
      },
      {
        q: "Mobilde çalışıyor mu?",
        a: "Evet. Küçük ekranlarda iki giriş alanı dikey olarak sıralanır ve satırlar uzun olduğunda fark çıktısı yatay kaydırılır.",
      },
    ],
    relatedTitle: "İlgili araçlar",
    related: [
      { href: "/tools/text-counter", label: "Kelime ve Karakter Sayacı" },
      { href: "/tools/case-converter", label: "Harf Dönüştürücü" },
      { href: "/tools/json-formatter", label: "JSON Biçimlendirici" },
      { href: "/tools/markdown-preview", label: "Markdown Önizleme" },
      { href: "/tools/csv-json", label: "CSV ↔ JSON Dönüştürücü" },
    ],
  },
  es: {
    intro: [
      "Un comparador de textos analiza dos versiones del mismo texto y te muestra exactamente qué líneas se añadieron, se eliminaron o quedaron intactas. En lugar de releer ambas versiones lado a lado, ves una comparación con colores: verde para añadidos, rojo para eliminados.",
      "Esta herramienta usa un algoritmo de subsecuencia común más larga (LCS), la misma familia de algoritmos detrás de git diff, así que alinea las líneas coincidentes de forma inteligente en vez de comparar la línea 1 con la línea 1. Inserta un párrafo en el medio y el resto del documento sigue alineándose correctamente.",
      "La comparación se ejecuta por completo en tu navegador. Eso importa cuando comparas borradores de contratos, notas médicas, código fuente o cualquier cosa que preferirías no pegar en el servidor de otra persona.",
    ],
    howToTitle: "Cómo comparar dos textos",
    howToSteps: [
      "Pega la versión original en el cuadro izquierdo: el borrador anterior, la configuración en producción o el archivo de partida.",
      "Pega la versión modificada en el cuadro derecho. La comparación aparece de inmediato; no hay botón que pulsar.",
      "Lee el resultado: las líneas verdes con + se añadieron, las rojas con − se eliminaron y las líneas sin marca son idénticas en ambas versiones.",
      "Consulta el resumen sobre la comparación para ver cuántas líneas cambiaron en total.",
    ],
    featuresTitle: "Qué hace esta herramienta",
    features: [
      {
        title: "Comparación línea por línea",
        desc: "Los añadidos y las eliminaciones se resaltan en su sitio, manteniendo visible el contexto sin cambios para que veas dónde encaja cada modificación.",
      },
      {
        title: "Alineación inteligente de líneas",
        desc: "Un algoritmo LCS empareja líneas idénticas incluso cuando se ha insertado o borrado contenido antes, de modo que un párrafo añadido no marca como cambiado todo lo que viene después.",
      },
      {
        title: "Comparación en vivo",
        desc: "La comparación se recalcula mientras escribes o pegas. Sin botón de enviar, sin recargar la página, sin esperar a un servidor.",
      },
      {
        title: "Nada se sube",
        desc: "Ambos textos permanecen en la memoria de tu navegador y se descartan al cerrar la pestaña. Apto para documentos confidenciales, contratos y código fuente.",
      },
    ],
    faqTitle: "Preguntas frecuentes",
    faq: [
      {
        q: "¿Cómo funciona un comparador de textos?",
        a: "Divide ambos textos en líneas y encuentra la secuencia más larga de líneas que aparecen en los dos, en el mismo orden. Todo lo que queda fuera de esa secuencia se reporta como añadido (solo en el segundo texto) o eliminado (solo en el primero).",
      },
      {
        q: "¿Puedo comparar dos documentos de Word?",
        a: "Esta herramienta compara texto plano. Para comparar documentos, copia el texto de cada uno y pégalo en los dos cuadros. El formato, las fuentes y las imágenes no se comparan, solo las palabras.",
      },
      {
        q: "¿Muestra diferencias dentro de una línea?",
        a: "Sí. Elige Línea para cambios de párrafos y código, o Palabra para resaltar las palabras y signos exactos añadidos o eliminados.",
      },
      {
        q: "¿Hay límite de longitud del texto?",
        a: "No hay un límite artificial de líneas. Con textos muy grandes, la herramienta cambia automáticamente a una estrategia de memoria limitada para mantener el navegador fluido; el límite práctico depende del dispositivo.",
      },
      {
        q: "¿Se envía mi texto a un servidor?",
        a: "No. Toda la comparación ocurre en tu navegador con JavaScript. Nada se sube, almacena ni registra: puedes confirmarlo desconectando internet tras cargar la página; la herramienta seguirá funcionando.",
      },
      {
        q: "¿Sirve para comparar código?",
        a: "Sí. La comparación por líneas es exactamente cómo los sistemas de control de versiones comparan archivos fuente, así que funciona bien con código, configuración, JSON, CSV y registros. Las diferencias de espacios cuentan como cambios reales, igual que en git.",
      },
      {
        q: "¿Por qué dos líneas que parecen iguales salen distintas?",
        a: "Casi siempre por caracteres invisibles: espacios al final, un tabulador en lugar de espacios, o finales de línea distintos (CRLF de Windows frente a LF de Unix). La comparación es exacta, así que eso cuenta como cambio.",
      },
      {
        q: "¿Funciona en el móvil?",
        a: "Sí. Las dos áreas de entrada se apilan verticalmente en pantallas pequeñas y la salida se desplaza horizontalmente cuando las líneas son largas.",
      },
    ],
    relatedTitle: "Herramientas relacionadas",
    related: [
      { href: "/tools/text-counter", label: "Contador de palabras" },
      { href: "/tools/case-converter", label: "Conversor de mayúsculas" },
      { href: "/tools/json-formatter", label: "Formateador JSON" },
      { href: "/tools/markdown-preview", label: "Vista previa Markdown" },
      { href: "/tools/csv-json", label: "Conversor CSV ↔ JSON" },
    ],
  },
  de: {
    intro: [
      "Ein Textvergleich-Tool vergleicht zwei Versionen desselben Textes und zeigt genau, welche Zeilen hinzugefügt, entfernt oder unverändert geblieben sind. Statt beide Versionen nebeneinander erneut zu lesen, sehen Sie einen farbcodierten Vergleich: grün für Ergänzungen, rot für Löschungen.",
      "Das Tool nutzt einen Longest-Common-Subsequence-Algorithmus – dieselbe Algorithmenfamilie, die hinter git diff steckt. Übereinstimmende Zeilen werden dadurch intelligent zugeordnet, statt Zeile 1 mit Zeile 1 zu vergleichen. Fügen Sie mitten im Text einen Absatz ein, passt der Rest des Dokuments weiterhin zusammen.",
      "Der Vergleich läuft vollständig in Ihrem Browser. Das zählt, wenn Sie Vertragsentwürfe, Patientennotizen, Quellcode oder anderes vergleichen, das Sie nicht in einen fremden Server einfügen möchten.",
    ],
    howToTitle: "Zwei Texte vergleichen – so geht's",
    howToSteps: [
      "Fügen Sie die Originalversion in das linke Feld ein – den früheren Entwurf, die aktive Konfiguration oder die Ausgangsdatei.",
      "Fügen Sie die geänderte Version rechts ein. Der Vergleich erscheint sofort; es gibt keinen Button zu drücken.",
      "Lesen Sie das Ergebnis: grüne Zeilen mit + wurden hinzugefügt, rote mit − entfernt, unmarkierte Zeilen sind in beiden Versionen identisch.",
      "Die Zusammenfassung über dem Vergleich zeigt, wie viele Zeilen sich insgesamt geändert haben.",
    ],
    featuresTitle: "Was dieses Tool kann",
    features: [
      {
        title: "Zeilenweiser Vergleich",
        desc: "Ergänzungen und Löschungen werden an ihrer Stelle hervorgehoben, der unveränderte Kontext bleibt sichtbar – so erkennen Sie, wohin jede Änderung gehört.",
      },
      {
        title: "Intelligente Zeilenzuordnung",
        desc: "Ein LCS-Algorithmus ordnet identische Zeilen auch dann zu, wenn vorher Inhalt eingefügt oder gelöscht wurde. Ein einzelner neuer Absatz markiert also nicht alles danach als geändert.",
      },
      {
        title: "Live-Vergleich",
        desc: "Der Vergleich wird beim Tippen oder Einfügen neu berechnet. Kein Absenden-Button, kein Neuladen, kein Warten auf einen Server.",
      },
      {
        title: "Nichts wird hochgeladen",
        desc: "Beide Texte bleiben im Speicher Ihres Browsers und werden beim Schließen des Tabs verworfen. Geeignet für vertrauliche Dokumente, Verträge und Quellcode.",
      },
    ],
    faqTitle: "Häufige Fragen",
    faq: [
      {
        q: "Wie funktioniert ein Textvergleich?",
        a: "Beide Texte werden in Zeilen zerlegt; gesucht wird die längste Folge von Zeilen, die in beiden in derselben Reihenfolge vorkommt. Alles außerhalb dieser Folge gilt als Ergänzung (nur im zweiten Text) oder Löschung (nur im ersten).",
      },
      {
        q: "Kann ich zwei Word-Dokumente vergleichen?",
        a: "Dieses Tool vergleicht reinen Text. Kopieren Sie zum Vergleich den Text aus jedem Dokument in die beiden Felder. Formatierung, Schriftarten und Bilder werden nicht verglichen – nur die Wörter.",
      },
      {
        q: "Zeigt es Unterschiede innerhalb einer Zeile?",
        a: "Ja. Wählen Sie Zeile für Absatz- und Codeänderungen oder Wort, um exakt hinzugefügte und entfernte Wörter und Satzzeichen hervorzuheben.",
      },
      {
        q: "Gibt es eine Längenbegrenzung?",
        a: "Es gibt kein künstliches Zeilenlimit. Bei sehr großen Texten wechselt das Tool automatisch zu einer speicherbegrenzten Strategie; die praktische Grenze hängt vom Gerät ab.",
      },
      {
        q: "Wird mein Text an einen Server gesendet?",
        a: "Nein. Der gesamte Vergleich läuft in Ihrem Browser mit JavaScript. Nichts wird hochgeladen, gespeichert oder protokolliert – trennen Sie nach dem Laden die Internetverbindung: das Tool funktioniert weiter.",
      },
      {
        q: "Kann ich damit Code vergleichen?",
        a: "Ja. Zeilenbasiertes Diffing ist genau die Methode, mit der Versionskontrollsysteme Quelldateien vergleichen – es funktioniert gut für Code, Konfiguration, JSON, CSV und Logs. Leerzeichenunterschiede gelten wie in git als echte Unterschiede.",
      },
      {
        q: "Warum werden identisch aussehende Zeilen als unterschiedlich angezeigt?",
        a: "Fast immer wegen unsichtbarer Zeichen: Leerzeichen am Zeilenende, ein Tabulator statt Leerzeichen oder unterschiedliche Zeilenenden (CRLF von Windows gegenüber LF von Unix). Der Vergleich ist exakt, daher zählen sie als Änderung.",
      },
      {
        q: "Funktioniert es auf dem Smartphone?",
        a: "Ja. Auf kleinen Bildschirmen werden die beiden Eingabefelder untereinander angeordnet, und die Ausgabe lässt sich bei langen Zeilen horizontal scrollen.",
      },
    ],
    relatedTitle: "Verwandte Tools",
    related: [
      { href: "/tools/text-counter", label: "Wortzähler" },
      { href: "/tools/case-converter", label: "Groß-/Kleinschreibung" },
      { href: "/tools/json-formatter", label: "JSON-Formatter" },
      { href: "/tools/markdown-preview", label: "Markdown-Vorschau" },
      { href: "/tools/csv-json", label: "CSV ↔ JSON Konverter" },
    ],
  },
  pt: {
    intro: [
      "Um comparador de textos analisa duas versões do mesmo texto e mostra exatamente quais linhas foram adicionadas, removidas ou permaneceram iguais. Em vez de reler as duas versões lado a lado, você vê uma comparação colorida: verde para adições, vermelho para remoções.",
      "Esta ferramenta usa um algoritmo de subsequência comum mais longa (LCS) — a mesma família de algoritmos por trás do git diff — então alinha linhas correspondentes de forma inteligente em vez de comparar a linha 1 com a linha 1. Insira um parágrafo no meio e o resto do documento continua alinhado corretamente.",
      "A comparação roda inteiramente no seu navegador. Isso importa quando você compara rascunhos de contrato, anotações médicas, código-fonte ou qualquer coisa que preferiria não colar no servidor de outra pessoa.",
    ],
    howToTitle: "Como comparar dois textos",
    howToSteps: [
      "Cole a versão original na caixa da esquerda — o rascunho anterior, a configuração em produção ou o arquivo inicial.",
      "Cole a versão alterada na caixa da direita. A comparação aparece imediatamente; não há botão para clicar.",
      "Leia o resultado: linhas verdes com + foram adicionadas, linhas vermelhas com − foram removidas e linhas sem marca são idênticas nas duas versões.",
      "Veja o resumo acima da comparação para saber quantas linhas mudaram no total.",
    ],
    featuresTitle: "O que esta ferramenta faz",
    features: [
      {
        title: "Comparação linha por linha",
        desc: "Adições e remoções são destacadas no lugar, mantendo visível o contexto inalterado para você ver onde cada mudança se encaixa.",
      },
      {
        title: "Alinhamento inteligente de linhas",
        desc: "Um algoritmo LCS combina linhas idênticas mesmo quando conteúdo foi inserido ou removido antes, então um único parágrafo adicionado não marca tudo depois dele como alterado.",
      },
      {
        title: "Comparação ao vivo",
        desc: "A comparação é recalculada enquanto você digita ou cola. Sem botão de enviar, sem recarregar a página, sem esperar o servidor.",
      },
      {
        title: "Nada é enviado",
        desc: "Os dois textos ficam na memória do seu navegador e são descartados ao fechar a aba. Adequado para documentos confidenciais, contratos e código-fonte.",
      },
    ],
    faqTitle: "Perguntas frequentes",
    faq: [
      {
        q: "Como funciona um comparador de textos?",
        a: "Ele divide os dois textos em linhas e encontra a sequência mais longa de linhas que aparecem em ambos, na mesma ordem. Tudo fora dessa sequência é reportado como adição (só no segundo texto) ou remoção (só no primeiro).",
      },
      {
        q: "Posso comparar dois documentos do Word?",
        a: "Esta ferramenta compara texto simples. Para comparar documentos, copie o texto de cada um e cole nas duas caixas. Formatação, fontes e imagens não são comparadas — apenas as palavras.",
      },
      {
        q: "Mostra diferenças dentro de uma linha?",
        a: "Sim. Escolha Linha para mudanças em parágrafos e código ou Palavra para destacar exatamente palavras e pontuação adicionadas ou removidas.",
      },
      {
        q: "Existe limite de tamanho do texto?",
        a: "Não há limite artificial de linhas. Em textos muito grandes, a ferramenta muda automaticamente para uma estratégia com memória limitada; o limite prático depende do dispositivo.",
      },
      {
        q: "Meu texto é enviado a um servidor?",
        a: "Não. Toda a comparação acontece no seu navegador com JavaScript. Nada é enviado, armazenado ou registrado — confirme desconectando a internet após carregar a página; a ferramenta continua funcionando.",
      },
      {
        q: "Serve para comparar código?",
        a: "Sim. A comparação por linhas é exatamente como sistemas de controle de versão comparam arquivos-fonte, então funciona bem para código, configuração, JSON, CSV e logs. Diferenças de espaço contam como mudanças reais, como no git.",
      },
      {
        q: "Por que duas linhas iguais aparecem como diferentes?",
        a: "Quase sempre por caracteres invisíveis: espaços no fim da linha, uma tabulação em vez de espaços, ou finais de linha diferentes (CRLF do Windows versus LF do Unix). A comparação é exata, então isso conta como mudança.",
      },
      {
        q: "Funciona no celular?",
        a: "Sim. As duas áreas de entrada ficam empilhadas verticalmente em telas pequenas e a saída rola horizontalmente quando as linhas são longas.",
      },
    ],
    relatedTitle: "Ferramentas relacionadas",
    related: [
      { href: "/tools/text-counter", label: "Contador de palavras" },
      { href: "/tools/case-converter", label: "Conversor de maiúsculas" },
      { href: "/tools/json-formatter", label: "Formatador JSON" },
      { href: "/tools/markdown-preview", label: "Pré-visualização Markdown" },
      { href: "/tools/csv-json", label: "Conversor CSV ↔ JSON" },
    ],
  },
  fr: {
    intro: [
      "Un comparateur de textes analyse deux versions du même texte et montre exactement quelles lignes ont été ajoutées, supprimées ou laissées intactes. Au lieu de relire les deux versions côte à côte, vous voyez une comparaison en couleurs : vert pour les ajouts, rouge pour les suppressions.",
      "Cet outil utilise un algorithme de plus longue sous-séquence commune (LCS) — la même famille d'algorithmes que git diff — et aligne donc intelligemment les lignes correspondantes au lieu de comparer la ligne 1 à la ligne 1. Insérez un paragraphe au milieu : le reste du document reste correctement aligné.",
      "La comparaison s'exécute entièrement dans votre navigateur. C'est important lorsque vous comparez des projets de contrat, des notes médicales, du code source ou tout ce que vous préférez ne pas coller sur le serveur d'un tiers.",
    ],
    howToTitle: "Comment comparer deux textes",
    howToSteps: [
      "Collez la version originale dans le champ de gauche — l'ancien brouillon, la configuration en production ou le fichier de départ.",
      "Collez la version modifiée à droite. La comparaison apparaît immédiatement ; aucun bouton à presser.",
      "Lisez le résultat : les lignes vertes avec + ont été ajoutées, les rouges avec − supprimées, et les lignes non marquées sont identiques dans les deux versions.",
      "Consultez le récapitulatif au-dessus de la comparaison pour voir combien de lignes ont changé au total.",
    ],
    featuresTitle: "Ce que fait cet outil",
    features: [
      {
        title: "Comparaison ligne par ligne",
        desc: "Les ajouts et suppressions sont surlignés sur place, le contexte inchangé restant visible pour situer chaque modification.",
      },
      {
        title: "Alignement intelligent des lignes",
        desc: "Un algorithme LCS apparie les lignes identiques même si du contenu a été inséré ou supprimé avant, de sorte qu'un seul paragraphe ajouté ne marque pas tout le reste comme modifié.",
      },
      {
        title: "Comparaison en direct",
        desc: "La comparaison se recalcule à mesure que vous tapez ou collez. Aucun bouton d'envoi, aucun rechargement, aucune attente serveur.",
      },
      {
        title: "Rien n'est envoyé",
        desc: "Les deux textes restent dans la mémoire de votre navigateur et sont effacés à la fermeture de l'onglet. Convient aux documents confidentiels, contrats et code source.",
      },
    ],
    faqTitle: "Questions fréquentes",
    faq: [
      {
        q: "Comment fonctionne un comparateur de textes ?",
        a: "Il découpe les deux textes en lignes et cherche la plus longue suite de lignes présentes dans les deux, dans le même ordre. Tout ce qui sort de cette suite est signalé comme ajout (présent seulement dans le second texte) ou suppression (seulement dans le premier).",
      },
      {
        q: "Puis-je comparer deux documents Word ?",
        a: "Cet outil compare du texte brut. Pour comparer des documents, copiez le texte de chacun et collez-le dans les deux champs. La mise en forme, les polices et les images ne sont pas comparées — seulement les mots.",
      },
      {
        q: "Affiche-t-il les différences à l'intérieur d'une ligne ?",
        a: "Oui. Choisissez Ligne pour les paragraphes et le code, ou Mot pour surligner précisément les mots et signes de ponctuation ajoutés ou supprimés.",
      },
      {
        q: "Y a-t-il une limite de longueur ?",
        a: "Il n'y a pas de limite artificielle de lignes. Pour les très grands textes, l'outil passe automatiquement à une stratégie à mémoire limitée ; la limite pratique dépend de l'appareil.",
      },
      {
        q: "Mon texte est-il envoyé à un serveur ?",
        a: "Non. Toute la comparaison se fait dans votre navigateur en JavaScript. Rien n'est envoyé, stocké ni journalisé — vérifiez-le en coupant votre connexion après le chargement de la page : l'outil continue de fonctionner.",
      },
      {
        q: "Peut-on comparer du code ?",
        a: "Oui. La comparaison par lignes est exactement la méthode des systèmes de gestion de versions pour les fichiers sources : elle fonctionne bien pour le code, la configuration, JSON, CSV et les journaux. Les différences d'espaces comptent comme de vraies différences, comme dans git.",
      },
      {
        q: "Pourquoi deux lignes identiques apparaissent-elles comme différentes ?",
        a: "Presque toujours à cause de caractères invisibles : espaces en fin de ligne, tabulation au lieu d'espaces, ou fins de ligne différentes (CRLF de Windows contre LF d'Unix). La comparaison est exacte, donc cela compte comme un changement.",
      },
      {
        q: "Cela fonctionne-t-il sur mobile ?",
        a: "Oui. Sur petits écrans, les deux zones de saisie s'empilent verticalement et la sortie défile horizontalement lorsque les lignes sont longues.",
      },
    ],
    relatedTitle: "Outils associés",
    related: [
      { href: "/tools/text-counter", label: "Compteur de mots" },
      { href: "/tools/case-converter", label: "Convertisseur de casse" },
      { href: "/tools/json-formatter", label: "Formateur JSON" },
      { href: "/tools/markdown-preview", label: "Aperçu Markdown" },
      { href: "/tools/csv-json", label: "Convertisseur CSV ↔ JSON" },
    ],
  },
};
