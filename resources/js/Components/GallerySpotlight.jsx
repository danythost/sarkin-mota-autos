import React, { useState, useRef, useEffect } from 'react';
import { Link } from '@inertiajs/react';

export default function GallerySpotlight({ gallery }) {
    const [isMuted, setIsMuted] = useState(true);
    const videoRef = useRef(null);

    useEffect(() => {
        if (videoRef.current) {
            videoRef.current.play().catch(error => {
                console.log("Autoplay prevented:", error);
            });
        }
    }, [gallery]);

    if (!gallery) return null;

    return (
        <div className="relative w-full h-[400px] md:h-[500px] overflow-hidden rounded-[2.5rem] shadow-2xl group border border-gray-100">
            {/* Background Video Layer */}
            <video
                ref={videoRef}
                src={gallery.video_url}
                className="absolute inset-0 w-full h-full object-cover scale-[1.01]"
                autoPlay
                loop
                muted={isMuted}
                playsInline
            />

            {/* Premium Overlay Gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-950/20 to-transparent"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-gray-950/40 via-transparent to-transparent"></div>

            {/* Content Overlay */}
            <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-16">
                <div className="max-w-3xl">
                    <div className="flex items-center space-x-3 mb-6 animate-fade-in">
                        <span className="px-4 py-1.5 bg-emerald-600 text-white text-[10px] font-black uppercase tracking-[0.2em] rounded-full shadow-lg shadow-emerald-900/40">
                            {gallery.category}
                        </span>
                        <span className="flex items-center text-emerald-400 text-xs font-bold uppercase tracking-widest">
                            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                            {gallery.location}
                        </span>
                    </div>

                    <h3 className="text-4xl md:text-6xl font-black text-white mb-6 leading-[1.1] italic tracking-tighter animate-slide-up">
                        {gallery.title}
                    </h3>

                    <p className="text-gray-300 text-lg md:text-xl font-medium mb-10 max-w-xl line-clamp-2 animate-slide-up animation-delay-100">
                        {gallery.description}
                    </p>

                    <div className="flex flex-wrap items-center gap-6 animate-slide-up animation-delay-200">
                        <Link
                            href={route('gallery.show', gallery.slug)}
                            className="inline-flex items-center px-10 py-5 bg-white text-gray-950 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-emerald-50 transition-all shadow-2xl"
                        >
                            Explore Highlights
                            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                        </Link>

                        <button
                            onClick={() => setIsMuted(!isMuted)}
                            className="p-5 bg-white/10 backdrop-blur-md border border-white/20 text-white rounded-2xl hover:bg-white/20 transition-all group/sound"
                        >
                            {isMuted ? (
                                <svg className="w-6 h-6 group-hover/sound:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" /></svg>
                            ) : (
                                <svg className="w-6 h-6 group-hover/sound:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" /></svg>
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {/* Premium Interactive Detail */}
            <div className="absolute top-8 right-8 w-1.5 h-1.5 bg-emerald-500 rounded-full animate-ping"></div>
        </div>
    );
}
