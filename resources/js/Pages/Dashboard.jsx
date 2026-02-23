import React from 'react';
import AppLayout from '@/Layouts/AppLayout';
import { Head, Link } from '@inertiajs/react';

export default function Dashboard({ auth, applications, feedbacks }) {
    const statusColors = {
        pending: 'bg-yellow-100 text-yellow-800 border-yellow-200',
        reviewing: 'bg-blue-100 text-blue-800 border-blue-200',
        approved: 'bg-emerald-100 text-emerald-800 border-emerald-200',
        rejected: 'bg-red-100 text-red-800 border-red-200',
    };

    return (
        <AppLayout>
            <Head title="My Dashboard" />

            <div className="py-24 bg-gray-50 dark:bg-gray-950 min-h-screen transition-colors duration-300">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Welcome Header */}
                    <div className="mb-12 animate-reveal-down">
                        <span className="text-emerald-600 dark:text-emerald-400 font-bold uppercase tracking-[0.3em] text-[10px] mb-2 block">Member Area</span>
                        <div className="flex justify-between items-end">
                            <div>
                                <h1 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white italic tracking-tighter uppercase">
                                    Welcome, <span className="text-emerald-500">{auth.user.name.split(' ')[0]}</span>
                                </h1>
                                <p className="text-gray-500 dark:text-gray-400 mt-2 font-medium">Manage your applications and track your journey to owning the extraordinary.</p>
                            </div>
                            <Link
                                href={route('profile.edit')}
                                className="text-[10px] font-black uppercase tracking-widest text-gray-400 hover:text-emerald-500 transition-colors flex items-center mb-1"
                            >
                                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                                Edit Profile
                            </Link>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Stats / Overview */}
                        <div className="lg:col-span-1 space-y-8">
                            <div className="bg-white dark:bg-gray-900 p-8 rounded-[2.5rem] shadow-xl shadow-emerald-500/5 border border-gray-100 dark:border-gray-800 animate-reveal-up transition-colors">
                                <h3 className="text-sm font-black uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-6">Application Overview</h3>
                                <div className="space-y-6">
                                    <div className="flex justify-between items-center">
                                        <span className="text-gray-600 dark:text-gray-400 font-bold">Total Submitted</span>
                                        <span className="text-2xl font-black text-gray-900 dark:text-white">{applications.length}</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-gray-600 dark:text-gray-400 font-bold">In Review</span>
                                        <span className="text-2xl font-black text-blue-500">
                                            {applications.filter(a => a.status === 'reviewing' || a.status === 'pending').length}
                                        </span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-gray-600 dark:text-gray-400 font-bold">Approved</span>
                                        <span className="text-2xl font-black text-emerald-500">
                                            {applications.filter(a => a.status === 'approved').length}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-emerald-900 p-8 rounded-[2.5rem] shadow-2xl text-white relative overflow-hidden animate-reveal-up delay-100">
                                <div className="relative z-10">
                                    <h3 className="text-emerald-400 text-[10px] font-black uppercase tracking-widest mb-4">Elite Support</h3>
                                    <p className="text-lg font-bold mb-6 italic">"Need assistance with your application? Our concierge team is here to help."</p>
                                    <Link
                                        href="/#enquiry"
                                        className="inline-flex py-3 px-6 bg-white text-emerald-900 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-emerald-50 transition shadow-xl"
                                    >
                                        Contact Support
                                    </Link>
                                </div>
                                <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-800 rounded-full -mr-16 -mt-16 opacity-50 blur-2xl"></div>
                            </div>
                        </div>

                        {/* Recent Applications Table */}
                        <div className="lg:col-span-2 space-y-8">
                            <div className="bg-white dark:bg-gray-900 rounded-[2.5rem] shadow-xl shadow-emerald-500/5 border border-gray-100 dark:border-gray-800 overflow-hidden animate-reveal-up delay-200 transition-colors">
                                <div className="p-8 border-b border-gray-100 dark:border-gray-800 flex justify-between items-center">
                                    <h3 className="text-sm font-black uppercase tracking-widest text-gray-900 dark:text-white">Recent Financing Applications</h3>
                                    <Link href={route('financing.index')} className="text-[10px] font-black text-emerald-600 dark:text-emerald-400 uppercase tracking-widest hover:underline transition-all">
                                        New Application +
                                    </Link>
                                </div>

                                <div className="overflow-x-auto">
                                    <table className="w-full text-left">
                                        <thead className="bg-gray-50/50 dark:bg-gray-800/50">
                                            <tr>
                                                <th className="px-8 py-4 text-[10px] font-black uppercase tracking-widest text-gray-400">Vehicle</th>
                                                <th className="px-8 py-4 text-[10px] font-black uppercase tracking-widest text-gray-400">Date</th>
                                                <th className="px-8 py-4 text-[10px] font-black uppercase tracking-widest text-gray-400 text-center">Status</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                                            {applications.length === 0 ? (
                                                <tr>
                                                    <td colSpan="3" className="px-8 py-16 text-center text-gray-400 dark:text-gray-500 italic font-medium">
                                                        You haven't submitted any applications yet.
                                                    </td>
                                                </tr>
                                            ) : (
                                                applications.map((app) => (
                                                    <tr key={app.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/30 transition-colors">
                                                        <td className="px-8 py-6">
                                                            <div className="font-black text-gray-900 dark:text-white uppercase italic tracking-tighter">
                                                                {app.vehicle?.title || 'Unknown Vehicle'}
                                                            </div>
                                                            <div className="text-xs font-bold text-emerald-600 dark:text-emerald-400">
                                                                ₦{Number(app.vehicle_price).toLocaleString()}
                                                            </div>
                                                        </td>
                                                        <td className="px-8 py-6 text-xs font-bold text-gray-500 dark:text-gray-400">
                                                            {new Date(app.created_at).toLocaleDateString()}
                                                        </td>
                                                        <td className="px-8 py-6 text-center">
                                                            <div className="flex items-center justify-center space-x-4">
                                                                <span className={`inline-block px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border ${statusColors[app.status]}`}>
                                                                    {app.status}
                                                                </span>
                                                                <a
                                                                    href={route('financing.pdf', app.id)}
                                                                    target="_blank"
                                                                    rel="noopener noreferrer"
                                                                    className="p-2 text-gray-400 hover:text-emerald-500 transition-colors bg-gray-50 dark:bg-gray-800 rounded-lg group"
                                                                    title="View PDF"
                                                                >
                                                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                                                    </svg>
                                                                </a>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                ))
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            </div>

                            {/* Feedback Section */}
                            <div className="bg-white dark:bg-gray-900 rounded-[2.5rem] shadow-xl shadow-emerald-500/5 border border-gray-100 dark:border-gray-800 overflow-hidden animate-reveal-up delay-300 transition-colors">
                                <div className="p-8 border-b border-gray-100 dark:border-gray-800 flex justify-between items-center">
                                    <h3 className="text-sm font-black uppercase tracking-widest text-gray-900 dark:text-white">Your Feedback</h3>
                                    <Link href={route('feedback.index')} className="text-[10px] font-black text-emerald-600 dark:text-emerald-400 uppercase tracking-widest hover:underline transition-all">
                                        Share Feedback +
                                    </Link>
                                </div>

                                <div className="p-8">
                                    {feedbacks.length === 0 ? (
                                        <div className="text-center py-8 text-gray-400 dark:text-gray-500 italic font-medium">
                                            You haven't shared any feedback yet. We'd love to hear from you!
                                        </div>
                                    ) : (
                                        <div className="space-y-6">
                                            {feedbacks.map((f) => (
                                                <div key={f.id} className="bg-gray-50 dark:bg-gray-800/50 p-6 rounded-2xl border border-gray-100 dark:border-gray-700">
                                                    <div className="flex justify-between items-start mb-2">
                                                        <div className="flex text-emerald-500">
                                                            {[...Array(5)].map((_, i) => (
                                                                <svg key={i} className={`w-3 h-3 ${i < f.rating ? 'fill-current' : 'text-gray-200'}`} viewBox="0 0 20 20">
                                                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                                                </svg>
                                                            ))}
                                                        </div>
                                                        <span className="text-[10px] font-bold text-gray-400">
                                                            {new Date(f.created_at).toLocaleDateString()}
                                                        </span>
                                                    </div>
                                                    <p className="text-sm text-gray-700 dark:text-gray-300 italic">"{f.comment}"</p>
                                                    {f.is_published ? (
                                                        <span className="mt-2 inline-block text-[8px] font-black uppercase tracking-widest text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/30 px-2 py-0.5 rounded">Published</span>
                                                    ) : (
                                                        <span className="mt-2 inline-block text-[8px] font-black uppercase tracking-widest text-gray-400 bg-gray-100 dark:bg-gray-800 px-2 py-0.5 rounded">Awaiting Review</span>
                                                    )}
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
