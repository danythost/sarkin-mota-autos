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
            <Head title="Admin Log in" />

            <div className="min-h-screen flex flex-col sm:justify-center items-center pt-6 sm:pt-0 bg-gray-100">
                <div className="w-full sm:max-w-md mt-6 px-6 py-4 bg-white shadow-md overflow-hidden sm:rounded-lg">
                    <h2 className="text-2xl font-bold text-center text-gray-900 mb-6">Admin log in</h2>

                    <form onSubmit={submit}>
                        <div>
                            <label htmlFor="email" className="block font-medium text-sm text-gray-700">Email</label>
                            <input
                                id="email"
                                type="email"
                                name="email"
                                value={data.email}
                                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-emerald-500 focus:ring focus:ring-emerald-500 focus:ring-opacity-50"
                                autoComplete="username"
                                onChange={(e) => setData('email', e.target.value)}
                                autoFocus
                            />
                            {errors.email && <div className="text-red-600 mt-1 text-sm">{errors.email}</div>}
                        </div>

                        <div className="mt-4">
                            <label htmlFor="password" className="block font-medium text-sm text-gray-700">Password</label>
                            <input
                                id="password"
                                type="password"
                                name="password"
                                value={data.password}
                                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-emerald-500 focus:ring focus:ring-emerald-500 focus:ring-opacity-50"
                                autoComplete="current-password"
                                onChange={(e) => setData('password', e.target.value)}
                            />
                            {errors.password && <div className="text-red-600 mt-1 text-sm">{errors.password}</div>}
                        </div>

                        <div className="flex items-center justify-between mt-6">
                            <Link href={route('home')} className="text-sm text-gray-600 hover:text-gray-900">
                                Back to site
                            </Link>
                            <button
                                className="inline-flex items-center px-4 py-2 bg-emerald-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-emerald-700 active:bg-emerald-900 focus:outline-none focus:border-emerald-900 focus:ring focus:ring-emerald-300 disabled:opacity-25 transition"
                                disabled={processing}
                            >
                                Log in
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}
