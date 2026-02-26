import React, { useState } from "react";

interface Subscriber {
  email: string;
  name: string;
  date: string;
}

export default function EmailListe() {
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    const newSubscriber: Subscriber = {
      email,
      name: name || "—",
      date: new Date().toLocaleDateString("de-DE"),
    };
    setSubscribers((prev) => [...prev, newSubscriber]);
    setEmail("");
    setName("");
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#f5f0e8" }}>
      <div className="max-w-3xl mx-auto px-6 py-16">
        {/* Header */}
        <div className="mb-12 text-center">
          <h1
            className="font-primary text-4xl md:text-5xl font-bold mb-4"
            style={{ color: "#0d2340" }}
          >
            E-Mail-Liste
          </h1>
          <p
            className="font-secondary text-lg"
            style={{ color: "#0d2340", opacity: 0.7 }}
          >
            Newsletter & Updates von Kölner Vermögen
          </p>
        </div>

        {/* Signup Form */}
        <div
          className="rounded-xl p-8 mb-10 shadow-sm"
          style={{ backgroundColor: "white" }}
        >
          <h2
            className="font-primary text-2xl font-semibold mb-6"
            style={{ color: "#0d2340" }}
          >
            Für Updates anmelden
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                className="block font-secondary text-sm font-medium mb-1"
                style={{ color: "#0d2340" }}
              >
                Name (optional)
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Ihr Name"
                className="w-full px-4 py-3 rounded-lg border font-secondary text-sm focus:outline-none focus:ring-2"
                style={{
                  borderColor: "#e0d8cc",
                  backgroundColor: "#faf8f4",
                  color: "#0d2340",
                }}
              />
            </div>
            <div>
              <label
                className="block font-secondary text-sm font-medium mb-1"
                style={{ color: "#0d2340" }}
              >
                E-Mail-Adresse *
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="ihre@email.de"
                required
                className="w-full px-4 py-3 rounded-lg border font-secondary text-sm focus:outline-none focus:ring-2"
                style={{
                  borderColor: "#e0d8cc",
                  backgroundColor: "#faf8f4",
                  color: "#0d2340",
                }}
              />
            </div>
            <button
              type="submit"
              className="w-full py-3 rounded-lg font-secondary font-semibold text-white transition-opacity hover:opacity-90"
              style={{ backgroundColor: "#0d2340" }}
            >
              Anmelden
            </button>
          </form>
          {submitted && (
            <div
              className="mt-4 p-3 rounded-lg text-center font-secondary text-sm"
              style={{ backgroundColor: "#e8f5e9", color: "#2e7d32" }}
            >
              Erfolgreich angemeldet!
            </div>
          )}
        </div>

        {/* Subscriber List (visible for admin/Christopher) */}
        <div
          className="rounded-xl p-8 shadow-sm"
          style={{ backgroundColor: "white" }}
        >
          <div className="flex items-center justify-between mb-6">
            <h2
              className="font-primary text-2xl font-semibold"
              style={{ color: "#0d2340" }}
            >
              Anmeldungen
            </h2>
            <span
              className="font-secondary text-sm px-3 py-1 rounded-full"
              style={{ backgroundColor: "#f5f0e8", color: "#C8A96F" }}
            >
              {subscribers.length} Einträge
            </span>
          </div>

          {subscribers.length === 0 ? (
            <p
              className="font-secondary text-sm text-center py-8"
              style={{ color: "#0d2340", opacity: 0.5 }}
            >
              Noch keine Anmeldungen vorhanden.
            </p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr
                    className="border-b-2"
                    style={{ borderColor: "#C8A96F" }}
                  >
                    <th
                      className="text-left py-3 px-2 font-secondary text-sm font-semibold"
                      style={{ color: "#0d2340" }}
                    >
                      Name
                    </th>
                    <th
                      className="text-left py-3 px-2 font-secondary text-sm font-semibold"
                      style={{ color: "#0d2340" }}
                    >
                      E-Mail
                    </th>
                    <th
                      className="text-left py-3 px-2 font-secondary text-sm font-semibold"
                      style={{ color: "#0d2340" }}
                    >
                      Datum
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {subscribers.map((sub, i) => (
                    <tr
                      key={i}
                      className="border-b"
                      style={{ borderColor: "#f0ece4" }}
                    >
                      <td
                        className="py-3 px-2 font-secondary text-sm"
                        style={{ color: "#0d2340" }}
                      >
                        {sub.name}
                      </td>
                      <td
                        className="py-3 px-2 font-secondary text-sm"
                        style={{ color: "#0d2340" }}
                      >
                        {sub.email}
                      </td>
                      <td
                        className="py-3 px-2 font-secondary text-sm"
                        style={{ color: "#0d2340", opacity: 0.6 }}
                      >
                        {sub.date}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          <p
            className="font-secondary text-xs mt-6"
            style={{ color: "#0d2340", opacity: 0.4 }}
          >
            Hinweis: Die Anmeldungen werden aktuell nur in der aktuellen Session
            gespeichert. Für eine dauerhafte Speicherung wird eine
            Backend-Anbindung benötigt.
          </p>
        </div>
      </div>
    </div>
  );
}
