"use client";

import Link from "next/link";

import {
  Home,
  Shield,
  Briefcase,
  Server,
  UploadCloud,
  Settings,
  Database,
  Globe
} from "lucide-react";

// icon mapper (same as homepage)
const getIcon = (iconName) => {
  const icons = {
    home: <Home size={32} />,
    shield: <Shield size={32} />,
    briefcase: <Briefcase size={32} />,
    server: <Server size={32} />,
    network: <UploadCloud size={32} />,
    settings: <Settings size={32} />,
    database: <Database size={32} />,
    globe: <Globe size={32} />
  };
  return icons[iconName] || <Globe size={32} />;
};

export default function ServicesPage() {
  const services = homeData.services;

  return (
    <section className="min-h-screen bg-gradient-to-br from-[#0e270e] to-[#061a06] px-4 lg:px-10 py-16 text-white">
      <div className="max-w-7xl mx-auto">

        {/* Title */}
        <div className="text-center mb-16">
          <h1 className="text-4xl lg:text-6xl font-black font-poppins tracking-tighter">
            Our <span className="text-orange-500">Solutions</span>
          </h1>
          <p className="text-white/70 mt-4 max-w-2xl mx-auto">
            We provide reliable, secure and future-ready internet & network
            solutions for both home and business users.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service) => (
            <Link
              key={service.id}
              href={`/services/${service.slug}`}
              className="group"
            >
              <div className="h-full bg-white rounded-[2.5rem] p-8 shadow-xl hover:-translate-y-2 transition-all duration-300 cursor-pointer flex flex-col">

                {/* Icon */}
                <div className="mb-6 p-4 rounded-2xl bg-orange-50 text-orange-600 w-fit">
                  {getIcon(service.icon)}
                </div>

                {/* Title */}
                <h3 className="text-xl font-black text-slate-900 mb-3">
                  {service.title}
                </h3>

                {/* Short Description */}
                <p className="text-slate-600 text-sm leading-relaxed flex-grow">
                  {service.shortDesc}
                </p>

                {/* Read More */}
                <div className="mt-6 text-orange-600 font-bold text-sm flex items-center gap-2 group-hover:gap-4 transition-all">
                  View Details
                  <span className="w-6 h-[2px] bg-orange-500 rounded-full"></span>
                </div>

              </div>
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
}
