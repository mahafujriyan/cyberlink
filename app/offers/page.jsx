"use client";
import React from 'react';
import { motion } from 'framer-motion';
import offersData from './offersData.json';

export default function OffersPage() {
    return (
        <div className="min-h-screen 

bg-[linear-gradient(135deg,#000f08_0%,#214211_30%)] 
font-hind  
selection:text-white
animate-[gradientMove_18s_ease_infinite]
font-hind 
selection:bg-orange-500  pb-24">

            {/* ১. প্রিমিয়াম হেডার সেকশন - বড় ডিভাইসে লেখা উপরে তোলার জন্য আপডেট করা হয়েছে */}
            <section className="relative min-h-[450px] lg:min-h-[700px] flex items-center overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <img
                        src={offersData.header.bgImage}
                        alt="Offers Background"
                        className="w-full h-full object-cover opacity-60"
                    />
                    {/* ওভারলে লেয়ার */}
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-900 via-blue-900/80 to-transparent"></div>
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#0e270e]/95"></div>
                </div>

                {/* lg:pb-64 ব্যবহারের ফলে বড় স্ক্রিনে লেখাগুলো উপরে উঠে যাবে */}
                <div className="container mx-auto px-4 sm:px-6 lg:px-20 relative z-10 pt-20 pb-32 lg:pb-64">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        className="max-w-3xl"
                    >
                        <h1 className="text-3xl sm:text-5xl lg:text-8xl font-black mb-4 text-white font-poppins tracking-tighter uppercase drop-shadow-2xl leading-tight">
                            {offersData.header.title}
                        </h1>
                        <p className="text-orange-50 text-sm sm:text-lg lg:text-xl leading-relaxed font-medium opacity-90 drop-shadow-md max-w-2xl">
                            {offersData.header.description}
                        </p>
                    </motion.div>
                </div>
            </section>
            {/* ২. অফার কার্ড গ্রিড - মোবাইলে মার্জিন এবং গ্যাপ ঠিক করা হয়েছে */}
            <div className="container mx-auto px-4 sm:px-6 lg:px-10 -mt-16 sm:-mt-20 lg:-mt-24 relative z-20">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                    {offersData.offers.map((offer, index) => (
                        <motion.div
                            key={offer.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            viewport={{ once: true }}
                            whileHover={{ y: -10 }}
                            className="bg-white border border-orange-200 rounded-[2rem] lg:rounded-[2.5rem] overflow-hidden shadow-[0_15px_40px_rgba(0,0,0,0.2)] flex flex-col group h-full"
                        >
                            {/* ইমেজ এরিয়া - মোবাইলে হাইট অ্যাডজাস্ট */}
                            <div className="relative h-48 sm:h-56 lg:h-64 w-full overflow-hidden">
                                <img
                                    src={offer.image}
                                    alt={offer.title}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                            </div>

                            {/* কন্টেন্ট এরিয়া - প্যাডিং মোবাইলে কমানো হয়েছে */}
                            <div className="p-6 sm:p-8 flex flex-col flex-grow">
                                <h3 className="text-xl sm:text-2xl font-black text-slate-900 mb-3 group-hover:text-orange-600 transition-colors font-hind leading-tight uppercase tracking-tight">
                                    {offer.title}
                                </h3>

                                <div className="w-12 h-1 bg-orange-500 mb-4 group-hover:w-full transition-all duration-700 rounded-full"></div>

                                <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-6 flex-grow line-clamp-3 font-hind font-medium">
                                    {offer.description}
                                </p>

                                <div className="mt-auto">
                                    <a
                                        href={offer.link}
                                        className="bg-orange-50 text-orange-600 hover:bg-orange-600 hover:text-white px-5 sm:px-6 py-3 rounded-xl sm:rounded-2xl font-black text-sm sm:text-base flex items-center justify-center gap-2 group/btn transition-all duration-300 shadow-sm"
                                    >
                                        <span className="uppercase tracking-wider text-xs font-poppins">Learn More</span>
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="18"
                                            height="18"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="3"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            className="transition-transform group-hover/btn:translate-x-1"
                                        >
                                            <path d="m9 18 6-6-6-6" />
                                        </svg>
                                    </a>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
}