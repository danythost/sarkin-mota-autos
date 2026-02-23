import React, { useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';

const TABS = [
    { key: 'all', label: 'All' },
    { key: 'showroom', label: 'Showroom' },
    { key: 'event', label: 'Events' },
    { key: 'delivery', label: 'Deliveries' },
    { key: 'sold', label: 'Recently Sold' },
];

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

function GalleryCard({ gallery }) {
    const cover = gallery.cover_image;

    return (
        <Link href={route('gallery.show', gallery.slug)} className="group block bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300">
            <div className="relative overflow-hidden h-52">
                {cover ? (
                    <img
                        src={cover.url}
                        alt={gallery.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                ) : (
                    <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                        <svg className="w-10 h-10 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01" />
                        </svg>
                    </div>
                )}
                {/* Category badge */}
                <div className="absolute top-3 left-3">
                    <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${categoryColors[gallery.category]}`}>
                        {categoryLabels[gallery.category]}
                    </span>
                </div>
                {/* Image count overlay */}
                {gallery.images_count > 0 && (
                    <div className="absolute bottom-3 right-3 bg-black/60 text-white text-xs px-2 py-0.5 rounded-full font-medium">
                        {gallery.images_count} photo{gallery.images_count !== 1 ? 's' : ''}
                    </div>
                )}
                {gallery.is_featured && (
                    <div className="absolute top-3 right-3">
                        <span className="bg-yellow-400 text-yellow-900 text-xs font-bold px-2 py-0.5 rounded-full">⭐ Featured</span>
                    </div>
                )}
            </div>
            <div className="p-5">
                <h3 className="font-bold text-gray-900 group-hover:text-emerald-600 transition">{gallery.title}</h3>
                {gallery.event_date && (
                    <p className="text-xs text-gray-400 mt-1">📅 {new Date(gallery.event_date).toLocaleDateString('en-NG', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
                )}
                {gallery.location && (
                    <p className="text-xs text-gray-400 mt-0.5">📍 {gallery.location}</p>
                )}
                {gallery.description && (
                    <p className="text-xs text-gray-500 mt-2 line-clamp-2">{gallery.description}</p>
                )}
            </div>
        </Link>
    );
}

export default function Gallery({ galleries, featured }) {
    const [activeTab, setActiveTab] = useState('all');

    const filtered = activeTab === 'all'
        ? galleries
        : galleries.filter(g => g.category === activeTab);

    const featuredEvents = featured.filter(g => g.category === 'event');

    return (
        <AppLayout>
            <Head title="Gallery — Sarkin Moto Autos" />

            {/* Hero */}
            <div className="relative bg-gray-900 text-white overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-900/80 to-gray-900/90" />
                <div
                    className="absolute inset-0 bg-cover bg-center opacity-30"
                    style={{ backgroundImage: "url('https://images.unsplash.com/photo-1568992687947-868a62a9f521?auto=format&fit=crop&w=1950&q=80')" }}
                />
                <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
                    <span className="inline-block bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-5">
                        Our Gallery
                    </span>
                    <h1 className="text-4xl md:text-5xl font-extrabold mb-4">Moments, Memories &amp; Milestones</h1>
                    <p className="text-gray-300 text-lg max-w-2xl mx-auto">
                        Explore our showroom, customer delivery moments, special events, and recently sold vehicles.
                    </p>
                </div>
            </div>

            {/* Featured Events Spotlight */}
            {featuredEvents.length > 0 && (
                <section className="py-16 bg-white">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex items-center justify-between mb-10">
                            <div>
                                <span className="text-emerald-600 font-bold uppercase tracking-wider text-xs">Spotlight</span>
                                <h2 className="text-3xl font-extrabold text-gray-900 mt-1">Our Events &amp; Launches</h2>
                                <p className="text-gray-500 text-sm mt-1">We actively engage our customers through exclusive launches, promotional events, and automotive showcases.</p>
                            </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {featuredEvents.map((event, idx) => (
                                <Link key={event.id} href={route('gallery.show', event.slug)} className="group block bg-gradient-to-br from-gray-900 to-emerald-950 rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 animate-reveal-up" style={{ animationDelay: `${idx * 150}ms` }}>
                                    {event.cover_image && (
                                        <div className="h-48 overflow-hidden">
                                            <img src={event.cover_image.url} alt={event.title} className="w-full h-full object-cover opacity-70 group-hover:opacity-90 group-hover:scale-110 transition-all duration-700" />
                                        </div>
                                    )}
                                    <div className="p-6 text-white">
                                        <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">Event</span>
                                        <h3 className="text-lg font-extrabold mt-1 group-hover:text-emerald-300 transition">{event.title}</h3>
                                        <div className="flex gap-4 mt-3 text-emerald-200 text-xs">
                                            {event.event_date && <span>📅 {new Date(event.event_date).toLocaleDateString('en-NG', { day: 'numeric', month: 'short', year: 'numeric' })}</span>}
                                            {event.location && <span>📍 {event.location}</span>}
                                        </div>
                                        {event.description && <p className="text-gray-300 text-xs mt-3 line-clamp-2">{event.description}</p>}
                                        <div className="mt-4 inline-flex items-center text-emerald-400 text-xs font-bold group-hover:gap-1.5 gap-1 transition-all">
                                            View Album <span>→</span>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* Gallery Grid with Tabs */}
            <section className="py-16 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Tabs */}
                    <div className="flex flex-wrap gap-2 mb-10">
                        {TABS.map(tab => (
                            <button
                                key={tab.key}
                                onClick={() => setActiveTab(tab.key)}
                                className={`px-5 py-2 rounded-full text-sm font-bold transition-all duration-200 ${activeTab === tab.key
                                    ? 'bg-emerald-600 text-white shadow-md shadow-emerald-200'
                                    : 'bg-white text-gray-600 border border-gray-200 hover:border-emerald-300 hover:text-emerald-600'
                                    }`}
                            >
                                {tab.label}
                                {activeTab !== 'all' && tab.key === 'all' && <span className="ml-1.5 text-xs opacity-60">{galleries.length}</span>}
                                {tab.key === activeTab && tab.key !== 'all' && <span className="ml-1.5 text-xs opacity-70">{filtered.length}</span>}
                            </button>
                        ))}
                    </div>

                    {/* Grid */}
                    {filtered.length === 0 ? (
                        <div className="text-center py-20">
                            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <svg className="w-10 h-10 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14" /></svg>
                            </div>
                            <p className="text-gray-400 font-medium">No galleries in this category yet.</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            {filtered.map((gallery, idx) => (
                                <div key={gallery.id} className="animate-reveal-up" style={{ animationDelay: `${idx * 100}ms` }}>
                                    <GalleryCard gallery={gallery} />
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </section>
        </AppLayout>
    );
}
