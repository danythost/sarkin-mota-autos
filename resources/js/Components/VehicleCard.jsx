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

    return (
        <Link
            href={route('vehicles.show', vehicle.slug)}
            className="group block bg-white dark:bg-gray-900 rounded-3xl overflow-hidden border border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-2xl hover:shadow-emerald-950/20 dark:hover:shadow-black transition-all duration-500 hover:-translate-y-2"
        >
            <div className="relative h-64 overflow-hidden">
                {vehicle.images && vehicle.images.length > 0 ? (
                    <img
                        src={`/storage/${vehicle.images[0].image_path}`}
                        alt={vehicle.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                ) : (
                    <div className="w-full h-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                        <svg className="w-16 h-16 text-gray-300 dark:text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14" />
                        </svg>
                    </div>
                )}
                <div className="absolute top-4 right-4 h-full flex flex-col items-end space-y-2">
                    <span className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-gray-900 dark:text-emerald-400 border border-gray-100 dark:border-gray-800 shadow-sm group-hover:bg-emerald-600 group-hover:text-white transition-colors duration-300">
                        {vehicle.condition}
                    </span>
                    {vehicle.is_featured && (
                        <span className="bg-yellow-400 text-yellow-950 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-tighter shadow-lg scale-100 group-hover:scale-110 transition-transform">
                            Featured
                        </span>
                    )}
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>

            <div className="p-6 relative">
                <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-black text-gray-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors duration-300 line-clamp-1">
                        {vehicle.title}
                    </h3>
                </div>

                <div className="flex items-center space-x-4 mb-4 text-gray-500 dark:text-gray-400 text-sm">
                    <div className="flex items-center">
                        <svg className="w-4 h-4 mr-1.5 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                        {vehicle.year}
                    </div>
                    <div className="flex items-center">
                        <svg className="w-4 h-4 mr-1.5 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                        {vehicle.transmission}
                    </div>
                </div>
                <div className="flex items-center justify-between mt-6 pt-6 border-t border-gray-100 dark:border-gray-800 transition-colors">
                    <div className="text-2xl font-black bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                        ₦{Number(vehicle.price).toLocaleString()}
                    </div>
                    <div className="flex items-center text-xs font-bold text-emerald-600 dark:text-emerald-400 group-hover:translate-x-1 transition-all">
                        View Details <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M9 5l7 7-7 7" /></svg>
                    </div>
                </div>
            </div>
        </Link>
    );
}
