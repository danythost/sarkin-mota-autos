import React, { useEffect } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';

export default function AdminLogin() {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
    });

    useEffect(() => {
        return () => {
            reset('password');
        };
    }, []);

    const submit = (e) => {
        e.preventDefault();
        post(route('admin.login.store'));
    };

    return (
        <>
            <Head title="Sarki Manager Portal" />

            <div
                className="min-h-screen flex flex-col justify-center items-center relative overflow-hidden bg-gray-950"
                style={{
                    backgroundImage: 'url("/assets/images/admin_login_bg.png")',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}
            >
                {/* Overlay for readability */}
                <div className="absolute inset-0 bg-gray-950/40 backdrop-blur-[2px]"></div>

                {/* Animated Light Streaks (Optional but premium) */}
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-emerald-500 to-transparent opacity-50"></div>

                <div className="w-full sm:max-w-md relative z-10 px-4">
                    <div className="text-center mb-10">
                        <span className="text-emerald-400 font-bold uppercase tracking-[0.3em] text-xs mb-2 block">Manager Portal</span>
                        <h1 className="text-4xl font-black text-white italic tracking-tighter">
                            SARKIN<span className="text-emerald-500">MOTA</span>
                        </h1>
                    </div>

                    <div className="bg-white/10 backdrop-blur-xl border border-white/20 p-10 rounded-[2.5rem] shadow-2xl overflow-hidden relative group">
                        {/* Decorative inner glow */}
                        <div className="absolute -top-24 -right-24 w-48 h-48 bg-emerald-500/10 rounded-full blur-3xl group-hover:bg-emerald-500/20 transition-all duration-700"></div>

                        <form onSubmit={submit} className="space-y-6">
                            <div>
                                <label htmlFor="email" className="block font-bold text-xs uppercase tracking-widest text-emerald-100/70 mb-2 ml-1">Admin Identity</label>
                                <input
                                    id="email"
                                    type="email"
                                    name="email"
                                    value={data.email}
                                    placeholder="manager@sarkinmota.com"
                                    className="w-full bg-white/5 border-white/10 rounded-2xl p-4 text-white focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all placeholder:text-gray-500"
                                    autoComplete="username"
                                    onChange={(e) => setData('email', e.target.value)}
                                    autoFocus
                                />
                                {errors.email && <div className="text-red-400 mt-2 text-xs font-bold px-1">{errors.email}</div>}
                            </div>

                            <div className="mt-4">
                                <label htmlFor="password" className="block font-bold text-xs uppercase tracking-widest text-emerald-100/70 mb-2 ml-1">Access Token</label>
                                <input
                                    id="password"
                                    type="password"
                                    name="password"
                                    value={data.password}
                                    placeholder="••••••••"
                                    className="w-full bg-white/5 border-white/10 rounded-2xl p-4 text-white focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all placeholder:text-gray-500"
                                    autoComplete="current-password"
                                    onChange={(e) => setData('password', e.target.value)}
                                />
                                {errors.password && <div className="text-red-400 mt-2 text-xs font-bold px-1">{errors.password}</div>}
                            </div>

                            <button
                                className="w-full mt-8 py-5 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-2xl font-black text-sm uppercase tracking-widest hover:from-emerald-500 hover:to-teal-500 transition-all shadow-xl shadow-emerald-900/50 flex items-center justify-center space-x-2 disabled:opacity-50"
                                disabled={processing}
                            >
                                {processing ? (
                                    <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                                ) : (
                                    <>
                                        <span>Authorize Access</span>
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04M12 2.944a11.955 11.955 0 01-8.618 3.04m8.618-3.04v7.92m0 0a11.955 11.955 0 01-8.618 3.04m16.236-3.04a11.955 11.955 0 010 7.92c0 3.44-2.73 6.224-6.118 6.224a11.955 11.955 0 01-6.118-6.224" /></svg>
                                    </>
                                )}
                            </button>
                        </form>
                    </div>

                    <div className="mt-8 text-center">
                        <Link href={route('home')} className="text-white/40 hover:text-white text-xs font-bold uppercase tracking-widest transition-colors">
                            Return to Showroom
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
}
