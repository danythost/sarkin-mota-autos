import React from 'react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Head, Link, router } from '@inertiajs/react';

export default function Index({ applications }) {
    const updateStatus = (id, status) => {
        router.patch(route('admin.financing.update', id), { status });
    };

    const deleteApplication = (id) => {
        if (confirm('Are you sure you want to delete this application?')) {
            router.delete(route('admin.financing.destroy', id));
        }
    };

    const statusColors = {
        pending: 'bg-yellow-100 text-yellow-800',
        reviewing: 'bg-blue-100 text-blue-800',
        approved: 'bg-emerald-100 text-emerald-800',
        rejected: 'bg-red-100 text-red-800',
    };

    return (
        <AdminLayout>
            <Head title="Financing Applications" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg border border-gray-100">
                        <div className="p-6 text-gray-900 font-bold border-b border-gray-100">
                            Financing Applications
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left text-sm">
                                <thead className="bg-gray-50 text-gray-700 uppercase font-black text-[10px] tracking-widest">
                                    <tr>
                                        <th className="px-6 py-4">Status</th>
                                        <th className="px-6 py-4">Applicant</th>
                                        <th className="px-6 py-4">Vehicle</th>
                                        <th className="px-6 py-4">Deposit</th>
                                        <th className="px-6 py-4 text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                    {applications.length === 0 ? (
                                        <tr>
                                            <td colSpan="5" className="px-6 py-10 text-center text-gray-400">No applications found.</td>
                                        </tr>
                                    ) : (
                                        applications.map((app) => (
                                            <tr key={app.id} className="hover:bg-gray-50 transition-colors">
                                                <td className="px-6 py-4">
                                                    <select
                                                        value={app.status}
                                                        onChange={(e) => updateStatus(app.id, e.target.value)}
                                                        className={`text-[10px] font-bold uppercase tracking-widest rounded-full px-3 py-1 border-none focus:ring-0 cursor-pointer ${statusColors[app.status]}`}
                                                    >
                                                        <option value="pending">Pending</option>
                                                        <option value="reviewing">Reviewing</option>
                                                        <option value="approved">Approved</option>
                                                        <option value="rejected">Rejected</option>
                                                    </select>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="font-bold text-gray-900">{app.full_name}</div>
                                                    <div className="text-gray-500 text-xs">{app.email}</div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="font-bold text-emerald-600">{app.vehicle?.title}</div>
                                                    <div className="text-gray-500 text-xs">₦{Number(app.vehicle_price).toLocaleString()}</div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="font-bold text-gray-900">₦{Number(app.proposed_deposit).toLocaleString()}</div>
                                                    <div className="text-gray-500 text-xs">{app.preferred_duration} Months</div>
                                                </td>
                                                <td className="px-6 py-4 text-right space-x-3">
                                                    <Link
                                                        href={route('admin.financing.show', app.id)}
                                                        className="text-emerald-600 hover:text-emerald-800 transition font-bold text-xs uppercase tracking-widest"
                                                    >
                                                        Details
                                                    </Link>
                                                    <button
                                                        onClick={() => deleteApplication(app.id)}
                                                        className="text-red-500 hover:text-red-700 transition font-bold text-xs uppercase tracking-widest"
                                                    >
                                                        Delete
                                                    </button>
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
