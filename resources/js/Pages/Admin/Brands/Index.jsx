import React from 'react';
import { Head, Link, usePage } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';

export default function Index({ brands }) {
    return (
        <AdminLayout>
            <Head title="Manage Brands - Admin" />

            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800">Brands</h2>
                <Link
                    href={route('admin.brands.create')}
                    className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2 px-4 rounded transition duration-200 shadow-md flex items-center"
                >
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                    </svg>
                    Create New
                </Link>
            </div>

            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Name
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Slug
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Logo
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {brands.map((brand) => (
                                <tr key={brand.id}>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm font-medium text-gray-900">{brand.name}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-gray-500">{brand.slug}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        {brand.logo ? (
                                            <img src={`/storage/${brand.logo}`} alt={brand.name} className="h-10 w-auto rounded" />
                                        ) : (
                                            <span className="text-gray-400 text-xs italic">No logo</span>
                                        )}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                        <div className="flex space-x-3">
                                            <Link href={route('admin.brands.edit', brand.id)} className="text-indigo-600 hover:text-indigo-900">
                                                Edit
                                            </Link>
                                            <Link href={route('admin.brands.destroy', brand.id)} method="delete" as="button" className="text-red-600 hover:text-red-900">
                                                Delete
                                            </Link>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {brands.length === 0 && (
                <div className="text-center py-10 text-gray-500 bg-white shadow rounded mt-4">
                    No brands found. Create your first brand to get started.
                </div>
            )}
        </AdminLayout>
    );
}
