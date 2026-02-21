import React, { useState } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';

export default function Edit({ brand }) {
    const { data, setData, post, processing, errors } = useForm({
        _method: 'put',
        name: brand.name,
        logo: null,
    });

    const [logoPreview, setLogoPreview] = useState(brand.logo ? `/storage/${brand.logo}` : null);

    const handleLogoChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setData('logo', file);
            setLogoPreview(URL.createObjectURL(file));
        }
    };

    const submit = (e) => {
        e.preventDefault();
        post(route('admin.brands.update', brand.id));
    };

    return (
        <AdminLayout>
            <Head title="Edit Brand - Admin" />

            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800">Edit Brand</h2>
                <Link
                    href={route('admin.brands.index')}
                    className="text-gray-600 hover:text-gray-900 font-medium"
                >
                    &larr; Back to Brands
                </Link>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-6 max-w-2xl">
                <form onSubmit={submit} className="space-y-6">
                    {/* Name */}
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                        <input
                            type="text"
                            id="name"
                            value={data.name}
                            onChange={(e) => setData('name', e.target.value)}
                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm"
                            required
                        />
                        {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
                    </div>

                    {/* Logo */}
                    <div>
                        <label htmlFor="logo" className="block text-sm font-medium text-gray-700">Logo</label>
                        <div className="mt-1 flex items-center space-x-4">
                            <div className="flex-shrink-0 h-12 w-12 border border-gray-300 rounded-md overflow-hidden bg-gray-100 flex items-center justify-center">
                                {logoPreview ? (
                                    <img src={logoPreview} alt="Logo Preview" className="h-full w-full object-contain" />
                                ) : (
                                    <svg className="h-6 w-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                    </svg>
                                )}
                            </div>
                            <input
                                type="file"
                                id="logo"
                                onChange={handleLogoChange}
                                className="block w-full text-sm text-gray-500
                                  file:mr-4 file:py-2 file:px-4
                                  file:rounded-full file:border-0
                                  file:text-sm file:font-semibold
                                  file:bg-emerald-50 file:text-emerald-700
                                  hover:file:bg-emerald-100"
                                accept="image/*"
                            />
                        </div>
                        {errors.logo && <p className="mt-1 text-sm text-red-600">{errors.logo}</p>}
                    </div>

                    <div className="flex justify-end pt-4">
                        <button
                            type="submit"
                            disabled={processing}
                            className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2 px-6 rounded shadow-md transition duration-200 disabled:opacity-50"
                        >
                            {processing ? 'Saving...' : 'Update Brand'}
                        </button>
                    </div>
                </form>
            </div>
        </AdminLayout>
    );
}
