import React from 'react';
import { Link, usePage, router } from '@inertiajs/react';

export default function AdminLayout({ children }) {
    const { auth, flash } = usePage().props;

    return (
        <div className="min-h-screen bg-gray-100 flex">
            {/* Sidebar */}
            <div className="bg-gray-800 w-64 flex-shrink-0 min-h-screen text-white">
                <div className="p-6 border-b border-gray-700">
                    <h1 className="text-xl font-bold text-emerald-400">SMA</h1>
                </div>
                <nav className="p-4 space-y-2">
                    <Link
                        href={route('admin.dashboard')}
                        className={`flex items-center gap-2 px-4 py-2 rounded transition ${route().current('admin.dashboard') ? 'bg-emerald-600' : 'hover:bg-gray-700'}`}
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>
                        Overview
                    </Link>
                    <Link
                        href={route('admin.vehicles.index')}
                        className={`block px-4 py-2 rounded transition ${route().current('admin.vehicles.*') ? 'bg-emerald-600' : 'hover:bg-gray-700'}`}
                    >
                        Vehicles
                    </Link>
                    <Link
                        href={route('admin.brands.index')}
                        className={`block px-4 py-2 rounded transition ${route().current('admin.brands.*') ? 'bg-emerald-600' : 'hover:bg-gray-700'}`}
                    >
                        Brands
                    </Link>
                    <Link
                        href={route('admin.gallery.index')}
                        className={`block px-4 py-2 rounded transition ${route().current('admin.gallery.*') ? 'bg-emerald-600' : 'hover:bg-gray-700'}`}
                    >
                        Gallery
                    </Link>

                    <div className="pt-4 pb-2">
                        <span className="px-4 text-[10px] font-black uppercase tracking-widest text-gray-500">Leads & Contacts</span>
                    </div>

                    <Link
                        href={route('admin.enquiries.index')}
                        className={`block px-4 py-2 rounded transition ${route().current('admin.enquiries.*') ? 'bg-emerald-600' : 'hover:bg-gray-700'}`}
                    >
                        Contacts
                    </Link>
                    <Link
                        href={route('admin.feedback.index')}
                        className={`block px-4 py-2 rounded transition ${route().current('admin.feedback.*') ? 'bg-emerald-600' : 'hover:bg-gray-700'}`}
                    >
                        Feedback
                    </Link>
                    <Link
                        href={route('admin.financing.index')}
                        className={`block px-4 py-2 rounded transition ${route().current('admin.financing.*') ? 'bg-emerald-600' : 'hover:bg-gray-700'}`}
                    >
                        Financing Apps
                    </Link>
                </nav>
            </div>

            {/* Main Content */}
            <div className="flex-1 flex flex-col overflow-hidden">
                {/* Header */}
                <header className="bg-white shadow-sm z-10">
                    <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
                        <h2 className="text-lg font-semibold text-gray-800">Dashboard</h2>
                        <div className="flex items-center space-x-6">
                            <div className="flex items-center space-x-3">
                                <Link
                                    href={route('admin.profile.edit')}
                                    className="flex items-center space-x-3 group hover:text-emerald-600 transition-colors"
                                >
                                    <div className="w-8 h-8 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white transition-all">
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                        </svg>
                                    </div>
                                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300 group-hover:text-emerald-600 transition-colors">
                                        {auth?.admin?.name}
                                    </span>
                                </Link>
                            </div>
                            <button
                                onClick={() => router.post(route('admin.logout'))}
                                className="text-sm font-medium text-red-500 hover:text-red-700 border border-red-200 hover:border-red-400 px-3 py-1.5 rounded-lg transition"
                            >
                                Logout
                            </button>
                        </div>
                    </div>
                </header>

                {/* Flash Messages */}
                {flash.success && (
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-4">
                        <div className="bg-emerald-100 border border-emerald-400 text-emerald-700 px-4 py-3 rounded relative" role="alert">
                            <span className="block sm:inline">{flash.success}</span>
                        </div>
                    </div>
                )}
                {flash.error && (
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-4">
                        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                            <span className="block sm:inline">{flash.error}</span>
                        </div>
                    </div>
                )}

                {/* Page Content */}
                <main className="flex-1 overflow-y-auto p-4 sm:p-8">
                    {children}
                </main>
            </div>
        </div>
    );
}
