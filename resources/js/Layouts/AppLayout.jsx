import React, { useState, useEffect } from 'react';
import { Link, usePage, router } from '@inertiajs/react';
import ThemeToggle from '@/Components/ThemeToggle';

export default function AppLayout({ children }) {
    const { auth, flash } = usePage().props;
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [theme, setTheme] = useState(() => {
        if (typeof window !== 'undefined') {
            const saved = localStorage.getItem('theme');
            if (saved) return saved;
            return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
        }
        return 'light';
    });

    useEffect(() => {
        if (theme === 'dark') {
            document.documentElement.classList.add('dark');
            document.documentElement.style.colorScheme = 'dark';
        } else {
            document.documentElement.classList.remove('dark');
            document.documentElement.style.colorScheme = 'light';
        }
        localStorage.setItem('theme', theme);
    }, [theme]);

    const toggleTheme = () => setTheme(prev => prev === 'light' ? 'dark' : 'light');

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col transition-colors duration-300">
            {/* Top Bar (Secondary Nav) */}
            <div className="bg-gray-950 text-gray-300 py-2 border-b border-emerald-900/30 text-xs sm:text-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
                    <div className="flex items-center space-x-6">
                        <a href="tel:+2348123456789" className="flex items-center hover:text-emerald-400 transition-colors">
                            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                            <span className="hidden sm:inline">+234 812 345 6789</span>
                        </a>
                        <a href="mailto:info@sarkinmota.com" className="flex items-center hover:text-emerald-400 transition-colors">
                            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                            <span className="hidden sm:inline">info@sarkinmota.com</span>
                        </a>
                    </div>
                    <div className="flex items-center space-x-4">
                        <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
                        <div className="h-4 w-[1px] bg-gray-800 mx-2 hidden sm:block"></div>
                        <a href="#" className="hover:text-emerald-400 transition-colors" title="Facebook">
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" /></svg>
                        </a>
                        <a href="#" className="hover:text-emerald-400 transition-colors" title="Instagram">
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" /></svg>
                        </a>
                        <a href="#" className="hover:text-emerald-400 transition-colors" title="LinkedIn">
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" /></svg>
                        </a>
                        <a href="#" className="hover:text-emerald-400 transition-colors" title="X (Twitter)">
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z" /></svg>
                        </a>
                        <a href="#" className="hover:text-emerald-400 transition-colors" title="TikTok">
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12.525.02c1.31 0 2.591.21 3.795.602v4.838a7.205 7.205 0 01-2.458-.493l.001 5.103c0 3.32-2.69 6.012-6.01 6.012s-6.01-2.692-6.01-6.012a6.012 6.012 0 016.01-6.012c.421 0 .825.045 1.212.128v4.208a1.812 1.812 0 00-1.212-.45c-1 0-1.81.81-1.81 1.81s.81 1.811 1.81 1.811a1.811 1.811 0 001.81-1.811V.022h2.852z" /></svg>
                        </a>
                    </div>
                </div>
            </div>

            {/* Navbar */}
            <nav className="bg-white dark:bg-gray-950 shadow-sm dark:shadow-emerald-950/20 sticky top-0 z-50 border-b dark:border-gray-800 transition-colors duration-300">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16">
                        <div className="flex items-center">
                            <Link href={route('home')} className="flex-shrink-0 flex items-center">
                                <span className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                                    SMA
                                </span>
                            </Link>
                            <div className="hidden lg:ml-8 lg:flex lg:space-x-4">
                                <Link href={route('vehicles.index')} className={`inline-flex items-center px-1 pt-1 border-b-2 text-xs font-bold transition-colors ${route().current('vehicles.index') ? 'border-emerald-500 text-black dark:text-white' : 'border-transparent text-black dark:text-gray-400 hover:border-gray-200 dark:hover:border-gray-700 hover:text-gray-400 dark:hover:text-gray-200'}`}>
                                    Inventory
                                </Link>
                                <Link href={route('gallery.index')} className={`inline-flex items-center px-1 pt-1 border-b-2 text-xs font-bold transition-colors ${route().current('gallery.*') ? 'border-emerald-500 text-black dark:text-white' : 'border-transparent text-black dark:text-gray-400 hover:border-gray-200 dark:hover:border-gray-700 hover:text-gray-400 dark:hover:text-gray-200'}`}>
                                    Gallery
                                </Link>
                                <Link href="#featured" className="inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-xs font-bold text-black dark:text-gray-400 hover:border-gray-200 dark:hover:border-gray-700 hover:text-gray-400 dark:hover:text-gray-200 transition-colors">
                                    Featured Cars
                                </Link>
                                <Link href="/#about" className={`inline-flex items-center px-1 pt-1 border-b-2 text-xs font-bold transition-colors ${route().current('about') ? 'border-emerald-500 text-black dark:text-white' : 'border-transparent text-black dark:text-gray-400 hover:border-gray-200 dark:hover:border-gray-700 hover:text-gray-400 dark:hover:text-gray-200'}`}>
                                    About Us
                                </Link>
                                <Link href={route('financing.index')} className={`inline-flex items-center px-1 pt-1 border-b-2 text-xs font-bold transition-colors ${route().current('financing.index') ? 'border-emerald-500 text-black dark:text-white' : 'border-transparent text-black dark:text-gray-400 hover:border-gray-200 dark:hover:border-gray-700 hover:text-gray-400 dark:hover:text-gray-200'}`}>
                                    Financing
                                </Link>
                                <Link href="/#testimonials" className="inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-xs font-bold text-black dark:text-gray-400 hover:border-gray-200 dark:hover:border-gray-700 hover:text-gray-400 dark:hover:text-gray-200 transition-colors">
                                    Testimonials
                                </Link>
                                <Link href={route('feedback.index')} className="inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-xs font-bold text-black dark:text-gray-400 hover:border-gray-200 dark:hover:border-gray-700 hover:text-gray-400 dark:hover:text-gray-200 transition-colors">
                                    Feedback
                                </Link>
                                <Link href="/#enquiry" className="inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-xs font-bold text-black dark:text-gray-400 hover:border-gray-200 dark:hover:border-gray-700 hover:text-gray-400 dark:hover:text-gray-200 transition-colors">
                                    Contact
                                </Link>
                            </div>
                        </div>

                        {/* Desktop Auth */}
                        <div className="hidden lg:flex lg:items-center lg:space-x-4">
                            {auth?.admin ? (
                                <>
                                    <span className="text-sm text-gray-700 dark:text-gray-300 hidden sm:inline">{auth.admin.name}</span>
                                    <button
                                        onClick={() => router.post(route('admin.logout'))}
                                        className="text-sm font-bold text-red-500 hover:text-red-700 border border-red-200 dark:border-red-900/30 hover:border-red-400 px-3 py-1.5 rounded-lg transition"
                                    >
                                        Logout
                                    </button>
                                </>
                            ) : auth?.user ? (
                                <>
                                    <Link href={route('dashboard')} className="text-sm font-bold text-emerald-600 dark:text-emerald-400 hover:text-emerald-500 transition-colors">Dashboard</Link>
                                    <Link href={route('profile.edit')} className="text-sm font-bold text-gray-400 hover:text-emerald-400 transition-colors" title="Account Settings">
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                                    </Link>
                                    <span className="text-sm text-gray-700 dark:text-gray-300 hidden sm:inline">{auth.user.name}</span>
                                    <button
                                        onClick={() => router.post(route('logout'))}
                                        className="text-sm font-bold text-red-500 hover:text-red-700 border border-red-200 dark:border-red-900/30 hover:border-red-400 px-3 py-1.5 rounded-lg transition"
                                    >
                                        Logout
                                    </button>
                                </>
                            ) : (
                                <>
                                    <Link href="/login" className="text-sm font-bold text-black dark:text-white hover:text-gray-400 dark:hover:text-gray-300 transition-colors">
                                        Sign in
                                    </Link>
                                </>
                            )}
                        </div>

                        {/* Mobile Menu Button */}
                        <div className="flex items-center lg:hidden">
                            <button
                                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                                className="inline-flex items-center justify-center p-2 rounded-md text-gray-500 hover:text-gray-700 hover:bg-gray-100 focus:outline-none transition"
                            >
                                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    {isMobileMenuOpen ? (
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                    ) : (
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                                    )}
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Mobile Menu Dropdown */}
                {isMobileMenuOpen && (
                    <div className="lg:hidden bg-white dark:bg-gray-900 border-t border-gray-100 dark:border-gray-800 shadow-xl transition-colors duration-300">
                        <div className="px-4 pt-2 pb-6 space-y-1">
                            <Link
                                href={route('vehicles.index')}
                                className={`block px-3 py-2 rounded-md text-base font-bold transition-colors ${route().current('vehicles.index') ? 'text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/30' : 'text-black dark:text-gray-300 hover:text-gray-400 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-800'}`}
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                Inventory
                            </Link>
                            <Link
                                href={route('gallery.index')}
                                className={`block px-3 py-2 rounded-md text-base font-bold transition-colors ${route().current('gallery.*') ? 'text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/30' : 'text-black dark:text-gray-300 hover:text-gray-400 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-800'}`}
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                Gallery
                            </Link>
                            <Link
                                href="#featured"
                                className="block px-3 py-2 rounded-md text-base font-bold text-black dark:text-gray-300 hover:text-gray-400 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                Featured Cars
                            </Link>
                            <Link
                                href="/#about"
                                className="block px-3 py-2 rounded-md text-base font-bold text-black dark:text-gray-300 hover:text-gray-400 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                About Us
                            </Link>
                            <Link
                                href={route('financing.index')}
                                className={`block px-3 py-2 rounded-md text-base font-bold transition-colors ${route().current('financing.index') ? 'text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/30' : 'text-black dark:text-gray-300 hover:text-gray-400 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-800'}`}
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                Financing
                            </Link>
                            <Link
                                href="/#testimonials"
                                className="block px-3 py-2 rounded-md text-base font-bold text-black dark:text-gray-300 hover:text-gray-400 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                Testimonials
                            </Link>
                            <Link
                                href={route('feedback.index')}
                                className="block px-3 py-2 rounded-md text-base font-bold text-black dark:text-gray-300 hover:text-gray-400 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                Feedback
                            </Link>
                            <Link
                                href="/#enquiry"
                                className="block px-3 py-2 rounded-md text-base font-bold text-black dark:text-gray-300 hover:text-gray-400 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                Contact
                            </Link>

                            <div className="pt-4 mt-4 border-t border-gray-100 dark:border-gray-800">
                                {auth?.admin ? (
                                    <div className="flex flex-col space-y-3 px-3">
                                        <span className="text-sm text-gray-500 dark:text-gray-400">Logged in as {auth.admin.name} (Admin)</span>
                                        <button
                                            onClick={() => {
                                                setIsMobileMenuOpen(false);
                                                router.post(route('admin.logout'));
                                            }}
                                            className="w-full text-center py-2 px-4 rounded-lg bg-red-50 dark:bg-red-950/20 text-red-600 dark:text-red-400 font-bold border border-red-100 dark:border-red-900/30"
                                        >
                                            Logout
                                        </button>
                                    </div>
                                ) : auth?.user ? (
                                    <div className="flex flex-col space-y-3 px-3">
                                        <span className="text-sm text-gray-500 dark:text-gray-400">Logged in as {auth.user.name}</span>
                                        <Link
                                            href={route('dashboard')}
                                            className="w-full text-center py-2 px-4 rounded-lg bg-emerald-50 dark:bg-emerald-950/20 text-emerald-600 dark:text-emerald-400 font-bold border border-emerald-100 dark:border-emerald-900/30"
                                            onClick={() => setIsMobileMenuOpen(false)}
                                        >
                                            Dashboard
                                        </Link>
                                        <Link
                                            href={route('profile.edit')}
                                            className="w-full text-center py-2 px-4 rounded-lg bg-gray-50 dark:bg-gray-800 text-gray-600 dark:text-gray-300 font-bold border border-gray-100 dark:border-gray-700"
                                            onClick={() => setIsMobileMenuOpen(false)}
                                        >
                                            Settings
                                        </Link>
                                        <button
                                            onClick={() => {
                                                setIsMobileMenuOpen(false);
                                                router.post(route('logout'));
                                            }}
                                            className="w-full text-center py-2 px-4 rounded-lg bg-red-50 dark:bg-red-950/20 text-red-600 dark:text-red-400 font-bold border border-red-100 dark:border-red-900/30"
                                        >
                                            Logout
                                        </button>
                                    </div>
                                ) : (
                                    <Link
                                        href="/login"
                                        className="block px-3 py-2 rounded-md text-base font-bold text-black dark:text-gray-300 hover:text-gray-400 dark:hover:text-white hover:bg-emerald-50 dark:hover:bg-emerald-950/30 transition-colors"
                                        onClick={() => setIsMobileMenuOpen(false)}
                                    >
                                        Sign in
                                    </Link>
                                )}
                            </div>
                        </div>
                    </div>
                )}
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
            <footer className="bg-gray-950 text-white pt-16 pb-8 border-t border-emerald-900/30 dark:border-emerald-800/20 transition-colors duration-300">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
                        {/* Column 1: Brand & Social */}
                        <div>
                            <Link href={route('home')} className="flex items-center mb-6">
                                <span className="text-3xl font-extrabold bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
                                    Sarkin Mota Autos
                                </span>
                            </Link>
                            <p className="text-gray-400 text-sm leading-relaxed mb-8">
                                Redefining the Nigerian automotive experience with premium selection, transparent financing, and unmatched reliability. Your journey to excellence starts here.
                            </p>
                            <div className="flex space-x-4">
                                <a href="#" className="p-2 bg-gray-900 rounded-full hover:bg-emerald-600 transition-colors shadow-lg">
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" /></svg>
                                </a>
                                <a href="#" className="p-2 bg-gray-900 rounded-full hover:bg-emerald-400 transition-colors shadow-lg">
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.84 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" /></svg>
                                </a>
                                <a href="#" className="p-2 bg-gray-900 rounded-full hover:bg-pink-600 transition-colors shadow-lg">
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" /></svg>
                                </a>
                                <a href="#" className="p-2 bg-gray-900 rounded-full hover:bg-emerald-800 transition-colors shadow-lg">
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z" /></svg>
                                </a>
                            </div>
                        </div>

                        {/* Column 2: Quick Links */}
                        <div>
                            <h4 className="text-lg font-bold mb-6 text-white border-l-4 border-emerald-500 pl-3">Quick Navigation</h4>
                            <ul className="space-y-4 text-sm">
                                <li><Link href={route('home')} className="text-gray-400 hover:text-emerald-400 transition-colors flex items-center"><span className="mr-2">›</span> Home</Link></li>
                                <li><Link href={route('vehicles.index')} className="text-gray-400 hover:text-emerald-400 transition-colors flex items-center"><span className="mr-2">›</span> Inventory</Link></li>
                                <li><Link href={route('gallery.index')} className="text-gray-400 hover:text-emerald-400 transition-colors flex items-center"><span className="mr-2">›</span> Showroom Gallery</Link></li>
                                <li><Link href="/#about" className="text-gray-400 hover:text-emerald-400 transition-colors flex items-center"><span className="mr-2">›</span> About Our Story</Link></li>
                                <li><Link href={route('financing.index')} className="text-gray-400 hover:text-emerald-400 transition-colors flex items-center"><span className="mr-2">›</span> Financial Services</Link></li>
                                <li><Link href="/#contact" className="text-gray-400 hover:text-emerald-400 transition-colors flex items-center"><span className="mr-2">›</span> Contact Support</Link></li>
                            </ul>
                        </div>

                        {/* Column 3: Inventory Types (Professional addition) */}
                        <div>
                            <h4 className="text-lg font-bold mb-6 text-white border-l-4 border-emerald-500 pl-3">Inventory Categories</h4>
                            <ul className="space-y-4 text-sm">
                                <li><Link href={route('vehicles.index', { type: 'suv' })} className="text-gray-400 hover:text-emerald-400 transition-colors flex items-center"><span className="mr-2">›</span> Luxury SUVs</Link></li>
                                <li><Link href={route('vehicles.index', { type: 'sedan' })} className="text-gray-400 hover:text-emerald-400 transition-colors flex items-center"><span className="mr-2">›</span> Executive Sedans</Link></li>
                                <li><Link href={route('vehicles.index', { type: 'sports' })} className="text-gray-400 hover:text-emerald-400 transition-colors flex items-center"><span className="mr-2">›</span> Performance Cars</Link></li>
                                <li><Link href={route('vehicles.index', { type: 'truck' })} className="text-gray-400 hover:text-emerald-400 transition-colors flex items-center"><span className="mr-2">›</span> Pickup Trucks</Link></li>
                                <li><Link href={route('vehicles.index', { condition: 'certified' })} className="text-gray-400 hover:text-emerald-400 transition-colors flex items-center"><span className="mr-2">›</span> Certified Pre-owned</Link></li>
                            </ul>
                        </div>

                        {/* Column 4: Contact & Hours */}
                        <div>
                            <h4 className="text-lg font-bold mb-6 text-white border-l-4 border-emerald-500 pl-3">Get In Touch</h4>
                            <div className="space-y-4 text-sm text-gray-400">
                                <p className="flex items-start">
                                    <svg className="w-5 h-5 mr-3 text-emerald-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                                    <span>123 Sarkin Mota Way, Central Area, Abuja, Nigeria</span>
                                </p>
                                <p className="flex items-center">
                                    <svg className="w-5 h-5 mr-3 text-emerald-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                                    <span>+234 812 345 6789</span>
                                </p>
                                <p className="flex items-center">
                                    <svg className="w-5 h-5 mr-3 text-emerald-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                                    <span>info@sarkinmota.com</span>
                                </p>
                                <div className="mt-6">
                                    <h5 className="font-semibold text-white mb-2">Showroom Hours</h5>
                                    <div className="grid grid-cols-2 gap-2 text-xs">
                                        <span>Mon - Fri:</span>
                                        <span className="text-emerald-400 text-right">08:00 - 18:00</span>
                                        <span>Saturday:</span>
                                        <span className="text-emerald-400 text-right">09:00 - 16:00</span>
                                        <span>Sunday:</span>
                                        <span className="text-red-400 text-right">Closed</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="mt-16 pt-8 border-t border-gray-900">
                        <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
                            <p>© {new Date().getFullYear()} Sarkin Moto Autos. All rights reserved.</p>
                            <div className="flex space-x-6 mt-4 md:mt-0">
                                <Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link>
                                <Link href="#" className="hover:text-white transition-colors">Terms of Service</Link>
                                <Link href="#" className="hover:text-white transition-colors">Cookie Settings</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </footer >
        </div >
    );
}
