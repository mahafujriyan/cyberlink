"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image'; 
import { usePathname } from 'next/navigation';
import { Menu, X, ChevronRight, Zap } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import QuickPayModal from './QuickPayModal'; 
import offersData from '@/app/offers/offersData.json'; 

const Navbar = () => {
  const [isPayModalOpen, setIsPayModalOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const offerCount = offersData?.offers?.length || 0;

  const navLinks = [
    { name: 'HOME', href: '/' },
    { name: 'ABOUT', href: '/about' },
    { name: 'PRICING', href: '/pricing' },
    { name: 'COVERAGE', href: '/coverage' },
    { name: 'ERP', href: '/erp' },
    { name: 'PAY BILL', href: '/pay-bill' },
    { name: 'PAY SERVICE', href: '/pay-service' },
    { name: 'CONTACT', href: '/contact' },
  ];

  return (
    <>
      <nav className="bg-[#070b14] text-white px-4 py-1 border-b border-orange-500/20 sticky top-0 z-[100] shadow-2xl">
        <div className="max-w-[1600px] mx-auto flex items-center justify-between gap-4">
          
          {/* ১. লোগো */}
          <Link href="/" className="flex-shrink-0 group">
            <div className="relative h-12 w-36 md:h-16 md:w-52 transition-transform duration-300 group-hover:scale-105">
              <Image src="/Navlogo/logo (2).png" alt="Logo" fill className="object-contain" priority />
            </div>
          </Link>

          {/* ২. ডেক্সটপ লিঙ্কসমূহ */}
          <div className="hidden xl:flex items-center xl:gap-4 2xl:gap-6">
            {navLinks.map((link) => (
              <Link 
                key={link.name} 
                href={link.href} 
                className={`text-[12px] 2xl:text-[13px] font-bold transition-all duration-300 hover:text-[#B8FA05] ${pathname === link.href ? 'text-[#B8FA05]' : 'text-white'}`}
              >
                {link.name}
              </Link>
            ))}
            <Link href="/offers" className={`flex items-center px-3 py-1.5 rounded-lg border text-[12px] font-bold ${pathname === '/offers' ? 'border-[#B8FA05] text-[#B8FA05]' : 'border-gray-800 text-white'}`}>
              OFFERS {offerCount > 0 && <span className="ml-2 bg-[#FF4500] text-white text-[10px] h-5 w-5 flex items-center justify-center rounded-full animate-pulse">{offerCount}</span>}
            </Link>
          </div>

          {/* ৩. ডেক্সটপ বাটনসমূহ */}
          <div className="hidden lg:flex items-center gap-3">
            <button onClick={() => setIsPayModalOpen(true)} className="bg-[#FF4500] hover:bg-[#E24A0E] text-white px-5 py-2.5 rounded-xl font-bold text-[12px] uppercase active:scale-95 whitespace-nowrap transition-all">QUICK PAY</button>
            <Link href="/selfcare" className="border border-gray-600 hover:border-[#B8FA05] hover:text-[#B8FA05] text-white px-5 py-2.5 rounded-xl font-bold text-[12px] uppercase active:scale-95 whitespace-nowrap transition-all">SELFCARE</Link>
          </div>

          {/* ৪. মোবাইল আইকনস */}
          <div className="xl:hidden flex items-center gap-3">
             <button onClick={() => setIsPayModalOpen(true)} className="bg-[#FF4500] p-2.5 rounded-xl text-white shadow-lg"><Zap size={18} fill="currentColor" /></button>
             <button className="p-1 text-[#B8FA05]" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
               {isMobileMenuOpen ? <X size={32} /> : <Menu size={32} />}
             </button>
          </div>
        </div>

        {/* ৫. ফিক্সড মোবাইল সাইডবার (নতুন ডিজাইন) */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <>
              {/* ব্যাকড্রপ - বাইরের কালো ছায়া */}
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsMobileMenuOpen(false)} className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[140] xl:hidden" />
              
              <motion.div
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                exit={{ x: '100%' }}
                transition={{ type: "tween", duration: 0.3 }}
                className="fixed top-0 right-0 h-screen w-[300px] bg-[#0a1120] z-[150] shadow-[-10px_0_30px_rgba(0,0,0,0.5)] p-6 flex flex-col xl:hidden"
              >
                {/* ক্লোজ বাটন এবং লোগো বা টাইটেল */}
                <div className="flex items-center justify-between mb-10 border-b border-white/5 pb-6">
                  <span className="text-xl font-black italic text-[#B8FA05] font-poppins">MENU</span>
                  <X onClick={() => setIsMobileMenuOpen(false)} className="text-white cursor-pointer hover:text-[#B8FA05] transition-colors" size={32} />
                </div>

                {/* মেনু লিঙ্কসমূহ */}
                <div className="flex flex-col space-y-1 font-poppins text-sm font-bold overflow-y-auto flex-grow pr-2 custom-scrollbar">
                  {navLinks.map((link) => {
                    const isActive = pathname === link.href;
                    return (
                      <Link 
                        key={link.name} 
                        href={link.href} 
                        onClick={() => setIsMobileMenuOpen(false)}
                        className={`flex items-center justify-between p-4 rounded-2xl transition-all duration-300
                          ${isActive ? 'bg-[#B8FA05]/10 text-[#B8FA05] shadow-inner' : 'text-gray-300 hover:bg-white/5 hover:text-white'}`}
                      >
                        <span className="tracking-widest uppercase">{link.name}</span>
                        <ChevronRight size={18} className={`${isActive ? 'opacity-100' : 'opacity-20'}`} />
                      </Link>
                    );
                  })}
                  
                  {/* স্পেশাল অফার লিঙ্ক */}
                  <Link 
                    href="/offers" 
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`flex items-center justify-between p-4 rounded-2xl transition-all 
                      ${pathname === '/offers' ? 'bg-[#B8FA05]/10 text-[#B8FA05]' : 'text-gray-300 hover:bg-white/5'}`}
                  >
                    <span className="tracking-widest uppercase">OFFERS</span>
                    <span className="bg-[#FF4500] text-white text-[10px] px-2.5 py-1 rounded-full font-black">{offerCount}</span>
                  </Link>
                </div>

                {/* নিচের বাটনসমূহ */}
                <div className="pt-6 border-t border-white/10 flex flex-col gap-4">
                  <button onClick={() => {setIsPayModalOpen(true); setIsMobileMenuOpen(false);}} className="w-full bg-[#FF4500] py-4 rounded-2xl text-white font-bold shadow-lg shadow-[#FF4500]/20 active:scale-95 uppercase tracking-widest text-xs">QUICK PAY</button>
                  <Link href="/selfcare" onClick={() => setIsMobileMenuOpen(false)} className="w-full py-4 rounded-2xl border-2 border-[#FF4500] text-[#FF4500] text-center font-bold uppercase tracking-widest text-xs">SELFCARE</Link>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </nav>

      {/* কুইক পে পপআপ */}
      <QuickPayModal isOpen={isPayModalOpen} onClose={() => setIsPayModalOpen(false)} />
    </>
  );
};

export default Navbar;