"use client";
import React from 'react';
import Link from 'next/link';
import Image from 'next/image'; // Image ইমপোর্ট করা হলো
import { motion } from 'framer-motion';
import { 
  Facebook, 
  Youtube, 
  Instagram, 
  Linkedin, 
  Mail, 
  Phone, 
  MapPin, 
  Send, 
  ArrowRight, 
  ShieldCheck,
  ChevronRight 
} from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerColumns = [
    {
      title: "COMPANY",
      links: ["About us", "Pricing", "Coverage area", "Bill Payment"]
    },
    {
      title: "SUPPORT",
      links: ["How to Pay", "Self-care", "Articles", "Contact us"]
    },
    {
      title: "QUICK LINKS",
      links: ["Join Group", "Like our Page"]
    },
    {
      title: "LEGAL",
      links: ["Terms & Conditions", "Privacy Policy", "Return & Refund", "BTRC Approved Tariff"]
    }
  ];

  const paymentLogos = [
    "https://i.ibb.co.com/RRJzQty/p1.png",
    "https://i.ibb.co.com/RT7PPcFd/p2.png",
    "https://i.ibb.co.com/d094mm7M/p3.png",
    "https://i.ibb.co.com/FqD7j0P0/p4.png",
    "https://i.ibb.co.com/rGdg9Lvc/p5.png",
    "https://i.ibb.co.com/q3JtsCL9/p6.png",
    "https://i.ibb.co.com/QjY6dtfz/p7.png",
    "https://i.ibb.co.com/k2gM79Rd/p8.png"
  ];

  return (
    <footer className="relative bg-[#070b14] pt-28 pb-12 overflow-hidden border-t border-orange-500/10 font-hind">
      
      {/* ১. ব্যাকগ্রাউন্ড ইমেজ ও ওভারলে */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <img 
          src="https://i.ibb.co.com/svKg52mn/photo-2026-01-04-21-48-05.jpg" 
          alt="Footer BG" 
          className="w-full h-full object-cover opacity-30 brightness-110 contrast-125" 
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#070b14]/95 via-[#070b14]/80 to-[#070b14]"></div>
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[60%] h-1 bg-orange-600/30 blur-2xl"></div>
      </div>

      <div className="container mx-auto px-6 lg:px-20 relative z-10">
        
        {/* ২. টপ সেকশন: লোগো ও নিউজলেটার */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 mb-20">
          
          <div className="lg:col-span-5">
            {/* লোগো - এখানে ইমেজ লোগো সেট করা হয়েছে */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="mb-8"
            >
              <Link href="/" className="inline-block transition-transform duration-300 hover:scale-105">
                <div className="relative h-14 w-52 md:h-16 md:w-64">
                   <Image 
                     src="/Navlogo/logo (2).png" 
                     alt="Cyberlink Logo"
                     fill
                     className="object-contain"
                   />
                </div>
              </Link>
            </motion.div>
            
            <p className="text-gray-300 text-lg leading-relaxed mb-10 max-w-md font-medium">
              আমরা দিচ্ছি বাংলাদেশের অন্যতম দ্রুতগতির ব্রডব্যান্ড ইন্টারনেট এবং নেটওয়ার্ক সলিউশন। 
              আপনার ডিজিটাল জীবনকে করুন আরও সহজ ও গতিময়।
            </p>
            
            {/* সোশ্যাল আইকনস */}
            <div className="flex space-x-4">
              {[
                { icon: <Facebook size={20} fill="currentColor" />, color: "hover:bg-blue-600" },
                { icon: <Youtube size={20} fill="currentColor" />, color: "hover:bg-red-600" },
                { icon: <Instagram size={20} />, color: "hover:bg-pink-600" },
                { icon: <Linkedin size={20} fill="currentColor" />, color: "hover:bg-blue-700" },
              ].map((social, index) => (
                <motion.a
                  key={index}
                  href="#"
                  whileHover={{ y: -8, scale: 1.1 }}
                  className={`w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-white transition-all duration-300 backdrop-blur-md shadow-xl ${social.color}`}
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </div>

          {/* নিউজলেটার কার্ড */}
          <div className="lg:col-span-7">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="bg-white/5 border border-white/10 rounded-[3.5rem] p-10 lg:p-14 backdrop-blur-2xl shadow-2xl relative overflow-hidden group"
            >
              <div className="absolute -top-20 -right-20 w-64 h-64 bg-orange-600/10 blur-[100px] rounded-full group-hover:bg-orange-600/20 transition-all duration-1000"></div>
              
              <h3 className="text-3xl lg:text-4xl font-black text-white mb-4 drop-shadow-md font-hind">
                নিউজলেটারে <span className="text-orange-500">সাবস্ক্রাইব</span> করুন
              </h3>
              <p className="text-gray-400 mb-10 text-lg">সর্বশেষ অফার এবং আপডেটগুলো সরাসরি আপনার ইনবক্সে পেতে ইমেইল দিন।</p>
              
              <form className="relative flex flex-col sm:flex-row gap-4">
                <input 
                  type="email" 
                  placeholder="আপনার ইমেইল এড্রেস..." 
                  className="flex-grow bg-white/10 border border-white/10 rounded-2xl py-5 px-8 text-white focus:ring-4 focus:ring-orange-500/20 focus:border-orange-500 transition-all outline-none text-lg placeholder:text-gray-500 font-medium font-hind"
                />
                <button className="bg-orange-600 hover:bg-orange-700 text-white px-10 py-5 rounded-2xl font-black transition-all active:scale-95 shadow-[0_10px_25px_-5px_rgba(234,88,12,0.4)] flex items-center justify-center gap-3 text-lg uppercase tracking-wider font-poppins">
                  <span>Send</span>
                  <Send size={22} />
                </button>
              </form>
            </motion.div>
          </div>
        </div>

        {/* ৩. মিডল সেকশন: স্টাইলিশ লিংক গ্রিড */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 mb-16 border-t border-white/5 pt-20">
          {footerColumns.map((column, idx) => (
            <div key={idx} className="space-y-8">
              <h4 className="text-orange-500 font-black text-[11px] tracking-[0.3em] uppercase font-poppins flex items-center gap-2">
                <span className="w-6 h-[1px] bg-orange-500/50"></span>
                {column.title}
              </h4>
              <ul className="space-y-5">
                {column.links.map((link, i) => (
                  <li key={i}>
                    <Link href="#" className="text-gray-300 hover:text-white transition-all duration-300 text-base font-bold flex items-center group font-hind">
                      <ChevronRight size={14} className="text-orange-600 mr-2 opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all" />
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* ৪. কন্টাক্ট ইনফো এবং পেমেন্ট সেকশন */}
        <div className="flex flex-col lg:flex-row justify-between items-center py-16 border-t border-white/5 gap-12">
          
          <div className="flex flex-wrap justify-center lg:justify-start gap-8">
            {[
              { icon: <Phone size={18} />, text: "+880 9638 121 121", label: "Helpline" },
              { icon: <Mail size={18} />, text: "info@dotinternetbd.com", label: "Email" },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-4 bg-white/5 p-4 pr-8 rounded-2xl border border-white/5 hover:border-orange-500/30 transition-all group cursor-pointer shadow-xl">
                <div className="p-3 rounded-xl bg-orange-600 text-white shadow-[0_0_15px_rgba(234,88,12,0.4)] group-hover:scale-110 transition-transform">
                  {item.icon}
                </div>
                <div>
                  <p className="text-[10px] text-gray-500 font-black uppercase tracking-widest leading-none mb-1 font-poppins">{item.label}</p>
                  <span className="text-base font-bold text-gray-200 font-poppins">{item.text}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="flex items-center gap-6 bg-white p-5 lg:p-6 rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.3)] flex-wrap justify-center max-w-full">
            <span className="text-gray-400 font-black text-[10px] uppercase tracking-widest mr-2 border-r border-gray-200 pr-6 hidden sm:block font-poppins">Pay Online</span>
            <div className="flex flex-wrap items-center justify-center gap-6 lg:gap-8">
              {paymentLogos.map((logo, index) => (
                <img 
                  key={index} 
                  src={logo} 
                  alt="payment partner" 
                  className="h-7 lg:h-9 w-auto object-contain hover:scale-125 transition-transform duration-300 cursor-pointer" 
                />
              ))}
            </div>
          </div>
        </div>

        {/* ৫. ফাইনাল কপিরাইট বক্স */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-white/5 backdrop-blur-3xl border border-white/10 rounded-[2.5rem] p-10 flex flex-col md:flex-row justify-between items-center gap-8 shadow-2xl relative overflow-hidden"
        >
          <div className="absolute top-0 left-[-100%] w-full h-full bg-gradient-to-r from-transparent via-white/5 to-transparent group-hover:left-[100%] transition-all duration-1000"></div>

          <div className="text-center md:text-left relative z-10">
            <p className="text-gray-200 text-sm lg:text-lg font-bold font-poppins">
              © {currentYear} <span className="text-orange-500 font-black italic tracking-tighter">CYBERLINK COMMUNICATION</span>. All Rights Reserved.
            </p>
            <p className="text-xs text-gray-500 mt-2 font-medium font-hind">
              Secured with <ShieldCheck size={12} className="inline text-green-500" /> 256-bit SSL Encryption | Developed by <span className="text-orange-500 font-bold hover:underline cursor-pointer">Optimus Technologies</span>
            </p>
          </div>
          
          <div className="flex gap-10 text-gray-400 text-[10px] font-black uppercase tracking-[0.4em] font-poppins relative z-10">
            <span className="hover:text-orange-500 cursor-pointer transition-colors">Stability</span>
            <span className="hover:text-orange-500 cursor-pointer transition-colors">Security</span>
            <span className="hover:text-orange-500 cursor-pointer transition-colors">Speed</span>
          </div>
        </motion.div>

      </div>
    </footer>
  );
};

export default Footer;