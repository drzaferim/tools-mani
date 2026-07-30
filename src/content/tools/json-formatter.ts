import type { ToolContentMap } from "@/components/ToolContent";

/**
 * JSON Biçimlendirici sayfasının SEO içeriği.
 * Hedef sorgular: json formatter, format json, json formatter online,
 * validate json, minify json, json beautifier.
 */
export const jsonFormatterContent: ToolContentMap = {
  en: {
    intro: [
      "A JSON formatter takes raw, minified or messy JSON and rewrites it with consistent indentation and line breaks so you can actually read it. This one also works as a validator: if the syntax is broken, you get the exact parser error instead of a vague \"invalid JSON\" message.",
      "Everything runs inside your browser using the native JSON parser. Nothing is uploaded, which matters because JSON payloads routinely contain API keys, access tokens, customer records and internal IDs — data you should not paste into a random server.",
      "Because there is no upload step, there is also no file size limit and no waiting. Paste a 10 MB API response and it formats as fast as your device can parse it.",
    ],
    howToTitle: "How to format JSON",
    howToSteps: [
      "Paste your JSON into the input box on the left — minified, pretty-printed or copied straight from a network tab.",
      "Choose an indentation width: 2 spaces (the most common convention), 4 spaces, or 8 for tab-like output.",
      "Click Format to beautify, Minify to strip all whitespace, or Validate to check syntax only.",
      "Copy the result with the Copy Output button, or fix any reported error and run it again.",
    ],
    featuresTitle: "What this tool does",
    features: [
      {
        title: "Beautify and minify",
        desc: "Pretty-print JSON for reading and debugging, or minify it to a single line to reduce payload size in API responses and config files.",
      },
      {
        title: "Precise error messages",
        desc: "Invalid JSON returns the browser's native parser error, which tells you the position of the problem — usually a trailing comma, single quotes or an unescaped character.",
      },
      {
        title: "Unicode and escapes preserved",
        desc: "Non-Latin text, emoji and escaped sequences survive formatting untouched, because the tool re-serializes the parsed structure rather than editing text.",
      },
      {
        title: "No size limit, no upload",
        desc: "Large payloads are handled locally by your device. Your JSON never reaches a server, so credentials inside it stay private.",
      },
    ],
    faqTitle: "Frequently asked questions",
    faq: [
      {
        q: "What does a JSON formatter actually do?",
        a: "It parses your JSON into a data structure, then writes it back out with consistent indentation and line breaks. The data is identical — only the whitespace changes. This makes nested objects and arrays readable at a glance.",
      },
      {
        q: "How do I validate JSON?",
        a: "Paste it and click Validate. If the syntax is correct you get a confirmation; if not, you get the parser error describing what went wrong and roughly where. Formatting also validates implicitly, since invalid JSON cannot be parsed.",
      },
      {
        q: "Why does my JSON say 'Unexpected token'?",
        a: "The three most common causes are a trailing comma after the last item, single quotes instead of double quotes around keys or strings, and unescaped characters such as a raw newline inside a string. JSON is stricter than JavaScript object literals.",
      },
      {
        q: "What is JSON minification for?",
        a: "Minifying removes every unnecessary space and newline, producing the smallest valid representation. It is useful for API responses, embedded configuration and anywhere bytes on the wire matter. The parsed result is exactly the same.",
      },
      {
        q: "Which indentation should I choose?",
        a: "Two spaces is the dominant convention in JavaScript, TypeScript and most JSON style guides. Four spaces is common in Python and Java ecosystems. Pick whatever matches the file you are pasting into.",
      },
      {
        q: "Is my JSON data sent to a server?",
        a: "No. Formatting, minifying and validating all happen locally in your browser through the built-in JSON parser. Nothing is transmitted, logged or stored — you can verify this by opening your browser's network tab while using the tool, or by disconnecting from the internet after the page loads.",
      },
      {
        q: "Is there a maximum file size?",
        a: "There is no artificial limit. The practical ceiling is your device's available memory, which typically means multi-megabyte payloads format without trouble.",
      },
      {
        q: "Does it support comments or trailing commas (JSON5)?",
        a: "No. This tool follows the strict JSON specification, which does not allow comments or trailing commas. If your file contains them, it is JSON5 or JSONC and must be cleaned up first.",
      },
    ],
    relatedTitle: "Related tools",
    related: [
      { href: "/tools/csv-json", label: "CSV ↔ JSON Converter" },
      { href: "/tools/base64", label: "Base64 Encoder" },
      { href: "/tools/text-diff", label: "Text Compare" },
      { href: "/tools/jwt-decoder", label: "JWT Decoder" },
      { href: "/tools/uuid-generator", label: "UUID Generator" },
    ],
  },
  tr: {
    intro: [
      "JSON biçimlendirici, sıkıştırılmış veya karışık JSON'u tutarlı girinti ve satır sonlarıyla yeniden yazarak okunabilir hâle getirir. Bu araç aynı zamanda doğrulayıcı olarak çalışır: sözdizimi bozuksa belirsiz bir \"geçersiz JSON\" mesajı yerine ayrıştırıcının tam hata metnini görürsünüz.",
      "Her şey tarayıcınızın yerleşik JSON ayrıştırıcısıyla, cihazınızda çalışır. Hiçbir şey yüklenmez — bu önemlidir, çünkü JSON içerikleri sıklıkla API anahtarları, erişim jetonları, müşteri kayıtları ve dahili kimlikler taşır; rastgele bir sunucuya yapıştırılmaması gereken veriler.",
      "Yükleme adımı olmadığı için dosya boyutu sınırı ve bekleme de yoktur. 10 MB'lık bir API yanıtını yapıştırın; cihazınız ne kadar hızlı ayrıştırırsa o kadar hızlı biçimlenir.",
    ],
    howToTitle: "JSON nasıl biçimlendirilir",
    howToSteps: [
      "JSON'unuzu soldaki alana yapıştırın — sıkıştırılmış, biçimli ya da doğrudan ağ sekmesinden kopyalanmış olabilir.",
      "Girinti genişliğini seçin: 2 boşluk (en yaygın kural), 4 boşluk veya sekme benzeri çıktı için 8.",
      "Güzelleştirmek için Format, tüm boşlukları kaldırmak için Minify, yalnızca sözdizimini denetlemek için Validate düğmesine basın.",
      "Sonucu Copy Output ile kopyalayın veya bildirilen hatayı düzeltip yeniden çalıştırın.",
    ],
    featuresTitle: "Bu araç ne yapar",
    features: [
      {
        title: "Güzelleştirme ve küçültme",
        desc: "JSON'u okumak ve hata ayıklamak için biçimlendirin ya da API yanıtlarında ve yapılandırma dosyalarında boyutu düşürmek için tek satıra küçültün.",
      },
      {
        title: "Kesin hata mesajları",
        desc: "Geçersiz JSON, tarayıcının kendi ayrıştırıcı hatasını döndürür; bu hata sorunun konumunu söyler — genellikle fazladan virgül, tek tırnak veya kaçırılmamış bir karakter.",
      },
      {
        title: "Unicode ve kaçış dizileri korunur",
        desc: "Türkçe karakterler, emoji ve kaçış dizileri biçimlendirmeden zarar görmeden çıkar; çünkü araç metni düzenlemek yerine ayrıştırılmış yapıyı yeniden yazar.",
      },
      {
        title: "Boyut sınırı yok, yükleme yok",
        desc: "Büyük içerikler cihazınızda işlenir. JSON'unuz hiçbir sunucuya ulaşmadığı için içindeki kimlik bilgileri gizli kalır.",
      },
    ],
    faqTitle: "Sık sorulan sorular",
    faq: [
      {
        q: "JSON biçimlendirici tam olarak ne yapar?",
        a: "JSON'unuzu bir veri yapısına ayrıştırır, ardından tutarlı girinti ve satır sonlarıyla yeniden yazar. Veri birebir aynı kalır; yalnızca boşluklar değişir. Böylece iç içe nesneler ve diziler bir bakışta okunur hâle gelir.",
      },
      {
        q: "JSON'u nasıl doğrularım?",
        a: "Yapıştırıp Validate'e basın. Sözdizimi doğruysa onay alırsınız; değilse neyin ve kabaca nerede yanlış olduğunu anlatan ayrıştırıcı hatasını görürsünüz. Biçimlendirme de dolaylı olarak doğrulama yapar, çünkü geçersiz JSON ayrıştırılamaz.",
      },
      {
        q: "JSON'um neden 'Unexpected token' hatası veriyor?",
        a: "En yaygın üç neden: son öğeden sonra fazladan virgül, anahtar veya metinlerde çift tırnak yerine tek tırnak ve metin içinde kaçırılmamış karakterler (örneğin ham satır sonu). JSON, JavaScript nesne söz diziminden daha katıdır.",
      },
      {
        q: "JSON küçültme ne işe yarar?",
        a: "Küçültme, gereksiz her boşluğu ve satır sonunu kaldırarak en küçük geçerli gösterimi üretir. API yanıtları, gömülü yapılandırma ve baytların önemli olduğu her yer için faydalıdır. Ayrıştırılmış sonuç tamamen aynıdır.",
      },
      {
        q: "Hangi girintiyi seçmeliyim?",
        a: "İki boşluk, JavaScript, TypeScript ve çoğu JSON stil kılavuzunda baskın kuraldır. Dört boşluk Python ve Java ekosistemlerinde yaygındır. Yapıştıracağınız dosyaya uyanı seçin.",
      },
      {
        q: "JSON verilerim bir sunucuya gönderiliyor mu?",
        a: "Hayır. Biçimlendirme, küçültme ve doğrulama tarayıcınızdaki yerleşik JSON ayrıştırıcısıyla yerel olarak yapılır. Hiçbir şey iletilmez, kaydedilmez veya saklanmaz — aracı kullanırken tarayıcınızın ağ sekmesini açarak ya da sayfa yüklendikten sonra internet bağlantınızı kesip deneyerek doğrulayabilirsiniz.",
      },
      {
        q: "Maksimum dosya boyutu var mı?",
        a: "Yapay bir sınır yok. Pratik sınır cihazınızın kullanılabilir belleğidir; bu da genellikle megabaytlarca içeriğin sorunsuz biçimlendiği anlamına gelir.",
      },
      {
        q: "Yorum veya fazladan virgül (JSON5) destekliyor mu?",
        a: "Hayır. Bu araç, yorumlara ve fazladan virgüllere izin vermeyen katı JSON belirtimini izler. Dosyanızda bunlar varsa elinizdeki JSON5 veya JSONC'dir ve önce temizlenmesi gerekir.",
      },
    ],
    relatedTitle: "İlgili araçlar",
    related: [
      { href: "/tools/csv-json", label: "CSV ↔ JSON Dönüştürücü" },
      { href: "/tools/base64", label: "Base64 Kodlayıcı" },
      { href: "/tools/text-diff", label: "Metin Karşılaştırma" },
      { href: "/tools/jwt-decoder", label: "JWT Çözücü" },
      { href: "/tools/uuid-generator", label: "UUID Üretici" },
    ],
  },
  es: {
    intro: [
      "Un formateador de JSON toma JSON sin formato, minificado o desordenado y lo reescribe con sangría y saltos de línea consistentes para que puedas leerlo. Esta herramienta también funciona como validador: si la sintaxis está mal, obtienes el error exacto del analizador en lugar de un vago \"JSON no válido\".",
      "Todo se ejecuta en tu navegador con el analizador JSON nativo. No se sube nada, algo importante porque los JSON suelen contener claves de API, tokens de acceso, registros de clientes e identificadores internos: datos que no deberías pegar en un servidor desconocido.",
      "Al no haber subida, tampoco hay límite de tamaño ni esperas. Pega una respuesta de API de 10 MB y se formatea tan rápido como tu dispositivo pueda analizarla.",
    ],
    howToTitle: "Cómo formatear JSON",
    howToSteps: [
      "Pega tu JSON en el cuadro de la izquierda: minificado, formateado o copiado directamente de la pestaña de red.",
      "Elige el ancho de sangría: 2 espacios (la convención más común), 4 espacios u 8 para una salida tipo tabulación.",
      "Pulsa Format para embellecer, Minify para eliminar los espacios o Validate para comprobar solo la sintaxis.",
      "Copia el resultado con Copy Output o corrige el error indicado y vuelve a ejecutarlo.",
    ],
    featuresTitle: "Qué hace esta herramienta",
    features: [
      {
        title: "Embellecer y minificar",
        desc: "Formatea JSON para leerlo y depurarlo, o minifícalo en una sola línea para reducir el tamaño en respuestas de API y archivos de configuración.",
      },
      {
        title: "Mensajes de error precisos",
        desc: "Un JSON inválido devuelve el error nativo del analizador del navegador, que indica la posición del problema: normalmente una coma final, comillas simples o un carácter sin escapar.",
      },
      {
        title: "Unicode y escapes intactos",
        desc: "Los caracteres acentuados, emoji y secuencias de escape sobreviven al formateo sin cambios, porque la herramienta reserializa la estructura analizada en lugar de editar texto.",
      },
      {
        title: "Sin límite de tamaño ni subidas",
        desc: "Tu dispositivo procesa localmente cargas grandes. Tu JSON nunca llega a un servidor, así que las credenciales que contenga siguen siendo privadas.",
      },
    ],
    faqTitle: "Preguntas frecuentes",
    faq: [
      {
        q: "¿Qué hace exactamente un formateador de JSON?",
        a: "Analiza tu JSON para convertirlo en una estructura de datos y luego lo vuelve a escribir con sangría y saltos de línea consistentes. Los datos son idénticos: solo cambian los espacios. Así los objetos y arrays anidados se leen de un vistazo.",
      },
      {
        q: "¿Cómo valido un JSON?",
        a: "Pégalo y pulsa Validate. Si la sintaxis es correcta recibes una confirmación; si no, verás el error del analizador con la descripción del problema y su ubicación aproximada. Formatear también valida de forma implícita, porque un JSON inválido no se puede analizar.",
      },
      {
        q: "¿Por qué mi JSON da 'Unexpected token'?",
        a: "Las tres causas más habituales son una coma final tras el último elemento, comillas simples en lugar de dobles en claves o cadenas, y caracteres sin escapar como un salto de línea dentro de una cadena. JSON es más estricto que los objetos literales de JavaScript.",
      },
      {
        q: "¿Para qué sirve minificar JSON?",
        a: "Minificar elimina cada espacio y salto de línea innecesario, produciendo la representación válida más pequeña. Es útil en respuestas de API, configuración embebida y cualquier lugar donde importen los bytes. El resultado analizado es exactamente el mismo.",
      },
      {
        q: "¿Qué sangría debo elegir?",
        a: "Dos espacios es la convención dominante en JavaScript, TypeScript y la mayoría de guías de estilo JSON. Cuatro espacios es común en los ecosistemas de Python y Java. Elige la que coincida con el archivo de destino.",
      },
      {
        q: "¿Se envían mis datos JSON a un servidor?",
        a: "No. Formatear, minificar y validar ocurren localmente en tu navegador mediante el analizador JSON integrado. Nada se transmite, registra ni almacena: puedes comprobarlo abriendo la pestaña de red del navegador mientras usas la herramienta, o desconectando internet tras cargar la página.",
      },
      {
        q: "¿Hay un tamaño máximo de archivo?",
        a: "No hay límite artificial. El techo práctico es la memoria disponible de tu dispositivo, lo que normalmente permite formatear cargas de varios megabytes sin problemas.",
      },
      {
        q: "¿Admite comentarios o comas finales (JSON5)?",
        a: "No. Esta herramienta sigue la especificación estricta de JSON, que no permite comentarios ni comas finales. Si tu archivo los contiene, es JSON5 o JSONC y debe limpiarse antes.",
      },
    ],
    relatedTitle: "Herramientas relacionadas",
    related: [
      { href: "/tools/csv-json", label: "Conversor CSV ↔ JSON" },
      { href: "/tools/base64", label: "Codificador Base64" },
      { href: "/tools/text-diff", label: "Comparar textos" },
      { href: "/tools/jwt-decoder", label: "Decodificador JWT" },
      { href: "/tools/uuid-generator", label: "Generador UUID" },
    ],
  },
  de: {
    intro: [
      "Ein JSON-Formatter nimmt rohes, minifiziertes oder unordentliches JSON und schreibt es mit einheitlicher Einrückung und Zeilenumbrüchen neu, sodass es lesbar wird. Dieses Tool arbeitet gleichzeitig als Validator: Bei fehlerhafter Syntax erhalten Sie die exakte Parser-Meldung statt eines vagen \"ungültiges JSON\".",
      "Alles läuft in Ihrem Browser über den nativen JSON-Parser. Nichts wird hochgeladen – das ist wichtig, denn JSON-Daten enthalten regelmäßig API-Schlüssel, Access-Tokens, Kundendatensätze und interne IDs, also Daten, die man nicht in einen unbekannten Server einfügen sollte.",
      "Weil es keinen Upload gibt, gibt es auch keine Größenbeschränkung und keine Wartezeit. Fügen Sie eine 10 MB große API-Antwort ein – sie wird so schnell formatiert, wie Ihr Gerät sie parsen kann.",
    ],
    howToTitle: "JSON formatieren – so geht's",
    howToSteps: [
      "Fügen Sie Ihr JSON in das linke Eingabefeld ein – minifiziert, formatiert oder direkt aus dem Netzwerk-Tab kopiert.",
      "Wählen Sie die Einrückungsbreite: 2 Leerzeichen (die häufigste Konvention), 4 Leerzeichen oder 8 für tabulatorähnliche Ausgabe.",
      "Klicken Sie auf Format zum Verschönern, Minify zum Entfernen aller Leerzeichen oder Validate, um nur die Syntax zu prüfen.",
      "Kopieren Sie das Ergebnis mit Copy Output oder korrigieren Sie den gemeldeten Fehler und starten Sie erneut.",
    ],
    featuresTitle: "Was dieses Tool kann",
    features: [
      {
        title: "Verschönern und minifizieren",
        desc: "Formatieren Sie JSON zum Lesen und Debuggen oder minifizieren Sie es auf eine Zeile, um die Größe von API-Antworten und Konfigurationsdateien zu reduzieren.",
      },
      {
        title: "Präzise Fehlermeldungen",
        desc: "Ungültiges JSON liefert die native Parser-Meldung des Browsers, die die Position des Problems nennt – meist ein überzähliges Komma, einfache Anführungszeichen oder ein nicht escapetes Zeichen.",
      },
      {
        title: "Unicode und Escapes bleiben erhalten",
        desc: "Umlaute, Emoji und Escape-Sequenzen überleben das Formatieren unverändert, da das Tool die geparste Struktur neu serialisiert statt Text zu bearbeiten.",
      },
      {
        title: "Keine Größenbeschränkung, kein Upload",
        desc: "Große Datenmengen verarbeitet Ihr Gerät lokal. Ihr JSON erreicht keinen Server, sodass darin enthaltene Zugangsdaten privat bleiben.",
      },
    ],
    faqTitle: "Häufige Fragen",
    faq: [
      {
        q: "Was macht ein JSON-Formatter genau?",
        a: "Er parst Ihr JSON in eine Datenstruktur und schreibt es dann mit einheitlicher Einrückung und Zeilenumbrüchen zurück. Die Daten sind identisch – nur die Leerzeichen ändern sich. Verschachtelte Objekte und Arrays werden so auf einen Blick lesbar.",
      },
      {
        q: "Wie validiere ich JSON?",
        a: "Einfügen und auf Validate klicken. Ist die Syntax korrekt, erhalten Sie eine Bestätigung; andernfalls die Parser-Meldung, die beschreibt, was und etwa wo etwas falsch ist. Auch das Formatieren validiert implizit, denn ungültiges JSON lässt sich nicht parsen.",
      },
      {
        q: "Warum meldet mein JSON 'Unexpected token'?",
        a: "Die drei häufigsten Ursachen: ein Komma nach dem letzten Element, einfache statt doppelte Anführungszeichen bei Schlüsseln oder Strings, und nicht escapete Zeichen wie ein echter Zeilenumbruch innerhalb eines Strings. JSON ist strenger als JavaScript-Objektliterale.",
      },
      {
        q: "Wofür ist JSON-Minifizierung gut?",
        a: "Minifizieren entfernt jedes unnötige Leerzeichen und jeden Zeilenumbruch und erzeugt die kleinste gültige Darstellung. Nützlich für API-Antworten, eingebettete Konfiguration und überall, wo Bytes zählen. Das geparste Ergebnis ist exakt dasselbe.",
      },
      {
        q: "Welche Einrückung soll ich wählen?",
        a: "Zwei Leerzeichen sind die vorherrschende Konvention in JavaScript, TypeScript und den meisten JSON-Styleguides. Vier Leerzeichen sind in Python- und Java-Ökosystemen verbreitet. Wählen Sie, was zur Zieldatei passt.",
      },
      {
        q: "Werden meine JSON-Daten an einen Server gesendet?",
        a: "Nein. Formatieren, Minifizieren und Validieren geschehen lokal in Ihrem Browser über den integrierten JSON-Parser. Nichts wird übertragen, protokolliert oder gespeichert – prüfen Sie es selbst: öffnen Sie den Netzwerk-Tab während der Nutzung oder trennen Sie die Internetverbindung nach dem Laden der Seite.",
      },
      {
        q: "Gibt es eine maximale Dateigröße?",
        a: "Es gibt kein künstliches Limit. Die praktische Grenze ist der verfügbare Speicher Ihres Geräts, womit sich in der Regel mehrere Megabyte problemlos formatieren lassen.",
      },
      {
        q: "Werden Kommentare oder überzählige Kommas (JSON5) unterstützt?",
        a: "Nein. Dieses Tool folgt der strikten JSON-Spezifikation, die keine Kommentare und keine überzähligen Kommas erlaubt. Enthält Ihre Datei sie, handelt es sich um JSON5 oder JSONC und muss zuvor bereinigt werden.",
      },
    ],
    relatedTitle: "Verwandte Tools",
    related: [
      { href: "/tools/csv-json", label: "CSV ↔ JSON Konverter" },
      { href: "/tools/base64", label: "Base64-Encoder" },
      { href: "/tools/text-diff", label: "Textvergleich" },
      { href: "/tools/jwt-decoder", label: "JWT-Decoder" },
      { href: "/tools/uuid-generator", label: "UUID-Generator" },
    ],
  },
  pt: {
    intro: [
      "Um formatador de JSON pega JSON bruto, minificado ou desorganizado e o reescreve com indentação e quebras de linha consistentes para que você consiga ler. Esta ferramenta também funciona como validador: se a sintaxe estiver errada, você recebe o erro exato do analisador em vez de um vago \"JSON inválido\".",
      "Tudo roda dentro do seu navegador usando o analisador JSON nativo. Nada é enviado, o que importa porque JSONs frequentemente contêm chaves de API, tokens de acesso, registros de clientes e IDs internos — dados que não deveriam ser colados em um servidor desconhecido.",
      "Como não há etapa de envio, também não há limite de tamanho nem espera. Cole uma resposta de API de 10 MB e ela é formatada tão rápido quanto seu dispositivo consegue analisá-la.",
    ],
    howToTitle: "Como formatar JSON",
    howToSteps: [
      "Cole seu JSON na caixa à esquerda — minificado, formatado ou copiado direto da aba de rede.",
      "Escolha a largura de indentação: 2 espaços (a convenção mais comum), 4 espaços ou 8 para saída semelhante a tabulação.",
      "Clique em Format para embelezar, Minify para remover todos os espaços ou Validate para checar apenas a sintaxe.",
      "Copie o resultado com Copy Output ou corrija o erro apontado e execute novamente.",
    ],
    featuresTitle: "O que esta ferramenta faz",
    features: [
      {
        title: "Embelezar e minificar",
        desc: "Formate JSON para leitura e depuração, ou minifique em uma única linha para reduzir o tamanho em respostas de API e arquivos de configuração.",
      },
      {
        title: "Mensagens de erro precisas",
        desc: "JSON inválido retorna o erro nativo do analisador do navegador, que indica a posição do problema — normalmente uma vírgula sobrando, aspas simples ou um caractere sem escape.",
      },
      {
        title: "Unicode e escapes preservados",
        desc: "Acentos, emoji e sequências de escape sobrevivem à formatação intactos, porque a ferramenta reserializa a estrutura analisada em vez de editar texto.",
      },
      {
        title: "Sem limite de tamanho, sem upload",
        desc: "Cargas grandes são processadas localmente pelo seu dispositivo. Seu JSON nunca chega a um servidor, então as credenciais dentro dele permanecem privadas.",
      },
    ],
    faqTitle: "Perguntas frequentes",
    faq: [
      {
        q: "O que um formatador de JSON faz exatamente?",
        a: "Ele analisa seu JSON transformando-o em uma estrutura de dados e depois o reescreve com indentação e quebras de linha consistentes. Os dados são idênticos — apenas os espaços mudam. Assim objetos e arrays aninhados ficam legíveis num relance.",
      },
      {
        q: "Como eu valido um JSON?",
        a: "Cole e clique em Validate. Se a sintaxe estiver correta, você recebe uma confirmação; caso contrário, verá o erro do analisador descrevendo o que está errado e aproximadamente onde. Formatar também valida implicitamente, pois JSON inválido não pode ser analisado.",
      },
      {
        q: "Por que meu JSON dá 'Unexpected token'?",
        a: "As três causas mais comuns são vírgula sobrando após o último item, aspas simples em vez de duplas em chaves ou strings, e caracteres sem escape como uma quebra de linha crua dentro de uma string. JSON é mais rígido que objetos literais de JavaScript.",
      },
      {
        q: "Para que serve minificar JSON?",
        a: "Minificar remove todo espaço e quebra de linha desnecessários, produzindo a menor representação válida. É útil em respostas de API, configuração embutida e onde cada byte importa. O resultado analisado é exatamente o mesmo.",
      },
      {
        q: "Qual indentação devo escolher?",
        a: "Dois espaços é a convenção dominante em JavaScript, TypeScript e na maioria dos guias de estilo JSON. Quatro espaços é comum nos ecossistemas Python e Java. Escolha a que corresponde ao arquivo de destino.",
      },
      {
        q: "Meus dados JSON são enviados a um servidor?",
        a: "Não. Formatação, minificação e validação acontecem localmente no seu navegador pelo analisador JSON integrado. Nada é transmitido, registrado ou armazenado — você pode verificar abrindo a aba de rede do navegador durante o uso, ou desconectando a internet após a página carregar.",
      },
      {
        q: "Existe tamanho máximo de arquivo?",
        a: "Não há limite artificial. O teto prático é a memória disponível do seu dispositivo, o que normalmente permite formatar cargas de vários megabytes sem dificuldade.",
      },
      {
        q: "Suporta comentários ou vírgulas finais (JSON5)?",
        a: "Não. Esta ferramenta segue a especificação estrita de JSON, que não permite comentários nem vírgulas finais. Se seu arquivo os contém, ele é JSON5 ou JSONC e precisa ser limpo antes.",
      },
    ],
    relatedTitle: "Ferramentas relacionadas",
    related: [
      { href: "/tools/csv-json", label: "Conversor CSV ↔ JSON" },
      { href: "/tools/base64", label: "Codificador Base64" },
      { href: "/tools/text-diff", label: "Comparar textos" },
      { href: "/tools/jwt-decoder", label: "Decodificador JWT" },
      { href: "/tools/uuid-generator", label: "Gerador UUID" },
    ],
  },
  fr: {
    intro: [
      "Un formateur JSON prend du JSON brut, minifié ou désordonné et le réécrit avec une indentation et des sauts de ligne cohérents pour le rendre lisible. Cet outil sert aussi de validateur : si la syntaxe est incorrecte, vous obtenez l'erreur exacte de l'analyseur au lieu d'un vague « JSON invalide ».",
      "Tout s'exécute dans votre navigateur via l'analyseur JSON natif. Rien n'est envoyé, ce qui compte car les JSON contiennent souvent des clés d'API, des jetons d'accès, des fiches clients et des identifiants internes — des données à ne pas coller sur un serveur inconnu.",
      "Comme il n'y a pas d'envoi, il n'y a ni limite de taille ni attente. Collez une réponse d'API de 10 Mo : elle est formatée aussi vite que votre appareil peut l'analyser.",
    ],
    howToTitle: "Comment formater du JSON",
    howToSteps: [
      "Collez votre JSON dans le champ de gauche — minifié, formaté ou copié directement depuis l'onglet réseau.",
      "Choisissez la largeur d'indentation : 2 espaces (la convention la plus répandue), 4 espaces ou 8 pour une sortie de type tabulation.",
      "Cliquez sur Format pour embellir, Minify pour supprimer les espaces ou Validate pour vérifier seulement la syntaxe.",
      "Copiez le résultat avec Copy Output, ou corrigez l'erreur signalée et relancez.",
    ],
    featuresTitle: "Ce que fait cet outil",
    features: [
      {
        title: "Embellir et minifier",
        desc: "Formatez le JSON pour le lire et le déboguer, ou minifiez-le sur une seule ligne pour réduire la taille des réponses d'API et des fichiers de configuration.",
      },
      {
        title: "Messages d'erreur précis",
        desc: "Un JSON invalide renvoie l'erreur native de l'analyseur du navigateur, qui indique la position du problème — le plus souvent une virgule en trop, des guillemets simples ou un caractère non échappé.",
      },
      {
        title: "Unicode et échappements préservés",
        desc: "Les accents, emoji et séquences d'échappement traversent le formatage intacts, car l'outil ré-sérialise la structure analysée au lieu de modifier du texte.",
      },
      {
        title: "Aucune limite de taille, aucun envoi",
        desc: "Les charges volumineuses sont traitées localement par votre appareil. Votre JSON n'atteint aucun serveur : les identifiants qu'il contient restent privés.",
      },
    ],
    faqTitle: "Questions fréquentes",
    faq: [
      {
        q: "Que fait exactement un formateur JSON ?",
        a: "Il analyse votre JSON pour en faire une structure de données, puis le réécrit avec une indentation et des sauts de ligne cohérents. Les données sont identiques : seuls les espaces changent. Les objets et tableaux imbriqués deviennent lisibles d'un coup d'œil.",
      },
      {
        q: "Comment valider du JSON ?",
        a: "Collez-le et cliquez sur Validate. Si la syntaxe est correcte, vous obtenez une confirmation ; sinon, l'erreur de l'analyseur décrit ce qui ne va pas et approximativement où. Le formatage valide aussi implicitement, car un JSON invalide ne peut pas être analysé.",
      },
      {
        q: "Pourquoi mon JSON affiche-t-il « Unexpected token » ?",
        a: "Les trois causes les plus fréquentes : une virgule après le dernier élément, des guillemets simples au lieu de doubles pour les clés ou les chaînes, et des caractères non échappés comme un saut de ligne brut dans une chaîne. JSON est plus strict que les littéraux d'objet JavaScript.",
      },
      {
        q: "À quoi sert la minification JSON ?",
        a: "La minification supprime chaque espace et saut de ligne inutile pour produire la plus petite représentation valide. Utile pour les réponses d'API, la configuration embarquée et partout où les octets comptent. Le résultat analysé est exactement le même.",
      },
      {
        q: "Quelle indentation choisir ?",
        a: "Deux espaces est la convention dominante en JavaScript, TypeScript et dans la plupart des guides de style JSON. Quatre espaces est courant dans les écosystèmes Python et Java. Choisissez celle du fichier de destination.",
      },
      {
        q: "Mes données JSON sont-elles envoyées à un serveur ?",
        a: "Non. Le formatage, la minification et la validation ont lieu localement dans votre navigateur via l'analyseur JSON intégré. Rien n'est transmis, journalisé ni stocké — vérifiez-le en ouvrant l'onglet réseau pendant l'utilisation, ou en coupant votre connexion après le chargement de la page.",
      },
      {
        q: "Y a-t-il une taille de fichier maximale ?",
        a: "Aucune limite artificielle. Le plafond pratique est la mémoire disponible de votre appareil, ce qui permet généralement de formater plusieurs mégaoctets sans difficulté.",
      },
      {
        q: "Les commentaires ou virgules finales (JSON5) sont-ils pris en charge ?",
        a: "Non. Cet outil suit la spécification stricte de JSON, qui n'autorise ni commentaires ni virgules finales. Si votre fichier en contient, il s'agit de JSON5 ou JSONC et doit d'abord être nettoyé.",
      },
    ],
    relatedTitle: "Outils associés",
    related: [
      { href: "/tools/csv-json", label: "Convertisseur CSV ↔ JSON" },
      { href: "/tools/base64", label: "Encodeur Base64" },
      { href: "/tools/text-diff", label: "Comparateur de textes" },
      { href: "/tools/jwt-decoder", label: "Décodeur JWT" },
      { href: "/tools/uuid-generator", label: "Générateur UUID" },
    ],
  },
};
