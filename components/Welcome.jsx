"use client";

import { useLayoutEffect, useState } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { X } from "lucide-react";

export default function WelcomePopup() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  const isAdminRoute = pathname?.startsWith("/admin");

  useLayoutEffect(() => {
    if (isAdminRoute) return;
    const alreadySeen = localStorage.getItem("welcome_popup_seen");
    if (!alreadySeen) {
      setOpen(true);
    }
  }, [isAdminRoute]);

  const closePopup = () => {
    localStorage.setItem("welcome_popup_seen", "true");
    setOpen(false);
  };

  if (!open || isAdminRoute) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">

      <div className="relative w-full max-w-lg rounded-3xl overflow-hidden shadow-2xl bg-white">

        {/* Close Button */}
        <button
          onClick={closePopup}
          className="absolute top-4 right-4 z-20 bg-white/80 hover:bg-white p-2 rounded-full shadow-md"
        >
          <X size={18} />
        </button>

        {/* Image */}
        <div className="relative h-[400px] w-full">
          <Image
            src="/welcome.svg"
            alt="Welcome"
            fill
            className="object-cover"
            priority
          />

          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent flex items-end p-6">
            <h2 className="text-white text-3xl font-black uppercase tracking-tight">
              Welcome to CyberLink Communication
            </h2>
          </div>
        </div>

      </div>
    </div>
  );
}
