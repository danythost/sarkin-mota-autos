import React from 'react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Head, router } from '@inertiajs/react';

export default function Index({ enquiries }) {
    const updateStatus = (id, status) => {
        router.patch(route('admin.enquiries.update', id), { status });
    };

    const deleteEnquiry = (id) => {
        if (confirm('Are you sure you want to delete this enquiry?')) {
            router.delete(route('admin.enquiries.destroy', id));
        }
    };

    const statusColors = {
        pending: 'bg-yellow-100 text-yellow-800',
        responding: 'bg-blue-100 text-blue-800',
        resolved: 'bg-emerald-100 text-emerald-800',
    };

    return (
        <AdminLayout>
            <Head title="Manage Contacts" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg border border-gray-100">
                        <div className="p-6 text-gray-900 font-bold border-b border-gray-100">
                            Customer Contacts
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left text-sm">
                                <thead className="bg-gray-50 text-gray-700 uppercase font-black text-[10px] tracking-widest">
                                    <tr>
                                        <th className="px-6 py-4">Date</th>
                                        <th className="px-6 py-4">Customer</th>
                                        <th className="px-6 py-4">Message</th>
                                        <th className="px-6 py-4">Status</th>
                                        <th className="px-6 py-4 text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                    {enquiries.length === 0 ? (
                                        <tr>
                                            <td colSpan="5" className="px-6 py-10 text-center text-gray-400">No contacts found.</td>
                                        </tr>
                                    ) : (
                                        enquiries.map((enquiry) => (
                                            <tr key={enquiry.id} className="hover:bg-gray-50 transition-colors">
                                                <td className="px-6 py-4 whitespace-nowrap text-gray-500 text-xs">
                                                    {new Date(enquiry.created_at).toLocaleDateString()}
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="font-bold text-gray-900">{enquiry.name}</div>
                                                    <div className="text-gray-500 text-xs">{enquiry.email}</div>
                                                    {enquiry.phone && <div className="text-gray-400 text-[10px]">{enquiry.phone}</div>}
                                                </td>
                                                <td className="px-6 py-4">
                                                    <p className="text-gray-600 line-clamp-2 max-w-xs">{enquiry.message}</p>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <select
                                                        value={enquiry.status}
                                                        onChange={(e) => updateStatus(enquiry.id, e.target.value)}
                                                        className={`text-[10px] font-bold uppercase tracking-widest rounded-full px-3 py-1 border-none focus:ring-0 cursor-pointer ${statusColors[enquiry.status]}`}
                                                    >
                                                        <option value="pending">Pending</option>
                                                        <option value="responding">Responding</option>
                                                        <option value="resolved">Resolved</option>
                                                    </select>
                                                </td>
                                                <td className="px-6 py-4 text-right">
                                                    <button
                                                        onClick={() => deleteEnquiry(enquiry.id)}
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
