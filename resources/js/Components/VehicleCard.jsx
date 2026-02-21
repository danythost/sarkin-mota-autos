import React from 'react';
import { Link } from '@inertiajs/react';

export default function VehicleCard({ vehicle }) {
    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('en-NG', {
            style: 'currency',
            currency: 'NGN',
            minimumFractionDigits: 0,
        }).format(amount);
    };

    const coverImage = vehicle.images?.find(img => img.is_cover)?.image_path
        ? `/storage/${vehicle.images.find(img => img.is_cover).image_path}`
        : 'https://placehold.co/600x400?text=No+Image';

    return (
        <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
            <div className="relative h-48">
                <img
                    src={coverImage}
                    alt={vehicle.title}
                    className="w-full h-full object-cover"
                />
                <div className="absolute top-2 right-2 bg-emerald-600 text-white text-xs font-bold px-2 py-1 rounded">
                    {vehicle.condition}
                </div>
            </div>
            <div className="p-4">
                <div className="flex justify-between items-start mb-2">
                    <div>
                        <p className="text-xs text-gray-500 uppercase tracking-wide font-semibold">{vehicle.brand.name}</p>
                        <h3 className="text-lg font-bold text-gray-900 truncate">{vehicle.title}</h3>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-2 mb-4 text-sm text-gray-600">
                    <div className="flex items-center">
                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        {vehicle.year}
                    </div>
                    <div className="flex items-center">
                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                        {vehicle.fuel_type}
                    </div>
                    <div className="flex items-center">
                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                        </svg>
                        {vehicle.transmission}
                    </div>
                    <div className="flex items-center">
                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                        </svg>
                        {vehicle.mileage.toLocaleString()} km
                    </div>
                </div>

                <div className="flex justify-between items-center border-t pt-3">
                    <span className="text-xl font-bold text-emerald-600">{formatCurrency(vehicle.price)}</span>
                    <Link
                        href={route('vehicles.show', vehicle.slug)}
                        className="text-sm font-medium text-emerald-600 hover:text-emerald-800"
                    >
                        View Details →
                    </Link>
                </div>
            </div>
        </div>
    );
}
