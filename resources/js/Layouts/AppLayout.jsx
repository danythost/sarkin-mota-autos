import React from 'react';
import { Link, usePage, router } from '@inertiajs/react';

export default function AppLayout({ children }) {
    const { auth, flash } = usePage().props;

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            {/* Navbar */}
            <nav className="bg-white shadow-sm sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16">
                        <div className="flex items-center">
                            <Link href={route('home')} className="flex-shrink-0 flex items-center">
                                <span className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                                    SMA
                                </span>
                            </Link>
                            <div className="hidden lg:ml-8 lg:flex lg:space-x-4">
                                <Link href={route('vehicles.index')} className={`inline-flex items-center px-1 pt-1 border-b-2 text-xs font-medium ${route().current('vehicles.index') ? 'border-emerald-500 text-gray-900' : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'}`}>
                                    Inventory
                                </Link>
                                <Link href={route('gallery.index')} className={`inline-flex items-center px-1 pt-1 border-b-2 text-xs font-medium ${route().current('gallery.*') ? 'border-emerald-500 text-gray-900' : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'}`}>
                                    Gallery
                                </Link>
                                <Link href="#featured" className="inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-xs font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700">
                                    Featured Cars
                                </Link>
                                <Link href="/#about" className={`inline-flex items-center px-1 pt-1 border-b-2 text-xs font-medium ${route().current('about') ? 'border-emerald-500 text-gray-900' : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'}`}>
                                    About Us
                                </Link>
                                <Link href={route('financing.index')} className={`inline-flex items-center px-1 pt-1 border-b-2 text-xs font-medium ${route().current('financing.index') ? 'border-emerald-500 text-gray-900' : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'}`}>
                                    Financing
                                </Link>
                                <Link href="/#testimonials" className="inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-xs font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700">
                                    Testimonials
                                </Link>
                                <Link href="/#contact" className="inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-xs font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700">
                                    Contact
                                </Link>
                            </div>
                        </div>
                        <div className="flex items-center space-x-4">
                            {auth?.admin ? (
                                <>
                                    <Link href={route('admin.vehicles.index')} className="text-sm font-medium text-emerald-600 hover:text-emerald-500">
                                        Admin
                                    </Link>
                                    <span className="text-sm text-gray-700 hidden sm:inline">{auth.admin.name}</span>
                                    <button
                                        onClick={() => router.post(route('admin.logout'))}
                                        className="text-sm font-medium text-red-500 hover:text-red-700 border border-red-200 hover:border-red-400 px-3 py-1.5 rounded-lg transition"
                                    >
                                        Logout
                                    </button>
                                </>
                            ) : auth?.user ? (
                                <>
                                    <span className="text-sm text-gray-700 hidden sm:inline">{auth.user.name}</span>
                                    <button
                                        onClick={() => router.post(route('logout'))}
                                        className="text-sm font-medium text-red-500 hover:text-red-700 border border-red-200 hover:border-red-400 px-3 py-1.5 rounded-lg transition"
                                    >
                                        Logout
                                    </button>
                                </>
                            ) : (
                                <>
                                    <Link href={route('admin.login')} className="text-sm font-medium text-emerald-600 hover:text-emerald-500">
                                        Admin
                                    </Link>
                                    <Link href="/login" className="text-sm font-medium text-gray-500 hover:text-gray-700">
                                        Sign in
                                    </Link>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </nav>

            {/* Flash Messages */}
            {flash?.success && (
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-4">
                    <div className="bg-emerald-100 border border-emerald-400 text-emerald-700 px-4 py-3 rounded relative" role="alert">
                        <span className="block sm:inline">{flash.success}</span>
                    </div>
                </div>
            )}
            {flash?.error && (
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-4">
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                        <span className="block sm:inline">{flash.error}</span>
                    </div>
                </div>
            )}

            {/* Content */}
            <main className="flex-grow">
                {children}
            </main>

            {/* Footer */}
            <footer className="bg-gray-900 text-white py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div>
                            <h3 className="text-xl font-bold mb-4">Sarkin Moto Autos</h3>
                            <p className="text-gray-400 text-sm">
                                Premium car dealership providing the best vehicles for your needs. Quality and reliability guaranteed.
                            </p>
                        </div>
                        <div>
                            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
                            <ul className="space-y-2 text-sm text-gray-400">
                                <li><Link href={route('home')} className="hover:text-white">Home</Link></li>
                                <li><Link href={route('vehicles.index')} className="hover:text-white">Inventory</Link></li>
                                <li><Link href={route('gallery.index')} className="hover:text-white">Gallery</Link></li>
                                <li><Link href="/#about" className="hover:text-white">About Us</Link></li>
                                <li><Link href={route('financing.index')} className="hover:text-white">Financing</Link></li>
                                <li><Link href="/#contact" className="hover:text-white">Contact</Link></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="text-lg font-semibold mb-4">Newsletter</h4>
                            <p className="text-gray-400 text-sm mb-4">Follow us for latest arrivals and offers.</p>
                            <div className="flex">
                                <input type="email" placeholder="Your email" className="bg-gray-800 border-none rounded-l px-4 py-2 w-full text-sm focus:ring-emerald-500" />
                                <button className="bg-emerald-600 hover:bg-emerald-500 px-4 py-2 rounded-r text-sm font-bold">Join</button>
                            </div>
                        </div>
                    </div>
                    <div className="mt-12 pt-8 border-t border-gray-800 text-center text-sm text-gray-500">
                        © {new Date().getFullYear()} Sarkin Moto Autos. All rights reserved.
                    </div>
                </div>
            </footer>
        </div>
    );
}
