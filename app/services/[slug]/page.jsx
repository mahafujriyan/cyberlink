import { notFound } from "next/navigation";
import data from "../service.json";

export default async function ServiceDetails({ params }) {
  const { slug } = await params;

  const service = data.services.find((s) => s.slug === slug);
  if (!service) return notFound();

  return (
    <section className="min-h-screen 

bg-[linear-gradient(135deg,#000f08_0%,#214211_30%)] 
font-hind  
selection:text-white
animate-[gradientMove_18s_ease_infinite]
font-hind 
selection:bg-orange-500">
      <div className="max-w-6xl mx-auto space-y-10">

        {/* HERO CARD */}
        <div className="bg-gradient-to-br from-orange-600 to-orange-400 rounded-[2.5rem] p-10 shadow-2xl">
          <h1 className="text-4xl lg:text-6xl font-black mb-4">
            {service.title}
          </h1>
          <p className="text-white/90 text-lg max-w-3xl">
            {service.desc}
          </p>
        </div>

        {/* OVERVIEW + CTA */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* OVERVIEW CARD */}
          <div className="lg:col-span-2 bg-white text-slate-900 rounded-[2.5rem] p-8 shadow-xl">
            <h2 className="text-2xl font-black mb-4">Overview</h2>
            <p className="text-slate-600 leading-relaxed">
              {service.details?.overview || service.desc}
            </p>
          </div>

          {/* CTA CARD */}
          <div className="bg-slate-900 rounded-[2.5rem] p-8 shadow-xl flex flex-col justify-between border border-orange-500/30">
            <div>
              <h3 className="text-xl font-black mb-2">Get Started</h3>
              <p className="text-white/70 text-sm">
                Ready to move forward with this service?
              </p>
            </div>
            <button className="mt-6 bg-orange-600 hover:bg-orange-700 transition-all text-white font-black py-4 rounded-xl">
              {service.cta?.label || "Contact Us"}
            </button>
          </div>
        </div>

        {/* BENEFITS */}
        <div className="bg-white rounded-[2.5rem] p-8 shadow-xl">
          <h2 className="text-2xl font-black text-slate-900 mb-6">
            Key Benefits
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {service.benefits.map((b, i) => (
              <div
                key={i}
                className="bg-orange-50 border border-orange-200 rounded-2xl p-5 text-slate-800 font-semibold shadow-sm hover:-translate-y-1 transition-all"
              >
                {b}
              </div>
            ))}
          </div>
        </div>

        {/* TECHNOLOGIES */}
        {service.details?.technologies && (
          <div className="bg-slate-900 rounded-[2.5rem] p-8 shadow-xl">
            <h2 className="text-2xl font-black mb-6">Technologies</h2>
            <div className="flex flex-wrap gap-3">
              {service.details.technologies.map((tech, i) => (
                <span
                  key={i}
                  className="px-5 py-2 rounded-full bg-orange-600/20 text-orange-400 font-bold text-sm"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        )}

      </div>
    </section>
  );
}
