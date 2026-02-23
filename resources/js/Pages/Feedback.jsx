import React, { useState } from 'react';
import { Head, useForm } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';

export default function Feedback({ status }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        phone: '',
        rating: 5,
        comment: '',
    });

    const [hoveredRating, setHoveredRating] = useState(0);

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('feedback.store'), {
            onSuccess: () => reset(),
        });
    };

    return (
        <AppLayout>
            <Head title="Tell us how you feel - Sarkin Mota Autos" />

            <div className="min-h-screen bg-gray-50 pt-12 pb-24">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Header Section */}
                    <div className="text-center mb-12">
                        <span className="text-emerald-600 font-bold uppercase tracking-widest text-sm">Customer Voice</span>
                        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mt-4 mb-4">Tell us how you feel</h1>
                        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                            Your feedback helps us maintain our crown as the "King of Cars."
                            Share your experience with Sarkin Mota Autos.
                        </p>
                    </div>

                    {status && (
                        <div className="mb-8 p-6 bg-emerald-100 border-l-4 border-emerald-500 rounded-r-2xl shadow-sm animate-fade-in-down">
                            <div className="flex">
                                <div className="flex-shrink-0">
                                    <svg className="h-6 w-6 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                                <div className="ml-3">
                                    <p className="text-sm font-bold text-emerald-800">{status}</p>
                                </div>
                            </div>
                        </div>
                    )}

                    <div className="bg-white rounded-[3rem] shadow-2xl overflow-hidden border border-gray-100 flex flex-col md:flex-row">
                        {/* Decorative Sidebar */}
                        <div className="md:w-1/3 bg-emerald-900 p-12 text-white flex flex-col justify-between relative overflow-hidden">
                            <div className="relative z-10">
                                <svg className="w-12 h-12 text-emerald-400 mb-8 opacity-50" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M14.017 21L14.017 18C14.017 16.8954 14.9124 16 16.017 16H19.017C19.5693 16 20.017 15.5523 20.017 15V9C20.017 8.44772 19.5693 8 19.017 8H16.017C14.9124 8 14.017 7.10457 14.017 6V5C14.017 3.89543 14.9124 3 16.017 3H19.017C21.2261 3 23.017 4.79086 23.017 7V15C23.017 18.3137 20.3307 21 17.017 21H14.017ZM1.017 21L1.017 18C1.017 16.8954 1.91243 16 3.017 16H6.017C6.56928 16 7.017 15.5523 7.017 15V9C7.017 8.44772 6.56928 8 6.017 8H3.017C1.91243 8 1.017 7.10457 1.017 6V5C1.017 3.89543 1.91243 3 3.017 3H6.017C8.22614 3 10.017 4.79086 10.017 7V15C10.017 18.3137 7.33071 21 4.017 21H1.017Z" />
                                </svg>
                                <h2 className="text-2xl font-bold mb-4 leading-tight italic">"Your Satisfaction is Our Priority."</h2>
                                <p className="text-emerald-200 text-sm leading-relaxed">
                                    Every word helps us improve. We value your honesty and appreciate your time.
                                </p>
                            </div>

                            {/* Visual Detail */}
                            <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-emerald-800/30 rounded-full blur-3xl"></div>
                            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-700/20 rounded-full blur-2xl"></div>
                        </div>

                        {/* Form Area */}
                        <div className="md:w-2/3 p-12">
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-bold text-gray-700 mb-2">Full Name</label>
                                        <input
                                            type="text"
                                            value={data.name}
                                            onChange={(e) => setData('name', e.target.value)}
                                            className={`w-full bg-gray-50 border-gray-200 rounded-2xl p-4 focus:ring-emerald-500 focus:border-emerald-500 transition-all ${errors.name ? 'border-red-500' : ''}`}
                                            placeholder="Enter your name"
                                        />
                                        {errors.name && <p className="text-red-500 text-xs mt-1 font-medium">{errors.name}</p>}
                                    </div>
                                    <div>
                                        <label className="block text-sm font-bold text-gray-700 mb-2">Email Address</label>
                                        <input
                                            type="email"
                                            value={data.email}
                                            onChange={(e) => setData('email', e.target.value)}
                                            className={`w-full bg-gray-50 border-gray-200 rounded-2xl p-4 focus:ring-emerald-500 focus:border-emerald-500 transition-all ${errors.email ? 'border-red-500' : ''}`}
                                            placeholder="john@example.com"
                                        />
                                        {errors.email && <p className="text-red-500 text-xs mt-1 font-medium">{errors.email}</p>}
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">Overall Rating</label>
                                    <div className="flex space-x-2">
                                        {[1, 2, 3, 4, 5].map((star) => (
                                            <button
                                                key={star}
                                                type="button"
                                                onClick={() => setData('rating', star)}
                                                onMouseEnter={() => setHoveredRating(star)}
                                                onMouseLeave={() => setHoveredRating(0)}
                                                className="focus:outline-none transition-transform hover:scale-125 duration-200"
                                            >
                                                <svg
                                                    className={`w-10 h-10 ${(hoveredRating || data.rating) >= star ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
                                                    viewBox="0 0 20 20"
                                                >
                                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                                </svg>
                                            </button>
                                        ))}
                                    </div>
                                    {errors.rating && <p className="text-red-500 text-xs mt-1 font-medium">{errors.rating}</p>}
                                </div>

                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">Message</label>
                                    <textarea
                                        value={data.comment}
                                        onChange={(e) => setData('comment', e.target.value)}
                                        rows="5"
                                        className={`w-full bg-gray-50 border-gray-200 rounded-2xl p-4 focus:ring-emerald-500 focus:border-emerald-500 transition-all ${errors.comment ? 'border-red-500' : ''}`}
                                        placeholder="Tell us about your experience..."
                                    ></textarea>
                                    {errors.comment && <p className="text-red-500 text-xs mt-1 font-medium">{errors.comment}</p>}
                                </div>

                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="w-full bg-emerald-600 text-white font-bold py-5 rounded-2xl hover:bg-emerald-500 transition-all shadow-xl shadow-emerald-200 flex items-center justify-center space-x-2 disabled:opacity-50"
                                >
                                    {processing ? (
                                        <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                                    ) : (
                                        <>
                                            <span>Submit Feedback</span>
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                            </svg>
                                        </>
                                    )}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
