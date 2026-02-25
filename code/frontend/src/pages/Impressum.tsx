import React from "react";

const ImpressumPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-16 mt-12 mb-12">
        <div className="max-w-10xl mx-auto bg-white shadow-sm rounded-lg">
          
          {/* Header */}
          <div className="border-b border-gray-200 px-8 md:px-12 py-8">
            <h1 className="text-4xl font-bold text-gray-900">Impressum</h1>
            <p className="text-gray-500 mt-2">Angaben gemäß § 5 TMG</p>
          </div>

          {/* Content */}
          <div className="px-8 md:px-12 py-10 space-y-10">
            
            {/* Verantwortlicher Dienstanbieter */}
            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Verantwortlicher Dienstanbieter
              </h2>
              <div className="text-gray-700 leading-relaxed space-y-2">
                <p>
                  Verantwortlicher Dienstanbieter i.S.v. § 5 DDG (ehem. TMG) für die gannaca GmbH & Co. KG ist
                </p>
                <p className="font-medium mt-4">Herr Christopher Patrick Peterka</p>
                <p>Geschäftsführer</p>
                <p className="font-medium mt-3">gannaca GmbH & Co. KG</p>
                <p>
                  Luftschiff-Platz 26<br />
                  50733 Köln<br />
                  Deutschland
                </p>
                <p className="mt-3">
                  Tel.: <a href="tel:+4916092269672" className="text-gray-900 hover:underline">+49 160 922 696 72</a>
                </p>
                <p>
                  E-Mail: <a href="mailto:peterka@gannaca.com" className="text-gray-900 hover:underline">peterka@gannaca.com</a>
                </p>
                <p>
                  Website: <a href="https://www.gannaca.com" target="_blank" rel="noopener noreferrer" className="text-gray-900 hover:underline">www.gannaca.com</a>
                </p>
              </div>
            </section>

            <hr className="border-gray-200" />

            {/* Markenhinweis */}
            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Hinweis zur Marke „Kölner Vermögen"
              </h2>
              <div className="text-gray-700 leading-relaxed space-y-3">
                <p>
                  <strong>Kölner Vermögen</strong> ist eine eingetragene Marke der <strong>gannaca GmbH & Co. KG</strong>.
                </p>
                <p> 
                  Betreiberin dieser Website ist die gannaca GmbH & Co. KG.
                </p>
              </div>
            </section>

            <hr className="border-gray-200" />

            {/* Registereintragungen */}
            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Registereintragungen
              </h2>
              <div className="text-gray-700 leading-relaxed space-y-4">
                <div>
                  <p className="font-medium">gannaca GmbH & Co. KG</p>
                  <p>Amtsgericht Köln HRA 23235</p>
                </div>
                <div>
                  <p className="font-medium">Komplementärin: gannaca Verwaltungs GmbH</p>
                  <p>Amtsgericht Köln HRB 56092</p>
                </div>
              </div>
            </section>

            <hr className="border-gray-200" />

            {/* Umsatzsteuer-ID */}
            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Umsatzsteuer-ID
              </h2>
              <div className="text-gray-700 leading-relaxed">
                <p className="mb-2">Umsatzsteuer-Identifikationsnummer gemäß §27 a Umsatzsteuergesetz:</p>
                <p className="font-mono font-medium text-gray-900">DE814575529</p>
              </div>
            </section>

            <hr className="border-gray-200" />

            {/* Sonstige Angaben */}
            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Sonstige Angaben
              </h2>
              <div className="text-gray-700 leading-relaxed space-y-2">
                <p>Sitz der Gesellschaft: <span className="font-medium">Köln</span></p>
                <p>Geschäftsführer: <span className="font-medium">Christopher P. Peterka</span></p>
                <p>Copyright: <span className="font-medium">© gannaca GmbH & Co. KG 2002–2025</span></p>
                <p className="text-gray-600 italic pt-2">Alle Rechte vorbehalten.</p>
              </div>
            </section>

            <hr className="border-gray-200" />

            {/* Rechtlicher Hinweis */}
            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Rechtlicher Hinweis
              </h2>
              <div className="text-gray-700 leading-relaxed space-y-3">
                <p>
                  Die Inhalte dieser Seiten wurden mit größter Sorgfalt erstellt.
                </p>
                <p>
                  Als Diensteanbieter ist die gannaca GmbH & Co. KG gemäß § 7 Abs. 1 DDG (ehemals TMG) i.V.m. Art. 4 bis 8 DSA [VO (EU) 2022/2065] für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich.
                </p>
                <p>
                  Alle veröffentlichten Informationen sind durch die gannaca GmbH & Co. KG autorisiert.
                </p>
                <p>
                  Die Rechte für das verwendete Bild- und Filmmaterial liegen bei der gannaca GmbH & Co. KG.
                </p>
                <p>
                  Layout und Gestaltung dieser Präsentation sowie die enthaltenen Informationen sind gemäß dem Urheberrechtsgesetz geschützt.
                </p>
                <p>
                  Eingetragene und nicht eingetragene Warenzeichen der gannaca GmbH & Co. KG oder Dritter dürfen ohne vorherige schriftliche Zustimmung nicht in Werbematerialien oder anderen Veröffentlichungen verwendet werden.
                </p>
                <p className="font-medium">
                  Alle Angaben erfolgen ohne Gewähr. Eine Haftung für Schäden, die sich aus der Verwendung der veröffentlichten Inhalte ergeben, ist ausgeschlossen.
                </p>
              </div>
            </section>

            <hr className="border-gray-200" />

            {/* Weitere rechtliche Informationen */}
            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Weitere rechtliche Informationen
              </h2>
              <div className="text-gray-700 leading-relaxed">
                <p>
                  Hier finden Sie unsere{' '}
                  <a 
                    href="https://www.gannaca.de/agb" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-gray-900 underline hover:text-gray-700"
                  >
                    AGB
                  </a>
                  {' '}und{' '}
                  <a 
                    href="/datenschutz"
                    className="text-gray-900 underline hover:text-gray-700"
                  >
                    Datenschutzerklärung
                  </a>.
                </p>
              </div>
            </section>

          </div>
        </div>
      </div>
    </div>
  );
};

export default ImpressumPage;