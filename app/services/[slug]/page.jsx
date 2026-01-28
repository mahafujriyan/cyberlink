
import { notFound } from "next/navigation";

export default function ServiceDetails({ params }) {
  const service = homeData.solutionsSection.services.find(
    (s) => s.slug === params.slug
  );

  if (!service) return notFound();

  return (
    <section className="min-h-screen px-4 lg:px-10 py-16 bg-slate-950 text-white">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl lg:text-6xl font-black mb-6">
          {service.title}
        </h1>

        <p className="text-lg text-white/80 mb-10">
          {service.desc}
        </p>

        <ul className="space-y-3">
          {service.benefits.map((b, i) => (
            <li key={i} className="flex items-center gap-3">
              <span className="w-2 h-2 bg-orange-500 rounded-full"></span>
              {b}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
