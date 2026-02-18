"use client";

import { useEffect, useState } from "react";
import { Plus, MapPin, X, Trash2 } from "lucide-react";

export default function AdminCoverage() {
  const [regions, setRegions] = useState([]);
  const [newRegion, setNewRegion] = useState("");
  const [newSubtitle, setNewSubtitle] = useState("");
  const [newAreas, setNewAreas] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadCoverage = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await fetch("/api/coverage", { cache: "no-store" });
      const data = await response.json();
      if (!response.ok || !data.success) {
        throw new Error(data.error || "Unable to load coverage.");
      }
      setRegions(data.data.regions || []);
    } catch (loadError) {
      setError(loadError.message || "Failed to load coverage.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCoverage();
  }, []);

  const addRegion = async () => {
    if (!newRegion.trim()) return;

    const response = await fetch("/api/coverage", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: newRegion, subtitle: newSubtitle }),
    });
    const data = await response.json();
    if (!response.ok || !data.success) {
      window.alert(data.error || "Unable to add region.");
      return;
    }

    setRegions((prev) => [...prev, data.data]);
    setNewRegion("");
    setNewSubtitle("");
  };

  const deleteRegion = async (regionId) => {
    if (!window.confirm("Delete this region and all of its areas?")) return;

    const response = await fetch("/api/coverage", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ regionId }),
    });
    const data = await response.json();
    if (!response.ok || !data.success) {
      window.alert(data.error || "Unable to delete region.");
      return;
    }

    setRegions((prev) => prev.filter((region) => region.id !== regionId));
  };

  const updateArea = async (regionId, area, action) => {
    const response = await fetch("/api/coverage", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ regionId, area, action }),
    });
    const data = await response.json();
    if (!response.ok || !data.success) {
      window.alert(data.error || "Unable to update area.");
      return;
    }

    setRegions((prev) =>
      prev.map((region) => (region.id === regionId ? data.data : region))
    );
    if (action === "add-area") {
      setNewAreas((prev) => ({ ...prev, [regionId]: "" }));
    }
  };

  return (
    <div className="space-y-10">
      <div className="flex justify-between items-end gap-6 flex-wrap">
        <div>
          <h2 className="text-4xl font-black">Coverage Areas</h2>
          <p className="text-slate-500">Update the locations where you provide internet</p>
        </div>

        <div className="flex gap-2 flex-wrap">
          <input
            value={newRegion}
            onChange={(event) => setNewRegion(event.target.value)}
            placeholder="Region name"
            className="bg-slate-900 border border-white/10 rounded-xl px-4 py-3 text-sm outline-none focus:border-orange-500"
          />
          <input
            value={newSubtitle}
            onChange={(event) => setNewSubtitle(event.target.value)}
            placeholder="Subtitle (optional)"
            className="bg-slate-900 border border-white/10 rounded-xl px-4 py-3 text-sm outline-none focus:border-orange-500"
          />
          <button
            onClick={addRegion}
            className="bg-orange-600 text-white px-6 py-3 rounded-xl font-black flex items-center gap-2 text-sm uppercase"
          >
            <Plus size={18} /> Add Region
          </button>
        </div>
      </div>

      {loading ? <p className="text-slate-400">Loading coverage...</p> : null}
      {error ? <p className="text-red-400">{error}</p> : null}

      <div className="grid gap-6">
        {regions.map((region) => (
          <div key={region.id} className="bg-slate-900 rounded-[2.5rem] border border-white/5 p-8">
            <div className="flex items-center justify-between mb-8 gap-4">
              <div className="flex items-center gap-4">
                <div className="bg-orange-600 p-3 rounded-xl text-white">
                  <MapPin size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-black uppercase">{region.name}</h3>
                  <p className="text-xs text-slate-500">{region.areas.length} Active Areas</p>
                </div>
              </div>

              <button
                onClick={() => deleteRegion(region.id)}
                className="text-red-400 hover:text-red-300 p-2 rounded-lg hover:bg-red-500/10"
              >
                <Trash2 size={18} />
              </button>
            </div>

            <div className="flex flex-wrap gap-3">
              {region.areas.map((area) => (
                <div key={area} className="bg-slate-800 px-4 py-2 rounded-lg border border-white/5 flex items-center gap-3 group">
                  <span className="text-sm font-bold">{area}</span>
                  <button
                    onClick={() => updateArea(region.id, area, "remove-area")}
                    className="text-slate-500 hover:text-red-500 transition-colors"
                  >
                    <X size={14} />
                  </button>
                </div>
              ))}
            </div>

            <div className="mt-5 flex gap-2 flex-wrap">
              <input
                value={newAreas[region.id] || ""}
                onChange={(event) =>
                  setNewAreas((prev) => ({ ...prev, [region.id]: event.target.value }))
                }
                placeholder={`Add area in ${region.name}`}
                className="bg-slate-800 border border-white/10 rounded-xl px-4 py-3 text-sm outline-none focus:border-orange-500"
              />
              <button
                onClick={() =>
                  updateArea(region.id, (newAreas[region.id] || "").trim(), "add-area")
                }
                className="px-4 py-2 rounded-lg border-2 border-dashed border-slate-700 text-slate-500 hover:border-orange-500 hover:text-orange-500 text-sm font-bold transition-all"
              >
                + Add Area
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
