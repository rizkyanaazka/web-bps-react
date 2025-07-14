import React, { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { loginAction, loading, error } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validasi manual (frontend)
  if (!email || !password) {
      alert('Email dan password harus diisi!');
      return;
    }
    
    try {
      await loginAction(email, password);
      // Redirect ke publications setelah login berhasil
      navigate('/publications');
    } catch (err) {
      console.error('Login failed:', err);
    }
  };


  return (
    <main
className="min-h-screen flex flex-col items-center justify-center space-y-4"
      style={{
        backgroundColor: "#6495ED",
        backgroundImage: `
      linear-gradient(rgba(255,255,255,0.7), rgba(255,255,255,0.2)),
      url('https://res.cloudinary.com/dqpffql8l/image/upload/v1752333202/pattern_fkv7a4.png')
    `,
        backgroundRepeat: "repeat",
        backgroundSize: "auto",
        backgroundBlendMode: "overlay",
      }}
    >
      <div className="max-w-sm w-full p-6 bg-white shadow rounded-lg">
        <div className="flex justify-center">
          <img
            src="https://res.cloudinary.com/dqpffql8l/image/upload/v1752333202/logo-bps_ggwlex.svg"
            alt="Logo BPS"
            className="h-16 w-auto mb-4"
          />
        </div>

        {/* <h2 className="text-xl font-bold mb-4 text-center text-gray-800 font-times-new-roman">
          Login
        </h2> */}

        {/* Validasi input lokal */}
        {formError && (
          <div className="mb-4 p-3 bg-yellow-100 border border-yellow-400 text-yellow-800 rounded-md text-sm">
            {formError}
          </div>
        )}

        {/* Error dari backend */}
        {error && (
          <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-md text-sm">
            <div className="flex items-center">
              <svg
                className="w-4 h-4 mr-2"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                  clipRule="evenodd"
                />
              </svg>
              {error}
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Email
            </label>
            <input
              id="email"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border rounded"
              placeholder="Masukkan Email"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded"
              placeholder="Masukkan password"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded mt-10"
          >
            Login
          </button>
        </form>
      </div>
      <div className="mt-4 max-w-sm w-full p-4 rounded shadow border text-sm text-gray-700 bg-[#FFFFF0]">
  <p className="font-semibold text-center mb-2">Demo Login</p>

  <div className="flex mb-1">
    <span className="ml-20 w-24 font-medium">Email</span>
    <span>: user@example.com</span>
  </div>
  <div className="flex">
    <span className="ml-20 w-24 font-medium">Password</span>
    <span>: password123</span>
  </div>
</div>

    </main>
  );
}

