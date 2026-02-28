import Image from "next/image";
import { notFound } from "next/navigation";

async function getOffer(id) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || ""}/api/offers`, {
    cache: "no-store",
  });

  const data = await res.json();

  if (!res.ok || !data.success) return null;

  return data.data.offers.find((offer) => offer.id === Number(id));
}

export default async function OfferDetails({ params }) {
  const { id } = await params;

  const offer = await getOffer(id);

  if (!offer) {
    notFound();
  }

  return (
    <div className="min-h-screen text-slate-800 pb-24 bg-[radial-gradient(circle_at_12%_14%,rgba(0,177,229,0.035)_0,rgba(0,177,229,0)_30%),radial-gradient(circle_at_88%_10%,rgba(0,120,187,0.025)_0,rgba(0,120,187,0)_26%),linear-gradient(180deg,#f6fbff_0%,#ffffff_52%,#f1f7ff_100%)]">

      {/* 🔥 HERO SECTION */}
      <section className="relative h-[500px] flex items-center justify-center overflow-hidden">
        <Image
          src={offer.image}
          alt={offer.title}
          fill
          className="object-cover opacity-50"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-blue-950/85 via-blue-950/45 to-transparent" />

        <div className="relative z-10 text-center px-6">
          <h1 className="text-4xl lg:text-7xl font-black uppercase tracking-tight">
            {offer.title}
          </h1>
        </div>
      </section>

      {/* 🔥 CONTENT SECTION */}
      <div className="container mx-auto px-6 lg:px-16 mt-16">

        <div className="bg-white text-slate-800 rounded-[2.5rem] p-10 shadow-[0_20px_50px_rgba(30,64,175,0.12)] border border-blue-200">

          <h2 className="text-3xl font-black mb-6 uppercase">
            Campaign Details
          </h2>

          <p className="text-lg leading-relaxed font-medium whitespace-pre-line">
            {offer.description}
          </p>

          {offer.link && offer.link !== "#" && (
            <div className="mt-10">
              <a
                href={offer.link}
                className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-black px-10 py-4 rounded-2xl transition-all"
              >
                Visit Offer
              </a>
            </div>
          )}

        </div>

      </div>
    </div>
  );
}
