
import React from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export default function Login() {
  const navigate = useNavigate();

  const handleLogin = () => {
    toast.success("Erfolgreich eingeloggt");
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg space-y-6">
        <h2 className="text-2xl font-semibold text-gray-800">Einloggen</h2>

        <div className="space-y-4">
          <div>
            <label className="block mb-1 text-gray-600">E-Mail-Adresse</label>
            <input
              type="email"
              className="w-full p-3 border border-gray-300 rounded-lg placeholder-gray-600 text-gray-900"
              placeholder="E-Mail eingeben"
              defaultValue="demo@koelnervermoegen.de"
            />
          </div>

          <div>
            <label className="block mb-1 text-gray-600">Passwort</label>
            <input
              type="password"
              className="w-full p-3 border border-gray-300 rounded-lg placeholder-gray-600 text-gray-900"
              placeholder="Passwort eingeben"
              defaultValue="demo123"
            />
          </div>

          <button
            type="button"
            onClick={handleLogin}
            className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Einloggen
          </button>
        </div>
      </div>
    </div>
  );
}
