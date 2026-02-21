import React, { useState } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';

export default function Edit({ vehicle, brands }) {
    const { data, setData, post, processing, errors } = useForm({
        _method: 'put',
        brand_id: vehicle.brand_id,
        title: vehicle.title,
        model: vehicle.model,
        year: vehicle.year,
        price: vehicle.price,
        mileage: vehicle.mileage,
        transmission: vehicle.transmission,
        fuel_type: vehicle.fuel_type,
        engine: vehicle.engine || '',
        color: vehicle.color || '',
        condition: vehicle.condition,
        description: vehicle.description || '',
        status: vehicle.status,
        is_featured: Boolean(vehicle.is_featured),
        images: [],
        deleted_images: [],
    });

    const [imagePreviews, setImagePreviews] = useState([]);
    const [existingImages, setExistingImages] = useState(vehicle.images || []);

    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);
        setData('images', [...data.images, ...files]);

        const newPreviews = files.map(file => URL.createObjectURL(file));
        setImagePreviews([...imagePreviews, ...newPreviews]);
    };

    const removeNewImage = (index) => {
        const newImages = [...data.images];
        newImages.splice(index, 1);
        setData('images', newImages);

        const newPreviews = [...imagePreviews];
        newPreviews.splice(index, 1);
        setImagePreviews(newPreviews);
    };

    const removeExistingImage = (imageId) => {
        setExistingImages(existingImages.filter(img => img.id !== imageId));
        setData('deleted_images', [...data.deleted_images, imageId]);
    };

    const submit = (e) => {
        e.preventDefault();
        post(route('admin.vehicles.update', vehicle.id));
    };

    return (
        <AdminLayout>
            <Head title="Edit Vehicle - Admin" />

            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800">Edit Vehicle</h2>
                <Link
                    href={route('admin.vehicles.index')}
                    className="text-gray-600 hover:text-gray-900 font-medium"
                >
                    &larr; Back to Vehicles
                </Link>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-6">
                <form onSubmit={submit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Brand */}
                        <div>
                            <label htmlFor="brand_id" className="block text-sm font-medium text-gray-700">Brand</label>
                            <select
                                id="brand_id"
                                value={data.brand_id}
                                onChange={(e) => setData('brand_id', e.target.value)}
                                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm"
                                required
                            >
                                <option value="">Select Brand</option>
                                {brands.map((brand) => (
                                    <option key={brand.id} value={brand.id}>{brand.name}</option>
                                ))}
                            </select>
                            {errors.brand_id && <p className="mt-1 text-sm text-red-600">{errors.brand_id}</p>}
                        </div>

                        {/* Title */}
                        <div>
                            <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
                            <input
                                type="text"
                                id="title"
                                value={data.title}
                                onChange={(e) => setData('title', e.target.value)}
                                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm"
                                required
                            />
                            {errors.title && <p className="mt-1 text-sm text-red-600">{errors.title}</p>}
                        </div>

                        {/* Model */}
                        <div>
                            <label htmlFor="model" className="block text-sm font-medium text-gray-700">Model</label>
                            <input
                                type="text"
                                id="model"
                                value={data.model}
                                onChange={(e) => setData('model', e.target.value)}
                                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm"
                                required
                            />
                            {errors.model && <p className="mt-1 text-sm text-red-600">{errors.model}</p>}
                        </div>

                        {/* Year */}
                        <div>
                            <label htmlFor="year" className="block text-sm font-medium text-gray-700">Year</label>
                            <input
                                type="number"
                                id="year"
                                value={data.year}
                                onChange={(e) => setData('year', e.target.value)}
                                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm"
                                required
                            />
                            {errors.year && <p className="mt-1 text-sm text-red-600">{errors.year}</p>}
                        </div>

                        {/* Price */}
                        <div>
                            <label htmlFor="price" className="block text-sm font-medium text-gray-700">Price (NGN)</label>
                            <input
                                type="number"
                                id="price"
                                value={data.price}
                                onChange={(e) => setData('price', e.target.value)}
                                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm"
                                required
                            />
                            {errors.price && <p className="mt-1 text-sm text-red-600">{errors.price}</p>}
                        </div>

                        {/* Mileage */}
                        <div>
                            <label htmlFor="mileage" className="block text-sm font-medium text-gray-700">Mileage (km)</label>
                            <input
                                type="number"
                                id="mileage"
                                value={data.mileage}
                                onChange={(e) => setData('mileage', e.target.value)}
                                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm"
                                required
                            />
                            {errors.mileage && <p className="mt-1 text-sm text-red-600">{errors.mileage}</p>}
                        </div>

                        {/* Transmission */}
                        <div>
                            <label htmlFor="transmission" className="block text-sm font-medium text-gray-700">Transmission</label>
                            <select
                                id="transmission"
                                value={data.transmission}
                                onChange={(e) => setData('transmission', e.target.value)}
                                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm"
                                required
                            >
                                <option value="">Select Transmission</option>
                                <option value="Automatic">Automatic</option>
                                <option value="Manual">Manual</option>
                            </select>
                            {errors.transmission && <p className="mt-1 text-sm text-red-600">{errors.transmission}</p>}
                        </div>

                        {/* Fuel Type */}
                        <div>
                            <label htmlFor="fuel_type" className="block text-sm font-medium text-gray-700">Fuel Type</label>
                            <select
                                id="fuel_type"
                                value={data.fuel_type}
                                onChange={(e) => setData('fuel_type', e.target.value)}
                                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm"
                                required
                            >
                                <option value="">Select Fuel Type</option>
                                <option value="Petrol">Petrol</option>
                                <option value="Diesel">Diesel</option>
                                <option value="Electric">Electric</option>
                                <option value="Hybrid">Hybrid</option>
                            </select>
                            {errors.fuel_type && <p className="mt-1 text-sm text-red-600">{errors.fuel_type}</p>}
                        </div>

                        {/* Engine */}
                        <div>
                            <label htmlFor="engine" className="block text-sm font-medium text-gray-700">Engine</label>
                            <input
                                type="text"
                                id="engine"
                                value={data.engine}
                                onChange={(e) => setData('engine', e.target.value)}
                                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm"
                                placeholder="e.g. V6 3.5L"
                            />
                            {errors.engine && <p className="mt-1 text-sm text-red-600">{errors.engine}</p>}
                        </div>

                        {/* Color */}
                        <div>
                            <label htmlFor="color" className="block text-sm font-medium text-gray-700">Color</label>
                            <input
                                type="text"
                                id="color"
                                value={data.color}
                                onChange={(e) => setData('color', e.target.value)}
                                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm"
                            />
                            {errors.color && <p className="mt-1 text-sm text-red-600">{errors.color}</p>}
                        </div>

                        {/* Condition */}
                        <div>
                            <label htmlFor="condition" className="block text-sm font-medium text-gray-700">Condition</label>
                            <select
                                id="condition"
                                value={data.condition}
                                onChange={(e) => setData('condition', e.target.value)}
                                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm"
                                required
                            >
                                <option value="">Select Condition</option>
                                <option value="New">New</option>
                                <option value="Used">Used</option>
                                <option value="Tokunbo">Tokunbo</option>
                            </select>
                            {errors.condition && <p className="mt-1 text-sm text-red-600">{errors.condition}</p>}
                        </div>

                        {/* Status */}
                        <div>
                            <label htmlFor="status" className="block text-sm font-medium text-gray-700">Status</label>
                            <select
                                id="status"
                                value={data.status}
                                onChange={(e) => setData('status', e.target.value)}
                                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm"
                                required
                            >
                                <option value="available">Available</option>
                                <option value="sold">Sold</option>
                                <option value="reserved">Reserved</option>
                            </select>
                            {errors.status && <p className="mt-1 text-sm text-red-600">{errors.status}</p>}
                        </div>
                    </div>

                    {/* Description */}
                    <div>
                        <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
                        <textarea
                            id="description"
                            value={data.description}
                            onChange={(e) => setData('description', e.target.value)}
                            rows={4}
                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm"
                        />
                        {errors.description && <p className="mt-1 text-sm text-red-600">{errors.description}</p>}
                    </div>

                    {/* Is Featured */}
                    <div className="flex items-center">
                        <input
                            id="is_featured"
                            type="checkbox"
                            checked={data.is_featured}
                            onChange={(e) => setData('is_featured', e.target.checked)}
                            className="h-4 w-4 text-emerald-600 focus:ring-emerald-500 border-gray-300 rounded"
                        />
                        <label htmlFor="is_featured" className="ml-2 block text-sm text-gray-900">
                            Mark as Featured Vehicle
                        </label>
                    </div>

                    {/* Images */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Vehicle Images</label>

                        {/* Existing Images */}
                        {existingImages.length > 0 && (
                            <div className="mb-4">
                                <p className="text-xs text-gray-500 mb-2">Current Images</p>
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                    {existingImages.map((img) => (
                                        <div key={img.id} className="relative group">
                                            <img src={`/storage/${img.image_path}`} alt="Vehicle Image" className="h-24 w-full object-cover rounded-md" />
                                            <button
                                                type="button"
                                                onClick={() => removeExistingImage(img.id)}
                                                className="absolute top-1 right-1 bg-red-600 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                                            >
                                                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                                </svg>
                                            </button>
                                            {img.is_cover && (
                                                <div className="absolute bottom-0 left-0 right-0 bg-emerald-600 text-white text-xs text-center py-1 rounded-b-md">
                                                    Cover Image
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* New Images Upload */}
                        <div className="mt-2 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                            <div className="space-y-1 text-center">
                                <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                                    <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                                <div className="flex text-sm text-gray-600">
                                    <label htmlFor="images" className="relative cursor-pointer bg-white rounded-md font-medium text-emerald-600 hover:text-emerald-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-emerald-500">
                                        <span>Upload new images</span>
                                        <input id="images" parseNames="images" type="file" multiple className="sr-only" onChange={handleImageChange} accept="image/*" />
                                    </label>
                                    <p className="pl-1">or drag and drop</p>
                                </div>
                                <p className="text-xs text-gray-500">PNG, JPG, GIF up to 2MB</p>
                            </div>
                        </div>

                        {/* New Images Preview */}
                        {data.images.length > 0 && (
                            <div className="mt-4">
                                <p className="text-xs text-gray-500 mb-2">New Images to Upload</p>
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                    {imagePreviews.map((preview, index) => (
                                        <div key={index} className="relative group">
                                            <img src={preview} alt={`Preview ${index}`} className="h-24 w-full object-cover rounded-md" />
                                            <button
                                                type="button"
                                                onClick={() => removeNewImage(index)}
                                                className="absolute top-1 right-1 bg-red-600 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                                            >
                                                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                                </svg>
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                        {errors.images && <p className="mt-1 text-sm text-red-600">{errors.images}</p>}
                    </div>

                    <div className="flex justify-end pt-4">
                        <button
                            type="submit"
                            disabled={processing}
                            className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2 px-6 rounded shadow-md transition duration-200 disabled:opacity-50"
                        >
                            {processing ? 'Saving...' : 'Update Vehicle'}
                        </button>
                    </div>
                </form>
            </div>
        </AdminLayout>
    );
}
