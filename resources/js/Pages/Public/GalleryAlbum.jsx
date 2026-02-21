import React, { useState, useCallback } from 'react';
import { Head, Link } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';

const categoryColors = {
    showroom: 'bg-blue-100 text-blue-700',
    event: 'bg-purple-100 text-purple-700',
    delivery: 'bg-green-100 text-green-700',
    sold: 'bg-amber-100 text-amber-700',
};

const categoryLabels = {
    showroom: 'Showroom',
    event: 'Event',
    delivery: 'Delivery',
    sold: 'Sold',
};

function Lightbox({ images, startIndex, onClose }) {
    const [current, setCurrent] = useState(startIndex);

    const prev = useCallback(() => setCurrent(c => (c - 1 + images.length) % images.length), [images.length]);
    const next = useCallback(() => setCurrent(c => (c + 1) % images.length), [images.length]);

    const handleKeyDown = useCallback((e) => {
        if (e.key === 'ArrowLeft') prev();
        if (e.key === 'ArrowRight') next();
        if (e.key === 'Escape') onClose();
    }, [prev, next, onClose]);

    React.useEffect(() => {
        document.addEventListener('keydown', handleKeyDown);
        document.body.style.overflow = 'hidden';
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
            document.body.style.overflow = '';
        };
    }, [handleKeyDown]);

    return (
        <div className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center" onClick={onClose}>
            {/* Close button */}
            <button
                onClick={onClose}
                className="absolute top-4 right-4 text-white/70 hover:text-white bg-white/10 hover:bg-white/20 rounded-full p-2 transition"
            >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
            </button>

            {/* Counter */}
            <div className="absolute top-4 left-1/2 -translate-x-1/2 text-white/60 text-sm">
                {current + 1} / {images.length}
            </div>

            {/* Prev */}
            <button
                onClick={(e) => { e.stopPropagation(); prev(); }}
                className="absolute left-4 text-white/70 hover:text-white bg-white/10 hover:bg-white/20 rounded-full p-3 transition"
            >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
            </button>

            {/* Image */}
            <div className="max-w-5xl max-h-[85vh] mx-16" onClick={e => e.stopPropagation()}>
                <img
                    src={images[current].url}
                    alt={`Photo ${current + 1}`}
                    className="max-w-full max-h-[85vh] object-contain rounded-lg shadow-2xl"
                />
            </div>

            {/* Next */}
            <button
                onClick={(e) => { e.stopPropagation(); next(); }}
                className="absolute right-4 text-white/70 hover:text-white bg-white/10 hover:bg-white/20 rounded-full p-3 transition"
            >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
            </button>

            {/* Thumbnail strip */}
            {images.length > 1 && (
                <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2 overflow-x-auto px-4">
                    {images.map((img, idx) => (
                        <button
                            key={img.id}
                            onClick={(e) => { e.stopPropagation(); setCurrent(idx); }}
                            className={`flex-shrink-0 w-12 h-9 rounded overflow-hidden border-2 transition ${current === idx ? 'border-emerald-400 opacity-100' : 'border-transparent opacity-50 hover:opacity-80'}`}
                        >
                            <img src={img.url} alt="" className="w-full h-full object-cover" />
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}

export default function GalleryAlbum({ gallery }) {
    const [lightboxIndex, setLightboxIndex] = useState(null);

    return (
        <AppLayout>
            <Head title={`${gallery.title} — Gallery`} />

            {/* Lightbox */}
            {lightboxIndex !== null && (
                <Lightbox
                    images={gallery.images}
                    startIndex={lightboxIndex}
                    onClose={() => setLightboxIndex(null)}
                />
            )}

            {/* Header */}
            <div className="bg-white border-b border-gray-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <Link href={route('gallery.index')} className="inline-flex items-center text-sm text-gray-400 hover:text-emerald-600 transition mb-4">
                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
                        Back to Gallery
                    </Link>

                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                        <div>
                            <div className="flex items-center gap-3 mb-2">
                                <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${categoryColors[gallery.category]}`}>
                                    {categoryLabels[gallery.category]}
                                </span>
                                {gallery.is_featured && (
                                    <span className="bg-yellow-100 text-yellow-700 text-xs font-bold px-2.5 py-1 rounded-full">⭐ Featured</span>
                                )}
                            </div>
                            <h1 className="text-3xl font-extrabold text-gray-900">{gallery.title}</h1>
                            <div className="flex flex-wrap gap-4 mt-2 text-sm text-gray-500">
                                {gallery.event_date && (
                                    <span className="flex items-center gap-1">
                                        <svg className="w-4 h-4 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                                        {new Date(gallery.event_date).toLocaleDateString('en-NG', { day: 'numeric', month: 'long', year: 'numeric' })}
                                    </span>
                                )}
                                {gallery.location && (
                                    <span className="flex items-center gap-1">
                                        <svg className="w-4 h-4 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                                        {gallery.location}
                                    </span>
                                )}
                                <span className="flex items-center gap-1">
                                    <svg className="w-4 h-4 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01" /></svg>
                                    {gallery.images.length} photo{gallery.images.length !== 1 ? 's' : ''}
                                </span>
                            </div>
                            {gallery.description && (
                                <p className="text-gray-600 mt-3 max-w-2xl">{gallery.description}</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Advert video */}
            {gallery.video_url && (
                <section className="py-8 bg-white border-b border-gray-100">
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                        <h2 className="text-lg font-semibold text-gray-800 mb-4">Advert video</h2>
                        <video
                            src={gallery.video_url}
                            controls
                            className="w-full rounded-xl shadow-lg"
                            playsInline
                        >
                            Your browser does not support the video tag.
                        </video>
                    </div>
                </section>
            )}

            {/* Image Grid */}
            <section className="py-10 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {gallery.images.length === 0 && !gallery.video_url ? (
                        <div className="text-center py-20">
                            <p className="text-gray-400">No images or video in this gallery yet.</p>
                        </div>
                    ) : gallery.images.length > 0 ? (
                        <div className="columns-2 sm:columns-3 lg:columns-4 gap-3 space-y-3">
                            {gallery.images.map((image, idx) => (
                                <div
                                    key={image.id}
                                    className="break-inside-avoid cursor-pointer group rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300"
                                    onClick={() => setLightboxIndex(idx)}
                                >
                                    <div className="relative overflow-hidden">
                                        <img
                                            src={image.url}
                                            alt={`${gallery.title} photo ${idx + 1}`}
                                            className="w-full object-cover group-hover:scale-105 transition-transform duration-500"
                                            loading="lazy"
                                        />
                                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center">
                                            <svg className="w-10 h-10 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 drop-shadow" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                                            </svg>
                                        </div>
                                        {image.is_cover && (
                                            <div className="absolute top-2 left-2 bg-emerald-600 text-white text-xs px-2 py-0.5 rounded-full font-bold">Cover</div>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : null}
                </div>
            </section>
        </AppLayout>
    );
}
