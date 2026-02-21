import React from 'react';
import { Head } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';
import VehicleCard from '@/Components/VehicleCard';
import FilterSidebar from '@/Components/FilterSidebar';
import PaginatedLinks from '@/Components/PaginatedLinks';

export default function Index({ vehicles, brands, filters }) {
    return (
        <AppLayout>
            <Head title="Browse Vehicles - Sarkin Moto Autos" />

            <div className="bg-gray-100 min-h-screen py-10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col md:flex-row gap-8">
                        {/* Sidebar Filters */}
                        <div className="w-full md:w-1/4">
                            <FilterSidebar brands={brands} filters={filters} />
                        </div>

                        {/* Vehicle Grid */}
                        <div className="w-full md:w-3/4">
                            <div className="mb-6 flex justify-between items-center">
                                <h1 className="text-2xl font-bold text-gray-900">
                                    {vehicles.total} {vehicles.total === 1 ? 'Vehicle' : 'Vehicles'} Found
                                </h1>
                                <div className="text-sm text-gray-500">
                                    Showing {vehicles.from} - {vehicles.to} of {vehicles.total}
                                </div>
                            </div>

                            {vehicles.data.length > 0 ? (
                                <>
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                        {vehicles.data.map(vehicle => (
                                            <VehicleCard key={vehicle.id} vehicle={vehicle} />
                                        ))}
                                    </div>
                                    <PaginatedLinks links={vehicles.links} />
                                </>
                            ) : (
                                <div className="bg-white p-8 rounded-lg shadow-sm text-center">
                                    <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    <h3 className="mt-2 text-sm font-medium text-gray-900">No vehicles found</h3>
                                    <p className="mt-1 text-sm text-gray-500">Try adjusting your search criteria.</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
