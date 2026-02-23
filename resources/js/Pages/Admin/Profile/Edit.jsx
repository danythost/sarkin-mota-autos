import React from 'react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Head, useForm } from '@inertiajs/react';

export default function Edit({ admin }) {
    const { data, setData, patch, errors, processing, recentlySuccessful } = useForm({
        name: admin.name,
        email: admin.email,
    });

    const { data: passwordData, setData: setPasswordData, put: putPassword, errors: passwordErrors, processing: passwordProcessing, recentlySuccessful: passwordRecentlySuccessful, reset } = useForm({
        current_password: '',
        password: '',
        password_confirmation: '',
    });

    const updateProfile = (e) => {
        e.preventDefault();
        patch(route('admin.profile.update'));
    };

    const updatePassword = (e) => {
        e.preventDefault();
        putPassword(route('admin.profile.password.update'), {
            preserveScroll: true,
            onSuccess: () => reset(),
        });
    };

    return (
        <AdminLayout>
            <Head title="Admin Profile" />

            <div className="max-w-4xl mx-auto space-y-6">
                <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
                    <section className="max-w-xl">
                        <header>
                            <h2 className="text-lg font-medium text-gray-900">Profile Information</h2>
                            <p className="mt-1 text-sm text-gray-600">
                                Update your account's profile information and email address.
                            </p>
                        </header>

                        <form onSubmit={updateProfile} className="mt-6 space-y-6">
                            <div>
                                <label className="block font-medium text-sm text-gray-700">Name</label>
                                <input
                                    type="text"
                                    className="mt-1 block w-full border-gray-300 focus:border-emerald-500 focus:ring-emerald-500 rounded-md shadow-sm"
                                    value={data.name}
                                    onChange={(e) => setData('name', e.target.value)}
                                    required
                                />
                                {errors.name && <div className="text-red-500 text-xs mt-1">{errors.name}</div>}
                            </div>

                            <div>
                                <label className="block font-medium text-sm text-gray-700">Email</label>
                                <input
                                    type="email"
                                    className="mt-1 block w-full border-gray-300 focus:border-emerald-500 focus:ring-emerald-500 rounded-md shadow-sm"
                                    value={data.email}
                                    onChange={(e) => setData('email', e.target.value)}
                                    required
                                />
                                {errors.email && <div className="text-red-500 text-xs mt-1">{errors.email}</div>}
                            </div>

                            <div className="flex items-center gap-4">
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-emerald-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-emerald-700 active:bg-emerald-900 focus:outline-none focus:border-emerald-900 focus:ring ring-emerald-300 disabled:opacity-25 transition ease-in-out duration-150"
                                    disabled={processing}
                                >
                                    Save
                                </button>
                                {recentlySuccessful && <p className="text-sm text-gray-600">Saved.</p>}
                            </div>
                        </form>
                    </section>
                </div>

                <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
                    <section className="max-w-xl">
                        <header>
                            <h2 className="text-lg font-medium text-gray-900">Update Password</h2>
                            <p className="mt-1 text-sm text-gray-600">
                                Ensure your account is using a long, random password to stay secure.
                            </p>
                        </header>

                        <form onSubmit={updatePassword} className="mt-6 space-y-6">
                            <div>
                                <label className="block font-medium text-sm text-gray-700">Current Password</label>
                                <input
                                    type="password"
                                    className="mt-1 block w-full border-gray-300 focus:border-emerald-500 focus:ring-emerald-500 rounded-md shadow-sm"
                                    value={passwordData.current_password}
                                    onChange={(e) => setPasswordData('current_password', e.target.value)}
                                    required
                                />
                                {passwordErrors.current_password && <div className="text-red-500 text-xs mt-1">{passwordErrors.current_password}</div>}
                            </div>

                            <div>
                                <label className="block font-medium text-sm text-gray-700">New Password</label>
                                <input
                                    type="password"
                                    className="mt-1 block w-full border-gray-300 focus:border-emerald-500 focus:ring-emerald-500 rounded-md shadow-sm"
                                    value={passwordData.password}
                                    onChange={(e) => setPasswordData('password', e.target.value)}
                                    required
                                />
                                {passwordErrors.password && <div className="text-red-500 text-xs mt-1">{passwordErrors.password}</div>}
                            </div>

                            <div>
                                <label className="block font-medium text-sm text-gray-700">Confirm Password</label>
                                <input
                                    type="password"
                                    className="mt-1 block w-full border-gray-300 focus:border-emerald-500 focus:ring-emerald-500 rounded-md shadow-sm"
                                    value={passwordData.password_confirmation}
                                    onChange={(e) => setPasswordData('password_confirmation', e.target.value)}
                                    required
                                />
                                {passwordErrors.password_confirmation && <div className="text-red-500 text-xs mt-1">{passwordErrors.password_confirmation}</div>}
                            </div>

                            <div className="flex items-center gap-4">
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-emerald-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-emerald-700 active:bg-emerald-900 focus:outline-none focus:border-emerald-900 focus:ring ring-emerald-300 disabled:opacity-25 transition ease-in-out duration-150"
                                    disabled={passwordProcessing}
                                >
                                    Save
                                </button>
                                {passwordRecentlySuccessful && <p className="text-sm text-gray-600">Saved.</p>}
                            </div>
                        </form>
                    </section>
                </div>
            </div>
        </AdminLayout>
    );
}
