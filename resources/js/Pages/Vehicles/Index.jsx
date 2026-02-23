import React from 'react';
import { Head } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';
import VehicleCard from '@/Components/VehicleCard';
import FilterSidebar from '@/Components/FilterSidebar';
import PaginatedLinks from '@/Components/PaginatedLinks';

export default function Index({ vehicles, brands, filters }) {
    return (
        <AppLayout>
            <Head title="Browse Vehicles - Sarkin Moto Autos" />

            <div className="bg-slate-50 dark:bg-gray-950 relative min-h-screen py-10 overflow-hidden transition-colors duration-300">
                {/* Premium Animated Background Layer */}
                <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
                    {/* Living Blobs */}
                    <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-emerald-500/10 dark:bg-emerald-500/5 rounded-full blur-[120px] animate-float" style={{ animationDuration: '8s' }} />
                    <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-teal-500/10 dark:bg-teal-500/5 rounded-full blur-[120px] animate-float" style={{ animationDuration: '12s', animationDelay: '-2s' }} />

                    {/* Free-form Architectural Lines (SVG) */}
                    <svg className="absolute inset-0 w-full h-full opacity-[0.08] dark:opacity-[0.15]" xmlns="http://www.w3.org/2000/svg">
                        <defs>
                            <linearGradient id="line-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" stopColor="currentColor" stopOpacity="0.5" />
                                <stop offset="50%" stopColor="currentColor" stopOpacity="1" />
                                <stop offset="100%" stopColor="currentColor" stopOpacity="0.5" />
                            </linearGradient>
                        </defs>

                        {/* Organic Splines / Paths */}
                        <path
                            d="M-100,200 C200,400 600,0 1200,300"
                            stroke="url(#line-gradient)"
                            strokeWidth="8"
                            fill="none"
                            className="animate-float"
                            style={{ animationDuration: '20s' }}
                        />
                        <path
                            d="M1400,100 C1000,500 400,600 -200,900"
                            stroke="url(#line-gradient)"
                            strokeWidth="12"
                            fill="none"
                            className="animate-float"
                            style={{ animationDuration: '25s', animationDelay: '-5s' }}
                        />
                        <path
                            d="M-200,800 C400,700 800,1100 1500,800"
                            stroke="url(#line-gradient)"
                            strokeWidth="6"
                            fill="none"
                            className="animate-float"
                            style={{ animationDuration: '18s', animationDelay: '-10s' }}
                        />

                        {/* Accent Loops */}
                        <circle cx="20%" cy="40%" r="400" stroke="currentColor" strokeWidth="2" fill="none" opacity="0.3" strokeDasharray="10 20" />
                        <circle cx="80%" cy="60%" r="500" stroke="currentColor" strokeWidth="2" fill="none" opacity="0.2" strokeDasharray="20 40" />
                    </svg>

                    {/* SVG Pattern Overlay (Large Subtle Dots) */}
                    <div className="absolute inset-0 opacity-[0.1] dark:opacity-[0.05]" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='2' cy='2' r='1' fill='%23059669' fill-opacity='0.2'/%3E%3C/svg%3E")` }} />
                </div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="flex flex-col md:flex-row gap-8">
                        {/* Sidebar Filters */}
                        <div className="w-full md:w-1/4">
                            <div className="sticky top-10 bg-white/60 dark:bg-gray-900/60 backdrop-blur-xl border border-white/40 dark:border-white/10 rounded-[2rem] shadow-sm p-1 overflow-hidden transition-colors duration-300 interactive-card">
                                <FilterSidebar brands={brands} filters={filters} />
                            </div>
                        </div>

                        {/* Vehicle Grid */}
                        <div className="w-full md:w-3/4">
                            <div className="mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white/40 dark:bg-gray-900/40 backdrop-blur-md p-6 rounded-3xl border border-white/60 dark:border-white/10 shadow-sm transition-colors duration-300">
                                <h1 className="text-2xl font-black text-gray-900 dark:text-white tracking-tight">
                                    {vehicles.total} {vehicles.total === 1 ? 'Vehicle' : 'Vehicles'} <span className="text-emerald-600 dark:text-emerald-400">Available</span>
                                </h1>
                                <div className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest bg-white/50 dark:bg-gray-800/50 px-4 py-2 rounded-full border border-white/80 dark:border-gray-700 transition-colors">
                                    Showing {vehicles.from} - {vehicles.to} of {vehicles.total}
                                </div>
                            </div>

                            {vehicles.data.length > 0 ? (
                                <>
                                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                                        {vehicles.data.map((vehicle, idx) => (
                                            <div key={vehicle.id} className="animate-reveal-up" style={{ animationDelay: `${idx * 100}ms` }}>
                                                <VehicleCard vehicle={vehicle} />
                                            </div>
                                        ))}
                                    </div>
                                    <PaginatedLinks links={vehicles.links} />
                                </>
                            ) : (
                                <div className="bg-white p-8 rounded-lg shadow-sm text-center">
                                    <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    <h3 className="mt-2 text-sm font-medium text-gray-900">No vehicles found</h3>
                                    <p className="mt-1 text-sm text-gray-500">Try adjusting your search criteria.</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
