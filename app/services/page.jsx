"use client";

import Link from "next/link";
import usePublicContent from "@/lib/usePublicContent";

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
  const { data, loading } = usePublicContent("services", { services: [] });
  const services = data.services;

  if (loading) {
    return <div className="min-h-[40vh] text-white flex items-center justify-center">Loading...</div>;
  }

  return (
    <section className="min-h-screen my-3
font-hind  

selection:bg-orange-500">
      <div className="max-w-7xl mx-auto">

        <div className="text-center mb-16">
          <h1 className="text-4xl lg:text-6xl font-black">
            Our <span className="text-orange-500">Solutions</span>
          </h1>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service) => (
            <Link
              key={service.id}
              href={`/services/${service.slug}`}
              className="group"
            >
              <div className="h-full bg-white rounded-[2.5rem] p-8 shadow-xl flex flex-col ">
                <div className="mb-6 p-4 flex items-center rounded-2xl bg-orange-50 text-orange-600 w-fit">
                  {getIcon(service.icon)}
                </div>

                <h3 className="text-xl font-black text-slate-900 mb-3">
                  {service.title}
                </h3>

                <p className="text-slate-600 text-sm grow">
                  {service.shortDesc}
                </p>
              </div>
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
}
