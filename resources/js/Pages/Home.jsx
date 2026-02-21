import React from 'react';
import { Link, Head } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';
import VehicleCard from '@/Components/VehicleCard';

export default function Home({ featuredVehicles, brands }) {
    return (
        <AppLayout>
            <Head title="Home - Sarkin Moto Autos" />

            {/* Hero Section */}
            <div className="bg-emerald-900 text-white relative overflow-hidden">
                <div className="absolute inset-0 bg-black opacity-50"></div>
                <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: "url('https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80')" }}
                ></div>
                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32 flex flex-col items-center text-center">
                    <h1 className="text-4xl md:text-6xl font-bold mb-4">Find Your Dream Car</h1>
                    <p className="text-xl md:text-2xl mb-8 text-gray-200">Quality pre-owned vehicles at unbeatable prices.</p>
                    <div className="flex space-x-4">
                        <Link
                            href={route('vehicles.index')}
                            className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3 px-8 rounded-full transition duration-300"
                        >
                            Browse Inventory
                        </Link>
                    </div>
                </div>
            </div>

            {/* Featured Vehicles */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="flex justify-between items-center mb-8">
                    <h2 className="text-3xl font-bold text-gray-900">Featured Vehicles</h2>
                    <Link href={route('vehicles.index')} className="text-emerald-600 hover:text-emerald-800 font-medium">
                        View All Categories →
                    </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {featuredVehicles.map(vehicle => (
                        <VehicleCard key={vehicle.id} vehicle={vehicle} />
                    ))}
                </div>

                {featuredVehicles.length === 0 && (
                    <div className="text-center py-12 text-gray-500">
                        No featured vehicles available at the moment.
                    </div>
                )}
            </div>

            {/* Brands Section */}
            <div className="bg-gray-100 py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Browse by Brand</h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
                        {brands.map(brand => (
                            <Link
                                key={brand.id}
                                href={route('vehicles.index', { brand: brand.slug })}
                                className="bg-white p-6 rounded-lg shadow hover:shadow-md transition duration-300 flex flex-col items-center justify-center text-center group"
                            >
                                {brand.logo ? (
                                    <img src={`/storage/${brand.logo}`} alt={brand.name} className="h-12 object-contain mb-3 group-hover:scale-110 transition-transform duration-300" />
                                ) : (
                                    <div className="h-12 w-12 bg-gray-200 rounded-full flex items-center justify-center mb-3 text-xl font-bold text-gray-500">
                                        {brand.name.charAt(0)}
                                    </div>
                                )}
                                <span className="font-medium text-gray-900">{brand.name}</span>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>

            {/* About Us Section */}
            <section id="about" className="py-24 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <div>
                            <span className="text-emerald-600 font-bold uppercase tracking-wider text-sm">About Sarkin Moto Autos</span>
                            <h2 className="text-4xl font-extrabold text-gray-900 mt-2 mb-6">Expertise, Integrity, and Premium Vehicles</h2>
                            <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                                Founded in 2009, Sarkin Moto Autos (SMA) has established itself as the "King of Cars" in the Nigerian market. Our journey began with a single mission: to provide transparent, high-quality automotive solutions that Nigerians can trust.
                            </p>
                            <div className="grid grid-cols-2 gap-8 mb-8">
                                <div>
                                    <div className="text-3xl font-bold text-emerald-600">15+</div>
                                    <div className="text-sm text-gray-500 font-medium">Years Experience</div>
                                </div>
                                <div>
                                    <div className="text-3xl font-bold text-emerald-600">2,500+</div>
                                    <div className="text-sm text-gray-500 font-medium">Cars Sold</div>
                                </div>
                            </div>
                            <div className="p-6 bg-gray-50 rounded-2xl border border-gray-100 mb-8">
                                <h3 className="font-bold text-gray-900 mb-2">Our Vision</h3>
                                <p className="text-gray-600 italic">"To be Nigeria's most reliable and transparent automotive partner, delivering excellence one car at a time."</p>
                            </div>
                            <div className="flex items-center space-x-4">
                                <span className="bg-emerald-100 text-emerald-700 px-4 py-2 rounded-full text-xs font-bold uppercase">CAC Registered</span>
                                <span className="bg-emerald-100 text-emerald-700 px-4 py-2 rounded-full text-xs font-bold uppercase">Certified Dealer</span>
                            </div>
                        </div>
                        <div className="relative">
                            <img
                                src="/storage/sma_showroom_interior.png"
                                alt="SMA Showroom"
                                className="rounded-3xl shadow-2xl relative z-10 w-full"
                            />
                            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-emerald-600 rounded-2xl z-0 hidden lg:block"></div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Testimonials Section */}
            <section id="testimonials" className="py-24 bg-gray-50 overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <span className="text-emerald-600 font-bold uppercase tracking-wider text-sm">Customer Stories</span>
                        <h2 className="text-4xl font-extrabold text-gray-900 mt-2">What Our Clients Say</h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            { name: "Alhaji Musa", location: "Lagos", text: "Finding a trustworthy dealer in Lagos is hard, but SMA made it easy. My Toyota Avalon is perfect. Transparent pricing and great service.", stars: 5 },
                            { name: "Chidi Okafor", location: "Enugu", text: "I bought a Lexus ES350 from SMA and had it delivered to Enugu. The car exceeded my expectations and the documentation was seamless.", stars: 5 },
                            { name: "Mrs. Adeyemi", location: "Abuja", text: "As a first-time buyer, I was nervous. The team at SMA walked me through everything. I'm so happy with my new Honda Accord.", stars: 5 }
                        ].map((item, idx) => (
                            <div key={idx} className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition">
                                <div className="flex text-yellow-400 mb-4">
                                    {[...Array(item.stars)].map((_, i) => (
                                        <svg key={i} className="w-5 h-5 fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                                    ))}
                                </div>
                                <p className="text-gray-600 mb-6 italic">"{item.text}"</p>
                                <div className="flex items-center space-x-3">
                                    <div className="w-10 h-10 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center font-bold">
                                        {item.name.charAt(0)}
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-gray-900">{item.name}</h4>
                                        <p className="text-xs text-gray-500">{item.location}, Nigeria</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Contact Section */}
            <section id="contact" className="py-24 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="bg-emerald-900 rounded-3xl overflow-hidden shadow-2xl flex flex-col lg:flex-row">
                        <div className="lg:w-1/2 p-12 text-white">
                            <div className="flex items-center space-x-6 mb-8">
                                <div className="w-24 h-24 rounded-full border-4 border-emerald-800 overflow-hidden shadow-xl flex-shrink-0">
                                    <img src="/storage/sma_support_rep.png" alt="SMA Representative" className="w-full h-full object-cover" />
                                </div>
                                <div>
                                    <h2 className="text-3xl font-extrabold">Get in Touch</h2>
                                    <p className="text-emerald-400 font-medium">Talk to our Sales Expert</p>
                                </div>
                            </div>
                            <div className="space-y-6 mb-12">
                                <div className="flex items-start space-x-4">
                                    <div className="bg-emerald-800 p-3 rounded-xl"><svg className="w-6 h-6 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg></div>
                                    <div>
                                        <h4 className="font-bold">Lagos Headquarters</h4>
                                        <p className="text-emerald-100 text-sm">123 SMA Plaza, Victoria Island, Lagos, Nigeria</p>
                                    </div>
                                </div>
                                <div className="flex items-start space-x-4">
                                    <div className="bg-emerald-800 p-3 rounded-xl"><svg className="w-6 h-6 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg></div>
                                    <div>
                                        <h4 className="font-bold">Phone Support</h4>
                                        <p className="text-emerald-100 text-sm">+234 (0) 800 123 4567</p>
                                    </div>
                                </div>
                                <div className="flex items-start space-x-4">
                                    <div className="bg-emerald-800 p-3 rounded-xl"><svg className="w-6 h-6 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg></div>
                                    <div>
                                        <h4 className="font-bold">Email Inquiries</h4>
                                        <p className="text-emerald-100 text-sm">sales@sarkinmoto.com</p>
                                    </div>
                                </div>
                            </div>
                            <div className="flex space-x-4">
                                <a href="#" className="w-10 h-10 bg-emerald-800 rounded-full flex items-center justify-center hover:bg-emerald-700 transition"><svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" /></svg></a>
                                <a href="#" className="w-10 h-10 bg-emerald-800 rounded-full flex items-center justify-center hover:bg-emerald-700 transition"><svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.045.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.058-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" /></svg></a>
                            </div>
                        </div>
                        <div className="lg:w-1/2 p-12 bg-white">
                            <form className="space-y-4">
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-1">Full Name</label>
                                    <input type="text" className="w-full border-gray-200 rounded-xl p-4 focus:ring-emerald-500 focus:border-emerald-500" placeholder="John Doe" />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-1">Email Address</label>
                                    <input type="email" className="w-full border-gray-200 rounded-xl p-4 focus:ring-emerald-500 focus:border-emerald-500" placeholder="john@example.com" />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-1">Message</label>
                                    <textarea className="w-full border-gray-200 rounded-xl p-4 focus:ring-emerald-500 focus:border-emerald-500 h-32" placeholder="I am interested in..."></textarea>
                                </div>
                                <button type="submit" className="w-full bg-emerald-600 text-white font-bold py-4 rounded-xl hover:bg-emerald-500 transition shadow-lg shadow-emerald-200">
                                    Send Message
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </AppLayout>
    );
}
