import React from "react";
import { Routes, Route, Navigate, useNavigate, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import LoginPage from "./components/LoginPage";
import AddPublicationPage from "./components/AddPublicationPage";
import EditPublicationPage from "./components/EditPublicationPage";
import PublicationListPage from "./components/PublicationListPage";
import ProtectedRoute from "./components/ProtectedRoute";
import { PublicationProvider } from "./context/PublicationContext";

export default function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const [activePage, setActivePage] = React.useState("publications");

  const isLoginPage = location.pathname === "/login";

  const handleNavigate = (page) => {
    setActivePage(page);
    if (page === "publications") navigate("/publications");
    else if (page === "add") navigate("/publications/add");
    else if (page === "login") navigate("/login");
  };

  const handleLogout = () => {
    console.log("Logged out");
    setActivePage("login");
    navigate("/login");
  };

  return (
    <PublicationProvider>
     <div
        className="min-h-screen font-sans"
        style={
          isLoginPage
            ? {
                backgroundColor: "#B0E0E6", // powder blue
                backgroundImage: `url('https://res.cloudinary.com/dqpffql8l/image/upload/v1752333202/pattern_fkv7a4.png')`,
                backgroundRepeat: "repeat",
                backgroundSize: "auto",
                backgroundBlendMode: "overlay"
              }
            : {
                backgroundColor: "#f3f4f6" // Tailwind gray-100
              }
        }
      >




        {!isLoginPage && (
          <Navbar
            onNavigate={handleNavigate}
            onLogout={handleLogout}
            activePage={activePage}
          />
        )}

        <main className={isLoginPage ? "" : "pt-24 p-6"}>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route
              path="/publications"
              element={
                <ProtectedRoute>
                  <PublicationListPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/publications/add"
              element={
                <ProtectedRoute>
                  <AddPublicationPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/publications/edit/:id"
              element={
                <ProtectedRoute>
                  <EditPublicationPage />
                </ProtectedRoute>
              }
            />
            <Route path="/" element={<Navigate to="/publications" replace />} />
            <Route path="*" element={<Navigate to="/publications" replace />} />
          </Routes>
        </main>

        {!isLoginPage && <Footer />}
      </div>
    </PublicationProvider>
  );
}
