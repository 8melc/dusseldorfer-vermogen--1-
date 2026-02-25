import React from "react";
import { Link } from "react-router-dom";

const DatenschutzPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-16 mt-12 mb-12">
        <div className="max-w-6xl mx-auto bg-white shadow-sm rounded-lg">
          
          {/* Header */}
          <div className="border-b border-gray-200 px-8 md:px-12 py-8">
            <h1 className="text-4xl font-bold text-gray-900">Datenschutzhinweise</h1>
          </div>

          {/* Content */}
          <div className="px-8 md:px-12 py-10 space-y-10">
            
            {/* Intro */}
            <section>
              <div className="text-gray-700 leading-relaxed space-y-3">
                <p>
                  <strong>Hinweis zur Marke & Betreiberin</strong><br />
                  <strong>Kölner Vermögen</strong> ist eine eingetragene Marke der <strong>gannaca GmbH & Co. KG</strong>.<br />
                  Betreiberin dieser Website ist die gannaca GmbH & Co. KG. Weitere Angaben finden Sie im{' '}
                  <Link to="/impressum" className="text-gray-900 underline hover:text-gray-700">Impressum</Link>.
                </p>
                <p>
                  Personenbezogene Daten werden nur im Rahmen der Erforderlichkeit sowie zum Zwecke der Bereitstellung eines funktionsfähigen und nutzerfreundlichen Internetauftritts, inklusive seiner Inhalte und der dort angebotenen Leistungen, verarbeitet. Gemäß Art. 4 Ziffer 1. der Verordnung (EU) 2016/679, also der Datenschutz-Grundverordnung (nachfolgend „DS-GVO"), gilt als „Verarbeitung" jeder mit oder ohne Hilfe automatisierter Verfahren ausgeführter Vorgang oder jede solche Vorgangsreihe im Zusammenhang mit personenbezogenen Daten, wie das Erheben, das Erfassen, die Organisation, das Ordnen, die Speicherung, die Anpassung oder Veränderung, das Auslesen, das Abfragen, die Verwendung, die Offenlegung durch Übermittlung, Verbreitung oder eine andere Form der Bereitstellung, den Abgleich oder die Verknüpfung, die Einschränkung, das Löschen oder die Vernichtung.
                </p>
                <p>
                  Mit der nachfolgenden Datenschutzerklärung informieren wir Sie insbesondere über Art, Umfang, Zweck, Dauer und Rechtsgrundlage der Verarbeitung personenbezogener Daten.
                </p>
              </div>
            </section>

            <hr className="border-gray-200" />

            {/* 1. Allgemeine Hinweise */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">
                1. Allgemeine Hinweise zur Datenverarbeitung
              </h2>

              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">
                    1.1 Informationen über Verantwortliche
                  </h3>
                  <div className="text-gray-700 leading-relaxed space-y-2">
                    <p>Der Verantwortliche im Sinne der DS-GVO ist die:</p>
                    <p>
                      gannaca GmbH & Co. KG<br />
                      Luftschiff-Platz 26, 50733 Köln<br />
                      E-Mail: peterka@gannaca.com<br />
                      Handelsregister: Amtsgericht Köln HRA 23235
                    </p>
                    <p>
                      Verantwortlicher für den Datenschutz:<br />
                      Christopher Patrick Peterka, contact@gannaca.com
                    </p>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">
                    1.2 Kategorien von personenbezogenen Daten
                  </h3>
                  <div className="text-gray-700 leading-relaxed">
                    <p className="mb-2">Wir verarbeiten folgende Kategorien von personenbezogenen Daten:</p>
                    <ul className="space-y-1">
                      <li>+ Bestandsdaten (z.B. Namen, Organisationszugehörigkeit);</li>
                      <li>+ Kontaktdaten (z.B. E-Mail);</li>
                      <li>+ Inhaltsdaten (z.B. Texteingaben);</li>
                      <li>+ Nutzungsdaten (z.B. Zugriffsdaten);</li>
                      <li>+ Meta-/Kommunikationsdaten (z.B. IP-Adressen).</li>
                    </ul>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">
                    1.3 Empfänger bzw. Kategorien von Empfängern von personenbezogenen Daten
                  </h3>
                  <div className="text-gray-700 leading-relaxed">
                    <p>
                      Sofern wir im Rahmen unserer Verarbeitung Daten anderen Personen und Unternehmen wie Webhostern, Auftragsverarbeitern oder Dritten offenbaren, sie an diese übermitteln oder ihnen sonst Zugriff auf die Daten gewähren, erfolgt dies auf Grundlage einer gesetzlichen Erlaubnis (z.B. wenn eine Übermittlung der Daten an Dritte gem. Art. 6 Abs. 1 Unterabs. 1 lit. b DS-GVO zur Vertragserfüllung erforderlich ist), wenn die Betroffenen eingewilligt haben oder eine rechtliche Verpflichtung dies vorsieht.
                    </p>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">
                    1.4 Dauer der Speicherung personenbezogener Daten
                  </h3>
                  <div className="text-gray-700 leading-relaxed">
                    <p>
                      Das Kriterium für die Dauer der Speicherung von personenbezogenen Daten ist die jeweilige gesetzliche Aufbewahrungsfrist. Nach Ablauf der Frist werden die entsprechenden Daten gelöscht, sofern sie nicht mehr zur Zweckerreichung, Vertragserfüllung oder Vertragsanbahnung erforderlich sind.
                    </p>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">
                    1.5 Übermittlung in Drittländer
                  </h3>
                  <div className="text-gray-700 leading-relaxed">
                    <p>
                      Sofern wir Daten in einem Drittland (d.h. außerhalb der Europäischen Union (EU) oder des Europäischen Wirtschaftsraums (EWR)) verarbeiten oder dies im Rahmen der Inanspruchnahme von Diensten Dritter oder der Offenlegung bzw. Übermittlung von Daten an Dritte geschieht, erfolgt dies nur, wenn es zur Erfüllung unserer (vor-)vertraglichen Pflichten, auf Grundlage Ihrer Einwilligung, aufgrund einer rechtlichen Verpflichtung oder auf Grundlage unserer berechtigten Interessen geschieht. Vorbehaltlich gesetzlicher oder vertraglicher Erlaubnisse verarbeiten wir oder lassen wir die Daten in einem Drittland nur beim Vorliegen der besonderen Voraussetzungen der Art. 44 ff. DS-GVO verarbeiten, d.h. die Verarbeitung erfolgt z.B. auf Grundlage besonderer Garantien, wie der offiziell anerkannten Feststellung eines der EU entsprechenden Datenschutzniveaus oder Beachtung offiziell anerkannter spezieller vertraglicher Verpflichtungen (so genannte „Standardvertragsklauseln").
                    </p>
                  </div>
                </div>
              </div>
            </section>

            <hr className="border-gray-200" />

            {/* 2. Besuch der Website */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">
                2. Datenverarbeitung im Rahmen des Besuchs unserer Website
              </h2>

              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">
                    2.1 Protokolldateien
                  </h3>
                  <div className="text-gray-700 leading-relaxed space-y-3">
                    <p>
                      Bei jedem Zugriff durch eine betroffene Person auf unsere Website werden allgemeine Daten und Informationen in den Logfiles unseres Systems gespeichert:
                    </p>
                    <ul className="space-y-1">
                      <li>+ Datum und Uhrzeit des Abrufs (Zeitstempel);</li>
                      <li>+ Anfragedetails und Zieladresse (Protokollversion, HTTP-Methode, Referer, UserAgent-String);</li>
                      <li>+ Name der abgerufenen Datei und übertragene Datenmenge (angefragte URL inkl. Query-String, Größe in Byte);</li>
                      <li>+ Meldung, ob der Abruf erfolgreich war (HTTP Status Code).</li>
                    </ul>
                    <p>
                      Bei der Nutzung dieser allgemeinen Daten und Informationen ziehen wir keine Rückschlüsse auf die betroffene Person. Es erfolgt keine personenbezogene Auswertung oder eine Auswertung der Daten zu Marketingzwecken oder eine Profilbildung. Die IP-Adresse wird in diesem Zusammenhang nicht gespeichert.
                    </p>
                    <p>
                      Rechtsgrundlage für die vorübergehende Speicherung der Daten ist Art. 6 Abs. 1 Unterabs. 1 lit. f DS-GVO. Die Erfassung der Daten zur Bereitstellung der Website und die Speicherung der Daten in Logfiles ist für den sicheren Betrieb unserer Website zwingend erforderlich. Es besteht folglich seitens der betroffenen Person keine Widerspruchsmöglichkeit.
                    </p>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">
                    2.2 Hosting
                  </h3>
                  <div className="text-gray-700 leading-relaxed space-y-3">
                    <p>
                      Die von uns in Anspruch genommenen Hosting-Leistungen dienen der Zurverfügungstellung der folgenden Leistungen: Infrastruktur- und Plattformdienstleistungen, Rechenkapazität, Speicherplatz und Datenbankdienste, Sicherheitsleistungen sowie technische Wartungsleistungen, die wir zum Zwecke des Betriebs unserer Website einsetzen.
                    </p>
                    <p>
                      Hierbei verarbeiten wir bzw. unsere Auftragsverarbeiter Bestandsdaten, Kontaktdaten, Inhaltsdaten, Vertragsdaten, Nutzungsdaten sowie Meta- und Kommunikationsdaten von Nutzern unserer Website auf Grundlage unserer berechtigten Interessen an einer effizienten und sicheren Zurverfügungstellung dieses Onlineangebotes gem. Art. 6 Abs. 1 Unterabs. 1 lit. f DS-GVO iVm Art. 28 DS-GVO (Abschluss eines Vertrages zur Auftragsverarbeitung).
                    </p>
                  </div>
                </div>
              </div>
            </section>

            <hr className="border-gray-200" />

            {/* 3. Kontaktaufnahme */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">
                3. Datenverarbeitung im Rahmen der Kontaktaufnahme
              </h2>

              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">
                    3.1 Kontaktaufnahme per E-Mail
                  </h3>
                  <div className="text-gray-700 leading-relaxed space-y-3">
                    <p>
                      Die Kontaktaufnahme über E-Mail ist über die auf unserer Website veröffentlichten E-Mail-Adressen möglich.
                    </p>
                    <p>
                      Soweit Sie diesen Kontaktweg verwenden, werden die von Ihnen übermittelten Daten (z.B. Name, Vorname,Organisationszugehörigkeit), zumindest jedoch die E-Mail-Adresse sowie die in der E-Mail enthaltenen Informationen nebst den von Ihnen übermittelten personenbezogenen Daten zum Zwecke der Kontaktaufnahme und Bearbeitung Ihres Anliegens gespeichert. Zudem werden folgende Daten durch unser System erhoben:
                    </p>
                    <ul className="space-y-1">
                      <li>+ IP-Adresse des aufrufenden Rechners;</li>
                      <li>+ Datum und Uhrzeit der E-Mail.</li>
                    </ul>
                    <p>
                      Die Rechtsgrundlage für die Verarbeitung personenbezogener Daten im Rahmen uns übermittelter E-Mails ist Art. 6 Abs. 1 Unterabs. 1 lit. b bzw. lit. f DS-GVO.
                    </p>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">
                    3.2 Kontaktaufnahme per Website-Kontaktformular
                  </h3>
                  <div className="text-gray-700 leading-relaxed space-y-3">
                    <p>
                      Soweit Sie auf unserer Website bereitgestellte Kontaktformulare zur Kommunikation verwenden, ist die Angabe Ihres Namens und Vornamens sowie Ihrer E-Mail-Adresse erforderlich. Ohne diese Daten kann Ihr per Kontaktformular übermitteltes Anliegen nicht bearbeitet werden. Die Angabe der Anschrift ist optional und ermöglicht uns, soweit von Ihnen gewünscht, die Bearbeitung Ihres Anliegens auf postalischem Weg.
                    </p>
                    <p>
                      Zudem werden folgende Daten durch unser System erhoben:
                    </p>
                    <ul className="space-y-1">
                      <li>+ IP-Adresse des aufrufenden Rechners;</li>
                      <li>+ Datum und Uhrzeit der Registrierung.</li>
                    </ul>
                    <p>
                      Die Rechtsgrundlage für die Verarbeitung personenbezogener Daten im Rahmen uns übermittelter Kontaktformulare ist Art. 6 Abs. 1 Unterabs. 1 lit. b bzw. lit. f DS-GVO.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            <hr className="border-gray-200" />

            {/* 4. Newsletter */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">
                4. Datenverarbeitung bei Bezug unseres monatlichen Newsletters
              </h2>
              <div className="text-gray-700 leading-relaxed space-y-3">
                <p>
                  Wenn Sie sich in unseren Newsletter-Verteiler eintragen, bzw. sich nach automatisiertem Erhalt nicht austragen („abmelden") werden Ihre E-Mail-Adresse sowie der von Ihnen gewählte Newsletter von uns auf einem Server gespeichert.
                </p>
                <p>
                  Zudem werden systemseitig folgende Daten erhoben:
                </p>
                <ul className="space-y-1">
                  <li>+ IP-Adresse des aufrufenden Rechners;</li>
                  <li>+ Seitenaufrufe unter der angegebenen E-Mail Adresse.</li>
                </ul>
                <p>
                  Für die Verarbeitung der Daten wird im Rahmen des Anmeldevorgangs Ihre Einwilligung eingeholt und auf diese Datenschutzerklärung verwiesen. Die Verarbeitung der Daten erfolgt auf Grundlage Ihres Einverständnisses nach Art. 6 Abs. 1 Unterabs. 1 lit. a DS-GVO und im Rahmen des berechtigten Interesses nach Art. 6 Abs. 1 Unterabs. 1 lit. f DS-GVO.
                </p>
                <p>
                  Wir verwenden diese Daten ausschließlich für den Versand des Newsletters. Wir geben Ihre Daten nicht an Dritte weiter und nutzen sie auch nicht für sonstige eigene Zwecke. Bei der Registrierung werden Ihre Daten auf unseren Servern gespeichert. Sodann wird eine Nachricht mit einem Link zur Bestätigung der Registrierung an die angegebene E-Mail-Adresse generiert (sog. Double-Opt-In-Verfahren). Soweit Sie die Registrierung nicht durch den Link in dieser E-Mail bestätigen, werden die Daten nach 24 Stunden gelöscht. Erst durch Bestätigung des Links in der E-Mail werden ihre Daten zum Newsletter-Versand für die Dauer der Nutzung unseres Angebots gespeichert. Dadurch wird sichergestellt, dass der Newsletter von Ihnen und nicht von einem Dritten angefordert wurde.
                </p>
                <p>
                  Soweit Sie mit der Speicherung der Daten zu diesem Zweck nicht mehr einverstanden sind und somit unser Angebot nicht mehr nutzen möchten, können Sie sich jederzeit von unserem Newsletter abmelden. Zu diesem Zweck findet sich in jedem Newsletter ein entsprechender Link. Die von Ihnen zum Newsletterbezug angegebenen personenbezogenen Daten werden dann gelöscht.
                </p>
              </div>
            </section>

            <hr className="border-gray-200" />

            {/* 5. Soziale Medien */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">
                5. Onlinepräsenzen in Sozialen Medien
              </h2>
              <div className="text-gray-700 leading-relaxed space-y-3">
                <p>
                  Wir unterhalten Onlinepräsenzen in den sozialen Netzwerken, um die dort aktiven Nutzer über unsere Leistungen zu informieren und bei Interesse über die Plattformen zu kommunizieren. Unsere Social Media Kanäle können nur über einen externen Link abgerufen werden. Sobald Sie unser Social Media Profil in dem jeweiligen Netzwerk aufrufen, gelten dort die Geschäftsbedingungen und Datenverarbeitungsrichtlinien der jeweiligen Betreiber.
                </p>
                <p>
                  Wir haben keinen Einfluss auf die Erhebung der Daten und deren weitere Verwendung durch die sozialen Netzwerke. Es bestehen keine Erkenntnisse darüber, in welchem Umfang, an welchem Ort und für welche Dauer die Daten gespeichert werden, inwieweit die Netzwerke bestehenden Löschpflichten nachkommen, welche Auswertungen und Verknüpfungen mit den Daten vorgenommen werden und an wen die Daten weitergegeben werden. Wir machen daher ausdrücklich darauf aufmerksam, dass Ihre Daten (zB persönliche Informationen, IP-Adresse) von den Betreibern der Netzwerke entsprechend ihrer Datenverwendungsrichtlinien abgespeichert und für geschäftliche Zwecke genutzt werden.
                </p>
                <p>
                  Wir verarbeiten Daten im Hinblick auf Social Media Präsenzen insofern, als über diese bspw. Kommentare oder Direktnachrichten an uns gerichtet werden. Rechtsgrundlage für die Verarbeitung der Daten nach einer Einwilligung des Nutzers ist Art. 6 Abs. 1 Unterabs. 1 lit. a DS-GVO.
                </p>
              </div>
            </section>

            <hr className="border-gray-200" />

            {/* 6. Rechte */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">
                6. Ihre Rechte
              </h2>
              <div className="text-gray-700 leading-relaxed space-y-3">
                <p>
                  Als betroffene Person stehen Ihnen im Zusammenhang mit der Verarbeitung Ihrer personenbezogenen Daten die folgenden Rechte zu:
                </p>
              </div>

              <div className="space-y-6 mt-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">
                    6.1 Auskunftsrecht gem. Art. 15 DS-GVO
                  </h3>
                  <div className="text-gray-700 leading-relaxed space-y-2">
                    <p>
                      (1) Die betroffene Person hat das Recht, von dem Verantwortlichen eine Bestätigung darüber zu verlangen, ob sie betreffende personenbezogene Daten verarbeitet werden; ist dies der Fall, so hat sie ein Recht auf Auskunft über diese personenbezogenen Daten und auf folgende Informationen:
                    </p>
                    <p className="ml-4">
                      a) die Verarbeitungszwecke;<br />
                      b) die Kategorien personenbezogener Daten, die verarbeitet werden;<br />
                      c) die Empfänger oder Kategorien von Empfängern, gegenüber denen die personenbezogenen Daten offengelegt worden sind oder noch offengelegt werden, insbesondere bei Empfängern in Drittländern oder bei internationalen Organisationen;<br />
                      d) falls möglich, die geplante Dauer, für die die personenbezogenen Daten gespeichert werden, oder, falls dies nicht möglich ist, die Kriterien für die Festlegung dieser Dauer;<br />
                      e) das Bestehen eines Rechts auf Berichtigung oder Löschung der sie betreffenden personenbezogenen Daten oder auf Einschränkung der Verarbeitung durch den Verantwortlichen oder eines Widerspruchsrechts gegen diese Verarbeitung;<br />
                      f) das Bestehen eines Beschwerderechts bei einer Aufsichtsbehörde;<br />
                      g) wenn die personenbezogenen Daten nicht bei der betroffenen Person erhoben werden, alle verfügbaren Informationen über die Herkunft der Daten;<br />
                      h) das Bestehen einer automatisierten Entscheidungsfindung einschließlich Profiling gemäß Art. 22 Abs. 1 und Abs. 4 DS-GVO und – zumindest in diesen Fällen – aussagekräftige Informationen über die involvierte Logik sowie die Tragweite und die angestrebten Auswirkungen einer derartigen Verarbeitung für die betroffene Person.
                    </p>
                    <p>
                      (2) Werden personenbezogene Daten an ein Drittland oder an eine internationale Organisation übermittelt, so hat die betroffene Person das Recht, über die geeigneten Garantien gemäß Artikel 46 DS-GVO im Zusammenhang mit der Übermittlung unterrichtet zu werden.
                    </p>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">
                    6.2 Recht auf Berichtigung gem. Art. 16 DS-GVO
                  </h3>
                  <div className="text-gray-700 leading-relaxed">
                    <p>
                      Die betroffene Person hat das Recht, von dem Verantwortlichen unverzüglich die Berichtigung sie betreffender unrichtiger personenbezogener Daten zu verlangen. Unter Berücksichtigung der Zwecke der Verarbeitung hat die betroffene Person das Recht, die Vervollständigung unvollständiger personenbezogener Daten – auch mittels einer ergänzenden Erklärung – zu verlangen.
                    </p>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">
                    6.3 Recht auf Löschung gem. Art. 17 DS-GVO
                  </h3>
                  <div className="text-gray-700 leading-relaxed space-y-2">
                    <p>
                      (1) Die betroffene Person hat das Recht, von dem Verantwortlichen zu verlangen, dass sie betreffende personenbezogene Daten unverzüglich gelöscht werden, und der Verantwortliche ist verpflichtet, personenbezogene Daten unverzüglich zu löschen, sofern einer der folgenden Gründe zutrifft:
                    </p>
                    <p className="ml-4">
                      a) Die personenbezogenen Daten sind für die Zwecke, für die sie erhoben oder auf sonstige Weise verarbeitet wurden, nicht mehr notwendig.<br />
                      b) Die betroffene Person widerruft ihre Einwilligung, auf die sich die Verarbeitung gemäß Art. 6 Abs. 1 lit. a) oder Art. 9 Abs. 2 lit. a) DS-GVO stützte, und es fehlt an einer anderweitigen Rechtsgrundlage für die Verarbeitung.<br />
                      c) Die betroffene Person legt gemäß Art. 21 Abs. 1 DS-GVO Widerspruch gegen die Verarbeitung ein und es liegen keine vorrangigen berechtigten Gründe für die Verarbeitung vor, oder die betroffene Person legt gemäß Art. 21 Abs. 2 DS-GVO Widerspruch gegen die Verarbeitung ein.<br />
                      d) Die personenbezogenen Daten wurden unrechtmäßig verarbeitet.<br />
                      e) Die Löschung der personenbezogenen Daten ist zur Erfüllung einer rechtlichen Verpflichtung nach dem Unionsrecht oder dem Recht der Mitgliedstaaten erforderlich, dem der Verantwortliche unterliegt.<br />
                      f) Die personenbezogenen Daten wurden in Bezug auf angebotene Dienste der Informationsgesellschaft gemäß Art. 8 Abs. 1 DS-GVO erhoben.
                    </p>
                    <p>
                      (2) Hat der Verantwortliche die personenbezogenen Daten öffentlich gemacht und ist er gemäß Absatz 1 zu deren Löschung verpflichtet, so trifft er unter Berücksichtigung der verfügbaren Technologie und der Implementierungskosten angemessene Maßnahmen, auch technischer Art, um für die Datenverarbeitung Verantwortliche, die die personenbezogenen Daten verarbeiten, darüber zu informieren, dass eine betroffene Person von ihnen die Löschung aller Links zu diesen personenbezogenen Daten oder von Kopien oder Replikationen dieser personenbezogenen Daten verlangt hat.
                    </p>
                    <p>
                      (3) Die Absätze 1 und 2 gelten nicht, soweit die Verarbeitung erforderlich ist
                    </p>
                    <p className="ml-4">
                      a) zur Ausübung des Rechts auf freie Meinungsäußerung und Information;<br />
                      b) zur Erfüllung einer rechtlichen Verpflichtung, die die Verarbeitung nach dem Recht der Union oder der Mitgliedstaaten, dem der Verantwortliche unterliegt, erfordert, oder zur Wahrnehmung einer Aufgabe, die im öffentlichen Interesse liegt oder in Ausübung öffentlicher Gewalt erfolgt, die dem Verantwortlichen übertragen wurde;<br />
                      c) aus Gründen des öffentlichen Interesses im Bereich der öffentlichen Gesundheit gemäß Art. 9 Abs. 2 lit. h) und i) sowie Art. 9 Abs. 3 DS-GVO;<br />
                      d) für im öffentlichen Interesse liegende Archivzwecke, wissenschaftliche oder historische Forschungszwecke oder für statistische Zwecke gemäß Art. 89 Abs. 1, soweit das in Absatz 1 genannte Recht voraussichtlich die Verwirklichung der Ziele dieser Verarbeitung unmöglich macht oder ernsthaft beeinträchtigt, oder<br />
                      e) zur Geltendmachung, Ausübung oder Verteidigung von Rechtsansprüchen.
                    </p>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">
                    6.4 Recht auf Einschränkung der Verarbeitung gem. Art. 18 DS-GVO
                  </h3>
                  <div className="text-gray-700 leading-relaxed space-y-2">
                    <p>
                      (1) Die betroffene Person hat das Recht, von dem Verantwortlichen die Einschränkung der Verarbeitung zu verlangen, wenn eine der folgenden Voraussetzungen gegeben ist:
                    </p>
                    <p className="ml-4">
                      a) die Richtigkeit der personenbezogenen Daten von der betroffenen Person bestritten wird, und zwar für eine Dauer, die es dem Verantwortlichen ermöglicht, die Richtigkeit der personenbezogenen Daten zu überprüfen,<br />
                      b) die Verarbeitung unrechtmäßig ist und die betroffene Person die Löschung der personenbezogenen Daten ablehnt und stattdessen die Einschränkung der Nutzung der personenbezogenen Daten verlangt;<br />
                      c) der Verantwortliche die personenbezogenen Daten für die Zwecke der Verarbeitung nicht länger benötigt, die betroffene Person sie jedoch zur Geltendmachung, Ausübung oder Verteidigung von Rechtsansprüchen benötigt, oder<br />
                      d) die betroffene Person Widerspruch gegen die Verarbeitung gemäß Art. 21 Abs. 1 DS-GVO eingelegt hat, solange noch nicht feststeht, ob die berechtigten Gründe des Verantwortlichen gegenüber denen der betroffenen Person überwiegen.
                    </p>
                    <p>
                      (2) Wurde die Verarbeitung gemäß Absatz 1 eingeschränkt, so dürfen diese personenbezogenen Daten – von ihrer Speicherung abgesehen – nur mit Einwilligung der betroffenen Person oder zur Geltendmachung, Ausübung oder Verteidigung von Rechtsansprüchen oder zum Schutz der Rechte einer anderen natürlichen oder juristischen Person oder aus Gründen eines wichtigen öffentlichen Interesses der Union oder eines Mitgliedstaats verarbeitet werden.
                    </p>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">
                    6.5 Recht auf Datenübertragbarkeit gem. Art. 20 DS-GVO
                  </h3>
                  <div className="text-gray-700 leading-relaxed space-y-2">
                    <p>
                      (1) Die betroffene Person hat das Recht, die sie betreffenden personenbezogenen Daten, die sie einem Verantwortlichen bereitgestellt hat, in einem strukturierten, gängigen und maschinenlesbaren Format zu erhalten, und sie hat das Recht, diese Daten einem anderen Verantwortlichen ohne Behinderung durch den Verantwortlichen, dem die personenbezogenen Daten bereitgestellt wurden, zu übermitteln, sofern
                    </p>
                    <p className="ml-4">
                      a) die Verarbeitung auf einer Einwilligung gemäß Art. 6 Abs. 1 lit. a) oder Art. 9 Abs. 2 lit. a) DS-GVO oder auf einem Vertrag gemäß Art. 6 Abs. 1 lit. b) DS-GVO beruht und<br />
                      b) die Verarbeitung mithilfe automatisierter Verfahren erfolgt.
                    </p>
                    <p>
                      (2) Bei der Ausübung ihres Rechts auf Datenübertragbarkeit gemäß Absatz 1 hat die betroffene Person das Recht, zu erwirken, dass die personenbezogenen Daten direkt von einem Verantwortlichen einem anderen Verantwortlichen übermittelt werden, soweit dies technisch machbar ist.
                    </p>
                    <p>
                      Das Recht gemäß Absatz 1 darf die Rechte und Freiheiten anderer Personen nicht beeinträchtigen. Dieses Recht gilt nicht für eine Verarbeitung, die für die Wahrnehmung einer Aufgabe erforderlich ist, die im öffentlichen Interesse liegt oder in Ausübung öffentlicher Gewalt erfolgt, die dem Verantwortlichen übertragen wurde.
                    </p>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">
                    6.6 Widerspruchsrecht gem. Art. 21 DS-GVO
                  </h3>
                  <div className="text-gray-700 leading-relaxed space-y-2">
                    <p>
                      Die betroffene Person hat das Recht, aus Gründen, die sich aus ihrer besonderen Situation ergeben, jederzeit gegen die Verarbeitung sie betreffender personenbezogener Daten, die aufgrund von Art. 6 Abs. 1 lit. e) oder f) DS-GVO erfolgt, Widerspruch einzulegen; dies gilt auch für ein auf diese Bestimmungen gestütztes Profiling. Der Verantwortliche verarbeitet die personenbezogenen Daten nicht mehr, es sei denn, er kann zwingende schutzwürdige Gründe für die Verarbeitung nachweisen, die die Interessen, Rechte und Freiheiten der betroffenen Person überwiegen, oder die Verarbeitung dient der Geltendmachung, Ausübung oder Verteidigung von Rechtsansprüchen.
                    </p>
                    <p>
                      Im Zusammenhang mit der Nutzung von Diensten der Informationsgesellschaft kann die betroffene Person ungeachtet der Richtlinie 2002/58/EG ihr Widerspruchsrecht mittels automatisierter Verfahren ausüben, bei denen technische Spezifikationen verwendet werden.
                    </p>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">
                    6.7 Widerrufsrecht gem. Art. 7 Abs. 3 DS-GVO
                  </h3>
                  <div className="text-gray-700 leading-relaxed">
                    <p>
                      Die betroffene Person hat das Recht, ihre datenschutzrechtliche Einwilligungserklärung jederzeit zu widerrufen. Durch den Widerruf der Einwilligung wird die Rechtmäßigkeit der aufgrund der Einwilligung bis zum Widerruf erfolgten Verarbeitung nicht berührt.
                    </p>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">
                    6.8 Recht auf Beschwerde bei einer Aufsichtsbehörde gem. Art. 77 DS-GVO
                  </h3>
                  <div className="text-gray-700 leading-relaxed">
                    <p>
                      Jede betroffene Person hat unbeschadet eines anderweitigen verwaltungsrechtlichen oder gerichtlichen Rechtsbehelfs das Recht auf Beschwerde bei einer Aufsichtsbehörde, insbesondere in dem Mitgliedstaat ihres Aufenthaltsorts, ihres Arbeitsplatzes oder des Orts des mutmaßlichen Verstoßes, wenn die betroffene Person der Ansicht ist, dass die Verarbeitung der sie betreffenden personenbezogenen Daten gegen diese Verordnung verstößt.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            <hr className="border-gray-200" />

            {/* Angaben gem. § 5 TMG */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">
                Angaben gem. § 5 TMG
              </h2>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">
                    Adresse & Kontakt
                  </h3>
                  <div className="text-gray-700 leading-relaxed space-y-2">
                    <p>
                      gannaca GmbH & Co. KG<br />
                      Luftschiff-Platz 26<br />
                      50733 Köln<br />
                      Deutschland
                    </p>
                    <p>
                      Tel.: 02219955550<br />
                      E-Mail: peterka@gannaca.com<br />
                      Website: www.gannaca.com
                    </p>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">
                    Registereintragungen
                  </h3>
                  <div className="text-gray-700 leading-relaxed space-y-2">
                    <p>
                      gannaca GmbH & Co. KG<br />
                      Amtsgericht Köln HRA 23235
                    </p>
                    <p>
                      Komplementärin:<br />
                      gannaca Verwaltungs GmbH<br />
                      Amtsgericht Köln HRB 56092
                    </p>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">
                    Umsatzsteuer-ID
                  </h3>
                  <div className="text-gray-700 leading-relaxed">
                    <p>
                      Umsatzsteuer-Identifikationsnummer gemäß §27 a Umsatzsteuergesetz:<br />
                      <span className="font-medium">DE814575529</span>
                    </p>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">
                    Sonstige Angaben
                  </h3>
                  <div className="text-gray-700 leading-relaxed space-y-1">
                    <p>Sitz der Gesellschaft: Köln</p>
                    <p>Geschäftsführer: Christopher P. Peterka</p>
                    <p>© gannaca GmbH & Co. KG 2025</p>
                  </div>
                </div>

                <div>
                  <p className="text-gray-700">
                    <strong>Stand</strong> Oktober 2025
                  </p>
                </div>
              </div>
            </section>

          </div>
        </div>
      </div>
    </div>
  );
};

export default DatenschutzPage;
