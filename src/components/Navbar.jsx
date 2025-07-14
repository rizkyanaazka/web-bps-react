import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const navItems = [
  { id: "publications", label: "Daftar Publikasi", path: "/publications" },
  { id: "add", label: "Tambah Publikasi", path: "/publications/add" },
  { id: "logout", label: "Logout", path: "/logout" },
];

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { logoutAction } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await logoutAction();
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  // Jangan tampilkan navbar di halaman login
  if (location.pathname === "/login") {
    return null;
  }

  return (
    <nav className="bg-[#001A72] text-white px-6 py-4 flex justify-between items-center fixed top-0 w-full z-50 shadow">
      <div className="flex items-center gap-3">
        <img
          src="https://res.cloudinary.com/dqpffql8l/image/upload/v1752333202/logo-bps_ggwlex.svg"
          alt="Logo BPS"
          className="h-10 w-10 object-contain"
        />
        <div className="font-bold text-lg">
          <i>
            BADAN PUSAT STATISTIK <br /> PROVINSI NUSA TENGGARA TIMUR
          </i>
        </div>
      </div>

      <div className="space-x-2 text-sm hidden md:flex">
        {navItems.map((item) => {
          const isActive =
            location.pathname === item.path ||
            (item.id === "add" &&
              location.pathname.startsWith("/publications/add")) ||
            (item.id === "publications" &&
              location.pathname === "/publications");

          if (item.id === "logout") {
            return (
              <button
                key={item.id}
                onClick={handleLogout}
                className="px-3 py-2 text-sm font-semibold bg-transparent text-red-300 hover:bg-red-500 hover:text-white transition-all duration-300 cursor-pointer h-full flex items-center"
              >
                {item.label}
              </button>
            );
          }

          return (
            <Link
              key={item.id}
              to={item.path}
              className={`px-3 py-2 text-sm font-semibold transition-all duration-300 cursor-pointer ${
                isActive
                  ? "border-b-2 border-sky-300 text-white"
                  : "text-sky-100 hover:border-b-2 hover:border-sky-300"
              }`}
            >
              {item.label}
            </Link>
          );
        })}
      </div>

      {/* Mobile Menu Button */}
      <div className="md:hidden">
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="text-white hover:text-sky-200 focus:outline-none focus:text-sky-200"
        >
          <span className="text-2xl">☰</span>
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-16 right-0 w-48">
          <div className="bg-blue-900 bg-opacity-80 shadow-md rounded">
            {navItems.map((item) => {
              const isActive =
                location.pathname === item.path ||
                (item.id === "add" &&
                  location.pathname.startsWith("/publications/add")) ||
                (item.id === "publications" &&
                  location.pathname === "/publications");

              if (item.id === "logout") {
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      handleLogout();
                      setIsMenuOpen(false);
                    }}
                    className="w-full text-center px-3 py-2 text-sm font-semibold bg-transparent text-red-300 hover:bg-red-500 hover:text-white transition-all duration-300 cursor-pointer"
                  >
                    {item.label}
                  </button>
                );
              }

              return (
                <Link
                  key={item.id}
                  to={item.path}
                  onClick={() => setIsMenuOpen(false)}
                  className={`px-3 py-2 text-sm font-semibold transition-all duration-300 cursor-pointer ${
                    isActive
                      ? "border-b-2 border-sky-300 text-white"
                      : "text-sky-100 hover:border-b-2 hover:border-sky-300"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </nav>
  );
}
