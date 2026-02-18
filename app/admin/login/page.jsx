"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function MasterAdminLoginPage() {
  const router = useRouter();
 
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData), 
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Login failed.");
        setLoading(false);
        return;
      }

      router.push("/admin");
      router.refresh();
    } catch {
      setError("Unable to login right now. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950 px-4">
      <div className="w-full max-w-md bg-white rounded-3xl p-8 shadow-2xl border border-slate-200">
        <h1 className="text-2xl font-black text-slate-900 mb-2">Master Admin Login</h1>
        <p className="text-slate-500 mb-6 text-sm">
          Enter your admin credentials to access the panel.
        </p>

        <form onSubmit={handleLogin} className="space-y-4">
          {/* Username Input Field */}
          <div>
            <label className="text-sm font-bold text-slate-700 block mb-2">
              Username
            </label>
            <input
              type="text"
              value={formData.username}
              onChange={(e) => setFormData({ ...formData, username: e.target.value })}
              className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-orange-500 text-slate-900"
              placeholder="Enter your username"
              required
            />
          </div>

          {/* Password Input Field */}
          <div>
            <label className="text-sm font-bold text-slate-700 block mb-2">
              Password
            </label>
            <input
              type="password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-orange-500 text-slate-900"
              placeholder="Enter password"
              required
            />
          </div>

          {error ? (
            <p className="text-red-600 text-sm font-medium">{error}</p>
          ) : null}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-orange-600 hover:bg-orange-700 disabled:opacity-60 text-white font-black py-3 rounded-xl transition-all"
          >
            {loading ? "Signing in..." : "Login as Master Admin"}
          </button>
        </form>
      </div>
    </div>
  );
}