import React from 'react';
import { Link, Head, useForm } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';
import VehicleCard from '@/Components/VehicleCard';
import GalleryVideoCard from '@/Components/GalleryVideoCard';
import GallerySpotlight from '@/Components/GallerySpotlight';

export default function Home({ featuredVehicles, brands, featuredGalleries }) {
    const { data: enquiryData, setData: setEnquiryData, post: postEnquiry, processing: enquiryProcessing, errors: enquiryErrors, reset: resetEnquiry, recentlySuccessful: recentlyEnquired } = useForm({
        name: '',
        email: '',
        message: '',
    });

    const submitEnquiry = (e) => {
        e.preventDefault();
        postEnquiry(route('enquiry.store'), {
            preserveScroll: true,
            onSuccess: () => resetEnquiry(),
        });
    };

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
                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 md:py-48 flex flex-col items-center text-center">
                    <span className="inline-block bg-emerald-500/20 backdrop-blur-md border border-emerald-400/30 text-emerald-400 dark:text-emerald-300 text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-6 animate-reveal-down">
                        Welcome to Sarkin Mota Autos
                    </span>
                    <h1 className="text-5xl md:text-8xl font-black text-white leading-tight mb-8 animate-reveal-up">
                        Drive the <span className="bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">Extraordinary</span>
                    </h1>
                    <p className="text-lg md:text-2xl text-gray-300 max-w-3xl mb-12 animate-reveal-up delay-100">
                        Experience the pinnacle of automotive luxury and performance. We bring the world's most prestigious vehicles to the heart of Nigeria.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-6 animate-reveal-up delay-200">
                        <Link href={route('vehicles.index')} className="group bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-5 px-10 rounded-full transition-all duration-300 shadow-xl shadow-emerald-600/20 active:scale-95 flex items-center">
                            Explore Inventory
                            <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                        </Link>
                        <a href="#about" className="bg-white/10 backdrop-blur-md hover:bg-white/20 text-white font-bold py-5 px-10 rounded-full border border-white/20 transition-all duration-300 active:scale-95">
                            Learn More
                        </a>
                    </div>
                </div>
            </div>

            {/* Featured Vehicles */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 transition-colors duration-300">
                <div className="flex justify-between items-center mb-8">
                    <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Featured Vehicles</h2>
                    <Link href={route('vehicles.index')} className="text-emerald-600 dark:text-emerald-400 hover:text-emerald-800 dark:hover:text-emerald-300 font-medium transition-colors">
                        View All Categories →
                    </Link>
                </div>

                <div className="flex flex-wrap justify-center gap-8">
                    {featuredVehicles.map((vehicle, idx) => (
                        <div key={vehicle.id} className="w-full md:w-[calc(50%-1rem)] lg:w-[calc(25%-1.5rem)] max-w-sm animate-reveal-up" style={{ animationDelay: `${idx * 150}ms` }}>
                            <VehicleCard vehicle={vehicle} />
                        </div>
                    ))}
                </div>

                {featuredVehicles.length === 0 && (
                    <div className="text-center py-12 text-gray-500">
                        No featured vehicles available at the moment.
                    </div>
                )}
            </div>

            {/* Feature Gallery (Cinematic Spotlight) */}
            <div className="bg-white dark:bg-gray-950 py-24 border-t border-gray-100 dark:border-gray-800 relative overflow-hidden transition-colors duration-300">
                {/* Decorative Background for Spotlight */}
                <div className="absolute top-0 left-0 w-full h-full opacity-10 dark:opacity-20 pointer-events-none">
                    <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-emerald-100 dark:bg-emerald-900/40 rounded-full blur-[160px]" />
                </div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-4">
                        <div className="animate-reveal-up">
                            <span className="text-emerald-600 dark:text-emerald-500 font-bold uppercase tracking-[0.4em] text-[10px]">Showroom Spotlight</span>
                            <h2 className="text-4xl md:text-6xl font-black text-gray-900 dark:text-white mt-4 italic tracking-tighter uppercase">The Art of <span className="text-emerald-500">Motion</span></h2>
                        </div>
                    </div>

                    <div className="animate-zoom-in">
                        <GalleryVideoCard videoSrc="https://video.wixstatic.com/video/11062b_1ed35c60e58e469595860dd3971e4793/1080p/mp4/file.mp4" />
                    </div>

                    <div className="mt-16 text-center animate-reveal-up delay-300">
                        <Link
                            href={route('gallery.index')}
                            className="inline-flex items-center px-12 py-5 bg-gray-950 dark:bg-white text-white dark:text-gray-950 rounded-full font-black text-xs uppercase tracking-[0.2em] hover:bg-emerald-600 transition-all duration-500 shadow-2xl active:scale-95"
                        >
                            Explore Full Showroom
                            <svg className="w-4 h-4 ml-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                        </Link>
                    </div>
                </div>
            </div>

            {/* Brands Section */}
            <div className="bg-slate-50 dark:bg-gray-900 py-24 relative overflow-hidden transition-colors duration-300">
                {/* Decorative background elements */}
                <div className="absolute top-0 right-0 w-1/3 h-full bg-emerald-500/5 blur-[120px] pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-1/4 h-full bg-teal-500/5 blur-[100px] pointer-events-none" />

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="text-center mb-16 animate-reveal-up">
                        <span className="text-emerald-600 dark:text-emerald-400 font-bold uppercase tracking-[0.3em] text-[10px] mb-4 block">World Class Manufacturers</span>
                        <h2 className="text-4xl font-extrabold text-gray-900 dark:text-white tracking-tight">Browse by <span className="text-emerald-500">Brand</span></h2>
                    </div>

                    <div className="flex flex-wrap justify-center gap-6">
                        {brands.map((brand, idx) => (
                            <Link
                                key={brand.id}
                                href={route('vehicles.index', { brand: brand.slug })}
                                className="group relative w-32 h-32 md:w-40 md:h-40 bg-white/40 dark:bg-gray-800/40 backdrop-blur-md border border-white/60 dark:border-white/5 rounded-[2.5rem] flex flex-col items-center justify-center p-6 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-emerald-500/20 hover:border-emerald-500/50 dark:hover:border-emerald-500/50 animate-reveal-up"
                                style={{ animationDelay: `${idx * 100}ms` }}
                            >
                                <div className="relative z-10 flex flex-col items-center gap-4">
                                    {brand.logo ? (
                                        <div className="h-10 md:h-14 flex items-center justify-center">
                                            <img src={brand.logo} alt={brand.name} className="max-h-full w-auto grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-110" />
                                        </div>
                                    ) : (
                                        <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 flex items-center justify-center text-emerald-600 dark:text-emerald-400 font-black text-xl group-hover:bg-emerald-500 group-hover:text-white transition-all duration-500">
                                            {brand.name.substring(0, 1)}
                                        </div>
                                    )}
                                    <span className="text-[10px] md:text-xs font-black uppercase tracking-widest text-gray-400 dark:text-gray-500 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                                        {brand.name}
                                    </span>
                                </div>
                                <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-[2.5rem]" />
                            </Link>
                        ))}
                    </div>
                </div>
            </div>

            {/* About Us Section */}
            <section id="about" className="py-24 bg-white dark:bg-gray-950 transition-colors duration-300">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <div>
                            <span className="text-emerald-600 dark:text-emerald-400 font-bold uppercase tracking-wider text-sm">About Sarkin Moto Autos</span>
                            <h2 className="text-4xl font-extrabold text-gray-900 dark:text-white mt-2 mb-6">Expertise, Integrity, and Premium Vehicles</h2>
                            <p className="text-lg text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
                                Founded in 2009, Sarkin Moto Autos (SMA) has established itself as the "King of Cars" in the Nigerian market. Our journey began with a single mission: to provide transparent, high-quality automotive solutions that Nigerians can trust.
                            </p>
                            <div className="grid grid-cols-2 gap-8 mb-8">
                                <div>
                                    <div className="text-3xl font-bold text-emerald-600 dark:text-emerald-400">15+</div>
                                    <div className="text-sm text-gray-500 font-medium">Years Experience</div>
                                </div>
                                <div>
                                    <div className="text-3xl font-bold text-emerald-600 dark:text-emerald-400">2,500+</div>
                                    <div className="text-sm text-gray-500 font-medium">Cars Sold</div>
                                </div>
                            </div>
                            <div className="p-6 bg-gray-50 dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 mb-8 transition-colors">
                                <h3 className="font-bold text-gray-900 dark:text-white mb-2">Our Vision</h3>
                                <p className="text-gray-600 dark:text-gray-400 italic">"To be Nigeria's most reliable and transparent automotive partner, delivering excellence one car at a time."</p>
                            </div>
                            <div className="flex items-center space-x-4">
                                <span className="bg-emerald-100 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 px-4 py-2 rounded-full text-xs font-bold uppercase transition-colors">CAC Registered</span>
                                <span className="bg-emerald-100 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 px-4 py-2 rounded-full text-xs font-bold uppercase transition-colors">Certified Dealer</span>
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
            <section id="testimonials" className="py-24 bg-gray-50 dark:bg-gray-900 overflow-hidden transition-colors duration-300">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <span className="text-emerald-600 dark:text-emerald-400 font-bold uppercase tracking-wider text-sm">Customer Stories</span>
                        <h2 className="text-4xl font-extrabold text-gray-900 dark:text-white mt-2">What Our Clients Say</h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            { name: 'Emeka Obi', role: 'Entrepreneur', text: '“The level of professionalism and the quality of cars at Sarkin Mota Autos are unmatched in Nigeria. My purchase process was seamless.”' },
                            { name: 'Sarah Ahmed', role: 'Business Executive', text: '“I appreciated the transparent financing options. They made it easy for me to acquire my dream SUV without any stress.”' },
                            { name: 'Tunde Bakare', role: 'Architect', text: '“Excellent after-sales support and attention to detail. I highly recommend them to anyone looking for premium vehicles.”' }
                        ].map((t, i) => (
                            <div key={i} className="bg-gray-50 dark:bg-gray-900 p-8 rounded-3xl border border-gray-100 dark:border-gray-800 interactive-card animate-reveal-up" style={{ animationDelay: `${i * 200}ms` }}>
                                <div className="flex text-emerald-500 mb-4">
                                    {[...Array(5)].map((_, star) => (
                                        <svg key={star} className="w-5 h-5 fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                                    ))}
                                </div>
                                <p className="text-gray-600 dark:text-gray-400 italic mb-6 leading-relaxed">{t.text}</p>
                                <div>
                                    <h4 className="font-bold text-gray-900 dark:text-white">{t.name}</h4>
                                    <p className="text-xs text-emerald-600 dark:text-emerald-400 font-bold uppercase tracking-wider">{t.role}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Enquiry Section */}
            <section id="enquiry" className="py-24 bg-white dark:bg-gray-950 transition-colors duration-300">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="bg-emerald-900 rounded-3xl overflow-hidden shadow-2xl flex flex-col lg:flex-row">
                        <div className="lg:w-1/2 p-12 text-white">
                            <div className="flex items-center space-x-6 mb-8">
                                <div className="w-24 h-24 rounded-full border-4 border-emerald-800 overflow-hidden shadow-xl flex-shrink-0">
                                    <img src="/storage/sma_support_rep.png" alt="SMA Representative" className="w-full h-full object-cover" />
                                </div>
                                <div>
                                    <h2 className="text-3xl font-extrabold">Contact Us</h2>
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
                        </div>
                        <div className="lg:w-1/2 p-12 bg-white dark:bg-gray-900 transition-colors">
                            <form onSubmit={submitEnquiry} className="space-y-4">
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-1 transition-colors">Full Name</label>
                                    <input
                                        type="text"
                                        className="w-full border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-200 rounded-xl p-4 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                                        placeholder="John Doe"
                                        value={enquiryData.name}
                                        onChange={e => setEnquiryData('name', e.target.value)}
                                        required
                                    />
                                    {enquiryErrors.name && <div className="text-red-500 text-xs mt-1">{enquiryErrors.name}</div>}
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-1 transition-colors">Email Address</label>
                                    <input
                                        type="email"
                                        className="w-full border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-200 rounded-xl p-4 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                                        placeholder="john@example.com"
                                        value={enquiryData.email}
                                        onChange={e => setEnquiryData('email', e.target.value)}
                                        required
                                    />
                                    {enquiryErrors.email && <div className="text-red-500 text-xs mt-1">{enquiryErrors.email}</div>}
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-1 transition-colors">Message</label>
                                    <textarea
                                        className="w-full border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-200 rounded-xl p-4 focus:ring-emerald-500 focus:border-emerald-500 h-32 transition-colors"
                                        placeholder="I am interested in..."
                                        value={enquiryData.message}
                                        onChange={e => setEnquiryData('message', e.target.value)}
                                        required
                                    ></textarea>
                                    {enquiryErrors.message && <div className="text-red-500 text-xs mt-1">{enquiryErrors.message}</div>}
                                </div>
                                <button
                                    type="submit"
                                    className="w-full bg-emerald-600 text-white font-bold py-4 rounded-xl hover:bg-emerald-500 transition shadow-lg shadow-emerald-200 dark:shadow-emerald-900/20 disabled:opacity-50"
                                    disabled={enquiryProcessing}
                                >
                                    {enquiryProcessing ? 'Sending...' : 'Contact Us'}
                                </button>
                                {recentlyEnquired && (
                                    <div className="mt-4 p-4 bg-emerald-100 text-emerald-700 rounded-xl text-sm font-bold animate-reveal-up">
                                        Thank you! Your enquiry has been sent.
                                    </div>
                                )}
                            </form>
                        </div>
                    </div>
                </div>
            </section>

            {/* Location Map Section (Optimized Full-Width) */}
            <section className="relative w-full h-[600px] overflow-hidden bg-gray-900 group">
                <iframe
                    title="Sarkin Mota Autos Location"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15858.46312415147!2d7.485!3d9.05!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x104e0baf7b3e691d%3A0x7d6c6a6a6a6a6a6a!2sCentral%20Business%20District%2C%20Abuja!5e0!3m2!1sen!2sng!4v1700000000000!5m2!1sen!2sng"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="grayscale hover:grayscale-0 transition-all duration-1000 scale-[1.02]"
                ></iframe>

                {/* Floating Info Card Overlay */}
                <div className="absolute top-12 left-4 sm:left-12 lg:left-24 z-10 max-w-sm w-full">
                    <div className="bg-emerald-900/95 backdrop-blur-md text-white p-8 rounded-3xl shadow-2xl border border-emerald-800 transform transition duration-500 hover:-translate-y-2">
                        <div className="flex items-center space-x-3 mb-6">
                            <div className="w-10 h-10 bg-emerald-600 rounded-xl flex items-center justify-center shadow-lg">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                            </div>
                            <h3 className="text-xl font-bold">Visit Our Showroom</h3>
                        </div>
                        <div className="space-y-4 mb-8">
                            <div>
                                <h4 className="text-emerald-400 text-xs font-bold uppercase tracking-widest mb-1">Corporate Office</h4>
                                <p className="text-sm font-medium leading-relaxed">
                                    123 SMA Plaza, Victoria Island,<br />
                                    Lagos, Nigeria
                                </p>
                            </div>
                            <div>
                                <h4 className="text-emerald-400 text-xs font-bold uppercase tracking-widest mb-1">Business Hours</h4>
                                <p className="text-sm font-medium">Mon - Sat: 8:00 AM - 6:00 PM</p>
                            </div>
                        </div>
                        <a
                            href="https://maps.google.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-center w-full py-4 bg-white text-emerald-900 rounded-2xl font-bold hover:bg-emerald-50 text-sm transition shadow-xl"
                        >
                            Open in Google Maps
                            <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                        </a>
                    </div>
                </div>

                {/* Bottom Gradient for smoother transition */}
                <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white dark:from-gray-950 to-transparent pointer-events-none transition-colors duration-300"></div>
            </section>
        </AppLayout>
    );
}
