import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

export function HeaderViewToggle() {
  const nav = useNavigate();
  const { pathname } = useLocation();
  const mode = pathname.includes("-corporate") ? "corporate" : "user";

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const next = e.target.value === "corporate"
      ? "/rheinberg-privatbank-corporate-page"
      : "/rheinberg-privatbank-user-page";
    nav(next);
  };

  return (
    <label className="flex items-center gap-2 text-sm">
      Ansicht:
      <select
        className="border rounded-md px-2 py-1"
        value={mode}
        onChange={handleChange}
      >
        <option value="user">Nutzer-Ansicht</option>
        <option value="corporate">Corporate-Ansicht</option>
      </select>
    </label>
  );
}
