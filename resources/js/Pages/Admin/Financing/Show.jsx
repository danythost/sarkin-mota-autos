import React from 'react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Head, Link, router } from '@inertiajs/react';

export default function Show({ application }) {
    const updateStatus = (status) => {
        router.patch(route('admin.financing.update', application.id), { status });
    };

    const statusColors = {
        pending: 'bg-yellow-100 text-yellow-800',
        reviewing: 'bg-blue-100 text-blue-800',
        approved: 'bg-emerald-100 text-emerald-800',
        rejected: 'bg-red-100 text-red-800',
    };

    return (
        <AdminLayout>
            <Head title={`Application: ${application.full_name}`} />

            <div className="py-12">
                <div className="max-w-4xl mx-auto sm:px-6 lg:px-8">
                    <div className="mb-6 flex justify-between items-center">
                        <Link
                            href={route('admin.financing.index')}
                            className="text-gray-500 hover:text-gray-700 font-bold text-xs uppercase tracking-widest flex items-center"
                        >
                            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
                            Back to List
                        </Link>
                        <div className={`px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest ${statusColors[application.status]}`}>
                            {application.status}
                        </div>
                    </div>

                    <div className="bg-white shadow sm:rounded-lg overflow-hidden border border-gray-100 mb-6">
                        <div className="p-6 border-b border-gray-100 bg-gray-50 flex justify-between items-center">
                            <h3 className="text-lg font-black text-gray-900 uppercase tracking-tighter italic">Personal Information</h3>
                            <div className="flex space-x-2">
                                {['pending', 'reviewing', 'approved', 'rejected'].map(s => (
                                    <button
                                        key={s}
                                        onClick={() => updateStatus(s)}
                                        className={`px-3 py-1 text-[10px] font-bold uppercase tracking-widest rounded transition-all ${application.status === s ? 'bg-gray-900 text-white' : 'bg-white text-gray-400 border border-gray-200 hover:border-gray-900 hover:text-gray-900'}`}
                                    >
                                        {s}
                                    </button>
                                ))}
                            </div>
                        </div>
                        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 block mb-1">Full Name</label>
                                <div className="font-bold text-gray-900">{application.full_name}</div>
                            </div>
                            <div>
                                <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 block mb-1">Email Address</label>
                                <div className="font-bold text-gray-900">{application.email}</div>
                            </div>
                            <div>
                                <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 block mb-1">Phone Number</label>
                                <div className="font-bold text-gray-900">{application.phone}</div>
                            </div>
                            <div>
                                <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 block mb-1">Date of Birth</label>
                                <div className="font-bold text-gray-900">{application.date_of_birth}</div>
                            </div>
                            <div className="md:col-span-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 block mb-1">Residential Address</label>
                                <div className="font-bold text-gray-900">{application.residential_address}</div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white shadow sm:rounded-lg overflow-hidden border border-gray-100 mb-6">
                        <div className="p-6 border-b border-gray-100 bg-gray-50">
                            <h3 className="text-lg font-black text-gray-900 uppercase tracking-tighter italic">Employment & Income</h3>
                        </div>
                        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 block mb-1">Employment Status</label>
                                <div className="font-bold text-gray-900 capitalize">{application.employment_status}</div>
                            </div>
                            <div>
                                <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 block mb-1">Employer Name</label>
                                <div className="font-bold text-gray-900">{application.employer_name || 'N/A'}</div>
                            </div>
                            <div>
                                <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 block mb-1">Monthly Income</label>
                                <div className="font-bold text-emerald-600 text-lg">₦{Number(application.monthly_income).toLocaleString()}</div>
                            </div>
                            <div>
                                <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 block mb-1">Years Employed</label>
                                <div className="font-bold text-gray-900">{application.years_employed} Years</div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white shadow sm:rounded-lg overflow-hidden border border-gray-100 mb-6">
                        <div className="p-6 border-b border-gray-100 bg-gray-50">
                            <h3 className="text-lg font-black text-gray-900 uppercase tracking-tighter italic">Vehicle & Finance Details</h3>
                        </div>
                        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 block mb-1">Selected Vehicle</label>
                                <div className="font-bold text-gray-900">{application.vehicle?.title}</div>
                            </div>
                            <div>
                                <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 block mb-1">Vehicle Price</label>
                                <div className="font-bold text-gray-900">₦{Number(application.vehicle_price).toLocaleString()}</div>
                            </div>
                            <div>
                                <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 block mb-1">Proposed Deposit</label>
                                <div className="font-bold text-emerald-600">₦{Number(application.proposed_deposit).toLocaleString()}</div>
                            </div>
                            <div>
                                <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 block mb-1">Loan Duration</label>
                                <div className="font-bold text-gray-900">{application.preferred_duration} Months</div>
                            </div>
                            <div>
                                <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 block mb-1">Calculated Monthly Payment</label>
                                <div className="font-bold text-emerald-600 text-xl text-shadow-sm">₦{Number(application.calculated_monthly_payment).toLocaleString()}</div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white shadow sm:rounded-lg overflow-hidden border border-gray-100">
                        <div className="p-6 border-b border-gray-100 bg-gray-50">
                            <h3 className="text-lg font-black text-gray-900 uppercase tracking-tighter italic">Guarantor Information</h3>
                        </div>
                        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 block mb-1">Guarantor Name</label>
                                <div className="font-bold text-gray-900">{application.guarantor_name || 'N/A'}</div>
                            </div>
                            <div>
                                <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 block mb-1">Guarantor Phone</label>
                                <div className="font-bold text-gray-900">{application.guarantor_phone || 'N/A'}</div>
                            </div>
                            <div className="md:col-span-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 block mb-1">Guarantor Address</label>
                                <div className="font-bold text-gray-900">{application.guarantor_address || 'N/A'}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
