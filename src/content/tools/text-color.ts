import type { ToolContentMap } from "@/components/ToolContent";

/**
 * Kelime Sayacı sayfasının SEO içeriği.
 * Hedef sorgular: wortzähler online (DE — gösterim lideri), word counter,
 * contador de palabras, contador de palavras, compteur de mots, kelime sayacı.
 */
export const textCounterContent: ToolContentMap = {
  en: {
    intro: [
      "A word counter tells you how much text you actually have: words, characters with and without spaces, sentences and paragraphs. Every count updates as you type, so you can write towards a limit instead of pasting into a checker afterwards.",
      "The counts that matter depend on where the text is going. University essays and articles are measured in words. Social posts, meta descriptions and SMS are measured in characters — including spaces, which people often forget. Reading time estimates help when you are writing for the web.",
      "Nothing you type is uploaded. That matters more than it sounds: draft essays, cover letters, patient notes and unpublished articles are exactly the texts people paste into free online counters without thinking about where they end up.",
    ],
    howToTitle: "How to count words",
    howToSteps: [
      "Type directly into the text area, or paste text from a document, email or web page.",
      "Read the live counts — words, characters, characters without spaces, sentences and paragraphs all update instantly.",
      "Use the character count with spaces when a form or platform states a character limit; that is almost always what they mean.",
      "Edit until you hit your target. Nothing is submitted anywhere, so you can keep working in place.",
    ],
    featuresTitle: "What this tool does",
    features: [
      {
        title: "Live counting",
        desc: "Words, characters, sentences and paragraphs recalculate on every keystroke — no button, no page reload.",
      },
      {
        title: "Characters with and without spaces",
        desc: "Both numbers are shown separately, because publishers, forms and translation agencies each ask for a different one.",
      },
      {
        title: "Sentence and paragraph counts",
        desc: "Useful for checking readability: very long paragraphs and very long sentences are the two most common causes of hard-to-read text.",
      },
      {
        title: "Private by design",
        desc: "Your text stays in the browser and is discarded when you close the tab. Suitable for unpublished drafts and confidential documents.",
      },
    ],
    faqTitle: "Frequently asked questions",
    faq: [
      {
        q: "How are words counted?",
        a: "A word is any sequence of characters separated by whitespace, which is the same rule word processors use. Hyphenated terms like \"well-known\" count as one word; numbers and standalone symbols count as words too if they are separated by spaces.",
      },
      {
        q: "Should I use characters with or without spaces?",
        a: "With spaces, in almost every case. Social platforms, meta description limits, SMS and form fields all count spaces. Characters without spaces is mainly used in professional translation pricing and some academic requirements.",
      },
      {
        q: "How many words is one page?",
        a: "A common convention is around 250 words per double-spaced page and 500 per single-spaced page in 12 pt type. Publishers and universities often define their own figure, so check the brief you were given.",
      },
      {
        q: "Does it count words in other alphabets?",
        a: "Yes. Whitespace-separated counting works for Turkish, German, Spanish, French, Portuguese, Cyrillic and most other scripts. Languages that do not use spaces between words, such as Chinese and Japanese, cannot be word-counted this way.",
      },
      {
        q: "Is my text stored or sent anywhere?",
        a: "No. Counting is pure JavaScript running in your browser. Nothing is uploaded, saved or logged — the text exists only in the page until you close it.",
      },
    ],
    relatedTitle: "Related tools",
    related: [
      { href: "/tools/case-converter", label: "Case Converter" },
      { href: "/tools/text-diff", label: "Text Compare" },
      { href: "/tools/lorem-ipsum", label: "Lorem Ipsum Generator" },
      { href: "/tools/markdown-preview", label: "Markdown Preview" },
      { href: "/tools/number-to-words", label: "Number to Words" },
    ],
  },
  tr: {
    intro: [
      "Kelime sayacı, elinizde gerçekte ne kadar metin olduğunu söyler: kelime, boşluklu ve boşluksuz karakter, cümle ve paragraf sayısı. Her sayaç yazdıkça güncellenir; böylece sonradan bir denetleyiciye yapıştırmak yerine doğrudan sınıra doğru yazabilirsiniz.",
      "Hangi sayının önemli olduğu metnin nereye gideceğine bağlıdır. Üniversite ödevleri ve makaleler kelimeyle ölçülür. Sosyal medya gönderileri, meta açıklamalar ve SMS ise karakterle ölçülür — insanların sıkça unuttuğu boşluklar dahil.",
      "Yazdığınız hiçbir şey yüklenmez. Bu kulağa geldiğinden daha önemlidir: ödev taslakları, niyet mektupları, hasta notları ve yayınlanmamış makaleler tam da insanların nereye gittiğini düşünmeden ücretsiz online sayaçlara yapıştırdığı metinlerdir.",
    ],
    howToTitle: "Kelime nasıl sayılır",
    howToSteps: [
      "Doğrudan metin alanına yazın veya bir belgeden, e-postadan ya da web sayfasından metin yapıştırın.",
      "Canlı sayıları okuyun — kelime, karakter, boşluksuz karakter, cümle ve paragraf anında güncellenir.",
      "Bir form veya platform karakter sınırı belirtiyorsa boşluklu karakter sayısını kullanın; neredeyse her zaman kastettikleri budur.",
      "Hedefinize ulaşana kadar düzenleyin. Hiçbir yere gönderim yapılmadığı için yerinde çalışmaya devam edebilirsiniz.",
    ],
    featuresTitle: "Bu araç ne yapar",
    features: [
      {
        title: "Canlı sayım",
        desc: "Kelime, karakter, cümle ve paragraf her tuş vuruşunda yeniden hesaplanır — düğme yok, sayfa yenilenmesi yok.",
      },
      {
        title: "Boşluklu ve boşluksuz karakter",
        desc: "İki sayı ayrı ayrı gösterilir; çünkü yayıncılar, formlar ve çeviri büroları farklı olanı ister.",
      },
      {
        title: "Cümle ve paragraf sayısı",
        desc: "Okunabilirliği kontrol etmek için yararlıdır: çok uzun paragraflar ve çok uzun cümleler, zor okunan metnin en yaygın iki nedenidir.",
      },
      {
        title: "Tasarımı gereği gizli",
        desc: "Metniniz tarayıcıda kalır ve sekmeyi kapattığınızda silinir. Yayınlanmamış taslaklar ve gizli belgeler için uygundur.",
      },
    ],
    faqTitle: "Sık sorulan sorular",
    faq: [
      {
        q: "Kelimeler nasıl sayılıyor?",
        a: "Kelime, boşlukla ayrılmış herhangi bir karakter dizisidir; kelime işlemcilerin kullandığı kuralın aynısı. \"Bilgi-işlem\" gibi tireli terimler tek kelime sayılır; boşlukla ayrılmışsa sayılar ve tek başına duran simgeler de kelime sayılır.",
      },
      {
        q: "Boşluklu mu boşluksuz karakter mi kullanmalıyım?",
        a: "Neredeyse her durumda boşluklu. Sosyal platformlar, meta açıklama sınırları, SMS ve form alanları boşlukları da sayar. Boşluksuz karakter esas olarak profesyonel çeviri fiyatlandırmasında ve bazı akademik gerekliliklerde kullanılır.",
      },
      {
        q: "Bir sayfa kaç kelimedir?",
        a: "Yaygın kabul, 12 punto yazıda çift satır aralıklı sayfada yaklaşık 250 kelime, tek satır aralıklı sayfada 500 kelimedir. Yayıncılar ve üniversiteler sıklıkla kendi rakamını tanımlar; size verilen yönergeyi kontrol edin.",
      },
      {
        q: "Diğer alfabelerdeki kelimeleri sayıyor mu?",
        a: "Evet. Boşlukla ayırarak sayma Türkçe, Almanca, İspanyolca, Fransızca, Portekizce, Kiril ve diğer birçok yazı sistemi için çalışır. Kelimeler arasında boşluk kullanmayan Çince ve Japonca gibi diller bu yolla kelime bazında sayılamaz.",
      },
      {
        q: "Metnim saklanıyor veya bir yere gönderiliyor mu?",
        a: "Hayır. Sayım, tarayıcınızda çalışan saf JavaScript'tir. Hiçbir şey yüklenmez, kaydedilmez veya günlüğe yazılmaz — metin yalnızca sayfayı kapatana kadar orada bulunur.",
      },
    ],
    relatedTitle: "İlgili araçlar",
    related: [
      { href: "/tools/case-converter", label: "Harf Dönüştürücü" },
      { href: "/tools/text-diff", label: "Metin Karşılaştırma" },
      { href: "/tools/lorem-ipsum", label: "Lorem Ipsum Üretici" },
      { href: "/tools/markdown-preview", label: "Markdown Önizleme" },
      { href: "/tools/number-to-words", label: "Sayıyı Yazıya Çevirme" },
    ],
  },
  es: {
    intro: [
      "Un contador de palabras te dice cuánto texto tienes realmente: palabras, caracteres con y sin espacios, frases y párrafos. Todos los recuentos se actualizan mientras escribes, así puedes redactar hacia un límite en lugar de pegar el texto en un verificador al final.",
      "Qué recuento importa depende de dónde vaya el texto. Los trabajos universitarios y los artículos se miden en palabras. Las publicaciones en redes, las meta descripciones y los SMS se miden en caracteres, espacios incluidos, algo que suele olvidarse.",
      "Nada de lo que escribes se sube. Eso importa más de lo que parece: borradores de trabajos, cartas de presentación, notas clínicas y artículos sin publicar son justo los textos que la gente pega en contadores online gratuitos sin pensar en dónde acaban.",
    ],
    howToTitle: "Cómo contar palabras",
    howToSteps: [
      "Escribe directamente en el área de texto o pega texto de un documento, un correo o una página web.",
      "Lee los recuentos en vivo: palabras, caracteres, caracteres sin espacios, frases y párrafos se actualizan al instante.",
      "Usa el recuento de caracteres con espacios cuando un formulario o plataforma indique un límite; casi siempre es a eso a lo que se refieren.",
      "Edita hasta alcanzar tu objetivo. Nada se envía a ninguna parte, así que puedes seguir trabajando en el mismo lugar.",
    ],
    featuresTitle: "Qué hace esta herramienta",
    features: [
      {
        title: "Recuento en vivo",
        desc: "Palabras, caracteres, frases y párrafos se recalculan con cada pulsación: sin botón y sin recargar la página.",
      },
      {
        title: "Caracteres con y sin espacios",
        desc: "Se muestran ambos números por separado, porque editoriales, formularios y agencias de traducción piden uno distinto cada uno.",
      },
      {
        title: "Recuento de frases y párrafos",
        desc: "Útil para revisar la legibilidad: los párrafos muy largos y las frases muy largas son las dos causas más comunes de un texto difícil de leer.",
      },
      {
        title: "Privado por diseño",
        desc: "Tu texto permanece en el navegador y se descarta al cerrar la pestaña. Apto para borradores sin publicar y documentos confidenciales.",
      },
    ],
    faqTitle: "Preguntas frecuentes",
    faq: [
      {
        q: "¿Cómo se cuentan las palabras?",
        a: "Una palabra es cualquier secuencia de caracteres separada por espacios, la misma regla que usan los procesadores de texto. Los términos con guion como «bien-estar» cuentan como una palabra; los números y símbolos aislados también cuentan si van separados por espacios.",
      },
      {
        q: "¿Debo usar caracteres con o sin espacios?",
        a: "Con espacios en casi todos los casos. Las redes sociales, los límites de meta descripción, los SMS y los campos de formulario cuentan los espacios. Los caracteres sin espacios se usan sobre todo en la tarifación de traducción profesional y en algunos requisitos académicos.",
      },
      {
        q: "¿Cuántas palabras tiene una página?",
        a: "Una convención habitual son unas 250 palabras por página a doble espacio y 500 a espacio simple en cuerpo 12. Editoriales y universidades suelen fijar su propia cifra, así que revisa las instrucciones que te dieron.",
      },
      {
        q: "¿Cuenta palabras en otros alfabetos?",
        a: "Sí. El recuento por espacios funciona para español, turco, alemán, francés, portugués, cirílico y la mayoría de las escrituras. Los idiomas que no separan palabras con espacios, como el chino o el japonés, no se pueden contar así.",
      },
      {
        q: "¿Se guarda o se envía mi texto?",
        a: "No. El recuento es JavaScript puro ejecutándose en tu navegador. Nada se sube, se guarda ni se registra: el texto existe solo en la página hasta que la cierras.",
      },
    ],
    relatedTitle: "Herramientas relacionadas",
    related: [
      { href: "/tools/case-converter", label: "Conversor de mayúsculas" },
      { href: "/tools/text-diff", label: "Comparar textos" },
      { href: "/tools/lorem-ipsum", label: "Generador Lorem Ipsum" },
      { href: "/tools/markdown-preview", label: "Vista previa Markdown" },
      { href: "/tools/number-to-words", label: "Número a letras" },
    ],
  },
  de: {
    intro: [
      "Ein Wortzähler zeigt Ihnen, wie viel Text Sie tatsächlich haben: Wörter, Zeichen mit und ohne Leerzeichen, Sätze und Absätze. Alle Werte aktualisieren sich beim Tippen, sodass Sie auf ein Limit hin schreiben können, statt den Text hinterher in ein Prüftool zu kopieren.",
      "Welche Zahl zählt, hängt davon ab, wohin der Text geht. Hausarbeiten und Artikel werden in Wörtern gemessen. Social-Media-Beiträge, Meta-Beschreibungen und SMS werden in Zeichen gemessen – Leerzeichen inklusive, was oft vergessen wird.",
      "Nichts, was Sie eingeben, wird hochgeladen. Das ist wichtiger, als es klingt: Entwürfe von Hausarbeiten, Bewerbungsschreiben, Patientennotizen und unveröffentlichte Artikel sind genau die Texte, die Menschen ohne nachzudenken in kostenlose Online-Zähler einfügen.",
    ],
    howToTitle: "Wörter zählen – so geht's",
    howToSteps: [
      "Schreiben Sie direkt in das Textfeld oder fügen Sie Text aus einem Dokument, einer E-Mail oder einer Webseite ein.",
      "Lesen Sie die Live-Werte – Wörter, Zeichen, Zeichen ohne Leerzeichen, Sätze und Absätze aktualisieren sich sofort.",
      "Nutzen Sie die Zeichenzahl mit Leerzeichen, wenn ein Formular oder eine Plattform ein Zeichenlimit nennt; das ist fast immer gemeint.",
      "Bearbeiten Sie den Text, bis Sie Ihr Ziel erreichen. Es wird nichts abgeschickt, Sie können also direkt weiterarbeiten.",
    ],
    featuresTitle: "Was dieses Tool kann",
    features: [
      {
        title: "Zählung in Echtzeit",
        desc: "Wörter, Zeichen, Sätze und Absätze werden bei jedem Tastendruck neu berechnet – ohne Button, ohne Neuladen.",
      },
      {
        title: "Zeichen mit und ohne Leerzeichen",
        desc: "Beide Werte werden getrennt angezeigt, denn Verlage, Formulare und Übersetzungsagenturen fragen jeweils nach einem anderen.",
      },
      {
        title: "Satz- und Absatzzahl",
        desc: "Nützlich zur Prüfung der Lesbarkeit: sehr lange Absätze und sehr lange Sätze sind die beiden häufigsten Ursachen für schwer lesbaren Text.",
      },
      {
        title: "Von Grund auf privat",
        desc: "Ihr Text bleibt im Browser und wird beim Schließen des Tabs verworfen. Geeignet für unveröffentlichte Entwürfe und vertrauliche Dokumente.",
      },
    ],
    faqTitle: "Häufige Fragen",
    faq: [
      {
        q: "Wie werden Wörter gezählt?",
        a: "Ein Wort ist jede durch Leerzeichen getrennte Zeichenfolge – dieselbe Regel wie in Textverarbeitungsprogrammen. Bindestrichwörter wie „wohlbekannt-sein\" zählen als ein Wort; Zahlen und einzeln stehende Symbole zählen ebenfalls als Wort, wenn sie durch Leerzeichen getrennt sind.",
      },
      {
        q: "Zeichen mit oder ohne Leerzeichen verwenden?",
        a: "In fast allen Fällen mit Leerzeichen. Social-Media-Plattformen, Meta-Description-Limits, SMS und Formularfelder zählen Leerzeichen mit. Zeichen ohne Leerzeichen wird vor allem bei professioneller Übersetzungsabrechnung und manchen akademischen Vorgaben verwendet.",
      },
      {
        q: "Wie viele Wörter sind eine Seite?",
        a: "Eine verbreitete Konvention sind etwa 250 Wörter pro Seite bei doppeltem Zeilenabstand und 500 bei einfachem Abstand in 12 pt. Verlage und Universitäten legen häufig eigene Werte fest – prüfen Sie die Vorgaben, die Sie erhalten haben.",
      },
      {
        q: "Zählt es Wörter in anderen Alphabeten?",
        a: "Ja. Die Zählung nach Leerzeichen funktioniert für Deutsch, Türkisch, Spanisch, Französisch, Portugiesisch, Kyrillisch und die meisten weiteren Schriften. Sprachen ohne Wortabstände wie Chinesisch und Japanisch lassen sich so nicht nach Wörtern zählen.",
      },
      {
        q: "Wird mein Text gespeichert oder irgendwohin gesendet?",
        a: "Nein. Die Zählung ist reines JavaScript in Ihrem Browser. Nichts wird hochgeladen, gespeichert oder protokolliert – der Text existiert nur in der Seite, bis Sie sie schließen.",
      },
    ],
    relatedTitle: "Verwandte Tools",
    related: [
      { href: "/tools/case-converter", label: "Groß-/Kleinschreibung" },
      { href: "/tools/text-diff", label: "Textvergleich" },
      { href: "/tools/lorem-ipsum", label: "Lorem-Ipsum-Generator" },
      { href: "/tools/markdown-preview", label: "Markdown-Vorschau" },
      { href: "/tools/number-to-words", label: "Zahl in Worten" },
    ],
  },
  pt: {
    intro: [
      "Um contador de palavras diz quanto texto você realmente tem: palavras, caracteres com e sem espaços, frases e parágrafos. Todas as contagens atualizam enquanto você digita, então dá para escrever em direção a um limite em vez de colar o texto num verificador depois.",
      "Qual contagem importa depende de para onde o texto vai. Trabalhos acadêmicos e artigos são medidos em palavras. Publicações em redes sociais, meta descrições e SMS são medidos em caracteres — incluindo espaços, o que muita gente esquece.",
      "Nada do que você digita é enviado. Isso importa mais do que parece: rascunhos de trabalhos, cartas de apresentação, anotações clínicas e artigos não publicados são justamente os textos que as pessoas colam em contadores online gratuitos sem pensar onde eles vão parar.",
    ],
    howToTitle: "Como contar palavras",
    howToSteps: [
      "Digite direto na área de texto ou cole texto de um documento, e-mail ou página web.",
      "Leia as contagens ao vivo — palavras, caracteres, caracteres sem espaços, frases e parágrafos atualizam na hora.",
      "Use a contagem de caracteres com espaços quando um formulário ou plataforma indicar um limite; é quase sempre isso que eles querem dizer.",
      "Edite até alcançar seu objetivo. Nada é enviado a lugar algum, então você pode continuar trabalhando ali mesmo.",
    ],
    featuresTitle: "O que esta ferramenta faz",
    features: [
      {
        title: "Contagem ao vivo",
        desc: "Palavras, caracteres, frases e parágrafos são recalculados a cada tecla — sem botão, sem recarregar a página.",
      },
      {
        title: "Caracteres com e sem espaços",
        desc: "Os dois números aparecem separadamente, porque editoras, formulários e agências de tradução pedem cada um deles.",
      },
      {
        title: "Contagem de frases e parágrafos",
        desc: "Útil para checar legibilidade: parágrafos muito longos e frases muito longas são as duas causas mais comuns de texto difícil de ler.",
      },
      {
        title: "Privado por design",
        desc: "Seu texto fica no navegador e é descartado ao fechar a aba. Adequado para rascunhos não publicados e documentos confidenciais.",
      },
    ],
    faqTitle: "Perguntas frequentes",
    faq: [
      {
        q: "Como as palavras são contadas?",
        a: "Uma palavra é qualquer sequência de caracteres separada por espaços, a mesma regra dos processadores de texto. Termos com hífen como \"bem-estar\" contam como uma palavra; números e símbolos isolados também contam se estiverem separados por espaços.",
      },
      {
        q: "Devo usar caracteres com ou sem espaços?",
        a: "Com espaços, em quase todos os casos. Redes sociais, limites de meta descrição, SMS e campos de formulário contam os espaços. Caracteres sem espaços é usado principalmente em precificação de tradução profissional e em alguns requisitos acadêmicos.",
      },
      {
        q: "Quantas palavras tem uma página?",
        a: "Uma convenção comum são cerca de 250 palavras por página com espaço duplo e 500 com espaço simples em corpo 12. Editoras e universidades costumam definir seus próprios números, então confira as orientações recebidas.",
      },
      {
        q: "Conta palavras em outros alfabetos?",
        a: "Sim. A contagem por espaços funciona para português, turco, alemão, espanhol, francês, cirílico e a maioria das escritas. Idiomas que não separam palavras por espaços, como chinês e japonês, não podem ser contados assim.",
      },
      {
        q: "Meu texto é armazenado ou enviado?",
        a: "Não. A contagem é JavaScript puro rodando no seu navegador. Nada é enviado, salvo ou registrado — o texto existe apenas na página até você fechá-la.",
      },
    ],
    relatedTitle: "Ferramentas relacionadas",
    related: [
      { href: "/tools/case-converter", label: "Conversor de maiúsculas" },
      { href: "/tools/text-diff", label: "Comparar textos" },
      { href: "/tools/lorem-ipsum", label: "Gerador Lorem Ipsum" },
      { href: "/tools/markdown-preview", label: "Pré-visualização Markdown" },
      { href: "/tools/number-to-words", label: "Número por extenso" },
    ],
  },
  fr: {
    intro: [
      "Un compteur de mots vous indique la quantité réelle de texte : mots, caractères avec et sans espaces, phrases et paragraphes. Tous les compteurs se mettent à jour pendant la saisie, ce qui permet d'écrire vers une limite au lieu de coller le texte dans un vérificateur après coup.",
      "Le compteur qui compte dépend de la destination du texte. Les devoirs universitaires et les articles se mesurent en mots. Les publications sur les réseaux, les méta-descriptions et les SMS se mesurent en caractères — espaces inclus, ce que l'on oublie souvent.",
      "Rien de ce que vous saisissez n'est envoyé. Cela compte plus qu'il n'y paraît : brouillons de devoirs, lettres de motivation, notes médicales et articles non publiés sont précisément les textes que l'on colle dans des compteurs en ligne gratuits sans se demander où ils finissent.",
    ],
    howToTitle: "Comment compter les mots",
    howToSteps: [
      "Écrivez directement dans la zone de texte ou collez du texte issu d'un document, d'un e-mail ou d'une page web.",
      "Lisez les compteurs en direct : mots, caractères, caractères sans espaces, phrases et paragraphes se mettent à jour instantanément.",
      "Utilisez le nombre de caractères avec espaces lorsqu'un formulaire ou une plateforme annonce une limite ; c'est presque toujours ce qu'ils entendent.",
      "Modifiez jusqu'à atteindre votre objectif. Rien n'est envoyé, vous pouvez donc continuer à travailler sur place.",
    ],
    featuresTitle: "Ce que fait cet outil",
    features: [
      {
        title: "Comptage en direct",
        desc: "Mots, caractères, phrases et paragraphes se recalculent à chaque frappe — sans bouton, sans rechargement.",
      },
      {
        title: "Caractères avec et sans espaces",
        desc: "Les deux nombres sont affichés séparément, car éditeurs, formulaires et agences de traduction demandent chacun l'un ou l'autre.",
      },
      {
        title: "Nombre de phrases et de paragraphes",
        desc: "Utile pour vérifier la lisibilité : les paragraphes très longs et les phrases très longues sont les deux causes les plus fréquentes d'un texte difficile à lire.",
      },
      {
        title: "Privé par conception",
        desc: "Votre texte reste dans le navigateur et disparaît à la fermeture de l'onglet. Convient aux brouillons non publiés et aux documents confidentiels.",
      },
    ],
    faqTitle: "Questions fréquentes",
    faq: [
      {
        q: "Comment les mots sont-ils comptés ?",
        a: "Un mot est toute suite de caractères séparée par des espaces, la même règle que les traitements de texte. Les termes avec trait d'union comme « bien-être » comptent pour un mot ; les nombres et symboles isolés comptent aussi s'ils sont séparés par des espaces.",
      },
      {
        q: "Faut-il compter les caractères avec ou sans espaces ?",
        a: "Avec espaces dans presque tous les cas. Les réseaux sociaux, les limites de méta-description, les SMS et les champs de formulaire comptent les espaces. Les caractères sans espaces servent surtout à la tarification de traduction professionnelle et à certaines exigences académiques.",
      },
      {
        q: "Combien de mots fait une page ?",
        a: "Une convention courante est d'environ 250 mots par page en double interligne et 500 en interligne simple, en corps 12. Éditeurs et universités fixent souvent leur propre chiffre : vérifiez les consignes reçues.",
      },
      {
        q: "Compte-t-il les mots dans d'autres alphabets ?",
        a: "Oui. Le comptage par espaces fonctionne pour le français, le turc, l'allemand, l'espagnol, le portugais, le cyrillique et la plupart des écritures. Les langues qui ne séparent pas les mots par des espaces, comme le chinois et le japonais, ne peuvent pas être comptées ainsi.",
      },
      {
        q: "Mon texte est-il stocké ou envoyé quelque part ?",
        a: "Non. Le comptage est du JavaScript pur exécuté dans votre navigateur. Rien n'est envoyé, enregistré ni journalisé — le texte n'existe que dans la page jusqu'à sa fermeture.",
      },
    ],
    relatedTitle: "Outils associés",
    related: [
      { href: "/tools/case-converter", label: "Convertisseur de casse" },
      { href: "/tools/text-diff", label: "Comparateur de textes" },
      { href: "/tools/lorem-ipsum", label: "Générateur Lorem Ipsum" },
      { href: "/tools/markdown-preview", label: "Aperçu Markdown" },
      { href: "/tools/number-to-words", label: "Nombre en lettres" },
    ],
  },
};

/**
 * Renk Seçici sayfasının SEO içeriği.
 * Hedef sorgular: sélecteur de couleur / code couleur (FR — gösterim lideri),
 * color picker, hex to rgb, selector de color, farbwähler.
 */
export const colorPickerContent: ToolContentMap = {
  en: {
    intro: [
      "A colour picker lets you choose a colour visually and read its value in every format you might need: HEX for CSS and design tools, RGB for canvas and image editing, and HSL when you want to adjust lightness or saturation without changing the hue.",
      "The three formats describe the same colour in different ways. HEX and RGB are the same information written differently — #2563EB is exactly rgb(37, 99, 235). HSL is the useful one when you are building a palette, because you can hold the hue steady and vary lightness to get a consistent set of tints and shades.",
      "Everything runs locally in your browser, and each value can be copied with one click straight into your stylesheet or design file.",
    ],
    howToTitle: "How to pick and convert a colour",
    howToSteps: [
      "Use the colour field to choose a colour visually, or paste an existing HEX value to start from a known colour.",
      "Read the HEX, RGB and HSL values, all updating together as you move the picker.",
      "Click any value to copy it to your clipboard in the exact syntax CSS expects.",
      "Adjust the lightness in HSL to build lighter and darker variants of the same hue for a palette.",
    ],
    featuresTitle: "What this tool does",
    features: [
      {
        title: "HEX, RGB and HSL together",
        desc: "All three formats are shown at once, so you never have to run a second conversion or look up a formula.",
      },
      {
        title: "One-click copy",
        desc: "Each value copies in valid CSS syntax — #2563eb, rgb(37, 99, 235), hsl(221, 83%, 53%) — ready to paste into a stylesheet.",
      },
      {
        title: "Visual picking",
        desc: "Choose colours by eye with the native colour field, or type an exact value when you are matching a brand colour.",
      },
      {
        title: "No account, no upload",
        desc: "Runs entirely in your browser. Nothing is stored, and the tool works offline once the page has loaded.",
      },
    ],
    faqTitle: "Frequently asked questions",
    faq: [
      {
        q: "How do I convert HEX to RGB?",
        a: "A HEX code is three pairs of hexadecimal digits for red, green and blue. #2563EB splits into 25, 63 and EB, which in decimal are 37, 99 and 235 — so rgb(37, 99, 235). This tool does the conversion for you as you pick.",
      },
      {
        q: "What is the difference between RGB and HSL?",
        a: "RGB describes how much red, green and blue light to mix. HSL describes hue (which colour on the wheel), saturation (how vivid) and lightness (how bright). HSL is easier for humans: to get a darker version of the same colour, you only lower the lightness.",
      },
      {
        q: "Which format should I use in CSS?",
        a: "All three are valid in every modern browser. HEX is the most common in codebases and design handoffs. RGB is convenient when you need transparency via rgba(). HSL is best for generating systematic colour scales.",
      },
      {
        q: "What does the 8-digit HEX code mean?",
        a: "An 8-digit HEX adds two characters for alpha transparency at the end — #2563EBFF is fully opaque, #2563EB80 is roughly 50% transparent. It is supported in all modern browsers.",
      },
      {
        q: "Is my colour data sent anywhere?",
        a: "No. Colour conversion is simple arithmetic done in your browser. Nothing is transmitted or stored.",
      },
    ],
    relatedTitle: "Related tools",
    related: [
      { href: "/tools/image-compress", label: "Compress Images" },
      { href: "/tools/favicon-generator", label: "Favicon Generator" },
      { href: "/tools/image-convert", label: "Convert Image Format" },
      { href: "/tools/lorem-ipsum", label: "Lorem Ipsum Generator" },
      { href: "/tools/base64", label: "Base64 Encoder" },
    ],
  },
  tr: {
    intro: [
      "Renk seçici, bir rengi görsel olarak seçmenizi ve değerini ihtiyaç duyabileceğiniz her formatta okumanızı sağlar: CSS ve tasarım araçları için HEX, canvas ve görüntü düzenleme için RGB, tonu değiştirmeden açıklık veya doygunluğu ayarlamak istediğinizde HSL.",
      "Üç format aynı rengi farklı biçimde tanımlar. HEX ve RGB, aynı bilginin farklı yazımıdır — #2563EB tam olarak rgb(37, 99, 235)'tir. Palet oluştururken işe yarayan HSL'dir; çünkü tonu sabit tutup açıklığı değiştirerek tutarlı bir açık-koyu seti elde edebilirsiniz.",
      "Her şey tarayıcınızda yerel çalışır ve her değer tek tıkla doğrudan stil dosyanıza veya tasarım dosyanıza kopyalanabilir.",
    ],
    howToTitle: "Renk nasıl seçilir ve dönüştürülür",
    howToSteps: [
      "Rengi görsel olarak seçmek için renk alanını kullanın veya bilinen bir renkten başlamak için mevcut bir HEX değerini yapıştırın.",
      "Seçiciyi hareket ettirdikçe birlikte güncellenen HEX, RGB ve HSL değerlerini okuyun.",
      "Herhangi bir değeri, CSS'in beklediği tam sözdizimiyle panonuza kopyalamak için üzerine tıklayın.",
      "Palet için aynı tonun daha açık ve daha koyu varyantlarını oluşturmak üzere HSL'deki açıklığı ayarlayın.",
    ],
    featuresTitle: "Bu araç ne yapar",
    features: [
      {
        title: "HEX, RGB ve HSL birlikte",
        desc: "Üç format aynı anda gösterilir; ikinci bir dönüştürme yapmanız veya formül aramanız gerekmez.",
      },
      {
        title: "Tek tıkla kopyalama",
        desc: "Her değer geçerli CSS sözdizimiyle kopyalanır — #2563eb, rgb(37, 99, 235), hsl(221, 83%, 53%) — stil dosyasına yapıştırmaya hazır.",
      },
      {
        title: "Görsel seçim",
        desc: "Yerleşik renk alanıyla gözle renk seçin veya bir marka rengini eşleştiriyorsanız tam değeri yazın.",
      },
      {
        title: "Hesap yok, yükleme yok",
        desc: "Tamamen tarayıcınızda çalışır. Hiçbir şey saklanmaz ve sayfa yüklendikten sonra araç çevrimdışı çalışır.",
      },
    ],
    faqTitle: "Sık sorulan sorular",
    faq: [
      {
        q: "HEX'i RGB'ye nasıl çeviririm?",
        a: "HEX kodu, kırmızı, yeşil ve mavi için üç onaltılık basamak çiftidir. #2563EB; 25, 63 ve EB olarak ayrılır ve bunlar ondalık sistemde 37, 99 ve 235'tir — yani rgb(37, 99, 235). Bu araç siz seçerken dönüşümü sizin için yapar.",
      },
      {
        q: "RGB ile HSL arasındaki fark nedir?",
        a: "RGB, ne kadar kırmızı, yeşil ve mavi ışığın karıştırılacağını tanımlar. HSL ise tonu (çarktaki hangi renk), doygunluğu (ne kadar canlı) ve açıklığı (ne kadar parlak) tanımlar. HSL insanlar için daha kolaydır: aynı rengin daha koyu bir sürümü için yalnızca açıklığı düşürürsünüz.",
      },
      {
        q: "CSS'te hangi formatı kullanmalıyım?",
        a: "Üçü de tüm modern tarayıcılarda geçerlidir. HEX kod tabanlarında ve tasarım teslimlerinde en yaygın olanıdır. RGB, rgba() ile şeffaflık gerektiğinde kullanışlıdır. HSL ise sistematik renk skalaları üretmek için en iyisidir.",
      },
      {
        q: "8 basamaklı HEX kodu ne anlama gelir?",
        a: "8 basamaklı HEX, sonuna alfa şeffaflığı için iki karakter ekler — #2563EBFF tamamen opak, #2563EB80 kabaca %50 şeffaftır. Tüm modern tarayıcılarda desteklenir.",
      },
      {
        q: "Renk verilerim bir yere gönderiliyor mu?",
        a: "Hayır. Renk dönüşümü tarayıcınızda yapılan basit aritmetiktir. Hiçbir şey iletilmez veya saklanmaz.",
      },
    ],
    relatedTitle: "İlgili araçlar",
    related: [
      { href: "/tools/image-compress", label: "Resim Sıkıştırma" },
      { href: "/tools/favicon-generator", label: "Favicon Üretici" },
      { href: "/tools/image-convert", label: "Resim Format Dönüştürücü" },
      { href: "/tools/lorem-ipsum", label: "Lorem Ipsum Üretici" },
      { href: "/tools/base64", label: "Base64 Kodlayıcı" },
    ],
  },
  es: {
    intro: [
      "Un selector de color te permite elegir un color visualmente y leer su valor en todos los formatos que puedas necesitar: HEX para CSS y herramientas de diseño, RGB para canvas y edición de imágenes, y HSL cuando quieres ajustar la luminosidad o la saturación sin cambiar el tono.",
      "Los tres formatos describen el mismo color de maneras distintas. HEX y RGB son la misma información escrita de otro modo: #2563EB es exactamente rgb(37, 99, 235). HSL es el útil cuando construyes una paleta, porque puedes mantener el tono fijo y variar la luminosidad para obtener un conjunto coherente de claros y oscuros.",
      "Todo se ejecuta localmente en tu navegador, y cada valor se copia con un clic directamente a tu hoja de estilos o archivo de diseño.",
    ],
    howToTitle: "Cómo elegir y convertir un color",
    howToSteps: [
      "Usa el campo de color para elegir visualmente, o pega un valor HEX existente para partir de un color conocido.",
      "Lee los valores HEX, RGB y HSL, que se actualizan juntos mientras mueves el selector.",
      "Haz clic en cualquier valor para copiarlo al portapapeles con la sintaxis exacta que espera CSS.",
      "Ajusta la luminosidad en HSL para crear variantes más claras y más oscuras del mismo tono y armar una paleta.",
    ],
    featuresTitle: "Qué hace esta herramienta",
    features: [
      {
        title: "HEX, RGB y HSL juntos",
        desc: "Los tres formatos se muestran a la vez, así que nunca necesitas una segunda conversión ni buscar una fórmula.",
      },
      {
        title: "Copia con un clic",
        desc: "Cada valor se copia en sintaxis CSS válida — #2563eb, rgb(37, 99, 235), hsl(221, 83%, 53%) — listo para pegar.",
      },
      {
        title: "Selección visual",
        desc: "Elige colores a ojo con el campo nativo, o escribe un valor exacto cuando tienes que igualar un color de marca.",
      },
      {
        title: "Sin cuenta ni subidas",
        desc: "Se ejecuta por completo en tu navegador. Nada se almacena y la herramienta funciona sin conexión una vez cargada.",
      },
    ],
    faqTitle: "Preguntas frecuentes",
    faq: [
      {
        q: "¿Cómo convierto HEX a RGB?",
        a: "Un código HEX son tres pares de dígitos hexadecimales para rojo, verde y azul. #2563EB se divide en 25, 63 y EB, que en decimal son 37, 99 y 235: rgb(37, 99, 235). Esta herramienta hace la conversión mientras eliges.",
      },
      {
        q: "¿Cuál es la diferencia entre RGB y HSL?",
        a: "RGB describe cuánta luz roja, verde y azul mezclar. HSL describe el tono (qué color de la rueda), la saturación (cuán vivo) y la luminosidad (cuán claro). HSL es más intuitivo: para una versión más oscura del mismo color solo bajas la luminosidad.",
      },
      {
        q: "¿Qué formato debo usar en CSS?",
        a: "Los tres son válidos en cualquier navegador moderno. HEX es el más común en el código y en las entregas de diseño. RGB es cómodo cuando necesitas transparencia con rgba(). HSL es el mejor para generar escalas de color sistemáticas.",
      },
      {
        q: "¿Qué significa el código HEX de 8 dígitos?",
        a: "Un HEX de 8 dígitos añade dos caracteres al final para la transparencia alfa: #2563EBFF es totalmente opaco y #2563EB80 es aproximadamente 50% transparente. Está soportado en todos los navegadores modernos.",
      },
      {
        q: "¿Se envían mis datos de color a algún sitio?",
        a: "No. La conversión de color es aritmética simple hecha en tu navegador. Nada se transmite ni se almacena.",
      },
    ],
    relatedTitle: "Herramientas relacionadas",
    related: [
      { href: "/tools/image-compress", label: "Comprimir imágenes" },
      { href: "/tools/favicon-generator", label: "Generador de favicon" },
      { href: "/tools/image-convert", label: "Convertir formato" },
      { href: "/tools/lorem-ipsum", label: "Generador Lorem Ipsum" },
      { href: "/tools/base64", label: "Codificador Base64" },
    ],
  },
  de: {
    intro: [
      "Ein Farbwähler lässt Sie eine Farbe visuell auswählen und ihren Wert in jedem benötigten Format ablesen: HEX für CSS und Designtools, RGB für Canvas und Bildbearbeitung, und HSL wenn Sie Helligkeit oder Sättigung ändern wollen, ohne den Farbton zu verschieben.",
      "Die drei Formate beschreiben dieselbe Farbe unterschiedlich. HEX und RGB sind dieselbe Information in anderer Schreibweise – #2563EB ist exakt rgb(37, 99, 235). HSL ist nützlich beim Aufbau einer Palette, weil Sie den Farbton konstant halten und nur die Helligkeit variieren können, um einen konsistenten Satz heller und dunkler Töne zu erhalten.",
      "Alles läuft lokal in Ihrem Browser, und jeder Wert lässt sich mit einem Klick direkt in Ihr Stylesheet oder Ihre Designdatei kopieren.",
    ],
    howToTitle: "Farbe auswählen und umrechnen",
    howToSteps: [
      "Nutzen Sie das Farbfeld zur visuellen Auswahl oder fügen Sie einen vorhandenen HEX-Wert ein, um von einer bekannten Farbe auszugehen.",
      "Lesen Sie die HEX-, RGB- und HSL-Werte, die sich beim Bewegen des Wählers gemeinsam aktualisieren.",
      "Klicken Sie auf einen Wert, um ihn in der von CSS erwarteten Syntax in die Zwischenablage zu kopieren.",
      "Passen Sie die Helligkeit in HSL an, um hellere und dunklere Varianten desselben Farbtons für eine Palette zu erzeugen.",
    ],
    featuresTitle: "Was dieses Tool kann",
    features: [
      {
        title: "HEX, RGB und HSL gemeinsam",
        desc: "Alle drei Formate werden gleichzeitig angezeigt – keine zweite Umrechnung, kein Nachschlagen von Formeln.",
      },
      {
        title: "Kopieren mit einem Klick",
        desc: "Jeder Wert wird in gültiger CSS-Syntax kopiert – #2563eb, rgb(37, 99, 235), hsl(221, 83%, 53%) – direkt einfügbar.",
      },
      {
        title: "Visuelle Auswahl",
        desc: "Wählen Sie Farben nach Augenmaß mit dem nativen Farbfeld oder tippen Sie einen exakten Wert, wenn Sie eine Markenfarbe treffen müssen.",
      },
      {
        title: "Kein Konto, kein Upload",
        desc: "Läuft vollständig in Ihrem Browser. Nichts wird gespeichert, und nach dem Laden funktioniert das Tool offline.",
      },
    ],
    faqTitle: "Häufige Fragen",
    faq: [
      {
        q: "Wie rechne ich HEX in RGB um?",
        a: "Ein HEX-Code besteht aus drei Paaren hexadezimaler Ziffern für Rot, Grün und Blau. #2563EB teilt sich in 25, 63 und EB, dezimal 37, 99 und 235 – also rgb(37, 99, 235). Dieses Tool rechnet automatisch mit, während Sie wählen.",
      },
      {
        q: "Was ist der Unterschied zwischen RGB und HSL?",
        a: "RGB beschreibt, wie viel rotes, grünes und blaues Licht gemischt wird. HSL beschreibt Farbton (welche Farbe im Kreis), Sättigung (wie kräftig) und Helligkeit (wie hell). HSL ist für Menschen intuitiver: für eine dunklere Version derselben Farbe senken Sie nur die Helligkeit.",
      },
      {
        q: "Welches Format soll ich in CSS verwenden?",
        a: "Alle drei sind in jedem modernen Browser gültig. HEX ist in Codebasen und Design-Übergaben am verbreitetsten. RGB ist praktisch, wenn Sie Transparenz über rgba() brauchen. HSL eignet sich am besten für systematische Farbskalen.",
      },
      {
        q: "Was bedeutet der 8-stellige HEX-Code?",
        a: "Ein 8-stelliger HEX-Wert ergänzt am Ende zwei Zeichen für die Alpha-Transparenz – #2563EBFF ist vollständig deckend, #2563EB80 etwa 50% transparent. Alle modernen Browser unterstützen das.",
      },
      {
        q: "Werden meine Farbdaten irgendwohin gesendet?",
        a: "Nein. Die Farbumrechnung ist einfache Arithmetik in Ihrem Browser. Nichts wird übertragen oder gespeichert.",
      },
    ],
    relatedTitle: "Verwandte Tools",
    related: [
      { href: "/tools/image-compress", label: "Bilder komprimieren" },
      { href: "/tools/favicon-generator", label: "Favicon-Generator" },
      { href: "/tools/image-convert", label: "Format konvertieren" },
      { href: "/tools/lorem-ipsum", label: "Lorem-Ipsum-Generator" },
      { href: "/tools/base64", label: "Base64-Encoder" },
    ],
  },
  pt: {
    intro: [
      "Um seletor de cores permite escolher uma cor visualmente e ler seu valor em todos os formatos que você possa precisar: HEX para CSS e ferramentas de design, RGB para canvas e edição de imagens, e HSL quando quer ajustar luminosidade ou saturação sem mudar o matiz.",
      "Os três formatos descrevem a mesma cor de maneiras diferentes. HEX e RGB são a mesma informação escrita de outro jeito — #2563EB é exatamente rgb(37, 99, 235). HSL é o útil quando você monta uma paleta, porque pode manter o matiz fixo e variar a luminosidade para obter um conjunto coerente de tons claros e escuros.",
      "Tudo roda localmente no seu navegador, e cada valor pode ser copiado com um clique direto para sua folha de estilos ou arquivo de design.",
    ],
    howToTitle: "Como escolher e converter uma cor",
    howToSteps: [
      "Use o campo de cor para escolher visualmente, ou cole um valor HEX existente para partir de uma cor conhecida.",
      "Leia os valores HEX, RGB e HSL, que atualizam juntos conforme você move o seletor.",
      "Clique em qualquer valor para copiá-lo para a área de transferência na sintaxe exata que o CSS espera.",
      "Ajuste a luminosidade em HSL para criar variantes mais claras e mais escuras do mesmo matiz e formar uma paleta.",
    ],
    featuresTitle: "O que esta ferramenta faz",
    features: [
      {
        title: "HEX, RGB e HSL juntos",
        desc: "Os três formatos aparecem ao mesmo tempo, então você nunca precisa de uma segunda conversão nem de procurar fórmulas.",
      },
      {
        title: "Copiar com um clique",
        desc: "Cada valor é copiado em sintaxe CSS válida — #2563eb, rgb(37, 99, 235), hsl(221, 83%, 53%) — pronto para colar.",
      },
      {
        title: "Seleção visual",
        desc: "Escolha cores a olho com o campo nativo, ou digite um valor exato quando precisa igualar uma cor de marca.",
      },
      {
        title: "Sem conta, sem upload",
        desc: "Roda inteiramente no seu navegador. Nada é armazenado e a ferramenta funciona offline depois de carregada.",
      },
    ],
    faqTitle: "Perguntas frequentes",
    faq: [
      {
        q: "Como converto HEX para RGB?",
        a: "Um código HEX são três pares de dígitos hexadecimais para vermelho, verde e azul. #2563EB se divide em 25, 63 e EB, que em decimal são 37, 99 e 235 — ou seja, rgb(37, 99, 235). Esta ferramenta faz a conversão enquanto você escolhe.",
      },
      {
        q: "Qual a diferença entre RGB e HSL?",
        a: "RGB descreve quanta luz vermelha, verde e azul misturar. HSL descreve matiz (qual cor na roda), saturação (quão vívida) e luminosidade (quão clara). HSL é mais intuitivo: para uma versão mais escura da mesma cor, basta baixar a luminosidade.",
      },
      {
        q: "Qual formato devo usar no CSS?",
        a: "Os três são válidos em qualquer navegador moderno. HEX é o mais comum em bases de código e entregas de design. RGB é conveniente quando você precisa de transparência via rgba(). HSL é o melhor para gerar escalas de cor sistemáticas.",
      },
      {
        q: "O que significa o código HEX de 8 dígitos?",
        a: "Um HEX de 8 dígitos acrescenta dois caracteres no fim para transparência alfa — #2563EBFF é totalmente opaco e #2563EB80 é cerca de 50% transparente. É suportado em todos os navegadores modernos.",
      },
      {
        q: "Meus dados de cor são enviados a algum lugar?",
        a: "Não. A conversão de cor é aritmética simples feita no seu navegador. Nada é transmitido nem armazenado.",
      },
    ],
    relatedTitle: "Ferramentas relacionadas",
    related: [
      { href: "/tools/image-compress", label: "Comprimir imagens" },
      { href: "/tools/favicon-generator", label: "Gerador de favicon" },
      { href: "/tools/image-convert", label: "Converter formato" },
      { href: "/tools/lorem-ipsum", label: "Gerador Lorem Ipsum" },
      { href: "/tools/base64", label: "Codificador Base64" },
    ],
  },
  fr: {
    intro: [
      "Un sélecteur de couleur permet de choisir une couleur visuellement et de lire son code dans tous les formats utiles : HEX pour le CSS et les outils de design, RGB pour le canvas et l'édition d'images, et HSL quand vous voulez ajuster la luminosité ou la saturation sans changer la teinte.",
      "Les trois formats décrivent la même couleur autrement. HEX et RGB sont la même information écrite différemment — #2563EB vaut exactement rgb(37, 99, 235). HSL est le format utile pour construire une palette : en gardant la teinte fixe et en variant la luminosité, vous obtenez une série cohérente de nuances claires et foncées.",
      "Tout s'exécute localement dans votre navigateur, et chaque valeur se copie en un clic directement dans votre feuille de style ou votre fichier de design.",
    ],
    howToTitle: "Comment choisir et convertir une couleur",
    howToSteps: [
      "Utilisez le champ de couleur pour choisir visuellement, ou collez un code HEX existant pour partir d'une couleur connue.",
      "Lisez les valeurs HEX, RGB et HSL, qui se mettent à jour ensemble quand vous déplacez le sélecteur.",
      "Cliquez sur une valeur pour la copier dans le presse-papiers, avec la syntaxe exacte attendue par CSS.",
      "Ajustez la luminosité en HSL pour créer des variantes plus claires et plus foncées de la même teinte et composer une palette.",
    ],
    featuresTitle: "Ce que fait cet outil",
    features: [
      {
        title: "HEX, RGB et HSL ensemble",
        desc: "Les trois formats sont affichés simultanément : aucune seconde conversion ni recherche de formule nécessaire.",
      },
      {
        title: "Copie en un clic",
        desc: "Chaque valeur se copie en syntaxe CSS valide — #2563eb, rgb(37, 99, 235), hsl(221, 83%, 53%) — prête à coller.",
      },
      {
        title: "Sélection visuelle",
        desc: "Choisissez une couleur à l'œil avec le champ natif, ou saisissez une valeur exacte pour respecter une couleur de marque.",
      },
      {
        title: "Sans compte, sans envoi",
        desc: "S'exécute entièrement dans votre navigateur. Rien n'est stocké, et l'outil fonctionne hors ligne une fois la page chargée.",
      },
    ],
    faqTitle: "Questions fréquentes",
    faq: [
      {
        q: "Comment convertir HEX en RGB ?",
        a: "Un code HEX est composé de trois paires de chiffres hexadécimaux pour le rouge, le vert et le bleu. #2563EB se découpe en 25, 63 et EB, soit 37, 99 et 235 en décimal — donc rgb(37, 99, 235). Cet outil effectue la conversion pendant que vous choisissez.",
      },
      {
        q: "Quelle différence entre RGB et HSL ?",
        a: "RGB décrit la quantité de lumière rouge, verte et bleue à mélanger. HSL décrit la teinte (quelle couleur sur la roue), la saturation (son intensité) et la luminosité. HSL est plus intuitif : pour obtenir une version plus foncée de la même couleur, il suffit de baisser la luminosité.",
      },
      {
        q: "Quel format utiliser en CSS ?",
        a: "Les trois sont valides dans tous les navigateurs modernes. HEX est le plus répandu dans le code et les livraisons de design. RGB est pratique quand il faut de la transparence via rgba(). HSL est le meilleur choix pour générer des échelles de couleurs systématiques.",
      },
      {
        q: "Que signifie un code HEX à 8 caractères ?",
        a: "Un HEX à 8 caractères ajoute deux caractères de transparence alpha à la fin — #2563EBFF est totalement opaque, #2563EB80 environ 50% transparent. C'est pris en charge par tous les navigateurs modernes.",
      },
      {
        q: "Mes données de couleur sont-elles envoyées quelque part ?",
        a: "Non. La conversion de couleur est une simple arithmétique effectuée dans votre navigateur. Rien n'est transmis ni stocké.",
      },
    ],
    relatedTitle: "Outils associés",
    related: [
      { href: "/tools/image-compress", label: "Compresser des images" },
      { href: "/tools/favicon-generator", label: "Générateur de favicon" },
      { href: "/tools/image-convert", label: "Convertir le format" },
      { href: "/tools/lorem-ipsum", label: "Générateur Lorem Ipsum" },
      { href: "/tools/base64", label: "Encodeur Base64" },
    ],
  },
};
