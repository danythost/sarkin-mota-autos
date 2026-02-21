import React, { useState } from 'react';
import { Head, Link, useForm, router } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';

const inputClass = "w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent bg-white";
const labelClass = "block text-sm font-semibold text-gray-700 mb-1";

export default function GalleryEdit({ gallery }) {
    const [newPreviews, setNewPreviews] = useState([]);
    const [coverIndex, setCoverIndex] = useState(-1);

    const { data, setData, post, processing, errors } = useForm({
        _method: 'PUT',
        title: gallery.title,
        category: gallery.category,
        description: gallery.description || '',
        event_date: gallery.event_date ? gallery.event_date.substring(0, 10) : '',
        location: gallery.location || '',
        is_featured: gallery.is_featured,
        video: null,
        remove_video: false,
        images: [],
        cover_index: -1,
    });

    const handleImages = (e) => {
        const files = Array.from(e.target.files);
        setData('images', files);
        setNewPreviews(files.map(f => URL.createObjectURL(f)));
        setCoverIndex(-1);
    };

    const handleSetCover = (idx) => {
        setCoverIndex(idx);
        setData('cover_index', idx);
    };

    const handleSetExistingCover = (imageId) => {
        router.patch(route('admin.gallery-images.cover', imageId));
    };

    const handleDeleteImage = (imageId) => {
        if (confirm('Remove this image?')) {
            router.delete(route('admin.gallery-images.destroy', imageId));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('admin.gallery.update', gallery.id), { forceFormData: true });
    };

    return (
        <AdminLayout>
            <Head title={`Edit — ${gallery.title}`} />
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-bold text-gray-900">Edit Gallery</h1>
                <Link href={route('admin.gallery.index')} className="text-sm text-gray-500 hover:text-gray-700">← Back</Link>
            </div>

            <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-5 bg-white rounded-2xl shadow-sm p-6">
                    <h2 className="font-bold text-gray-800 border-b pb-3">Gallery Details</h2>

                    <div>
                        <label className={labelClass}>Title <span className="text-red-500">*</span></label>
                        <input type="text" className={inputClass} value={data.title} onChange={e => setData('title', e.target.value)} />
                        {errors.title && <p className="text-xs text-red-500 mt-1">{errors.title}</p>}
                    </div>

                    <div className="grid sm:grid-cols-2 gap-5">
                        <div>
                            <label className={labelClass}>Category</label>
                            <select className={inputClass} value={data.category} onChange={e => setData('category', e.target.value)}>
                                <option value="showroom">Showroom</option>
                                <option value="event">Event</option>
                                <option value="delivery">Delivery</option>
                                <option value="sold">Sold</option>
                            </select>
                        </div>
                        <div>
                            <label className={labelClass}>Location</label>
                            <input type="text" className={inputClass} value={data.location} onChange={e => setData('location', e.target.value)} />
                        </div>
                    </div>

                    {data.category === 'event' && (
                        <div>
                            <label className={labelClass}>Event Date</label>
                            <input type="date" className={inputClass} value={data.event_date} onChange={e => setData('event_date', e.target.value)} />
                        </div>
                    )}

                    <div>
                        <label className={labelClass}>Description</label>
                        <textarea className={inputClass} rows={4} value={data.description} onChange={e => setData('description', e.target.value)} />
                    </div>

                    {/* Video */}
                    <div>
                        <label className={labelClass}>Advert video (optional)</label>
                        {gallery.video_url ? (
                            <div className="space-y-2">
                                <video src={gallery.video_url} controls className="w-full max-w-md rounded-lg border border-gray-200" />
                                <label className="flex items-center gap-2 text-sm text-gray-600">
                                    <input type="checkbox" checked={data.remove_video} onChange={e => setData('remove_video', e.target.checked)} />
                                    Remove current video
                                </label>
                                <p className="text-xs text-gray-500">Or upload a new file to replace:</p>
                                <input type="file" className={inputClass} accept="video/mp4,video/webm,video/quicktime" onChange={e => setData('video', e.target.files[0] || null)} />
                            </div>
                        ) : (
                            <>
                                <p className="text-xs text-gray-500 mb-2">Upload a short clip (MP4, WebM, MOV, max 50MB)</p>
                                <input type="file" className={inputClass} accept="video/mp4,video/webm,video/quicktime" onChange={e => setData('video', e.target.files[0] || null)} />
                            </>
                        )}
                        {errors.video && <p className="text-xs text-red-500 mt-1">{errors.video}</p>}
                    </div>

                    {/* Existing Images */}
                    {gallery.images && gallery.images.length > 0 && (
                        <div>
                            <label className={`${labelClass} mb-2`}>Existing Images</label>
                            <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
                                {gallery.images.map(img => (
                                    <div key={img.id} className={`relative group rounded-lg overflow-hidden border-2 ${img.is_cover ? 'border-emerald-500' : 'border-transparent'}`}>
                                        <img src={img.url} className="w-full h-16 object-cover" alt="" />
                                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition flex flex-col items-center justify-center gap-1">
                                            <button type="button" onClick={() => handleSetExistingCover(img.id)} className="text-white bg-emerald-600 text-xs px-2 py-0.5 rounded font-bold w-full text-center">Cover</button>
                                            <button type="button" onClick={() => handleDeleteImage(img.id)} className="text-white bg-red-600 text-xs px-2 py-0.5 rounded font-bold w-full text-center">Delete</button>
                                        </div>
                                        {img.is_cover && <div className="absolute bottom-0 left-0 right-0 bg-emerald-600 text-white text-center text-xs py-0.5 font-bold">Cover</div>}
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Add New Images */}
                    <div>
                        <label className={labelClass}>Add More Images</label>
                        <label className="flex flex-col items-center justify-center w-full h-28 border-2 border-dashed border-gray-200 rounded-xl cursor-pointer hover:border-emerald-400 hover:bg-emerald-50/30 transition">
                            <svg className="w-7 h-7 text-gray-300 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4v16m8-8H4" /></svg>
                            <span className="text-xs text-gray-400">Upload more images</span>
                            <input type="file" className="hidden" multiple accept="image/*" onChange={handleImages} />
                        </label>
                        {newPreviews.length > 0 && (
                            <div className="grid grid-cols-4 sm:grid-cols-6 gap-2 mt-2">
                                {newPreviews.map((url, idx) => (
                                    <div key={idx} onClick={() => handleSetCover(idx)} className={`relative cursor-pointer rounded-lg overflow-hidden border-2 transition ${coverIndex === idx ? 'border-emerald-500 ring-2 ring-emerald-300' : 'border-transparent'}`}>
                                        <img src={url} className="w-full h-16 object-cover" alt="" />
                                        {coverIndex === idx && <div className="absolute bottom-0 left-0 right-0 bg-emerald-600 text-white text-center text-xs py-0.5 font-bold">Cover</div>}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                {/* Sidebar */}
                <div className="space-y-5">
                    <div className="bg-white rounded-2xl shadow-sm p-6 space-y-4">
                        <h2 className="font-bold text-gray-800 border-b pb-3">Settings</h2>
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-semibold text-gray-700">Featured</p>
                                <p className="text-xs text-gray-400">Show in Event Spotlight</p>
                            </div>
                            <button type="button" onClick={() => setData('is_featured', !data.is_featured)} className={`w-12 h-6 rounded-full transition-colors duration-300 flex items-center px-1 ${data.is_featured ? 'bg-emerald-500' : 'bg-gray-200'}`}>
                                <span className={`w-4 h-4 bg-white rounded-full shadow transition-transform duration-300 ${data.is_featured ? 'translate-x-6' : 'translate-x-0'}`} />
                            </button>
                        </div>
                    </div>

                    <div className="bg-white rounded-2xl shadow-sm p-6 space-y-3">
                        <button type="submit" disabled={processing} className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3 rounded-xl transition disabled:opacity-60">
                            {processing ? 'Saving...' : 'Save Changes'}
                        </button>
                        <Link href={route('admin.gallery.index')} className="block w-full text-center border border-gray-200 text-gray-600 font-medium py-3 rounded-xl hover:bg-gray-50 transition text-sm">
                            Cancel
                        </Link>
                    </div>
                </div>
            </form>
        </AdminLayout>
    );
}
