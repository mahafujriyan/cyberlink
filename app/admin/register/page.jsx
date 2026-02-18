"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function RegisterAdminPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    secretKey: "",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: "", text: "" });

    try {
      const res = await fetch("/api/admin/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.error || "Something went wrong");

      setMessage({ type: "success", text: "New Admin Created Successfully!" });
      setFormData({ username: "", password: "", secretKey: "" }); 
      
      // ৩ সেকেন্ড পর ড্যাশবোর্ডে নিয়ে যাবে
      setTimeout(() => router.push("/admin"), 3000);
    } catch (err) {
      setMessage({ type: "error", text: err.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950 px-4">
      <div className="w-full max-w-md bg-white rounded-3xl p-8 shadow-2xl border border-slate-200">
        <div className="mb-6">
          <Link href="/admin" className="text-orange-600 text-sm font-bold hover:underline">
            ← Back to Dashboard
          </Link>
          <h1 className="text-2xl font-black text-slate-900 mt-2">Create New Admin</h1>
          <p className="text-slate-500 text-sm">Add a new person to manage the website.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-sm font-bold text-slate-700 block mb-1">Username</label>
            <input
              type="text"
              className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-orange-500 outline-none text-slate-900"
              placeholder="e.g. mofiz_admin"
              value={formData.username}
              onChange={(e) => setFormData({ ...formData, username: e.target.value })}
              required
            />
          </div>

          <div>
            <label className="text-sm font-bold text-slate-700 block mb-1">Password</label>
            <input
              type="password"
              className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-orange-500 outline-none text-slate-900"
              placeholder="••••••••"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              required
            />
          </div>

          <div>
            <label className="text-sm font-bold text-slate-700 block mb-1">System Secret Key</label>
            <input
              type="password"
              className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-orange-500 outline-none text-slate-900"
              placeholder="Enter the master secret key"
              value={formData.secretKey}
              onChange={(e) => setFormData({ ...formData, secretKey: e.target.value })}
              required
            />
          </div>

          {message.text && (
            <p className={`text-sm font-medium ${message.type === "success" ? "text-green-600" : "text-red-600"}`}>
              {message.text}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-slate-900 hover:bg-black disabled:opacity-50 text-white font-black py-3 rounded-xl transition-all shadow-lg"
          >
            {loading ? "Creating..." : "Register Admin"}
          </button>
        </form>
      </div>
    </div>
  );
}