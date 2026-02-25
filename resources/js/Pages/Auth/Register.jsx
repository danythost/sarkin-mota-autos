import React, { useEffect } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    useEffect(() => {
        return () => {
            reset('password', 'password_confirmation');
        };
    }, []);

    const submit = (e) => {
        e.preventDefault();
        post(route('register.store'));
    };

    return (
        <AppLayout>
            <Head title="Create Profile" />

            <div className="min-h-screen py-24 flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-950 transition-colors duration-300">
                <div className="w-full max-w-md animate-reveal-up">
                    <div className="bg-white dark:bg-gray-900 rounded-[2.5rem] shadow-2xl p-8 sm:p-12 border border-gray-100 dark:border-gray-800 transition-colors">
                        <div className="mb-8 text-center">
                            <span className="text-emerald-600 dark:text-emerald-400 font-black uppercase tracking-[0.3em] text-[10px] mb-2 block">Premium Membership</span>
                            <h2 className="text-3xl font-black text-gray-900 dark:text-white italic uppercase tracking-tighter">Create <span className="text-emerald-500">Profile</span></h2>
                            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400 font-medium">Join our elite automotive community.</p>
                        </div>

                        <form onSubmit={submit} className="space-y-6">
                            <div>
                                <label htmlFor="name" className="block text-[10px] font-black uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-2">Full Name</label>
                                <input
                                    id="name"
                                    type="text"
                                    name="name"
                                    value={data.name}
                                    className="w-full bg-gray-50 dark:bg-gray-800/50 border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white rounded-2xl p-4 focus:ring-emerald-500 focus:border-emerald-500 transition-colors font-medium"
                                    autoComplete="name"
                                    onChange={(e) => setData('name', e.target.value)}
                                    autoFocus
                                    required
                                />
                                {errors.name && <div className="text-red-500 text-xs mt-1 font-bold">{errors.name}</div>}
                            </div>

                            <div>
                                <label htmlFor="email" className="block text-[10px] font-black uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-2">Email Address</label>
                                <input
                                    id="email"
                                    type="email"
                                    name="email"
                                    value={data.email}
                                    className="w-full bg-gray-50 dark:bg-gray-800/50 border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white rounded-2xl p-4 focus:ring-emerald-500 focus:border-emerald-500 transition-colors font-medium"
                                    autoComplete="username"
                                    onChange={(e) => setData('email', e.target.value)}
                                    required
                                />
                                {errors.email && <div className="text-red-500 text-xs mt-1 font-bold">{errors.email}</div>}
                            </div>

                            <div>
                                <label htmlFor="password" className="block text-[10px] font-black uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-2">Password</label>
                                <input
                                    id="password"
                                    type="password"
                                    name="password"
                                    value={data.password}
                                    className="w-full bg-gray-50 dark:bg-gray-800/50 border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white rounded-2xl p-4 focus:ring-emerald-500 focus:border-emerald-500 transition-colors font-medium"
                                    autoComplete="new-password"
                                    onChange={(e) => setData('password', e.target.value)}
                                    required
                                />
                                {errors.password && <div className="text-red-500 text-xs mt-1 font-bold">{errors.password}</div>}
                            </div>

                            <div>
                                <label htmlFor="password_confirmation" className="block text-[10px] font-black uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-2">Confirm Password</label>
                                <input
                                    id="password_confirmation"
                                    type="password"
                                    name="password_confirmation"
                                    value={data.password_confirmation}
                                    className="w-full bg-gray-50 dark:bg-gray-800/50 border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white rounded-2xl p-4 focus:ring-emerald-500 focus:border-emerald-500 transition-colors font-medium"
                                    autoComplete="new-password"
                                    onChange={(e) => setData('password_confirmation', e.target.value)}
                                    required
                                />
                                {errors.password_confirmation && <div className="text-red-500 text-xs mt-1 font-bold">{errors.password_confirmation}</div>}
                            </div>

                            <button
                                className="w-full bg-emerald-600 text-white font-black py-4 rounded-2xl hover:bg-emerald-500 transition shadow-lg shadow-emerald-200 dark:shadow-emerald-950/20 text-[10px] uppercase tracking-widest disabled:opacity-50"
                                disabled={processing}
                            >
                                Secure Registration
                            </button>

                            <div className="pt-6 border-t border-gray-100 dark:border-gray-800 text-center">
                                <p className="text-xs font-medium text-gray-500 dark:text-gray-400">
                                    Already a member? <Link href={route('login')} className="text-emerald-600 dark:text-emerald-400 font-bold hover:underline transition-all">Sign In</Link>
                                </p>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
