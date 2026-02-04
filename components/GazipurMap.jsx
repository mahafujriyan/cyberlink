"use client";
import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// এখানে আপনি সহজেই নতুন এরিয়া যোগ বা এডিট করতে পারবেন
const coverageAreas = [
    { id: 1, name: "গাজীপুর চৌরাস্তা", position: [23.9999, 90.4203], status: "সক্রিয়" },
    { id: 2, name: "জয়দেবপুর", position: [24.0021, 90.4255], status: "সক্রিয়" },
    { id: 3, name: "বোর্ড বাজার", position: [23.9481, 90.3800], status: "সক্রিয়" },
    { id: 4, name: "টঙ্গী", position: [23.8817, 90.4008], status: "সক্রিয়" },
];

export default function GazipurMap() {
    // কাস্টম আইকন সেটিংস
    const customIcon = typeof window !== 'undefined' ? new L.Icon({
        iconUrl: 'https://cdn-icons-png.flaticon.com/512/2776/2776067.png',
        iconSize: [35, 35],
        iconAnchor: [17, 35],
    }) : null;

    return (
        <div className="w-full h-full min-h-[400px] relative">
            <MapContainer 
                center={[23.95, 90.41]} 
                zoom={11} 
                className="w-full h-full z-0"
                scrollWheelZoom={false}
            >
                {/* Joss Dark Mode Tile */}
                <TileLayer
                    url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
                />

                {coverageAreas.map((area) => (
                    <Marker key={area.id} position={area.position} icon={customIcon}>
                        <Popup>
                            <div className="font-hind">
                                <b className="text-orange-600">{area.name}</b> <br />
                                স্ট্যাটাস: {area.status}
                            </div>
                        </Popup>
                    </Marker>
                ))}
            </MapContainer>
            
            {/* ম্যাপের ওপর ছোট একটি ইন্ডিকেটর */}
            <div className="absolute top-4 left-4 z-[1000] bg-black/50 backdrop-blur-md p-2 rounded-lg border border-white/20">
                <p className="text-[10px] text-green-400 font-bold animate-pulse">● LIVE NETWORK</p>
            </div>
        </div>
    );
}