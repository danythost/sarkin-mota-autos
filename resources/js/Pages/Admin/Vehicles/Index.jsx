import React from 'react';
import { Head, Link, usePage } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import PaginatedLinks from '@/Components/PaginatedLinks';

export default function Index({ vehicles }) {
    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('en-NG', {
            style: 'currency',
            currency: 'NGN',
            minimumFractionDigits: 0,
        }).format(amount);
    };

    return (
        <AdminLayout>
            <Head title="Manage Vehicles - Admin" />

            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800">Vehicles</h2>
                <Link
                    href={route('admin.vehicles.create')}
                    className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2 px-4 rounded transition duration-200 shadow-md flex items-center"
                >
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                    </svg>
                    Add Vehicle
                </Link>
            </div>

            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Vehicle
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Price
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Status
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Featured
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {vehicles.data.map((vehicle) => (
                                <tr key={vehicle.id}>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center">
                                            <div className="ml-4">
                                                <div className="text-sm font-medium text-gray-900">{vehicle.year} {vehicle.brand?.name} {vehicle.model}</div>
                                                <div className="text-sm text-gray-500">{vehicle.title}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-gray-900">{formatCurrency(vehicle.price)}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                                            ${vehicle.status === 'available' ? 'bg-green-100 text-green-800' :
                                                vehicle.status === 'sold' ? 'bg-red-100 text-red-800' :
                                                    'bg-yellow-100 text-yellow-800'}`}>
                                            {vehicle.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {vehicle.is_featured ? (
                                            <span className="text-emerald-600 font-bold">Yes</span>
                                        ) : (
                                            <span className="text-gray-400">No</span>
                                        )}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                        <div className="flex space-x-3">
                                            <Link href={route('vehicles.show', vehicle.slug)} className="text-gray-600 hover:text-gray-900" target="_blank">
                                                View
                                            </Link>
                                            <Link href={route('admin.vehicles.edit', vehicle.id)} className="text-indigo-600 hover:text-indigo-900">
                                                Edit
                                            </Link>
                                            <Link href={route('admin.vehicles.destroy', vehicle.id)} method="delete" as="button" className="text-red-600 hover:text-red-900">
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

            <div className="mt-4">
                <PaginatedLinks links={vehicles.links} />
            </div>

            {vehicles.data.length === 0 && (
                <div className="text-center py-10 text-gray-500 bg-white shadow rounded mt-4">
                    No vehicles found. Add your first vehicle to get started.
                </div>
            )}
        </AdminLayout>
    );
}
