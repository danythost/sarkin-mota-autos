import React, { useState } from 'react';
import AppLayout from '@/Layouts/AppLayout';
import { Head, useForm, Link } from '@inertiajs/react';
import Modal from '@/Components/Modal';

export default function Edit({ auth }) {
    const [showForgotModal, setShowForgotModal] = useState(false);

    const { data, setData, patch, errors, processing, recentlySuccessful } = useForm({
        name: auth.user.name,
        email: auth.user.email,
    });

    const { data: passwordData, setData: setPasswordData, put: putPassword, errors: passwordErrors, processing: passwordProcessing, recentlySuccessful: passwordRecentlySuccessful, reset } = useForm({
        current_password: '',
        password: '',
        password_confirmation: '',
    });

    const { data: forgotData, setData: setForgotData, post: postForgot, processing: forgotProcessing, errors: forgotErrors, recentlySuccessful: forgotSuccess } = useForm({
        email: auth.user.email,
    });

    const updateProfile = (e) => {
        e.preventDefault();
        patch(route('profile.update'), {
            preserveScroll: true,
        });
    };

    const updatePassword = (e) => {
        e.preventDefault();
        putPassword(route('profile.update-password'), {
            preserveScroll: true,
            onSuccess: () => reset(),
        });
    };

    const submitForgot = (e) => {
        e.preventDefault();
        postForgot(route('password.email'));
    };

    return (
        <AppLayout>
            <Head title="Profile Settings" />

            <div className="py-24 bg-gray-50 dark:bg-gray-950 min-h-screen transition-colors duration-300">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Header */}
                    <div className="mb-12 animate-reveal-down">
                        <span className="text-emerald-600 dark:text-emerald-400 font-bold uppercase tracking-[0.3em] text-[10px] mb-2 block">Account Settings</span>
                        <h1 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white italic tracking-tighter uppercase">
                            My <span className="text-emerald-500">Profile</span>
                        </h1>
                        <p className="text-gray-500 dark:text-gray-400 mt-2 font-medium">Manage your personal information and account security.</p>
                    </div>

                    <div className="space-y-12">
                        {/* Profile Info Section */}
                        <div className="bg-white dark:bg-gray-900 p-8 sm:p-12 rounded-[2.5rem] shadow-xl shadow-emerald-500/5 border border-gray-100 dark:border-gray-800 animate-reveal-up transition-colors">
                            <div className="max-w-xl">
                                <header className="mb-8">
                                    <h2 className="text-lg font-black text-gray-900 dark:text-white uppercase tracking-tight italic">Profile Information</h2>
                                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                                        Update your account's identity and communication details.
                                    </p>
                                </header>

                                <form onSubmit={updateProfile} className="space-y-6">
                                    <div>
                                        <label className="block text-[10px] font-black uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-2">Display Name</label>
                                        <input
                                            type="text"
                                            className="w-full bg-gray-50 dark:bg-gray-800/50 border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white rounded-2xl p-4 focus:ring-emerald-500 focus:border-emerald-500 transition-colors font-medium"
                                            value={data.name}
                                            onChange={(e) => setData('name', e.target.value)}
                                            required
                                        />
                                        {errors.name && <div className="text-red-500 text-xs mt-1 font-bold">{errors.name}</div>}
                                    </div>

                                    <div>
                                        <label className="block text-[10px] font-black uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-2">Email Address</label>
                                        <input
                                            type="email"
                                            className="w-full bg-gray-50 dark:bg-gray-800/50 border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white rounded-2xl p-4 focus:ring-emerald-500 focus:border-emerald-500 transition-colors font-medium"
                                            value={data.email}
                                            onChange={(e) => setData('email', e.target.value)}
                                            required
                                        />
                                        {errors.email && <div className="text-red-500 text-xs mt-1 font-bold">{errors.email}</div>}
                                    </div>

                                    <div className="flex items-center gap-6">
                                        <button
                                            type="submit"
                                            className="px-8 py-4 bg-emerald-600 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-emerald-500 transition shadow-lg shadow-emerald-200 dark:shadow-emerald-950/20 disabled:opacity-50"
                                            disabled={processing}
                                        >
                                            Update Profile
                                        </button>
                                        {recentlySuccessful && (
                                            <p className="text-sm text-emerald-600 dark:text-emerald-400 font-bold animate-reveal-up">Saved successfully.</p>
                                        )}
                                    </div>
                                </form>
                            </div>
                        </div>

                        {/* Password Section */}
                        <div className="bg-white dark:bg-gray-900 p-8 sm:p-12 rounded-[2.5rem] shadow-xl shadow-emerald-500/5 border border-gray-100 dark:border-gray-800 animate-reveal-up delay-100 transition-colors">
                            <div className="max-w-xl">
                                <header className="mb-8 flex justify-between items-start">
                                    <div>
                                        <h2 className="text-lg font-black text-gray-900 dark:text-white uppercase tracking-tight italic">Secure Password</h2>
                                        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                                            Update your password to keep your account elite and secure.
                                        </p>
                                    </div>
                                    <button
                                        type="button"
                                        onClick={() => setShowForgotModal(true)}
                                        className="text-[10px] font-black uppercase tracking-widest text-emerald-600 dark:text-emerald-400 hover:text-emerald-500 transition-colors"
                                    >
                                        Forgot Password?
                                    </button>
                                </header>

                                <form onSubmit={updatePassword} className="space-y-6">
                                    <div>
                                        <label className="block text-[10px] font-black uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-2">Current Password</label>
                                        <input
                                            type="password"
                                            className="w-full bg-gray-50 dark:bg-gray-800/50 border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white rounded-2xl p-4 focus:ring-emerald-500 focus:border-emerald-500 transition-colors font-medium"
                                            value={passwordData.current_password}
                                            onChange={(e) => setPasswordData('current_password', e.target.value)}
                                            required
                                        />
                                        {passwordErrors.current_password && <div className="text-red-500 text-xs mt-1 font-bold">{passwordErrors.current_password}</div>}
                                    </div>

                                    <div>
                                        <label className="block text-[10px] font-black uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-2">New Password</label>
                                        <input
                                            type="password"
                                            className="w-full bg-gray-50 dark:bg-gray-800/50 border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white rounded-2xl p-4 focus:ring-emerald-500 focus:border-emerald-500 transition-colors font-medium"
                                            value={passwordData.password}
                                            onChange={(e) => setPasswordData('password', e.target.value)}
                                            required
                                        />
                                        {passwordErrors.password && <div className="text-red-500 text-xs mt-1 font-bold">{passwordErrors.password}</div>}
                                    </div>

                                    <div>
                                        <label className="block text-[10px] font-black uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-2">Confirm New Password</label>
                                        <input
                                            type="password"
                                            className="w-full bg-gray-50 dark:bg-gray-800/50 border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white rounded-2xl p-4 focus:ring-emerald-500 focus:border-emerald-500 transition-colors font-medium"
                                            value={passwordData.password_confirmation}
                                            onChange={(e) => setPasswordData('password_confirmation', e.target.value)}
                                            required
                                        />
                                        {passwordErrors.password_confirmation && <div className="text-red-500 text-xs mt-1 font-bold">{passwordErrors.password_confirmation}</div>}
                                    </div>

                                    <div className="flex items-center gap-6">
                                        <button
                                            type="submit"
                                            className="px-8 py-4 bg-emerald-600 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-emerald-500 transition shadow-lg shadow-emerald-200 dark:shadow-emerald-950/20 disabled:opacity-50"
                                            disabled={passwordProcessing}
                                        >
                                            Change Password
                                        </button>
                                        {passwordRecentlySuccessful && (
                                            <p className="text-sm text-emerald-600 dark:text-emerald-400 font-bold animate-reveal-up">Password changed.</p>
                                        )}
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Forgot Password Modal */}
            <Modal show={showForgotModal} onClose={() => setShowForgotModal(false)}>
                <div className="text-center mb-8">
                    <span className="text-emerald-600 dark:text-emerald-400 font-black uppercase tracking-[0.3em] text-[10px] mb-2 block">Security Access</span>
                    <h2 className="text-3xl font-black text-gray-900 dark:text-white italic uppercase tracking-tighter">Reset <span className="text-emerald-500">Password</span></h2>
                    <p className="mt-4 text-sm text-gray-500 dark:text-gray-400 font-medium leading-relaxed">
                        Need a recovery link? We will send it to your email address.
                    </p>
                </div>

                {forgotSuccess ? (
                    <div className="text-center py-8 animate-reveal-up">
                        <div className="w-16 h-16 bg-emerald-100 dark:bg-emerald-950/20 rounded-full flex items-center justify-center mx-auto mb-6">
                            <svg className="w-8 h-8 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                            </svg>
                        </div>
                        <h3 className="text-lg font-black text-gray-900 dark:text-white uppercase tracking-tight italic mb-2">Request Successful</h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400 font-medium mb-8">Check your inbox for the password reset instructions.</p>
                        <button
                            onClick={() => setShowForgotModal(false)}
                            className="w-full bg-emerald-600 text-white font-black py-4 rounded-2xl hover:bg-emerald-500 transition shadow-lg shadow-emerald-200 dark:shadow-emerald-950/20 text-[10px] uppercase tracking-widest"
                        >
                            Got it
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
                                className="w-full bg-gray-50 dark:bg-gray-800/50 border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white rounded-2xl p-4 focus:ring-emerald-500 focus:border-emerald-500 transition-colors font-medium pointer-events-none opacity-60"
                                readOnly
                                required
                            />
                            {forgotErrors.email && <div className="text-red-500 text-xs mt-1 font-bold">{forgotErrors.email}</div>}
                        </div>

                        <button
                            className="w-full bg-emerald-600 text-white font-black py-4 rounded-2xl hover:bg-emerald-500 transition shadow-lg shadow-emerald-200 dark:shadow-emerald-950/20 text-[10px] uppercase tracking-widest disabled:opacity-50"
                            disabled={forgotProcessing}
                        >
                            Request Reset Link
                        </button>
                    </form>
                )}
            </Modal>
        </AppLayout>
    );
}
