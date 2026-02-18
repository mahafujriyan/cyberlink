"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Users, MapPin, Gift } from "lucide-react";

const modules = [
  {
    title: "New Applications",
    href: "/admin/dashboard/applications",
    icon: Users,
    key: "applications",
    accent: "text-blue-400",
  },
  {
    title: "Coverage Regions",
    href: "/admin/dashboard/coverage",
    icon: MapPin,
    key: "regions",
    accent: "text-green-400",
  },
  {
    title: "Offers",
    href: "/admin/dashboard/offers",
    icon: Gift,
    key: "offers",
    accent: "text-orange-400",
  },
];

export default function DashboardPage() {
  const [counts, setCounts] = useState({ applications: 0, regions: 0, offers: 0 });
  const [showWelcome, setShowWelcome] = useState(false);

  useEffect(() => {
    let timer;
    const popupSeen = sessionStorage.getItem("admin_welcome_seen");
    if (!popupSeen) {
      sessionStorage.setItem("admin_welcome_seen", "1");
      timer = setTimeout(() => setShowWelcome(true), 0);
    }

    const load = async () => {
      try {
        const [applicationsRes, coverageRes, offersRes] = await Promise.all([
          fetch("/api/apply", { cache: "no-store" }),
          fetch("/api/coverage", { cache: "no-store" }),
          fetch("/api/offers", { cache: "no-store" }),
        ]);

        const [applications, coverage, offers] = await Promise.all([
          applicationsRes.json(),
          coverageRes.json(),
          offersRes.json(),
        ]);

        setCounts({
          applications: applications?.data?.length || 0,
          regions: coverage?.data?.regions?.length || 0,
          offers: offers?.data?.offers?.length || 0,
        });
      } catch {
        setCounts({ applications: 0, regions: 0, offers: 0 });
      }
    };

    load();
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, []);

  return (
    <div className="space-y-8">
      {showWelcome ? (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-orange-500/30 rounded-3xl p-8 max-w-md w-full text-center">
            <h2 className="text-3xl font-black mb-3 text-orange-400">Welcome</h2>
            <p className="text-slate-300 mb-6">
              Welcome to the admin dashboard. You can manage offers, coverage and connection requests here.
            </p>
            <button
              onClick={() => setShowWelcome(false)}
              className="bg-orange-600 hover:bg-orange-700 text-white font-black px-8 py-3 rounded-xl"
            >
              Continue
            </button>
          </div>
        </div>
      ) : null}

      <div>
        <h1 className="text-4xl font-black">Dashboard Overview</h1>
        <p className="text-slate-400">Manage requests, coverage and campaigns from one place.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {modules.map((item) => {
          const Icon = item.icon;
          const count = counts[item.key];
          return (
            <Link
              key={item.href}
              href={item.href}
              className="bg-slate-900 border border-white/5 p-8 rounded-[2rem] hover:border-orange-500/40 transition-all"
            >
              <div className="mb-4 bg-slate-800 w-14 h-14 flex items-center justify-center rounded-2xl">
                <Icon className={item.accent} />
              </div>
              <p className="text-xs text-slate-500 uppercase tracking-widest mb-1">Total</p>
              <h2 className="text-4xl font-black mb-3">{count}</h2>
              <h3 className="text-lg font-bold">{item.title}</h3>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
