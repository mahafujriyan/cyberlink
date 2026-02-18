"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

export default function OfferDetailsPage() {
  const params = useParams();
  const [offer, setOffer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      setError("");
      try {
        const response = await fetch(`/api/offers/${params.id}`, { cache: "no-store" });
        const data = await response.json();
        if (!response.ok || !data.success) {
          throw new Error(data.error || "Unable to load offer.");
        }
        setOffer(data.data);
      } catch (loadError) {
        setError(loadError.message || "Failed to load offer details.");
      } finally {
        setLoading(false);
      }
    };

    if (params.id) {
      load();
    }
  }, [params.id]);

  return (
    <div className="min-h-screen bg-[linear-gradient(135deg,#000f08_0%,#214211_30%)] text-white px-4 py-10 lg:py-16">
      <div className="max-w-5xl mx-auto">
        <Link href="/offers" className="inline-flex mb-8 text-orange-300 hover:text-orange-200 font-bold">
          ← Back to Offers
        </Link>

        {loading ? <p className="text-slate-200">Loading offer...</p> : null}
        {error ? <p className="text-red-300">{error}</p> : null}

        {offer ? (
          <article className="bg-white/10 border border-white/10 rounded-[2rem] overflow-hidden">
            <div className="h-64 lg:h-96 overflow-hidden">
              <img src={offer.image} alt={offer.title} className="w-full h-full object-cover" />
            </div>
            <div className="p-6 lg:p-10">
              <h1 className="text-3xl lg:text-5xl font-black mb-6 uppercase">{offer.title}</h1>
              <p className="text-base lg:text-xl text-slate-100 leading-relaxed whitespace-pre-line">
                {offer.description}
              </p>
            </div>
          </article>
        ) : null}
      </div>
    </div>
  );
}
