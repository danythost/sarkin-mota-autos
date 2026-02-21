import React, { useState } from 'react';
import { router } from '@inertiajs/react';

export default function FilterSidebar({ brands, filters }) {
    const [values, setValues] = useState({
        brand: filters.brand || '',
        min_price: filters.min_price || '',
        max_price: filters.max_price || '',
        year: filters.year || '',
        transmission: filters.transmission || '',
        fuel_type: filters.fuel_type || '',
    });

    const handleChange = (e) => {
        const key = e.target.name;
        const value = e.target.value;
        setValues(values => ({
            ...values,
            [key]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Filter out empty values
        const query = Object.keys(values).reduce((acc, key) => {
            if (values[key]) {
                acc[key] = values[key];
            }
            return acc;
        }, {});

        router.get(route('vehicles.index'), query, {
            preserveState: true,
            preserveScroll: true,
        });
    };

    const handleReset = () => {
        setValues({
            brand: '',
            min_price: '',
            max_price: '',
            year: '',
            transmission: '',
            fuel_type: '',
        });
        router.get(route('vehicles.index'));
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Filter Vehicles</h3>
            <form onSubmit={handleSubmit}>
                <div className="space-y-4">
                    {/* Brand */}
                    <div>
                        <label htmlFor="brand" className="block text-sm font-medium text-gray-700">Brand</label>
                        <select
                            id="brand"
                            name="brand"
                            value={values.brand}
                            onChange={handleChange}
                            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm rounded-md"
                        >
                            <option value="">All Brands</option>
                            {brands.map((brand) => (
                                <option key={brand.id} value={brand.slug}>{brand.name}</option>
                            ))}
                        </select>
                    </div>

                    {/* Price Range */}
                    <div>
                        <label htmlFor="min_price" className="block text-sm font-medium text-gray-700">Min Price</label>
                        <input
                            type="number"
                            name="min_price"
                            id="min_price"
                            value={values.min_price}
                            onChange={handleChange}
                            className="mt-1 focus:ring-emerald-500 focus:border-emerald-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                            placeholder="Min"
                        />
                    </div>
                    <div>
                        <label htmlFor="max_price" className="block text-sm font-medium text-gray-700">Max Price</label>
                        <input
                            type="number"
                            name="max_price"
                            id="max_price"
                            value={values.max_price}
                            onChange={handleChange}
                            className="mt-1 focus:ring-emerald-500 focus:border-emerald-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                            placeholder="Max"
                        />
                    </div>

                    {/* Year */}
                    <div>
                        <label htmlFor="year" className="block text-sm font-medium text-gray-700">Year</label>
                        <select
                            id="year"
                            name="year"
                            value={values.year}
                            onChange={handleChange}
                            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm rounded-md"
                        >
                            <option value="">Any Year</option>
                            {Array.from({ length: 20 }, (_, i) => new Date().getFullYear() - i).map(year => (
                                <option key={year} value={year}>{year}</option>
                            ))}
                        </select>
                    </div>

                    {/* Transmission */}
                    <div>
                        <label htmlFor="transmission" className="block text-sm font-medium text-gray-700">Transmission</label>
                        <select
                            id="transmission"
                            name="transmission"
                            value={values.transmission}
                            onChange={handleChange}
                            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm rounded-md"
                        >
                            <option value="">Any Transmission</option>
                            <option value="Automatic">Automatic</option>
                            <option value="Manual">Manual</option>
                        </select>
                    </div>

                    {/* Fuel Type */}
                    <div>
                        <label htmlFor="fuel_type" className="block text-sm font-medium text-gray-700">Fuel Type</label>
                        <select
                            id="fuel_type"
                            name="fuel_type"
                            value={values.fuel_type}
                            onChange={handleChange}
                            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm rounded-md"
                        >
                            <option value="">Any Fuel Type</option>
                            <option value="Petrol">Petrol</option>
                            <option value="Diesel">Diesel</option>
                            <option value="Electric">Electric</option>
                            <option value="Hybrid">Hybrid</option>
                        </select>
                    </div>

                    <div className="flex space-x-2 pt-4">
                        <button
                            type="submit"
                            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
                        >
                            Filter
                        </button>
                        <button
                            type="button"
                            onClick={handleReset}
                            className="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
                        >
                            Reset
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
}
