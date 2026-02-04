"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Lottie from "lottie-react";
import { motion, useMotionValue, useTransform } from 'framer-motion';
import homeData from "./homeData.json";
// Swiper ইমপোর্ট
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade } from 'swiper/modules';

// Swiper CSS
import 'swiper/css';
import 'swiper/css/effect-fade';


// আইকনসমূহ
import {
    Check, Facebook, Home, Shield, Briefcase, Server,
    UploadCloud, Settings, Database, Globe, MapPin, Search, Map, ChevronDown
} from 'lucide-react';

import ServicesPage from '../services/page';


// --- লটি হেল্পার কম্পোনেন্ট ---
const LottieComponent = ({ url }) => {
    const [animationData, setAnimationData] = useState(null);
    useEffect(() => {
        if (url && url.endsWith('.json')) {
            fetch(url).then(res => res.json()).then(data => setAnimationData(data))
                .catch(err => console.error("Lottie error:", err));
        }
    }, [url]);
    if (!animationData) return <div className="w-12 h-12 border-2 border-orange-500/20 border-t-orange-500 rounded-full animate-spin"></div>;
    return <Lottie animationData={animationData} loop={true} className="w-full h-full object-contain" />;
};

// আইকন ম্যাপার
const getIcon = (iconName) => {
    const icons = {
        home: <Home size={30} />, shield: <Shield size={30} />,
        briefcase: <Briefcase size={30} />, server: <Server size={30} />,
        network: <UploadCloud size={30} />, settings: <Settings size={30} />,
        database: <Database size={30} />, globe: <Globe size={30} />,
    };
    return icons[iconName] || <Globe size={30} />;
};

export default function HomePage() {
 
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const rotateX = useTransform(y, [-100, 100], [10, -10]);
    const rotateY = useTransform(x, [-100, 100], [-10, 10]);

    function handleMouseMove(event) {
        const rect = event.currentTarget.getBoundingClientRect();
        x.set(event.clientX - (rect.left + rect.width / 2));
        y.set(event.clientY - (rect.top + rect.height / 2));
    }
    function handleMouseLeave() { x.set(0); y.set(0); }

    // সেকশন ডিভাইডার বর্ডার
    const SectionBorder = () => (
        <div className="w-full flex justify-center py-10">
            <div className="w-[80%] h-px bg-linear-to-r from-transparent via-orange-300 to-transparent opacity-50"></div>
        </div>
    );

    return (
        <div className="min-h-screen 

bg-[linear-gradient(135deg,#000f08_0%,#214211_30%)] 
font-hind  
selection:text-white
animate-[gradientMove_18s_ease_infinite]
font-hind 
selection:bg-orange-500 
">
           {/* ১. Hero Section (Fully Responsive Slider) */}
            <section className="relative w-full h-[100vh] lg:h-[600px] overflow-hidden">
                <Swiper
                    modules={[Autoplay, EffectFade]}
                    effect={"fade"}
                    fadeEffect={{ crossFade: true }}
                    autoplay={{ delay: 5000, disableOnInteraction: false }}
                    className="w-full h-full"
                >
                    {homeData.heroSlides.map((slide) => (
                        <SwiperSlide key={slide.id}>
                            <div className="relative w-full h-full overflow-hidden">
                                {/* ব্যাকগ্রাউন্ড মিডিয়া */}
                                <div className="absolute inset-0">
                                    {slide.bgImage && (slide.bgImage.endsWith('.mp4') || slide.bgImage.includes('video')) ? (
                                        <video src={slide.bgImage} autoPlay muted loop playsInline className="w-full h-full object-cover scale-110" />
                                    ) : (
                                        <div className="w-full h-full bg-cover bg-center scale-110" style={{ backgroundImage: `url(${slide.bgImage})` }} />
                                    )}
                                    <div className="absolute inset-0 bg-gradient-to-r from-gray-950/90 via-black-950/40 to-orange-100/30 lg:from-gray-950/80 lg:to-gray-100/50"></div>
                                </div>

                                {/* কন্টেন্ট এরিয়া */}
                                <div className="relative z-20 container mx-auto px-4 lg:px-10 h-full flex items-center justify-center pt-10 lg:pt-0">
                                    
                                    {/* টাইপ: প্যাকেজ */}
                                    {slide.type === 'packages' && (
                                         <div className="flex flex-col lg:flex-row items-center w-full gap-8 lg:gap-10">
                                            <div className="w-full lg:w-3/5 text-center lg:text-left text-white order-2 lg:order-1">
                                                <h1 className="text-3xl sm:text-5xl lg:text-7xl font-black mb-3 italic leading-tight font-poppins drop-shadow-2xl">{slide.title}</h1>
                                                <p className="text-sm sm:text-lg lg:text-xl mb-6 lg:mb-10 text-orange-50 opacity-90 max-w-xl mx-auto lg:mx-0 font-hind">{slide.subtitle}</p>
                                                <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-2 lg:gap-3">
                                                    {slide.items?.map((item, i) => (
                                                        <div key={i} className="bg-white/10 backdrop-blur-md p-3 lg:p-4 rounded-xl lg:rounded-2xl border border-white/20 text-center hover:bg-orange-600 transition-all cursor-pointer shadow-lg font-poppins">
                                                            <div className="text-lg lg:text-xl font-black italic">{item.label}</div>
                                                            <div className="text-[10px] font-bold opacity-80 mt-0.5 uppercase">{item.price}</div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        
                                        </div>
                                            
                                       
                                    )}

                                    {/* টাইপ: গেম লোগো */}
                                    {slide.type === 'games' && (
                                        <div className="w-full text-center text-white px-2">
                                          
                                    <   Image src='/banner/spark it web banner 03.png' alt="Game Logo" width={1600} height={1600} className="mx-auto mb-6 object-contain" />
                                        </div>
                                    )}

                                    {/* টাইপ: IPv6 */}
                                    {slide.type === 'ipv6' && (
                                        <div className="flex flex-col lg:flex-row items-center w-full gap-8 lg:gap-10">
                                          <   Image src='/banner/spark it web banner 02.png' alt="Game Logo" width={1600} height={1600} className="mx-auto mb-6 object-contain" />
                                           
                                        </div>
                                    )}
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </section>
            {/* 2. Solutions Section */}
            <section className="py-5 lg:py-10 px-4 lg:px-10">
                <SectionBorder />
                <div className="container mx-auto text-center">
                  
                    <div>
                        <ServicesPage></ServicesPage>
                    </div>
                </div>
            </section>
            {/* ৩. Coverage Section (3D) */}
            <section className="py-5 lg:py-10 px-4 lg:px-10">
                <SectionBorder />
                <div className="container mx-auto">
                    <motion.div
                        style={{ rotateX, rotateY, perspective: 1200 }} onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}
                        className="relative flex flex-col lg:flex-row overflow-hidden rounded-[3rem] shadow-2xl border border-orange-200 cursor-pointer group bg-white"
                    >
                        <div className="w-full lg:w-1/2 bg-gradient-to-br from-[#1b5e3a] to-[#0f331f] p-10 lg:p-16 text-white">
                            <h3 className="text-xl font-bold mb-1 text-green-300 uppercase tracking-widest">Network</h3>
                            <h2 className="text-3xl lg:text-5xl font-black mb-6 tracking-tighter uppercase font-poppins">{homeData.coverageBanner.overlayText}</h2>
                            <p className="text-gray-100 mb-10 opacity-80 max-w-sm leading-relaxed">{homeData.coverageBanner.description}</p>
                            <button className="bg-white text-[#1b5e3a] hover:bg-green-50 px-10 py-4 rounded-2xl font-black transition-all shadow-xl active:scale-95">See Map</button>
                        </div>
                        <div className="w-full lg:w-1/2 relative min-h-[300px] overflow-hidden">
                            <video src={homeData.coverageBanner.bgImage} autoPlay muted loop playsInline className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:scale-110 transition-transform duration-700" />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#0f331f] via-transparent to-transparent opacity-60"></div>
                        </div>
                    </motion.div>
                </div>
            </section>
            {/* ৪. Feature Cards */}
            <section className="py-5 lg:py-10 px-4 lg:px-10">
                <SectionBorder />
                <div className="container mx-auto">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {homeData.featureCards?.map((card, index) => (
                            <motion.div key={card.id} whileInView={{ opacity: 1, y: 0 }} initial={{ opacity: 0, y: 30 }} viewport={{ once: true }} whileHover={{ y: -10 }} className="bg-white rounded-[2.5rem] overflow-hidden shadow-xl flex flex-col group border border-orange-200/50">
                                <div className={`relative h-52 w-full ${card.bgColor} flex items-center justify-center p-6`}>
                                    {card.videoUrl?.endsWith('.json') ? <LottieComponent url={card.videoUrl} /> : <video src={card.videoUrl} autoPlay muted loop playsInline className="w-full h-full object-contain mix-blend-multiply" />}
                                </div>
                                <div className="py-8 px-4 text-center">
                                    <h3 className="text-xl lg:text-2xl font-black text-slate-800 font-poppins">{card.title}</h3>
                                    <div className="mt-3 w-10 h-1 bg-orange-500 mx-auto rounded-full scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>
            {/* 5. Pricing Section */}
            <section className="py-5 lg:py-10 px-4 lg:px-10">
                <SectionBorder />
                <div className="container mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl lg:text-6xl font-black text-white mb-4 font-poppins tracking-tighter uppercase">Pricing <span className="text-orange-600">Plans</span></h2>
                        <div className="w-20 h-1.5 bg-orange-600 mx-auto rounded-full mb-6 shadow-lg shadow-orange-500/20"></div>
                    </div>
                    <div className="space-y-6 max-w-6xl mx-auto">
                        {homeData.regularPlans?.map((plan) => (
                            <motion.div key={plan.id} whileInView={{ opacity: 1, x: 0 }} initial={{ opacity: 0, x: -20 }} viewport={{ once: true }} className="bg-white border border-orange-200 rounded-[2.5rem] p-8 lg:p-10 flex flex-col lg:flex-row items-center justify-between group hover:border-orange-500 transition-all duration-300 shadow-xl">
                                <div className="w-full lg:w-1/4 text-center lg:text-left flex flex-col items-center lg:items-start">
                                    <h3 className="text-2xl font-black text-slate-900 mb-1 font-poppins uppercase tracking-tighter">{plan.name}</h3>
                                    <p className="text-orange-800/60 text-[10px] font-black uppercase tracking-widest mb-6">Digital Journey Start</p>
                                    <div className="bg-orange-600 text-white px-10 py-3 rounded-full text-xl font-black italic shadow-lg shadow-orange-600/30">{plan.speed}</div>
                                </div>
                                <div className="w-full lg:w-2/4 grid grid-cols-1 md:grid-cols-2 gap-4 py-8 lg:py-0 border-y lg:border-y-0 lg:border-x border-orange-100 lg:px-12">
                                    {plan.features.map((feature, idx) => (
                                        <div key={idx} className="flex items-center gap-3 text-sm font-bold text-slate-700">
                                            <div className="bg-orange-100 p-1 rounded-full text-orange-600"><Check size={14} strokeWidth={4} /></div>
                                            {feature}
                                        </div>
                                    ))}
                                </div>
                                <div className="w-full lg:w-1/4 text-center lg:text-right">
                                    <div className="mb-6"><span className="text-4xl lg:text-5xl font-black text-slate-900">TK {plan.price}</span><span className="text-orange-600 text-xs font-black uppercase ml-1">/Mo</span></div>
                                    <button className="bg-orange-600 hover:bg-orange-700 text-white font-black px-10 py-3.5 rounded-xl transition-all shadow-lg active:scale-95 whitespace-nowrap font-poppins text-xs">Buy Now</button>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}