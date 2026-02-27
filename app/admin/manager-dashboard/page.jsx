"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const statusOptions = ["pending", "approved", "rejected", "completed"];
const assignmentOptions = ["assigned", "in_progress", "completed", "rejected"];

export default function ManagerDashboardPage() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadRequests = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await fetch("/api/apply", { cache: "no-store" });
      const data = await response.json();
      if (!response.ok || !data.success) throw new Error(data.error || "Unable to load assigned requests.");
      setRequests(data.data || []);
    } catch (loadError) {
      setError(loadError.message || "Failed to load requests.");
      setRequests([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadRequests();
  }, []);

  const updateRequest = async (id, patch) => {
    const response = await fetch("/api/apply", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, ...patch }),
    });
    const data = await response.json();
    if (!response.ok || !data.success) {
      window.alert(data.error || "Update failed.");
      return;
    }
    setRequests((prev) => prev.map((item) => (item._id === id ? data.data : item)));
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white p-6 md:p-10">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-black">Manager Dashboard</h1>
            <p className="text-slate-400">Your assigned collection requests and current progress.</p>
          </div>
          <form action="/api/admin/logout" method="POST">
            <button type="submit" className="px-4 py-2 rounded-xl bg-red-500/20 text-red-300 font-semibold hover:bg-red-500/30">
              Logout
            </button>
          </form>
        </div>

        {loading ? <p className="text-slate-400">Loading assigned requests...</p> : null}
        {error ? <p className="text-red-400">{error}</p> : null}

        <div className="bg-slate-900 border border-white/5 rounded-[1.5rem] overflow-x-auto">
          <table className="w-full text-left min-w-[900px]">
            <thead className="bg-white/5 text-orange-400 text-[10px] uppercase tracking-widest">
              <tr>
                <th className="p-5">Customer</th>
                <th className="p-5">Package</th>
                <th className="p-5">Location</th>
                <th className="p-5">Request Status</th>
                <th className="p-5">Assignment</th>
                <th className="p-5 text-right">Details</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {requests.map((item) => (
                <tr key={item._id}>
                  <td className="p-5">
                    <p className="font-semibold">{item.fullName || "N/A"}</p>
                    <p className="text-xs text-slate-500">{item.mobile || "N/A"}</p>
                  </td>
                  <td className="p-5 text-orange-300">{item.package || "N/A"}</td>
                  <td className="p-5 text-slate-400 text-sm">{item.location || "N/A"}</td>
                  <td className="p-5">
                    <select
                      value={item.status || "pending"}
                      onChange={(event) => updateRequest(item._id, { status: event.target.value })}
                      className="bg-slate-800 border border-white/10 rounded-lg text-xs px-3 py-2 outline-none"
                    >
                      {statusOptions.map((status) => (
                        <option key={status} value={status}>
                          {status.toUpperCase()}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td className="p-5">
                    <select
                      value={item.assignmentStatus || "assigned"}
                      onChange={(event) => updateRequest(item._id, { assignmentStatus: event.target.value })}
                      className="bg-slate-800 border border-white/10 rounded-lg text-xs px-3 py-2 outline-none"
                    >
                      {assignmentOptions.map((status) => (
                        <option key={status} value={status}>
                          {status.toUpperCase()}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td className="p-5 text-right">
                    <Link href={`/admin/manager-dashboard/applications/${item._id}`} className="text-orange-400 hover:underline text-sm">
                      View
                    </Link>
                  </td>
                </tr>
              ))}
              {!loading && requests.length === 0 ? (
                <tr>
                  <td colSpan={6} className="p-8 text-center text-slate-500">
                    No request is assigned to you yet.
                  </td>
                </tr>
              ) : null}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
