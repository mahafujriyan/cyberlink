"use client";

import { useEffect, useState } from "react";

const statusColors = {
  pending: "bg-yellow-500/10 text-yellow-500",
  reviewed: "bg-blue-500/10 text-blue-400",
  approved: "bg-emerald-500/10 text-emerald-400",
  connected: "bg-green-500/10 text-green-500",
  rejected: "bg-red-500/10 text-red-400",
};

const statusOptions = ["pending", "reviewed", "approved", "connected", "rejected"];

export default function ApplicationsPage() {
  const [apps, setApps] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadApplications = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await fetch("/api/apply", { cache: "no-store" });
      const data = await response.json();
      if (!response.ok || !data.success) {
        throw new Error(data.error || "Unable to load applications.");
      }
      setApps(data.data || []);
    } catch (loadError) {
      setError(loadError.message || "Failed to load requests.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadApplications();
  }, []);

  const updateStatus = async (id, status) => {
    const response = await fetch("/api/apply", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, status }),
    });
    const data = await response.json();
    if (!response.ok || !data.success) {
      window.alert(data.error || "Unable to update status.");
      return;
    }

    setApps((prev) => prev.map((app) => (app._id === id ? data.data : app)));
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-black">New Connection Requests</h2>
        <div className="bg-orange-600/20 text-orange-500 px-4 py-1 rounded-full text-xs font-black uppercase tracking-widest">
          Total: {apps.length}
        </div>
      </div>

      {loading ? <p className="text-slate-400">Loading requests...</p> : null}
      {error ? <p className="text-red-400">{error}</p> : null}

      <div className="bg-slate-900 rounded-[2rem] border border-white/5 overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[900px]">
          <thead>
            <tr className="bg-white/5 text-orange-500 text-[10px] font-black uppercase tracking-widest">
              <th className="p-6">Customer</th>
              <th className="p-6">Package</th>
              <th className="p-6">Location</th>
              <th className="p-6">Submitted</th>
              <th className="p-6">Status</th>
              <th className="p-6 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {apps.map((app) => (
              <tr key={app._id} className="hover:bg-white/5 transition-all group">
                <td className="p-6">
                  <p className="font-bold text-white">{app.fullName || app.name || "N/A"}</p>
                  <p className="text-xs text-slate-500">{app.mobile || app.phone || "N/A"}</p>
                </td>
                <td className="p-6 font-mono text-orange-400">{app.package || "N/A"}</td>
                <td className="p-6 text-sm text-slate-400">{app.location || app.address || "N/A"}</td>
                <td className="p-6 text-xs text-slate-500">
                  {app.requestedAt ? new Date(app.requestedAt).toLocaleString() : "N/A"}
                </td>
                <td className="p-6">
                  <span className={`px-3 py-1 rounded-full text-[10px] font-black ${statusColors[app.status] || statusColors.pending}`}>
                    {(app.status || "pending").toUpperCase()}
                  </span>
                </td>
                <td className="p-6 text-right">
                  <select
                    value={app.status || "pending"}
                    onChange={(event) => updateStatus(app._id, event.target.value)}
                    className="bg-slate-800 border border-white/10 rounded-lg text-xs px-3 py-2 outline-none focus:border-orange-500"
                  >
                    {statusOptions.map((status) => (
                      <option key={status} value={status}>
                        {status.toUpperCase()}
                      </option>
                    ))}
                  </select>
                </td>
              </tr>
            ))}
            {!loading && apps.length === 0 ? (
              <tr>
                <td colSpan={6} className="p-10 text-center text-slate-500">
                  No connection requests found.
                </td>
              </tr>
            ) : null}
          </tbody>
        </table>
      </div>
    </div>
  );
}
