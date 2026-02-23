import React, { useEffect, useState } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';
import Modal from '@/Components/Modal';

export default function Login({ status }) {
    const [showForgotModal, setShowForgotModal] = useState(false);

    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const { data: forgotData, setData: setForgotData, post: postForgot, processing: forgotProcessing, errors: forgotErrors, reset: resetForgot, recentlySuccessful: forgotSuccess } = useForm({
        email: '',
    });

    useEffect(() => {
        return () => {
            reset('password');
        };
    }, []);

    const submit = (e) => {
        e.preventDefault();
        post(route('login.store'));
    };

    const submitForgot = (e) => {
        e.preventDefault();
        postForgot(route('password.email'), {
            onSuccess: () => {
                // Keep modal open to show status, or close it? 
                // Status will likely be shown on the login page or in the modal.
            }
        });
    };

    return (
        <AppLayout>
            <Head title="Login" />

            <div className="min-h-screen py-24 flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-950 transition-colors duration-300">
                <div className="w-full max-w-md animate-reveal-up">
                    <div className="bg-white dark:bg-gray-900 rounded-[2.5rem] shadow-2xl p-8 sm:p-12 border border-gray-100 dark:border-gray-800 transition-colors">
                        <div className="mb-8 text-center">
                            <span className="text-emerald-600 dark:text-emerald-400 font-black uppercase tracking-[0.3em] text-[10px] mb-2 block">Premium Access</span>
                            <h2 className="text-3xl font-black text-gray-900 dark:text-white italic uppercase tracking-tighter">Welcome <span className="text-emerald-500">Back</span></h2>
                            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400 font-medium">Log in to your elite automotive account.</p>
                        </div>

                        {status && (
                            <div className="mb-6 p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/20 text-emerald-600 dark:text-emerald-400 text-sm font-bold border border-emerald-100 dark:border-emerald-900/30">
                                {status}
                            </div>
                        )}

                        <form onSubmit={submit} className="space-y-6">
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
                                    autoFocus
                                    required
                                />
                                {errors.email && <div className="text-red-500 text-xs mt-1 font-bold">{errors.email}</div>}
                            </div>

                            <div>
                                <div className="flex justify-between items-center mb-2">
                                    <label htmlFor="password" className="block text-[10px] font-black uppercase tracking-widest text-gray-400 dark:text-gray-500">Password</label>
                                    <button
                                        type="button"
                                        onClick={() => setShowForgotModal(true)}
                                        className="text-[10px] font-black uppercase tracking-widest text-emerald-600 dark:text-emerald-400 hover:text-emerald-500 transition-colors"
                                    >
                                        Forgot Password?
                                    </button>
                                </div>
                                <input
                                    id="password"
                                    type="password"
                                    name="password"
                                    value={data.password}
                                    className="w-full bg-gray-50 dark:bg-gray-800/50 border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white rounded-2xl p-4 focus:ring-emerald-500 focus:border-emerald-500 transition-colors font-medium"
                                    autoComplete="current-password"
                                    onChange={(e) => setData('password', e.target.value)}
                                    required
                                />
                                {errors.password && <div className="text-red-500 text-xs mt-1 font-bold">{errors.password}</div>}
                            </div>

                            <div className="block">
                                <label className="flex items-center cursor-pointer group">
                                    <input
                                        type="checkbox"
                                        name="remember"
                                        checked={data.remember}
                                        onChange={(e) => setData('remember', e.target.checked)}
                                        className="rounded-lg border-gray-300 dark:border-gray-700 text-emerald-600 shadow-sm focus:ring-emerald-500 dark:bg-gray-800 transition-colors"
                                    />
                                    <span className="ml-3 text-xs font-bold text-gray-500 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white transition-colors uppercase tracking-widest">Stay logged in</span>
                                </label>
                            </div>

                            <button
                                className="w-full bg-emerald-600 text-white font-black py-4 rounded-2xl hover:bg-emerald-500 transition shadow-lg shadow-emerald-200 dark:shadow-emerald-950/20 text-[10px] uppercase tracking-widest disabled:opacity-50"
                                disabled={processing}
                            >
                                Authenticate Access
                            </button>

                            <div className="pt-6 border-t border-gray-100 dark:border-gray-800 text-center">
                                <p className="text-xs font-medium text-gray-500 dark:text-gray-400">
                                    Not a member? <Link href="/register" className="text-emerald-600 dark:text-emerald-400 font-bold hover:underline transition-all">Create Profile</Link>
                                </p>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

            {/* Forgot Password Modal */}
            <Modal show={showForgotModal} onClose={() => setShowForgotModal(false)}>
                <div className="text-center mb-8">
                    <span className="text-emerald-600 dark:text-emerald-400 font-black uppercase tracking-[0.3em] text-[10px] mb-2 block">Security Access</span>
                    <h2 className="text-3xl font-black text-gray-900 dark:text-white italic uppercase tracking-tighter">Reset <span className="text-emerald-500">Password</span></h2>
                    <p className="mt-4 text-sm text-gray-500 dark:text-gray-400 font-medium leading-relaxed">
                        No problem. Just enter your email address and we will send you a password reset link.
                    </p>
                </div>

                {forgotSuccess ? (
                    <div className="text-center py-8 animate-reveal-up">
                        <div className="w-16 h-16 bg-emerald-100 dark:bg-emerald-950/20 rounded-full flex items-center justify-center mx-auto mb-6">
                            <svg className="w-8 h-8 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                            </svg>
                        </div>
                        <h3 className="text-lg font-black text-gray-900 dark:text-white uppercase tracking-tight italic mb-2">Email Sent Successfully</h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400 font-medium mb-8">We've sent a recovery link to your inbox. Please check your email.</p>
                        <button
                            onClick={() => setShowForgotModal(false)}
                            className="w-full bg-emerald-600 text-white font-black py-4 rounded-2xl hover:bg-emerald-500 transition shadow-lg shadow-emerald-200 dark:shadow-emerald-950/20 text-[10px] uppercase tracking-widest"
                        >
                            Back to Login
                        </button>
                    </div>
                ) : (
                    <form onSubmit={submitForgot} className="space-y-6">
                        <div>
                            <label htmlFor="forgot_email" className="block text-[10px] font-black uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-2">Email Address</label>
                            <input
                                id="forgot_email"
                                type="email"
                                name="email"
                                value={forgotData.email}
                                className="w-full bg-gray-50 dark:bg-gray-800/50 border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white rounded-2xl p-4 focus:ring-emerald-500 focus:border-emerald-500 transition-colors font-medium"
                                onChange={(e) => setForgotData('email', e.target.value)}
                                required
                            />
                            {forgotErrors.email && <div className="text-red-500 text-xs mt-1 font-bold">{forgotErrors.email}</div>}
                        </div>

                        <button
                            className="w-full bg-emerald-600 text-white font-black py-4 rounded-2xl hover:bg-emerald-500 transition shadow-lg shadow-emerald-200 dark:shadow-emerald-950/20 text-[10px] uppercase tracking-widest disabled:opacity-50"
                            disabled={forgotProcessing}
                        >
                            Send Reset Link
                        </button>
                    </form>
                )}
            </Modal>
        </AppLayout>
    );
}
