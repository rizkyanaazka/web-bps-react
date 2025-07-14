import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from '../hooks/useAuth';

  const navItems = [
       { id: 'publications', label: 'Daftar Publikasi', path: "/publications" },
    { id: 'add', label: 'Tambah Publikasi', path: "/publications/add" },
  ];


export default function Navbar() {
 const location = useLocation();
 const navigate = useNavigate();
  const { logoutAction } = useAuth();
   const [isMenuOpen, setIsMenuOpen] = useState(false);
   
const navButtonClass = (target) =>
  `px-3 py-1 rounded ${
    (target === "publications" && location.pathname === "/publications") ||
    (target === "add" && location.pathname.startsWith("/publications/add"))
      ? "bg-white text-blue-800 font-semibold"
      : "text-white hover:bg-blue-700"
  }`;

    const handleNavigate = (key) => {
    if (key === "publications") navigate("/publications");
    if (key === "add") navigate("/publications/add");
  };

  const handleLogout = async () => {
        try {
            await logoutAction();
            navigate("/login");
        } catch (error) {
            console.error("Logout failed:", error);
        }
    };

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
          <i>BADAN PUSAT STATISTIK <br /> PROVINSI NUSA TENGGARA TIMUR</i>
        </div>
      </div>

      <div className="space-x-2 text-sm">
        {navItems.map(({ key, label }) => (
          <button
            key={key}
            onClick={() => handleNavigate(key)}
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
  );
}
