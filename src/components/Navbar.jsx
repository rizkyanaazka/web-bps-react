import React from "react";
import { useNavigate } from "react-router-dom";

export default function Navbar({ activePage }) {
  const navigate = useNavigate();

  const navButtonClass = (target) =>
    `px-3 py-1 rounded ${
      activePage === target
        ? "bg-white text-blue-800 font-semibold"
        : "text-white hover:bg-blue-700"
    }`;

  const navItems = [
    { key: "publications", label: "Daftar", path: "/publications" },
    { key: "add", label: "Tambah", path: "/publications/add" },
  ];

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/login");
  };

  return (
    <header className="fixed top-0 w-full z-50 shadow bg-[#001A72] text-white">
      <nav className="px-6 py-4 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <img
            src="https://res.cloudinary.com/dqpffql8l/image/upload/v1752333202/logo-bps_ggwlex.svg"
            alt="Logo BPS"
            className="h-10 w-10 object-contain"
          />
          <div className="font-bold text-lg leading-tight">
            <i>
              BADAN PUSAT STATISTIK
              <br />
              PROVINSI NUSA TENGGARA TIMUR
            </i>
          </div>
        </div>

        <div className="space-x-2 text-sm">
          {navItems.map(({ key, label, path }) => (
            <button
              key={key}
              onClick={() => navigate(path)}
              className={navButtonClass(key)}
            >
              {label}
            </button>
          ))}
          <button
            onClick={handleLogout}
            className="text-red-300 hover:text-white px-3 py-1 rounded"
          >
            Logout
          </button>
        </div>
      </nav>
    </header>
  );
}
