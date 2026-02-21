import React, { useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';
import VehicleCard from '@/Components/VehicleCard';

export default function Show({ vehicle, similarVehicles }) {
    const [activeImage, setActiveImage] = useState(
        vehicle.images && vehicle.images.length > 0
            ? `/storage/${vehicle.images.find(img => img.is_cover)?.image_path || vehicle.images[0].image_path}`
            : 'https://placehold.co/600x400?text=No+Image'
    );

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('en-NG', {
            style: 'currency',
            currency: 'NGN',
            minimumFractionDigits: 0,
        }).format(amount);
    };

    return (
        <AppLayout>
            <Head title={`${vehicle.title} - Sarkin Moto Autos`} />

            <div className="bg-gray-50 min-h-screen py-10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0">
                            {/* Image Gallery */}
                            <div className="col-span-1 md:col-span-2 p-6">
                                <div className="mb-4 aspect-w-16 aspect-h-9 rounded-lg overflow-hidden bg-gray-200 h-96">
                                    <img src={activeImage} alt={vehicle.title} className="w-full h-full object-cover object-center" />
                                </div>
                                <div className="grid grid-cols-4 gap-2">
                                    {vehicle.images.map((image, index) => (
                                        <button
                                            key={index}
                                            onClick={() => setActiveImage(`/storage/${image.image_path}`)}
                                            className={`aspect-w-3 aspect-h-2 rounded-md overflow-hidden border-2 ${activeImage.includes(image.image_path) ? 'border-emerald-500' : 'border-transparent'}`}
                                        >
                                            <img src={`/storage/${image.image_path}`} alt={`View ${index + 1}`} className="w-full h-full object-cover" />
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Details Sidebar */}
                            <div className="col-span-1 p-6 bg-gray-50 border-l border-gray-100">
                                <div className="mb-2">
                                    <span className="text-emerald-600 font-bold uppercase tracking-wide text-xs">{vehicle.brand.name}</span>
                                    <h1 className="text-3xl font-bold text-gray-900">{vehicle.title}</h1>
                                </div>
                                <div className="text-3xl font-bold text-emerald-600 mb-6">{formatCurrency(vehicle.price)}</div>

                                <div className="space-y-4 mb-8">
                                    <div className="flex justify-between border-b pb-2">
                                        <span className="text-gray-500">Year</span>
                                        <span className="font-semibold">{vehicle.year}</span>
                                    </div>
                                    <div className="flex justify-between border-b pb-2">
                                        <span className="text-gray-500">Mileage</span>
                                        <span className="font-semibold">{vehicle.mileage.toLocaleString()} km</span>
                                    </div>
                                    <div className="flex justify-between border-b pb-2">
                                        <span className="text-gray-500">Transmission</span>
                                        <span className="font-semibold">{vehicle.transmission}</span>
                                    </div>
                                    <div className="flex justify-between border-b pb-2">
                                        <span className="text-gray-500">Fuel Type</span>
                                        <span className="font-semibold">{vehicle.fuel_type}</span>
                                    </div>
                                    <div className="flex justify-between border-b pb-2">
                                        <span className="text-gray-500">Condition</span>
                                        <span className="font-semibold">{vehicle.condition}</span>
                                    </div>
                                    <div className="flex justify-between border-b pb-2">
                                        <span className="text-gray-500">Engine</span>
                                        <span className="font-semibold">{vehicle.engine || 'N/A'}</span>
                                    </div>
                                    <div className="flex justify-between border-b pb-2">
                                        <span className="text-gray-500">Color</span>
                                        <span className="font-semibold">{vehicle.color || 'N/A'}</span>
                                    </div>
                                </div>

                                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                                    <h3 className="text-lg font-bold mb-4">Interested?</h3>
                                    <p className="text-sm text-gray-600 mb-4">Contact us to schedule a test drive or make an offer.</p>
                                    <div className="space-y-3">
                                        <a
                                            href={`tel:+2348000000000`}
                                            className="block w-full text-center bg-gray-800 hover:bg-gray-900 text-white font-bold py-3 rounded transition duration-300"
                                        >
                                            Call Us
                                        </a>
                                        <a
                                            href={`https://wa.me/2348000000000?text=I'm interested in the ${vehicle.year} ${vehicle.title}`}
                                            className="block w-full text-center bg-green-500 hover:bg-green-600 text-white font-bold py-3 rounded transition duration-300"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            WhatsApp
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Description Section */}
                        <div className="border-t border-gray-200 p-8">
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">Description</h2>
                            <div className="prose max-w-none text-gray-700 whitespace-pre-line">
                                {vehicle.description || 'No description available.'}
                            </div>
                        </div>
                    </div>

                    {/* Similar Vehicles */}
                    {similarVehicles.length > 0 && (
                        <div className="mt-12">
                            <h2 className="text-2xl font-bold text-gray-900 mb-6">Similar Vehicles</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                                {similarVehicles.map(vehicle => (
                                    <VehicleCard key={vehicle.id} vehicle={vehicle} />
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </AppLayout>
    );
}
