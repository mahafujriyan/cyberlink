"use client";
import React from 'react';
import { motion } from 'framer-motion';
import usePublicContent from '@/lib/usePublicContent';

export default function AboutPage() {
    const { data: aboutData, loading } = usePublicContent("about", {
        aboutHeader: {},
        mainDescription: "",
        missionVision: [],
        partners: [],
    });

    if (loading) {
        return <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center">Loading...</div>;
    }

    return (
        <div className="min-h-screen my-4

bg-[linear-gradient(135deg,#000f08_0%,#214211_30%)] 
font-hind  
selection:text-white
animate-[gradientMove_18s_ease_infinite]
font-hind 
selection:bg-orange-500">

            {/* ১. গর্জিয়াস হেডার সেকশন - অরেঞ্জ থিমের সাথে মেলানো */}
            <section className="relative h-[400px] lg:h-[500px] flex items-center justify-center overflow-hidden">
                <video
                    src={aboutData.aboutHeader.bgVideo}
                    autoPlay muted loop playsInline
                    className="absolute inset-0 w-full h-full object-cover opacity-40 brightness-110"
                />
                {/* অরেঞ্জ ওভারলে যা ভিডিওর সাথে মিশে যাবে */}
                <div className="absolute inset-0 bg-gradient-to-r from-orange-900/60 via-transparent to-orange-100"></div>
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#4DE353]"></div>

                <div className="relative z-10 text-center px-6">
                    <motion.h1
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-5xl lg:text-8xl font-black italic tracking-tighter text-white drop-shadow-[0_10px_20px_rgba(0,0,0,0.5)] font-poppins uppercase"
                    >
                        {aboutData.aboutHeader.title}
                    </motion.h1>
                    <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: "120px" }}
                        className="h-2 bg-orange-600 mx-auto mt-4 rounded-full shadow-[0_0_20px_rgba(234,88,12,0.6)]"
                    ></motion.div>
                </div>
            </section>

            <div className="container mx-auto px-6 lg:px-20 -mt-20 relative z-20">

                {/* ২. মেইন বর্ণনা কার্ড - হোয়াইট থিম */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="bg-white/90 backdrop-blur-xl border border-orange-200 p-8 lg:p-16 rounded-[3rem] shadow-[0_20px_50px_rgba(124,45,18,0.15)] mb-16"
                >
                    <p className="text-slate-700 text-lg lg:text-2xl leading-relaxed text-center max-w-5xl mx-auto font-medium">
                        {aboutData.mainDescription}
                    </p>

                    <div className="mt-12 flex justify-center">
                        <div className="bg-orange-600 text-white px-8 py-3 rounded-full font-black text-sm lg:text-lg tracking-widest font-poppins shadow-lg shadow-orange-600/30 uppercase italic">
                            {aboutData.aboutHeader.license}
                        </div>
                    </div>
                </motion.div>

                {/* ৩. মিশন ও ভিশন কার্ডস - ক্লিন ডিজাইন */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-24">
                    {aboutData.missionVision.map((item, i) => (
                        <motion.div
                            key={i}
                            whileHover={{ y: -10 }}
                            className="bg-white border border-orange-100 p-12 rounded-[2.5rem] shadow-xl group hover:border-orange-500 transition-all duration-500 relative overflow-hidden"
                        >
                            {/* হালকা ডেকোরেশন */}
                            <div className="absolute -top-10 -right-10 w-32 h-32 bg-orange-100 rounded-full opacity-50 group-hover:scale-150 transition-transform"></div>
                            
                            <h3 className="text-3xl lg:text-4xl font-black text-orange-600 mb-6 font-poppins italic uppercase tracking-tighter">
                                {item.type}
                            </h3>
                            <p className="text-slate-600 text-lg lg:text-xl leading-relaxed font-bold relative z-10">
                                {item.desc}
                            </p>
                        </motion.div>
                    ))}
                </div>

                {/* ৪. পার্টনার ও মেম্বারস সেকশন - ক্লিয়ার লোগো স্টাইল */}
                <div className="text-center">
                    <h2 className="text-4xl lg:text-6xl font-black mb-4 font-poppins text-white tracking-tight">
                        Partners & <span className="text-orange-600">Members</span>
                    </h2>
                    <div className="w-24 h-1.5 bg-orange-600 mx-auto mb-16 rounded-full"></div>
                    
                    {/* লোগো গ্রিড */}
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 lg:gap-8">
                        {aboutData.partners.map((partner, i) => (
                            <motion.div
                                key={i}
                                whileHover={{ scale: 1.05, y: -5 }}
                                className="relative group"
                            >
                                {/* লোগোর পেছনের গ্লো */}
                                <div className="absolute inset-0 bg-orange-500/10 blur-[20px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                                {/* লোগো বক্স (Pure White Tile) */}
                                <div className="relative z-10 bg-white border border-orange-100 p-8 h-32 lg:h-40 rounded-[2.5rem] flex items-center justify-center shadow-lg transition-all duration-300 group-hover:shadow-2xl group-hover:border-orange-400">

                                    <img
                                        src={partner.logo}
                                        alt={partner.name}
                                        className="h-10 lg:h-14 w-auto object-contain transition-all duration-500"
                                    />
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>

            </div>
        </div>
    );
}
