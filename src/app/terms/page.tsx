"use client";

import { useLanguage } from "@/lib/language-context";

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
};

export default function TermsPage() {
  const { locale } = useLanguage();
  const c = content[locale];

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
