"use client";

import { useEffect, useState } from "react";

function nextId(items) {
  const max = items.reduce((acc, item) => (item.id > acc ? item.id : acc), 0);
  return max + 1;
}

export default function PackagesPage() {
  const [homeData, setHomeData] = useState(null);
  const [pricingData, setPricingData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [savingHero, setSavingHero] = useState(false);
  const [savingPricing, setSavingPricing] = useState(false);
  const [error, setError] = useState("");

  const loadData = async () => {
    setLoading(true);
    setError("");
    try {
      const [homeRes, pricingRes] = await Promise.all([
        fetch("/api/admin/content?key=home", { cache: "no-store" }),
        fetch("/api/admin/content?key=pricing", { cache: "no-store" }),
      ]);

      const [homeJson, pricingJson] = await Promise.all([homeRes.json(), pricingRes.json()]);
      if (!homeRes.ok || !homeJson.success) throw new Error(homeJson.error || "Failed to load home data.");
      if (!pricingRes.ok || !pricingJson.success) throw new Error(pricingJson.error || "Failed to load pricing data.");

      setHomeData(homeJson.data.content);
      setPricingData(pricingJson.data.content);
    } catch (loadError) {
      setError(loadError.message || "Unable to load package settings.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const saveContent = async (key, content) => {
    const response = await fetch("/api/admin/content", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        key,
        rawContent: JSON.stringify(content, null, 2),
      }),
    });
    const data = await response.json();
    if (!response.ok || !data.success) {
      throw new Error(data.error || "Save failed.");
    }
  };

  const saveHeroPackages = async () => {
    if (!homeData) return;
    setSavingHero(true);
    try {
      await saveContent("home", homeData);
      window.alert("Hero packages updated.");
    } catch (saveError) {
      window.alert(saveError.message || "Could not save hero packages.");
    } finally {
      setSavingHero(false);
    }
  };

  const savePricingPlans = async () => {
    if (!pricingData) return;
    setSavingPricing(true);
    try {
      await saveContent("pricing", pricingData);
      window.alert("Pricing plans updated.");
    } catch (saveError) {
      window.alert(saveError.message || "Could not save pricing plans.");
    } finally {
      setSavingPricing(false);
    }
  };

  if (loading) {
    return <p className="text-slate-400">Loading package settings...</p>;
  }

  if (error || !homeData || !pricingData) {
    return <p className="text-red-400">{error || "Package settings could not be loaded."}</p>;
  }

  const heroSlideIndex = (homeData.heroSlides || []).findIndex((slide) => slide.type === "packages");
  const heroItems = heroSlideIndex >= 0 ? homeData.heroSlides[heroSlideIndex].items || [] : [];
  const regularPlans = pricingData.regularPlans || [];
  const smePlans = pricingData.smePlans || [];

  const updateHeroItem = (index, field, value) => {
    setHomeData((prev) => {
      const next = { ...prev, heroSlides: [...(prev.heroSlides || [])] };
      const targetSlide = { ...next.heroSlides[heroSlideIndex] };
      const items = [...(targetSlide.items || [])];
      items[index] = { ...items[index], [field]: value };
      targetSlide.items = items;
      next.heroSlides[heroSlideIndex] = targetSlide;
      return next;
    });
  };

  const removeHeroItem = (index) => {
    setHomeData((prev) => {
      const next = { ...prev, heroSlides: [...(prev.heroSlides || [])] };
      const targetSlide = { ...next.heroSlides[heroSlideIndex] };
      targetSlide.items = (targetSlide.items || []).filter((_, i) => i !== index);
      next.heroSlides[heroSlideIndex] = targetSlide;
      return next;
    });
  };

  const addHeroItem = () => {
    setHomeData((prev) => {
      const next = { ...prev, heroSlides: [...(prev.heroSlides || [])] };
      const targetSlide = { ...next.heroSlides[heroSlideIndex] };
      targetSlide.items = [...(targetSlide.items || []), { label: "", price: "" }];
      next.heroSlides[heroSlideIndex] = targetSlide;
      return next;
    });
  };

  const updatePlan = (section, index, field, value) => {
    setPricingData((prev) => {
      const list = [...(prev[section] || [])];
      list[index] = { ...list[index], [field]: value };
      return { ...prev, [section]: list };
    });
  };

  const removePlan = (section, index) => {
    setPricingData((prev) => ({
      ...prev,
      [section]: (prev[section] || []).filter((_, i) => i !== index),
    }));
  };

  const addPlan = (section) => {
    setPricingData((prev) => {
      const list = prev[section] || [];
      return {
        ...prev,
        [section]: [
          ...list,
          {
            id: section === "regularPlans" ? nextId(list) : 100 + nextId(list),
            name: "",
            speed: "",
            price: "",
            features: [],
          },
        ],
      };
    });
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-black">Packages</h1>
        <p className="text-slate-400">Manage Hero packages and Pricing page plans separately.</p>
      </div>

      <div className="bg-slate-900 border border-white/5 rounded-2xl p-6 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-black">Hero Section Packages</h2>
          <button type="button" onClick={saveHeroPackages} disabled={savingHero} className="bg-orange-600 hover:bg-orange-700 disabled:opacity-60 px-4 py-2 rounded-lg font-bold text-sm">
            {savingHero ? "Saving..." : "Save Hero Packages"}
          </button>
        </div>
        <div className="space-y-3">
          {heroItems.map((item, index) => (
            <div key={`hero-item-${index}`} className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <input
                value={item.label || ""}
                onChange={(event) => updateHeroItem(index, "label", event.target.value)}
                placeholder="Package label (e.g. 60 Mbps)"
                className="bg-slate-800 border border-white/10 rounded-xl px-4 py-3"
              />
              <input
                value={item.price || ""}
                onChange={(event) => updateHeroItem(index, "price", event.target.value)}
                placeholder="Price (e.g. 1050 TK)"
                className="bg-slate-800 border border-white/10 rounded-xl px-4 py-3"
              />
              <button type="button" onClick={() => removeHeroItem(index)} className="bg-red-500/20 hover:bg-red-500/30 text-red-300 rounded-xl px-4 py-3 font-semibold">
                Delete
              </button>
            </div>
          ))}
        </div>
        <button type="button" onClick={addHeroItem} className="bg-slate-800 hover:bg-slate-700 px-4 py-2 rounded-lg text-sm font-semibold">
          + Add Hero Package
        </button>
      </div>

      <div className="bg-slate-900 border border-white/5 rounded-2xl p-6 space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-black">Pricing Plans</h2>
          <button type="button" onClick={savePricingPlans} disabled={savingPricing} className="bg-orange-600 hover:bg-orange-700 disabled:opacity-60 px-4 py-2 rounded-lg font-bold text-sm">
            {savingPricing ? "Saving..." : "Save Pricing Plans"}
          </button>
        </div>

        <PlanSection
          title="Regular Plans"
          sectionKey="regularPlans"
          plans={regularPlans}
          onUpdate={updatePlan}
          onDelete={removePlan}
          onAdd={addPlan}
        />

        <PlanSection
          title="SME Plans"
          sectionKey="smePlans"
          plans={smePlans}
          onUpdate={updatePlan}
          onDelete={removePlan}
          onAdd={addPlan}
        />
      </div>
    </div>
  );
}

function PlanSection({ title, sectionKey, plans, onUpdate, onDelete, onAdd }) {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-bold">{title}</h3>
        <button type="button" onClick={() => onAdd(sectionKey)} className="bg-slate-800 hover:bg-slate-700 px-3 py-2 rounded-lg text-xs font-semibold">
          + Add Plan
        </button>
      </div>
      {plans.map((plan, index) => (
        <div key={`${sectionKey}-${plan.id}-${index}`} className="grid grid-cols-1 md:grid-cols-5 gap-3">
          <input
            value={plan.name || ""}
            onChange={(event) => onUpdate(sectionKey, index, "name", event.target.value)}
            placeholder="Plan Name"
            className="bg-slate-800 border border-white/10 rounded-xl px-4 py-3"
          />
          <input
            value={plan.speed || ""}
            onChange={(event) => onUpdate(sectionKey, index, "speed", event.target.value)}
            placeholder="Speed (e.g. 60 Mbps)"
            className="bg-slate-800 border border-white/10 rounded-xl px-4 py-3"
          />
          <input
            value={plan.price || ""}
            onChange={(event) => onUpdate(sectionKey, index, "price", event.target.value)}
            placeholder="Price (e.g. 1050)"
            className="bg-slate-800 border border-white/10 rounded-xl px-4 py-3"
          />
          <input
            value={Array.isArray(plan.features) ? plan.features.join(", ") : ""}
            onChange={(event) =>
              onUpdate(
                sectionKey,
                index,
                "features",
                event.target.value
                  .split(",")
                  .map((item) => item.trim())
                  .filter(Boolean)
              )
            }
            placeholder="Features (comma separated)"
            className="bg-slate-800 border border-white/10 rounded-xl px-4 py-3"
          />
          <button type="button" onClick={() => onDelete(sectionKey, index)} className="bg-red-500/20 hover:bg-red-500/30 text-red-300 rounded-xl px-4 py-3 font-semibold">
            Delete
          </button>
        </div>
      ))}
      {plans.length === 0 ? <p className="text-sm text-slate-500">No plan found.</p> : null}
    </div>
  );
}
