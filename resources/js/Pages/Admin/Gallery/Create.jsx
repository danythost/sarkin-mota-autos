import React, { useState } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';

const inputClass = "w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent bg-white";
const labelClass = "block text-sm font-semibold text-gray-700 mb-1";

export default function GalleryCreate() {
    const [previews, setPreviews] = useState([]);
    const [coverIndex, setCoverIndex] = useState(0);

    const { data, setData, post, processing, errors } = useForm({
        title: '',
        category: 'showroom',
        description: '',
        event_date: '',
        location: '',
        is_featured: false,
        video: null,
        images: [],
        cover_index: 0,
    });

    const handleImages = (e) => {
        const files = Array.from(e.target.files);
        setData('images', files);
        const urls = files.map(f => URL.createObjectURL(f));
        setPreviews(urls);
        setCoverIndex(0);
        setData('cover_index', 0);
    };

    const handleSetCover = (idx) => {
        setCoverIndex(idx);
        setData('cover_index', idx);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('admin.gallery.store'), {
            forceFormData: true,
        });
    };

    return (
        <AdminLayout>
            <Head title="Add Gallery Entry" />
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-bold text-gray-900">Add Gallery Entry</h1>
                <Link href={route('admin.gallery.index')} className="text-sm text-gray-500 hover:text-gray-700">← Back to Gallery</Link>
            </div>

            <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Details */}
                <div className="lg:col-span-2 space-y-5 bg-white rounded-2xl shadow-sm p-6">
                    <h2 className="font-bold text-gray-800 border-b pb-3">Gallery Details</h2>

                    <div>
                        <label className={labelClass}>Title <span className="text-red-500">*</span></label>
                        <input type="text" className={inputClass} value={data.title} onChange={e => setData('title', e.target.value)} placeholder="e.g. 2026 Toyota SUV Launch" />
                        {errors.title && <p className="text-xs text-red-500 mt-1">{errors.title}</p>}
                    </div>

                    <div className="grid sm:grid-cols-2 gap-5">
                        <div>
                            <label className={labelClass}>Category <span className="text-red-500">*</span></label>
                            <select className={inputClass} value={data.category} onChange={e => setData('category', e.target.value)}>
                                <option value="showroom">Showroom</option>
                                <option value="event">Event</option>
                                <option value="delivery">Delivery</option>
                                <option value="sold">Sold</option>
                            </select>
                        </div>
                        <div>
                            <label className={labelClass}>Location</label>
                            <input type="text" className={inputClass} value={data.location} onChange={e => setData('location', e.target.value)} placeholder="e.g. Abuja Showroom" />
                        </div>
                    </div>

                    {(data.category === 'event') && (
                        <div>
                            <label className={labelClass}>Event Date</label>
                            <input type="date" className={inputClass} value={data.event_date} onChange={e => setData('event_date', e.target.value)} />
                        </div>
                    )}

                    <div>
                        <label className={labelClass}>Description</label>
                        <textarea className={inputClass} rows={4} value={data.description} onChange={e => setData('description', e.target.value)} placeholder="Brief description of this gallery..." />
                    </div>

                    {/* Video (short advert clip) */}
                    <div>
                        <label className={labelClass}>Advert video (optional)</label>
                        <p className="text-xs text-gray-500 mb-2">Upload a short clip (MP4, WebM, MOV, max 50MB)</p>
                        <label className="flex flex-col items-center justify-center w-full h-28 border-2 border-dashed border-gray-200 rounded-xl cursor-pointer hover:border-emerald-400 hover:bg-emerald-50/30 transition">
                            <svg className="w-8 h-8 text-gray-300 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
                            <span className="text-sm text-gray-400">{data.video ? data.video.name : 'Click to upload video'}</span>
                            <input type="file" className="hidden" accept="video/mp4,video/webm,video/quicktime" onChange={e => setData('video', e.target.files[0] || null)} />
                        </label>
                        {errors.video && <p className="text-xs text-red-500 mt-1">{errors.video}</p>}
                    </div>

                    {/* Image Upload */}
                    <div>
                        <label className={labelClass}>Upload Images</label>
                        <label className="flex flex-col items-center justify-center w-full h-36 border-2 border-dashed border-gray-200 rounded-xl cursor-pointer hover:border-emerald-400 hover:bg-emerald-50/30 transition">
                            <svg className="w-8 h-8 text-gray-300 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                            <span className="text-sm text-gray-400">Click to upload images (JPG, PNG, WEBP)</span>
                            <input type="file" className="hidden" multiple accept="image/*" onChange={handleImages} />
                        </label>

                        {previews.length > 0 && (
                            <div className="mt-4">
                                <p className="text-xs text-gray-500 mb-2">Click a photo to set it as the <strong>cover image</strong>.</p>
                                <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
                                    {previews.map((url, idx) => (
                                        <div key={idx} onClick={() => handleSetCover(idx)} className={`relative cursor-pointer rounded-lg overflow-hidden border-2 transition ${coverIndex === idx ? 'border-emerald-500 ring-2 ring-emerald-300' : 'border-transparent'}`}>
                                            <img src={url} className="w-full h-16 object-cover" alt="" />
                                            {coverIndex === idx && (
                                                <div className="absolute bottom-0 left-0 right-0 bg-emerald-600 text-white text-center text-xs py-0.5 font-bold">Cover</div>
                                            )}
                                        </div>
                                    ))}
                                </div>
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
                            <button
                                type="button"
                                onClick={() => setData('is_featured', !data.is_featured)}
                                className={`w-12 h-6 rounded-full transition-colors duration-300 flex items-center px-1 ${data.is_featured ? 'bg-emerald-500' : 'bg-gray-200'}`}
                            >
                                <span className={`w-4 h-4 bg-white rounded-full shadow transition-transform duration-300 ${data.is_featured ? 'translate-x-6' : 'translate-x-0'}`} />
                            </button>
                        </div>
                    </div>

                    <div className="bg-white rounded-2xl shadow-sm p-6 space-y-3">
                        <button type="submit" disabled={processing} className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3 rounded-xl transition disabled:opacity-60">
                            {processing ? 'Saving...' : 'Create Gallery'}
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
