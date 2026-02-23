import React from 'react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Head, router } from '@inertiajs/react';

export default function Index({ feedbacks }) {
    const togglePublish = (id, is_published) => {
        router.patch(route('admin.feedback.update', id), { is_published: !is_published });
    };

    const deleteFeedback = (id) => {
        if (confirm('Are you sure you want to delete this feedback?')) {
            router.delete(route('admin.feedback.destroy', id));
        }
    };

    return (
        <AdminLayout>
            <Head title="Manage Feedback" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg border border-gray-100">
                        <div className="p-6 text-gray-900 font-bold border-b border-gray-100">
                            Customer Feedback
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left text-sm">
                                <thead className="bg-gray-50 text-gray-700 uppercase font-black text-[10px] tracking-widest">
                                    <tr>
                                        <th className="px-6 py-4">Status</th>
                                        <th className="px-6 py-4">Customer</th>
                                        <th className="px-6 py-4">Rating</th>
                                        <th className="px-6 py-4">Comment</th>
                                        <th className="px-6 py-4 text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                    {feedbacks.length === 0 ? (
                                        <tr>
                                            <td colSpan="5" className="px-6 py-10 text-center text-gray-400">No feedback found.</td>
                                        </tr>
                                    ) : (
                                        feedbacks.map((item) => (
                                            <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                                                <td className="px-6 py-4">
                                                    <button
                                                        onClick={() => togglePublish(item.id, item.is_published)}
                                                        className={`text-[10px] font-black uppercase tracking-widest rounded-full px-4 py-1.5 transition-all ${item.is_published ? 'bg-emerald-100 text-emerald-700 border border-emerald-200' : 'bg-gray-100 text-gray-500 border border-gray-200'}`}
                                                    >
                                                        {item.is_published ? 'Published' : 'Hidden'}
                                                    </button>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="font-bold text-gray-900">{item.name}</div>
                                                    <div className="text-gray-500 text-xs">{item.email}</div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="flex text-emerald-500">
                                                        {[...Array(5)].map((_, i) => (
                                                            <svg key={i} className={`w-4 h-4 ${i < item.rating ? 'fill-current' : 'text-gray-200'}`} viewBox="0 0 20 20">
                                                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                                            </svg>
                                                        ))}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <p className="text-gray-600 line-clamp-2 max-w-xs">{item.comment}</p>
                                                </td>
                                                <td className="px-6 py-4 text-right">
                                                    <button
                                                        onClick={() => deleteFeedback(item.id)}
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
