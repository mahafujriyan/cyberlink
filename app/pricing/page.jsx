"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform, useMotionTemplate } from 'framer-motion';
import { Check, LayoutGrid, Briefcase, ChevronRight } from 'lucide-react';
import homeData from '../(home)/homeData.json'; 
import Link from 'next/link';

const InteractivePricingCard = ({ plan, index }) => {
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const rotateX = useTransform(mouseY, [-150, 150], [10, -10]);
    const rotateY = useTransform(mouseX, [-150, 150], [-10, 10]);

    // মাউস ফলোয়িং কালার (অরেঞ্জ/গোল্ডেন গ্লো - লাইট থিমের জন্য অ্যাডজাস্ট করা)
    const background = useMotionTemplate`
      radial-gradient(
        450px circle at ${mouseX}px ${mouseY}px,
        rgba(234, 88, 12, 0.15),
        transparent 80%
      )
    `;

    function handleMouseMove({ currentTarget, clientX, clientY }) {
        const { left, top } = currentTarget.getBoundingClientRect();
        mouseX.set(clientX - left);
        mouseY.set(clientY - top);
    }

    function handleMouseLeave() {
        mouseX.set(0);
        mouseY.set(0);
    }

    return (
        <motion.div
            style={{ 
                rotateX, 
                rotateY, 
                perspective: 1200,
                transformStyle: "preserve-3d" 
            }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
            // কার্ড এখন সাদা (White Glassmorphism)
            className=" my-4 group relative bg-white/80 backdrop-blur-xl border border-orange-200 rounded-[2.5rem] overflow-hidden shadow-[0_20px_50px_-12px_rgba(124,45,18,0.15)] transition-all duration-300 hover:border-orange-500/50"
        >
            <motion.div
                className="pointer-events-none absolute inset-0 z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ background }}
            />

            <div className="relative z-10 flex flex-col lg:flex-row items-center p-8 lg:p-10 gap-8 lg:gap-12" style={{ transform: "translateZ(50px)" }}>
                
                {/* বাম সাইড: নাম ও স্পিড */}
                <div className="w-full lg:w-1/4 text-center lg:text-left flex flex-col items-center lg:items-start" style={{ transform: "translateZ(80px)" }}>
                    <h3 className="text-2xl lg:text-3xl font-black mb-1 text-orange-950 font-poppins uppercase tracking-tighter">
                        {plan.name}
                    </h3>
                    <p className="text-orange-800/60 text-xs mb-6 font-hind font-bold uppercase tracking-widest">Start Your Journey</p>
                    
                    {/* স্পিড সার্কেল এখন ডার্ক অরেঞ্জ থিমে */}
                    <div className="relative w-32 h-32 flex flex-col items-center justify-center bg-orange-600 rounded-full border-4 border-white shadow-xl shadow-orange-600/20 group-hover:scale-110 transition-transform duration-500">
                        <span className="text-3xl font-black italic text-white leading-none">{plan.speed.split(' ')[0]}</span>
                        <span className="text-[10px] font-black text-orange-100 uppercase tracking-widest mt-1">{plan.speed.split(' ')[1]}</span>
                    </div>
                </div>

                {/* মাঝখানের সাইড: ফিচার লিস্ট */}
                <div className="w-full lg:w-2/4 grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 py-8 lg:py-0 border-y lg:border-y-0 lg:border-x border-orange-100 lg:px-10" style={{ transform: "translateZ(40px)" }}>
                    {plan.features?.map((feature, fIdx) => (
                        <div key={fIdx} className="flex items-center gap-3">
                            <div className="bg-orange-100 p-1 rounded-full">
                                <Check size={14} className="text-orange-600" strokeWidth={4} />
                            </div>
                            <span className="text-slate-700 text-sm font-bold">{feature}</span>
                        </div>
                    ))}
                </div>

                {/* ডান সাইড: মূল্য ও বাটন */}
                <div className="w-full lg:w-1/4 text-center lg:text-right" style={{ transform: "translateZ(60px)" }}>
                    <div className="mb-6">
                        <p className="text-orange-800/50 text-[10px] font-black uppercase tracking-widest mb-1 font-poppins">Monthly Charges</p>
                        <div className="flex items-end justify-center lg:justify-end gap-1">
                            <span className="text-3xl lg:text-5xl font-black text-orange-950">TK {plan.price}</span>
                            <span className="text-orange-600 text-sm font-black mb-1 font-poppins">/Mo</span>
                        </div>
                    </div>
                <Link href={`/connection?package=${encodeURIComponent(plan.speed)}`}>
                        <button className="w-full lg:w-full bg-orange-600 hover:bg-black text-white font-black px-8 py-4 rounded-2xl transition-all shadow-lg shadow-orange-600/30 flex items-center justify-center gap-2 active:scale-95 uppercase tracking-widest text-xs">
                            <span>Get Started</span>
                            <ChevronRight size={18} />
                        </button>
                    </Link>
                </div>
            </div>
        </motion.div>
    );
};

export default function PricingPage() {
    const [activeTab, setActiveTab] = useState('regular');

    const currentPlans = activeTab === 'regular' 
        ? (homeData?.regularPlans || []) 
        : (homeData?.smePlans || []);

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#BFFF00] via-[#414b41] to-[#2bd22b] text-slate-800 font-hind pb-24">
            
            {/* হেডার সেকশন - অরেঞ্জ গ্রাডিয়েন্ট ওভারলে */}
            <section className="relative h-[300px] lg:h-[400px] flex items-center justify-center overflow-hidden">
                <video 
                    src="https://github.com/mdabdullahm/video/raw/refs/heads/main/hero2.mp4" 
                    autoPlay muted loop playsInline 
                    className="absolute inset-0 w-full h-full object-cover opacity-20 brightness-110"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-orange-200/80 via-orange-100/40 to-orange-100"></div>
                <div className="relative z-10 text-center px-6 max-w-4xl">
                    <motion.h1 
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-4xl lg:text-7xl font-black italic text-orange-950 font-poppins mb-4 uppercase tracking-tighter"
                    >
                        Pricing Plans
                    </motion.h1>
                    <p className="text-orange-900/70 text-lg lg:text-xl font-bold max-w-2xl mx-auto">
                        আপনার বাজেট ও প্রয়োজন অনুযায়ী সেরা এবং সাশ্রয়ী ইন্টারনেট প্যাকেজটি বেছে নিন।
                    </p>
                </div>
            </section>

            <div className="container mx-auto px-4 lg:px-10 relative z-20">
                
                {/* ট্যাব সুইচ - লাইট থিম */}
                <div className="flex justify-center -mt-10 mb-16">
                    <div className="bg-white/80 backdrop-blur-md p-2 rounded-2xl border border-orange-200 flex gap-2 shadow-xl">
                        <button 
                            onClick={() => setActiveTab('regular')}
                            className={`flex items-center gap-2 px-8 py-3 rounded-xl font-black transition-all duration-300 uppercase tracking-widest text-xs ${activeTab === 'regular' ? 'bg-orange-600 text-white shadow-lg shadow-orange-600/30' : 'hover:bg-orange-50 text-orange-400'}`}
                        >
                            <LayoutGrid size={16} /> Regular
                        </button>
                        <button 
                            onClick={() => setActiveTab('sme')}
                            className={`flex items-center gap-2 px-8 py-3 rounded-xl font-black transition-all duration-300 uppercase tracking-widest text-xs ${activeTab === 'sme' ? 'bg-orange-600 text-white shadow-lg shadow-orange-600/30' : 'hover:bg-orange-50 text-orange-400'}`}
                        >
                            <Briefcase size={16} /> SME Plans
                        </button>
                    </div>
                </div>

                {/* কার্ড লিস্ট */}
                <div className="max-w-6xl mx-auto space-y-8">
                    <AnimatePresence mode='wait'>
                        <motion.div
                            key={activeTab}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="space-y-8"
                        >
                            {currentPlans.map((plan, index) => (
                                <InteractivePricingCard key={plan.id} plan={plan} index={index} />
                            ))}
                        </motion.div>
                    </AnimatePresence>
                </div>

            </div>
        </div>
    );
}