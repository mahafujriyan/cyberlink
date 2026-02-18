"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { Edit3, Trash2 } from "lucide-react";
import UploadForm from "./UploadForm";

export default function ManageOffers() {
  const [offers, setOffers] = useState([]);
  const [editOffer, setEditOffer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadOffers = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await fetch("/api/offers", { cache: "no-store" });
      const data = await response.json();
      if (!response.ok || !data.success) {
        throw new Error(data.error || "Unable to load offers.");
      }
      setOffers(data.data.offers || []);
    } catch (loadError) {
      setError(loadError.message || "Failed to load offers.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadOffers();
  }, []);

  const handleDelete = async (id) => {
    const confirmed = window.confirm("Delete this offer?");
    if (!confirmed) return;

    const response = await fetch("/api/offers", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    const data = await response.json();
    if (!response.ok || !data.success) {
      window.alert(data.error || "Unable to delete offer.");
      return;
    }

    if (editOffer?.id === id) {
      setEditOffer(null);
    }
    setOffers((prev) => prev.filter((offer) => offer.id !== id));
  };

  const handleSaved = (savedOffer) => {
    setEditOffer(null);
    setOffers((prev) => {
      const exists = prev.some((offer) => offer.id === savedOffer.id);
      if (!exists) {
        return [savedOffer, ...prev];
      }
      return prev.map((offer) => (offer.id === savedOffer.id ? savedOffer : offer));
    });
  };

  return (
    <div className="space-y-12">
      <header>
        <h2 className="text-4xl font-black">Offers & Campaigns</h2>
        <p className="text-slate-500 text-sm">Create and manage your web banners and promotions</p>
      </header>

      <UploadForm
        editOffer={editOffer}
        onSaved={handleSaved}
        onCancelEdit={() => setEditOffer(null)}
      />

      <div className="space-y-4">
        <h3 className="text-sm font-black text-slate-400 uppercase tracking-widest">
          Active Offers ({offers.length})
        </h3>

        {loading ? <p className="text-slate-400">Loading offers...</p> : null}
        {error ? <p className="text-red-400">{error}</p> : null}

        <div className="grid grid-cols-1 gap-4">
          {offers.map((offer) => (
            <div
              key={offer.id}
              className="bg-slate-900/50 border border-white/5 p-4 rounded-2xl flex items-center justify-between group hover:bg-slate-900 transition-all"
            >
              <div className="flex items-center gap-4 min-w-0">
                {offer.image ? (
                  <Image
                    src={offer.image}
                    alt={offer.title}
                    width={64}
                    height={64}
                    className="rounded-lg object-cover"
                    priority={false}
                  />
                ) : null}
                <div className="min-w-0">
                  <h4 className="font-bold truncate">{offer.title}</h4>
                  <p className="text-xs text-slate-400 truncate">{offer.link || "#"}</p>
                </div>
              </div>

              <div className="flex gap-2 shrink-0">
                <button
                  onClick={() => setEditOffer(offer)}
                  className="p-2 hover:bg-blue-500/20 text-blue-400 rounded-lg"
                >
                  <Edit3 size={18} />
                </button>
                <button
                  onClick={() => handleDelete(offer.id)}
                  className="p-2 hover:bg-red-500/20 text-red-400 rounded-lg"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
