import React, { useState } from "react";

export default function LoginModals({ modal, closeModal, onAdminLoginSuccess }) {
  const [emailOrId, setEmailOrId] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const isOpen = modal === "admin" || modal === "user";
  const isAdmin = modal === "admin";

  const API_BASE = process.env.REACT_APP_API_URL || "http://localhost:5000";

  const handleLogin = async () => {
    if (!emailOrId || !password) {
      alert("Please fill in all fields");
      return;
    }

    setLoading(true);
    try {
      const url = isAdmin
        ? `${API_BASE}/api/auth/admin/login`
        : `${API_BASE}/api/auth/login`;

      const payload = isAdmin
        ? { adminId: emailOrId, password }
        : { email: emailOrId, password };

      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      let data = {};
      try {
        data = await res.json();
      } catch {
        data = { message: "Unexpected server response" };
      }

      if (res.ok) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("role", data.role);

        alert(`${isAdmin ? "Admin" : "User"} login successful!`);

        closeModal();

        if (isAdmin && onAdminLoginSuccess) {
          onAdminLoginSuccess();  // <-- Show admin panel without reload
        } else {
          // For regular users, keep current redirect or adjust as needed
          window.location.href = "/user/dashboard";
        }
      } else {
        alert(data.message || "Invalid credentials");
      }
    } catch (err) {
      console.error("Login error:", err);
      alert("Network error, please try again later");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      style={{ display: isOpen ? "flex" : "none" }}
    >
      <div className="bg-white rounded-xl p-8 max-w-md w-full mx-4 shadow-lg animate-fadeIn">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-2xl font-bold text-blue-800">
            {isAdmin ? "Admin Login" : "User Login"}
          </h3>
          <button
            onClick={closeModal}
            className="text-gray-500 hover:text-gray-700"
            type="button"
          >
            <i className="fas fa-times" />
          </button>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleLogin();
          }}
        >
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

          <button
            type="submit"
            disabled={loading}
            className={`w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition ${
              loading ? "opacity-70 cursor-not-allowed" : ""
            }`}
          >
            {loading ? "Logging in..." : "Login"}
          </button>

          {!isAdmin && (
            <div className="mt-4 text-center">
              <a
                href="/forgot-password"
                className="text-blue-600 hover:underline"
              >
                Forgot password?
              </a>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
