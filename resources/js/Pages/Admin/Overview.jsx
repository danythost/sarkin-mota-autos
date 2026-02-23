import React from 'react';
import { Head, Link } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';

const StatCard = ({ label, value, color, icon, href }) => (
    <Link href={href ?? '#'} className="group block bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md hover:border-emerald-200 transition-all duration-300">
        <div className="flex items-center justify-between mb-4">
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${color}`}>
                {icon}
            </div>
            <span className="text-xs font-bold text-gray-400 uppercase tracking-widest group-hover:text-emerald-600 transition-colors">View →</span>
        </div>
        <div className="text-3xl font-black text-gray-900 tracking-tight">{value}</div>
        <div className="text-sm font-medium text-gray-500 mt-1">{label}</div>
    </Link>
);

const statusColors = {
    pending: 'bg-amber-100 text-amber-700',
    open: 'bg-amber-100 text-amber-700',
    responding: 'bg-blue-100 text-blue-700',
    reviewing: 'bg-blue-100 text-blue-700',
    resolved: 'bg-emerald-100 text-emerald-700',
    approved: 'bg-emerald-100 text-emerald-700',
    rejected: 'bg-red-100 text-red-700',
};

const ActivityIcon = ({ type }) => {
    if (type === 'enquiry') {
        return (
            <div className="w-9 h-9 rounded-xl bg-violet-100 flex items-center justify-center flex-shrink-0">
                <svg className="w-4 h-4 text-violet-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" /></svg>
            </div>
        );
    }
    return (
        <div className="w-9 h-9 rounded-xl bg-emerald-100 flex items-center justify-center flex-shrink-0">
            <svg className="w-4 h-4 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
        </div>
    );
};

function timeAgo(dateStr) {
    const diff = Math.floor((Date.now() - new Date(dateStr)) / 1000);
    if (diff < 60) return `${diff}s ago`;
    if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
    if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
    return `${Math.floor(diff / 86400)}d ago`;
}

export default function Overview({ stats, activityFeed }) {
    const statCards = [
        {
            label: 'Total Vehicles',
            value: stats.total_vehicles,
            color: 'bg-gray-100',
            href: route('admin.vehicles.index'),
            icon: <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7h8m-8 4h8M5 21h14a2 2 0 002-2v-5a2 2 0 00-2-2H5a2 2 0 00-2 2v5a2 2 0 002 2zM9 3h6a2 2 0 012 2v2H7V5a2 2 0 012-2z" /></svg>,
        },
        {
            label: 'Available Vehicles',
            value: stats.available_vehicles,
            color: 'bg-emerald-100',
            href: route('admin.vehicles.index'),
            icon: <svg className="w-6 h-6 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
        },
        {
            label: 'Sold Vehicles',
            value: stats.sold_vehicles,
            color: 'bg-blue-100',
            href: route('admin.vehicles.index'),
            icon: <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" /></svg>,
        },
        {
            label: 'Featured Vehicles',
            value: stats.featured_vehicles,
            color: 'bg-yellow-100',
            href: route('admin.vehicles.index'),
            icon: <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" /></svg>,
        },
        {
            label: 'New Inquiries',
            value: stats.new_enquiries,
            color: 'bg-violet-100',
            href: route('admin.enquiries.index'),
            icon: <svg className="w-6 h-6 text-violet-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" /></svg>,
        },
        {
            label: 'Pending Financing',
            value: stats.pending_financing,
            color: 'bg-orange-100',
            href: route('admin.financing.index'),
            icon: <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>,
        },
        {
            label: 'Total Brands',
            value: stats.total_brands,
            color: 'bg-teal-100',
            href: route('admin.brands.index'),
            icon: <svg className="w-6 h-6 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" /></svg>,
        },
    ];

    return (
        <AdminLayout>
            <Head title="Overview — Sarkin Mota Admin" />

            <div className="max-w-7xl mx-auto">
                {/* Page Header */}
                <div className="mb-8">
                    <h1 className="text-2xl font-black text-gray-900">Executive Overview</h1>
                    <p className="text-gray-500 text-sm mt-1">Live summary of your dealership operations.</p>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
                    {statCards.map((card) => (
                        <StatCard key={card.label} {...card} />
                    ))}
                </div>

                {/* Recent Activity Feed */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="px-6 py-5 border-b border-gray-100 flex items-center justify-between">
                        <div>
                            <h2 className="text-base font-black text-gray-900">Recent Activity</h2>
                            <p className="text-xs text-gray-400 mt-0.5">Latest enquiries and financing applications</p>
                        </div>
                        <div className="flex gap-3">
                            <Link href={route('admin.enquiries.index')} className="text-xs font-bold text-violet-600 hover:text-violet-800 transition">Enquiries →</Link>
                            <Link href={route('admin.financing.index')} className="text-xs font-bold text-emerald-600 hover:text-emerald-800 transition">Financing →</Link>
                        </div>
                    </div>

                    {activityFeed.length === 0 ? (
                        <div className="py-16 text-center text-gray-400">
                            <svg className="w-10 h-10 mx-auto mb-3 opacity-30" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" /></svg>
                            <p className="text-sm font-medium">No recent activity yet.</p>
                        </div>
                    ) : (
                        <ul className="divide-y divide-gray-50">
                            {activityFeed.map((item, idx) => (
                                <li key={idx} className="flex items-start gap-4 px-6 py-4 hover:bg-gray-50 transition-colors">
                                    <ActivityIcon type={item.type} />
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-semibold text-gray-800 truncate">{item.title}</p>
                                        {item.detail && (
                                            <p className="text-xs text-gray-400 mt-0.5 truncate">{item.detail}</p>
                                        )}
                                    </div>
                                    <div className="flex flex-col items-end gap-1.5 flex-shrink-0">
                                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full capitalize ${statusColors[item.status] ?? 'bg-gray-100 text-gray-500'}`}>
                                            {item.status}
                                        </span>
                                        <span className="text-[10px] text-gray-400">{timeAgo(item.created_at)}</span>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>
        </AdminLayout>
    );
}
