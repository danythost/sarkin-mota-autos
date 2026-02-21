import React from 'react';
import { Head, Link, router } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';

const categoryColors = {
    showroom: 'bg-blue-100 text-blue-700',
    event: 'bg-purple-100 text-purple-700',
    delivery: 'bg-green-100 text-green-700',
    sold: 'bg-amber-100 text-amber-700',
};

export default function GalleryIndex({ galleries }) {
    const handleDelete = (id) => {
        if (confirm('Delete this gallery entry and all its images?')) {
            router.delete(route('admin.gallery.destroy', id));
        }
    };

    return (
        <AdminLayout>
            <Head title="Gallery Management" />
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-gray-900">Gallery</h1>
                <Link href={route('admin.gallery.create')} className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-2 px-5 rounded-lg text-sm transition">
                    + Add Gallery
                </Link>
            </div>

            <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
                <table className="min-w-full divide-y divide-gray-100">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase">Cover</th>
                            <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase">Title</th>
                            <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase">Category</th>
                            <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase">Images</th>
                            <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase">Featured</th>
                            <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase">Date</th>
                            <th className="px-6 py-3 text-right text-xs font-bold text-gray-500 uppercase">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                        {galleries.data.length === 0 && (
                            <tr>
                                <td colSpan={7} className="px-6 py-12 text-center text-gray-400">No gallery entries yet. <Link href={route('admin.gallery.create')} className="text-emerald-600 font-bold">Add one</Link></td>
                            </tr>
                        )}
                        {galleries.data.map(gallery => (
                            <tr key={gallery.id} className="hover:bg-gray-50 transition">
                                <td className="px-6 py-3">
                                    {gallery.cover_image ? (
                                        <img src={gallery.cover_image.url} alt={gallery.title} className="w-14 h-10 object-cover rounded-lg" />
                                    ) : (
                                        <div className="w-14 h-10 bg-gray-100 rounded-lg flex items-center justify-center text-gray-300 text-xs">No img</div>
                                    )}
                                </td>
                                <td className="px-6 py-3">
                                    <p className="font-semibold text-gray-900 text-sm">{gallery.title}</p>
                                    {gallery.location && <p className="text-xs text-gray-400">{gallery.location}</p>}
                                </td>
                                <td className="px-6 py-3">
                                    <span className={`inline-block px-2 py-1 rounded-full text-xs font-bold capitalize ${categoryColors[gallery.category]}`}>
                                        {gallery.category}
                                    </span>
                                </td>
                                <td className="px-6 py-3 text-sm text-gray-600">{gallery.images_count}</td>
                                <td className="px-6 py-3">
                                    {gallery.is_featured && (
                                        <span className="bg-yellow-100 text-yellow-700 px-2 py-0.5 rounded-full text-xs font-bold">Featured</span>
                                    )}
                                </td>
                                <td className="px-6 py-3 text-sm text-gray-500">
                                    {gallery.event_date ? new Date(gallery.event_date).toLocaleDateString('en-NG', { day: 'numeric', month: 'short', year: 'numeric' }) : '—'}
                                </td>
                                <td className="px-6 py-3 text-right space-x-3">
                                    <Link href={route('admin.gallery.edit', gallery.id)} className="text-emerald-600 hover:text-emerald-800 text-sm font-medium">Edit</Link>
                                    <button onClick={() => handleDelete(gallery.id)} className="text-red-500 hover:text-red-700 text-sm font-medium">Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Pagination */}
            {galleries.links && galleries.links.length > 3 && (
                <div className="mt-4 flex justify-end gap-1">
                    {galleries.links.map((link, i) => (
                        <Link
                            key={i}
                            href={link.url || '#'}
                            className={`px-3 py-1 rounded text-sm border ${link.active ? 'bg-emerald-600 text-white border-emerald-600' : 'border-gray-200 text-gray-600 hover:bg-gray-50'} ${!link.url ? 'opacity-40 cursor-not-allowed' : ''}`}
                            dangerouslySetInnerHTML={{ __html: link.label }}
                        />
                    ))}
                </div>
            )}
        </AdminLayout>
    );
}
