// src/components/LoginModal.js
import React, { useState } from "react";

export default function LoginModal({ modal, closeModal }) {
  const [emailOrId, setEmailOrId] = useState("");
  const [password, setPassword] = useState("");

  const isOpen = modal === "admin" || modal === "user";
  const isAdmin = modal === "admin";

  const handleLogin = async () => {
    try {
      const url = isAdmin ? "/api/auth/admin/login" : "/api/auth/login";
      const payload = isAdmin
        ? { adminId: emailOrId, password }
        : { email: emailOrId, password };

      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("role", data.role);

        alert(`${isAdmin ? "Admin" : "User"} login successful!`);
        window.location.href = isAdmin
          ? "/admin/dashboard"
          : "/user/dashboard";
      } else {
        alert(data.message || "Login failed");
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong");
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      style={{ display: isOpen ? "flex" : "none" }}
    >
      <div className="bg-white rounded-xl p-8 max-w-md w-full mx-4 shadow-lg">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-2xl font-bold text-blue-800">
            {isAdmin ? "Admin Login" : "User Login"}
          </h3>
          <button
            onClick={closeModal}
            className="text-gray-500 hover:text-gray-700"
          >
            <i className="fas fa-times" />
          </button>
        </div>

        {/* Form */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleLogin();
          }}
        >
          {/* Email or Admin ID */}
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">
              {isAdmin ? "Admin ID" : "Email"}
            </label>
            <input
              type={isAdmin ? "text" : "email"}
              value={emailOrId}
              onChange={(e) => setEmailOrId(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Password */}
          <div className="mb-6">
            <label className="block text-gray-700 mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition"
          >
            Login
          </button>

          {/* Forgot password for users */}
          {!isAdmin && (
            <div className="mt-4 text-center">
              <a href="#" className="text-blue-600 hover:underline">
                Forgot password?
              </a>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
