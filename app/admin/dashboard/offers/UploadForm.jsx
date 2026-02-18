"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { Camera, Loader2 } from "lucide-react";

const defaultForm = {
  id: null,
  title: "",
  description: "",
  image: "",
  link: "#",
};

export default function UploadForm({ editOffer, onSaved, onCancelEdit }) {
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState(defaultForm);

  useEffect(() => {
    if (editOffer) {
      setForm({
        id: editOffer.id,
        title: editOffer.title || "",
        description: editOffer.description || "",
        image: editOffer.image || "",
        link: editOffer.link || "#",
      });
      return;
    }
    setForm(defaultForm);
  }, [editOffer]);

  const handleImageUpload = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setLoading(true);
    setError("");

    const apiKey = process.env.NEXT_PUBLIC_IMGBB_API_KEY || "2a7b43ffea25ada6231fbb6c2fa5820b";
    const payload = new FormData();
    payload.append("image", file);

    try {
      const response = await fetch(`https://api.imgbb.com/1/upload?key=${apiKey}`, {
        method: "POST",
        body: payload,
      });
      const data = await response.json();
      if (!response.ok || !data?.data?.url) {
        throw new Error("Image upload failed.");
      }
      setForm((prev) => ({ ...prev, image: data.data.url }));
    } catch (uploadError) {
      setError(uploadError.message || "Unable to upload image.");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setSaving(true);

    try {
      const method = form.id ? "PATCH" : "POST";
      const response = await fetch("/api/offers", {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error || "Unable to save offer.");
      }

      setForm(defaultForm);
      onSaved?.(data.data);
    } catch (saveError) {
      setError(saveError.message || "Save failed.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-slate-900 p-8 rounded-[2.5rem] border border-white/5 space-y-6">
      <h3 className="text-orange-500 font-black text-sm uppercase">
        {form.id ? "Edit Campaign" : "Add New Campaign"}
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="relative group h-48 bg-slate-800 rounded-2xl border-2 border-dashed border-slate-700 flex flex-col items-center justify-center overflow-hidden transition-all hover:border-orange-500/50">
          {form.image ? (
            <Image src={form.image} fill className="object-cover" alt="Offer Preview" />
          ) : (
            <>
              {loading ? <Loader2 className="animate-spin text-orange-500" /> : <Camera className="text-slate-500 group-hover:text-orange-500" />}
              <p className="text-[10px] font-black text-slate-500 mt-2">UPLOAD COVER IMAGE</p>
            </>
          )}
          <input type="file" onChange={handleImageUpload} className="absolute inset-0 opacity-0 cursor-pointer" />
        </div>

        <div className="space-y-4">
          <input
            value={form.title}
            onChange={(event) => setForm((prev) => ({ ...prev, title: event.target.value }))}
            placeholder="Offer Title"
            className="w-full bg-slate-800 border border-slate-700 p-4 rounded-xl outline-none focus:border-orange-500 text-sm"
            required
          />
          <textarea
            value={form.description}
            onChange={(event) => setForm((prev) => ({ ...prev, description: event.target.value }))}
            placeholder="Description..."
            rows="4"
            className="w-full bg-slate-800 border border-slate-700 p-4 rounded-xl outline-none focus:border-orange-500 text-sm"
            required
          />
          <input
            value={form.link}
            onChange={(event) => setForm((prev) => ({ ...prev, link: event.target.value }))}
            placeholder="Link (e.g. /offers/refer-and-win)"
            className="w-full bg-slate-800 border border-slate-700 p-4 rounded-xl outline-none focus:border-orange-500 text-sm"
          />
        </div>
      </div>

      {error ? <p className="text-red-400 text-sm font-semibold">{error}</p> : null}

      <div className="flex justify-end gap-3">
        {form.id ? (
          <button
            type="button"
            onClick={onCancelEdit}
            className="bg-slate-700 hover:bg-slate-600 text-white font-black px-6 py-4 rounded-xl transition-all"
          >
            CANCEL
          </button>
        ) : null}
        <button
          type="submit"
          disabled={loading || saving || !form.image}
          className="bg-orange-600 hover:bg-orange-700 disabled:bg-slate-700 text-white font-black px-10 py-4 rounded-xl shadow-xl transition-all active:scale-95"
        >
          {saving ? "SAVING..." : "SAVE CAMPAIGN"}
        </button>
      </div>
    </form>
  );
}
