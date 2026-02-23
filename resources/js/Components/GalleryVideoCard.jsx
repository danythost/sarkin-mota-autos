import React, { useState } from 'react';
import { Link } from '@inertiajs/react';

export default function GalleryVideoCard({ gallery, videoSrc }) {
    // If we have a direct videoSrc, we use the "Cinematic Auto-play" mode
    const actualVideoSrc = videoSrc || gallery?.video_url || "https://video.wixstatic.com/video/11062b_1ed35c60e58e469595860dd3971e4793/1080p/mp4/file.mp4";
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div
            className="group relative bg-gray-950 rounded-3xl overflow-hidden shadow-2xl border border-white/5 transition-all duration-700"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div className="relative aspect-video lg:aspect-[21/9] overflow-hidden">
                <video
                    src={actualVideoSrc}
                    className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-700 scale-105 group-hover:scale-100"
                    autoPlay
                    muted
                    loop
                    playsInline
                />

                {/* Overlay Gradient (Cinematic) */}
                <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-950/20 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-700" />

                {/* Cinematic Label */}
                <div className="absolute bottom-8 left-8 right-8 flex justify-between items-end">
                    <div className="animate-reveal-up">
                        <span className="text-emerald-400 font-black text-[10px] uppercase tracking-[0.3em] mb-2 block">Premium Motion</span>
                        <h3 className="text-2xl md:text-3xl font-black text-white leading-tight">
                            Experience the<br /> Extraordinary
                        </h3>
                    </div>
                    <div className="hidden md:block">
                        <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                            <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
