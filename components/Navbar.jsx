"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image'; 
import { usePathname } from 'next/navigation';
import { Menu, X, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import QuickPayModal from './QuickPayModal'; 
import offersData from '@/app/offers/offersData.json'; 

const Navbar = () => {
  const [isPayModalOpen, setIsPayModalOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const offerCount = offersData?.offers?.length || 0;

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Pricing', href: '/pricing' },
    { name: 'Coverage', href: '/coverage' },
    { name: 'Pay Bill', href: '/pay-bill' },
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <>
      <nav className="bg-[#070b14]/90 backdrop-blur-md text-white px-6 py-3 border-b border-orange-500/20 sticky top-0 z-[100] shadow-2xl">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          
          {/* Logo -  */}
          <Link href="/" className="flex items-center cursor-pointer group">
            <div className="relative h-10 w-32 md:h-14 md:w-48 transition-transform duration-300 group-hover:scale-105">
              <Image 
                src="/Navlogo/logo (2).png" 
                alt="Cyberlink Logo"
                fill
                className="object-contain"
                priority
              />
            </div>
          </Link>

          {/* Desktop Links */}
          <div className="hidden lg:flex items-center space-x-8 text-sm font-bold uppercase tracking-widest font-poppins">
            {navLinks.map((link) => (
              <Link 
                key={link.name} 
                href={link.href} 
                className={`${pathname === link.href ? 'text-[#B3F00E]' : 'text-white/80'} hover:text-[#B8FA05] transition-colors`}
              >
                {link.name}
              </Link>
            ))}
            
            <Link 
              href="/offers" 
              className={`relative border ${pathname === '/offers' ? 'border-orange-500 bg-orange-500/10' : 'border-white/10 bg-white/5'} hover:border-orange-500/50 rounded-lg px-4 py-2 flex items-center transition-all group`}
            >
              <span className={`mr-2 ${pathname === '/offers' ? 'text-[#B8FA05]' : 'group-hover:text-orange-500'}`}>Offers</span>
              {offerCount > 0 && (
                <span className="bg-orange-600 text-white text-[10px] h-5 w-5 flex items-center justify-center rounded-full font-black animate-pulse">
                  {offerCount}
                </span>
              )}
            </Link>
          </div>

          {/* Desktop Buttons */}
          <div className="hidden lg:flex items-center space-x-3">
            <button 
              onClick={() => setIsPayModalOpen(true)}
              className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-2.5 rounded-xl font-black text-xs uppercase transition-all shadow-lg active:scale-95"
            >
              Quick Pay
            </button>
            <Link 
              href="/selfcare" 
              className={`${pathname === '/selfcare' ? 'bg-orange-600 border-orange-600' : 'bg-white/5 border-orange-600/50'} text-white border hover:bg-orange-600 px-6 py-2.5 rounded-xl font-black text-xs uppercase transition-all active:scale-95`}
            >
              Selfcare
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="lg:hidden p-2 text-orange-500 bg-white/5 rounded-lg border border-white/10"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile Sidebar Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-[65px] lg:top-[74px] right-0 h-screen w-full bg-[#070b14] z-[90] lg:hidden p-8 flex flex-col border-l border-white/5 shadow-2xl"
            >
              <div className="flex flex-col space-y-6 font-poppins uppercase tracking-widest text-lg font-bold">
                {navLinks.map((link) => (
                  <Link 
                    key={link.name} 
                    href={link.href} 
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`flex items-center justify-between ${pathname === link.href ? 'text-[#B8FA05]' : 'text-white'}`}
                  >
                    {link.name}
                    {pathname === link.href && <ChevronRight size={20} className="text-orange-500" />}
                  </Link>
                ))}
                
                <Link 
                  href="/offers" 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`flex items-center justify-between ${pathname === '/offers' ? 'text-[#B8FA05]' : 'text-white'}`}
                >
                  Offers
                  <span className="bg-orange-600 text-white text-xs px-3 py-1 rounded-full">{offerCount}</span>
                </Link>

                <div className="pt-8 border-t border-white/10 flex flex-col gap-4">
                  <button 
                    onClick={() => { setIsPayModalOpen(true); setIsMobileMenuOpen(false); }}
                    className="w-full bg-orange-600 py-4 rounded-2xl text-white text-center shadow-lg font-black uppercase"
                  >
                    Quick Pay
                  </button>
                  <Link 
                    href="/selfcare" 
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`w-full py-4 rounded-2xl text-center border-2 border-orange-600 font-black uppercase ${pathname === '/selfcare' ? 'bg-orange-600 text-white' : 'text-orange-600'}`}
                  >
                    Selfcare
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Modal */}
      <QuickPayModal 
        isOpen={isPayModalOpen} 
        onClose={() => setIsPayModalOpen(false)} 
      />
    </>
  );
};

export default Navbar;