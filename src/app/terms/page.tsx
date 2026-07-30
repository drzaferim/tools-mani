"use client";

import { useLanguage, pick } from "@/lib/language-context";

const content = {
  en: {
    title: "Terms of Use",
    updated: "Last updated: July 14, 2026",
    sections: [
      {
        h: "Using ToolsMani",
        p: [
          "ToolsMani provides free, browser-based utilities. By using the site you agree to these terms. If you do not agree, please do not use the site.",
          "You may use the tools for any lawful personal or commercial purpose. You may not use the site to process illegal content, attempt to disrupt the service, or scrape it abusively.",
        ],
      },
      {
        h: "No warranty",
        p: [
          "The tools are provided \"as is\" without warranty of any kind. We work hard to make them accurate and reliable, but we cannot guarantee that output files are error-free or fit for a particular purpose. Always keep a copy of your original files — since processing happens on your device, we never have a copy to restore.",
        ],
      },
      {
        h: "Limitation of liability",
        p: [
          "To the maximum extent permitted by law, ToolsMani is not liable for any damages arising from the use or inability to use the site, including data loss resulting from processed files.",
        ],
      },
      {
        h: "Your files stay yours",
        p: [
          "We claim no rights over anything you process with the tools. Since files never reach our servers, we could not claim any even if we wanted to.",
        ],
      },
      {
        h: "Changes",
        p: [
          "We may update these terms as the site evolves. The date above reflects the latest revision. Continued use of the site after a change means you accept the updated terms.",
        ],
      },
    ],
  },
  tr: {
    title: "Kullanım Şartları",
    updated: "Son güncelleme: 14 Temmuz 2026",
    sections: [
      {
        h: "ToolsMani'yi kullanmak",
        p: [
          "ToolsMani ücretsiz, tarayıcı tabanlı araçlar sunar. Siteyi kullanarak bu şartları kabul etmiş olursunuz. Kabul etmiyorsanız lütfen siteyi kullanmayın.",
          "Araçları yasal olan her türlü kişisel veya ticari amaçla kullanabilirsiniz. Siteyi yasa dışı içerik işlemek, hizmeti aksatmaya çalışmak veya kötüye varan biçimde kazımak (scraping) için kullanamazsınız.",
        ],
      },
      {
        h: "Garanti verilmez",
        p: [
          "Araçlar hiçbir garanti olmaksızın \"olduğu gibi\" sunulur. Doğru ve güvenilir olmaları için çok çalışıyoruz; ancak çıktı dosyalarının hatasız veya belirli bir amaca uygun olduğunu garanti edemeyiz. Orijinal dosyalarınızın bir kopyasını mutlaka saklayın — işlem cihazınızda gerçekleştiği için bizde geri yüklenecek bir kopya asla bulunmaz.",
        ],
      },
      {
        h: "Sorumluluk sınırı",
        p: [
          "Yasaların izin verdiği azami ölçüde ToolsMani; sitenin kullanımından veya kullanılamamasından doğan, işlenen dosyalardan kaynaklanan veri kaybı dahil hiçbir zarardan sorumlu değildir.",
        ],
      },
      {
        h: "Dosyalarınız sizindir",
        p: [
          "Araçlarla işlediğiniz hiçbir şey üzerinde hak iddia etmeyiz. Dosyalar sunucularımıza hiç ulaşmadığı için istesek de iddia edemezdik.",
        ],
      },
      {
        h: "Değişiklikler",
        p: [
          "Site geliştikçe bu şartları güncelleyebiliriz. Yukarıdaki tarih son revizyonu gösterir. Değişiklikten sonra siteyi kullanmaya devam etmeniz güncel şartları kabul ettiğiniz anlamına gelir.",
        ],
      },
    ],
  },

  es: {
    title: "Términos de uso",
    updated: "Última actualización: 14 de julio de 2026",
    sections: [
      {
        h: "Uso de ToolsMani",
        p: [
          "ToolsMani ofrece utilidades gratuitas basadas en el navegador. Al usar el sitio aceptas estos términos. Si no estás de acuerdo, por favor no uses el sitio.",
          "Puedes usar las herramientas con cualquier finalidad lícita, personal o comercial. No puedes usar el sitio para procesar contenido ilegal, intentar interrumpir el servicio ni extraer datos de forma abusiva.",
        ],
      },
      {
        h: "Sin garantía",
        p: [
          "Las herramientas se ofrecen «tal cual», sin garantía de ningún tipo. Trabajamos duro para que sean precisas y fiables, pero no podemos garantizar que los archivos de salida estén libres de errores ni que sirvan para un fin concreto. Conserva siempre una copia de tus archivos originales: como el procesamiento ocurre en tu dispositivo, nosotros nunca tenemos una copia que restaurar.",
        ],
      },
      {
        h: "Limitación de responsabilidad",
        p: [
          "En la máxima medida permitida por la ley, ToolsMani no se hace responsable de ningún daño derivado del uso o de la imposibilidad de usar el sitio, incluida la pérdida de datos resultante de los archivos procesados.",
        ],
      },
      {
        h: "Tus archivos siguen siendo tuyos",
        p: [
          "No reclamamos ningún derecho sobre lo que proceses con las herramientas. Como los archivos nunca llegan a nuestros servidores, no podríamos reclamar nada aunque quisiéramos.",
        ],
      },
      {
        h: "Cambios",
        p: [
          "Podemos actualizar estos términos a medida que el sitio evoluciona. La fecha superior refleja la última revisión. Si sigues usando el sitio después de un cambio, aceptas los términos actualizados.",
        ],
      },
    ],
  },
  de: {
    title: "Nutzungsbedingungen",
    updated: "Zuletzt aktualisiert: 14. Juli 2026",
    sections: [
      {
        h: "Nutzung von ToolsMani",
        p: [
          "ToolsMani stellt kostenlose, browserbasierte Werkzeuge bereit. Mit der Nutzung der Website stimmen Sie diesen Bedingungen zu. Wenn Sie nicht einverstanden sind, nutzen Sie die Website bitte nicht.",
          "Sie dürfen die Tools für jeden rechtmäßigen privaten oder gewerblichen Zweck verwenden. Sie dürfen die Website nicht nutzen, um illegale Inhalte zu verarbeiten, den Dienst zu stören oder sie missbräuchlich auszulesen (Scraping).",
        ],
      },
      {
        h: "Keine Gewährleistung",
        p: [
          "Die Tools werden „wie besehen“ ohne jegliche Gewährleistung bereitgestellt. Wir arbeiten daran, sie genau und zuverlässig zu machen, können aber nicht garantieren, dass die Ausgabedateien fehlerfrei oder für einen bestimmten Zweck geeignet sind. Bewahren Sie stets eine Kopie Ihrer Originaldateien auf – da die Verarbeitung auf Ihrem Gerät erfolgt, haben wir nie eine Kopie zum Wiederherstellen.",
        ],
      },
      {
        h: "Haftungsbeschränkung",
        p: [
          "Soweit gesetzlich zulässig, haftet ToolsMani nicht für Schäden, die aus der Nutzung oder der Unmöglichkeit der Nutzung der Website entstehen, einschließlich Datenverlust infolge verarbeiteter Dateien.",
        ],
      },
      {
        h: "Ihre Dateien bleiben Ihre",
        p: [
          "Wir erheben keinerlei Anspruch auf das, was Sie mit den Tools verarbeiten. Da die Dateien unsere Server nie erreichen, könnten wir selbst dann keinen Anspruch erheben, wenn wir es wollten.",
        ],
      },
      {
        h: "Änderungen",
        p: [
          "Wir können diese Bedingungen anpassen, während sich die Website weiterentwickelt. Das Datum oben gibt die letzte Überarbeitung an. Nutzen Sie die Website nach einer Änderung weiter, akzeptieren Sie die aktualisierten Bedingungen.",
        ],
      },
    ],
  },
  pt: {
    title: "Termos de uso",
    updated: "Última atualização: 14 de julho de 2026",
    sections: [
      {
        h: "Usando o ToolsMani",
        p: [
          "O ToolsMani oferece utilitários gratuitos que funcionam no navegador. Ao usar o site, você concorda com estes termos. Se não concordar, por favor não use o site.",
          "Você pode usar as ferramentas para qualquer finalidade lícita, pessoal ou comercial. Você não pode usar o site para processar conteúdo ilegal, tentar interromper o serviço ou extrair dados de forma abusiva.",
        ],
      },
      {
        h: "Sem garantia",
        p: [
          "As ferramentas são fornecidas «como estão», sem garantia de qualquer tipo. Trabalhamos bastante para que sejam precisas e confiáveis, mas não podemos garantir que os arquivos de saída estejam livres de erros ou sejam adequados a um fim específico. Sempre mantenha uma cópia dos seus arquivos originais — como o processamento acontece no seu dispositivo, nunca temos uma cópia para restaurar.",
        ],
      },
      {
        h: "Limitação de responsabilidade",
        p: [
          "Na máxima extensão permitida por lei, o ToolsMani não se responsabiliza por quaisquer danos decorrentes do uso ou da impossibilidade de uso do site, incluindo perda de dados resultante dos arquivos processados.",
        ],
      },
      {
        h: "Seus arquivos continuam seus",
        p: [
          "Não reivindicamos nenhum direito sobre o que você processa com as ferramentas. Como os arquivos nunca chegam aos nossos servidores, não poderíamos reivindicar nada nem se quiséssemos.",
        ],
      },
      {
        h: "Alterações",
        p: [
          "Podemos atualizar estes termos conforme o site evolui. A data acima reflete a última revisão. Continuar usando o site após uma alteração significa que você aceita os termos atualizados.",
        ],
      },
    ],
  },
  fr: {
    title: "Conditions d'utilisation",
    updated: "Dernière mise à jour : 14 juillet 2026",
    sections: [
      {
        h: "Utiliser ToolsMani",
        p: [
          "ToolsMani propose des utilitaires gratuits fonctionnant dans le navigateur. En utilisant le site, vous acceptez ces conditions. Si vous ne les acceptez pas, veuillez ne pas utiliser le site.",
          "Vous pouvez utiliser les outils à toute fin licite, personnelle ou commerciale. Vous ne pouvez pas utiliser le site pour traiter des contenus illégaux, tenter de perturber le service ou en extraire les données de manière abusive.",
        ],
      },
      {
        h: "Aucune garantie",
        p: [
          "Les outils sont fournis « en l'état », sans garantie d'aucune sorte. Nous nous efforçons de les rendre précis et fiables, mais nous ne pouvons pas garantir que les fichiers produits sont exempts d'erreurs ni adaptés à un usage particulier. Conservez toujours une copie de vos fichiers d'origine : le traitement ayant lieu sur votre appareil, nous n'avons jamais de copie à restaurer.",
        ],
      },
      {
        h: "Limitation de responsabilité",
        p: [
          "Dans toute la mesure permise par la loi, ToolsMani ne saurait être tenu responsable de dommages découlant de l'utilisation ou de l'impossibilité d'utiliser le site, y compris la perte de données résultant des fichiers traités.",
        ],
      },
      {
        h: "Vos fichiers restent les vôtres",
        p: [
          "Nous ne revendiquons aucun droit sur ce que vous traitez avec les outils. Comme les fichiers n'atteignent jamais nos serveurs, nous ne pourrions rien revendiquer même si nous le voulions.",
        ],
      },
      {
        h: "Modifications",
        p: [
          "Nous pouvons mettre à jour ces conditions au fur et à mesure de l'évolution du site. La date ci-dessus indique la dernière révision. Continuer à utiliser le site après une modification vaut acceptation des conditions mises à jour.",
        ],
      },
    ],
  },
};

export default function TermsPage() {
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
