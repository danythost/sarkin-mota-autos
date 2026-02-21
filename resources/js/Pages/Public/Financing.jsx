import React, { useState, useEffect } from 'react';
import { Head, Link, useForm, usePage } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';

const steps = [
    { id: 1, label: 'Personal Info' },
    { id: 2, label: 'Employment' },
    { id: 3, label: 'Vehicle & Finance' },
    { id: 4, label: 'Guarantor' },
];

function StepIndicator({ current }) {
    return (
        <div className="flex items-center justify-center mb-10">
            {steps.map((step, idx) => (
                <React.Fragment key={step.id}>
                    <div className="flex flex-col items-center">
                        <div className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-sm border-2 transition-all duration-300 ${current > step.id
                                ? 'bg-white border-white text-emerald-700'
                                : current === step.id
                                    ? 'bg-emerald-500 border-white text-white shadow-lg'
                                    : 'bg-white/20 border-white/40 text-white/60'
                            }`}>
                            {current > step.id ? (
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                            ) : step.id}
                        </div>
                        <span className={`text-xs mt-1.5 font-semibold hidden sm:block ${current === step.id ? 'text-white' : current > step.id ? 'text-emerald-200' : 'text-white/50'}`}>{step.label}</span>
                    </div>
                    {idx < steps.length - 1 && (
                        <div className={`h-0.5 w-12 sm:w-20 mx-1 transition-all duration-300 ${current > step.id ? 'bg-white' : 'bg-white/25'}`} />
                    )}
                </React.Fragment>
            ))}
        </div>
    );
}

const inputClass = "w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition bg-white";
const labelClass = "block text-sm font-semibold text-gray-700 mb-1";
const errorClass = "text-xs text-red-500 mt-1";

export default function Financing({ vehicles = [], vehicle = null }) {
    const [currentStep, setCurrentStep] = useState(1);
    const [submitted, setSubmitted] = useState(false);

    const { data, setData, post, processing, errors, reset } = useForm({
        vehicle_id: vehicle?.id || '',
        full_name: '',
        email: '',
        phone: '',
        date_of_birth: '',
        marital_status: '',
        residential_address: '',
        employment_status: '',
        employer_name: '',
        monthly_income: '',
        years_employed: '',
        vehicle_price: vehicle?.price || '',
        proposed_deposit: '',
        preferred_duration: '12',
        calculated_monthly_payment: '',
        guarantor_name: '',
        guarantor_phone: '',
        guarantor_address: '',
    });

    // Auto-fill vehicle price when vehicle_id changes
    useEffect(() => {
        if (data.vehicle_id) {
            const selected = vehicles.find(v => String(v.id) === String(data.vehicle_id));
            if (selected) {
                setData(prev => ({ ...prev, vehicle_price: selected.price }));
            }
        }
    }, [data.vehicle_id]);

    // Calculate monthly payment
    useEffect(() => {
        const price = parseFloat(data.vehicle_price) || 0;
        const deposit = parseFloat(data.proposed_deposit) || 0;
        const months = parseInt(data.preferred_duration) || 12;
        const balance = price - deposit;
        if (balance > 0 && months > 0) {
            const monthly = (balance / months).toFixed(2);
            setData(prev => ({ ...prev, calculated_monthly_payment: monthly }));
        } else {
            setData(prev => ({ ...prev, calculated_monthly_payment: '' }));
        }
    }, [data.vehicle_price, data.proposed_deposit, data.preferred_duration]);

    const formatNaira = (amount) => {
        if (!amount) return '—';
        return '₦' + Number(amount).toLocaleString('en-NG', { minimumFractionDigits: 0 });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('financing.store'), {
            onSuccess: () => {
                setSubmitted(true);
                reset();
            },
        });
    };

    const next = () => setCurrentStep(s => Math.min(s + 1, 4));
    const prev = () => setCurrentStep(s => Math.max(s - 1, 1));

    return (
        <AppLayout>
            <Head title="Financing — Sarkin Moto Autos" />

            {/* Hero */}
            <div className="relative bg-emerald-900 text-white overflow-hidden">
                <div className="absolute inset-0 bg-black/60" />
                <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: "url('https://images.unsplash.com/photo-1560179707-f14e90ef3623?auto=format&fit=crop&w=1950&q=80')" }}
                />
                <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-28 text-center">
                    <span className="inline-block bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-5">
                        Auto Financing
                    </span>
                    <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mb-5">
                        Flexible Auto Financing<br /> Made Simple
                    </h1>
                    <p className="text-lg md:text-xl text-emerald-100 max-w-2xl mx-auto mb-8">
                        Drive your dream car today with convenient financing options from Sarkin Moto Autos. We make vehicle ownership accessible, affordable, and stress-free.
                    </p>
                    <a href="#apply" className="inline-block bg-emerald-500 hover:bg-emerald-400 text-white font-bold py-4 px-10 rounded-full transition duration-300 shadow-lg shadow-emerald-900/50">
                        Start Application ↓
                    </a>
                </div>
            </div>

            {/* Intro */}
            <section className="py-20 bg-white">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid md:grid-cols-2 gap-16 items-center">
                        <div>
                            <span className="text-emerald-600 font-bold uppercase tracking-wider text-xs">How We Help</span>
                            <h2 className="text-3xl font-extrabold text-gray-900 mt-2 mb-5">Drive Now, Pay Conveniently</h2>
                            <p className="text-gray-600 leading-relaxed mb-6">
                                At Sarkin Moto Autos, we understand that paying the full cost of a vehicle upfront may not always be convenient. That's why we offer structured financing options.
                            </p>
                            <ul className="space-y-3">
                                {[
                                    'Pay a flexible deposit',
                                    'Spread the remaining balance over agreed monthly installments',
                                    'Get fast approval and transparent terms',
                                    'Drive away sooner without financial strain',
                                ].map((item, i) => (
                                    <li key={i} className="flex items-start space-x-3">
                                        <div className="w-5 h-5 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                                            <svg className="w-3 h-3 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                            </svg>
                                        </div>
                                        <span className="text-gray-700 text-sm">{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Sample Illustration */}
                        <div className="bg-gradient-to-br from-emerald-600 to-teal-700 rounded-3xl p-8 text-white shadow-xl shadow-emerald-200">
                            <h3 className="text-lg font-bold mb-6 text-emerald-100">Sample Financing Illustration</h3>
                            <div className="space-y-4">
                                {[
                                    ['Vehicle Price', '₦12,000,000'],
                                    ['Deposit (30%)', '₦3,600,000'],
                                    ['Balance', '₦8,400,000'],
                                    ['Duration', '12 months'],
                                ].map(([label, value]) => (
                                    <div key={label} className="flex justify-between items-center border-b border-white/20 pb-3">
                                        <span className="text-emerald-100 text-sm">{label}</span>
                                        <span className="font-bold">{value}</span>
                                    </div>
                                ))}
                                <div className="bg-white/20 rounded-xl p-4 text-center mt-4">
                                    <p className="text-emerald-100 text-xs uppercase tracking-wider mb-1">Est. Monthly Payment</p>
                                    <p className="text-3xl font-extrabold">₦750,000</p>
                                </div>
                                <p className="text-xs text-emerald-200 text-center mt-2">Final terms may vary depending on agreement.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* How It Works */}
            <section className="py-20 bg-gray-50">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-14">
                        <span className="text-emerald-600 font-bold uppercase tracking-wider text-xs">The Process</span>
                        <h2 className="text-3xl font-extrabold text-gray-900 mt-2">How It Works</h2>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
                        {[
                            { step: '01', title: 'Choose Vehicle', desc: 'Browse inventory and select the car that meets your needs.' },
                            { step: '02', title: 'Apply', desc: 'Complete our simple application form with your details.' },
                            { step: '03', title: 'Review', desc: 'Our finance team reviews your application and confirms eligibility.' },
                            { step: '04', title: 'Pay Deposit', desc: 'Make the agreed initial deposit payment.' },
                            { step: '05', title: 'Drive Away', desc: 'Complete documentation and take possession of your vehicle.' },
                        ].map((item) => (
                            <div key={item.step} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 text-center hover:shadow-md transition">
                                <div className="text-3xl font-extrabold text-emerald-100 mb-3">{item.step}</div>
                                <div className="w-10 h-10 bg-emerald-600 rounded-full flex items-center justify-center mx-auto mb-3">
                                    <span className="text-white font-bold text-xs">{item.step}</span>
                                </div>
                                <h3 className="font-bold text-gray-900 mb-2">{item.title}</h3>
                                <p className="text-xs text-gray-500 leading-relaxed">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Why Finance + Eligibility */}
            <section className="py-20 bg-white">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid md:grid-cols-2 gap-12">
                        {/* Why Finance */}
                        <div>
                            <span className="text-emerald-600 font-bold uppercase tracking-wider text-xs">Benefits</span>
                            <h2 className="text-2xl font-extrabold text-gray-900 mt-2 mb-6">Why Finance With Us?</h2>
                            <div className="space-y-4">
                                {[
                                    { icon: '💎', title: 'Transparent Pricing', desc: 'No hidden fees or surprises. Full disclosure of all terms.' },
                                    { icon: '🔄', title: 'Flexible Repayment', desc: 'Choose from 6, 12, 18, or 24 month plans to suit your budget.' },
                                    { icon: '🤝', title: 'Trusted Partnerships', desc: 'We work with reliable financial institutions for your security.' },
                                    { icon: '⚡', title: 'Fast Processing', desc: 'Quick approval process to get you driving as soon as possible.' },
                                    { icon: '📄', title: 'Professional Docs', desc: 'All documentation handled properly and professionally.' },
                                ].map((b) => (
                                    <div key={b.title} className="flex items-start space-x-4">
                                        <div className="w-10 h-10 bg-emerald-50 rounded-xl flex items-center justify-center text-lg flex-shrink-0">{b.icon}</div>
                                        <div>
                                            <h4 className="font-bold text-gray-900 text-sm">{b.title}</h4>
                                            <p className="text-xs text-gray-500 mt-0.5">{b.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Eligibility */}
                        <div>
                            <span className="text-emerald-600 font-bold uppercase tracking-wider text-xs">Requirements</span>
                            <h2 className="text-2xl font-extrabold text-gray-900 mt-2 mb-6">Eligibility Requirements</h2>
                            <p className="text-gray-600 text-sm mb-6">Applicants may be required to provide:</p>
                            <div className="space-y-3">
                                {[
                                    'Valid government-issued ID',
                                    'Proof of income or employment',
                                    '3–6 months bank statement',
                                    'Residential address verification',
                                    'Guarantor (if applicable)',
                                ].map((item, i) => (
                                    <div key={i} className="flex items-center space-x-3 bg-gray-50 rounded-xl p-4 border border-gray-100">
                                        <div className="w-6 h-6 rounded-full bg-emerald-600 text-white flex items-center justify-center text-xs font-bold flex-shrink-0">{i + 1}</div>
                                        <span className="text-sm text-gray-700">{item}</span>
                                    </div>
                                ))}
                            </div>
                            <p className="text-xs text-gray-400 mt-4 italic">Approval is subject to review and agreed terms.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Application Form */}
            <section id="apply" className="py-24 bg-gradient-to-br from-gray-50 to-emerald-50">
                <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-10">
                        <span className="text-emerald-600 font-bold uppercase tracking-wider text-xs">Get Started</span>
                        <h2 className="text-3xl font-extrabold text-gray-900 mt-2">Apply for Financing Today</h2>
                        <p className="text-gray-500 text-sm mt-2">Fill out the form below and our team will get back to you promptly.</p>
                    </div>

                    {submitted ? (
                        <div className="bg-white rounded-3xl shadow-xl p-12 text-center border border-emerald-100">
                            <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
                                <svg className="w-10 h-10 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                            </div>
                            <h3 className="text-2xl font-extrabold text-gray-900 mb-3">Application Submitted!</h3>
                            <p className="text-gray-500 mb-8">Thank you! Our finance team will review your application and contact you within 24–48 hours.</p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <button onClick={() => setSubmitted(false)} className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3 px-8 rounded-xl transition">
                                    Submit Another Application
                                </button>
                                <Link href={route('vehicles.index')} className="border border-gray-200 text-gray-700 font-bold py-3 px-8 rounded-xl hover:bg-gray-50 transition">
                                    Browse Inventory
                                </Link>
                            </div>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">
                            {/* Header */}
                            <div className="bg-gradient-to-r from-emerald-600 to-teal-600 px-8 py-6">
                                <StepIndicator current={currentStep} />
                                <h3 className="text-white font-bold text-lg text-center">
                                    Step {currentStep}: {steps[currentStep - 1].label}
                                </h3>
                            </div>

                            <div className="p-8">
                                {/* Step 1: Personal Info */}
                                {currentStep === 1 && (
                                    <div className="space-y-5">
                                        <div className="grid sm:grid-cols-2 gap-5">
                                            <div>
                                                <label className={labelClass}>Full Name <span className="text-red-500">*</span></label>
                                                <input
                                                    type="text"
                                                    className={inputClass}
                                                    value={data.full_name}
                                                    onChange={e => setData('full_name', e.target.value)}
                                                    placeholder="Aminu Garba"
                                                />
                                                {errors.full_name && <p className={errorClass}>{errors.full_name}</p>}
                                            </div>
                                            <div>
                                                <label className={labelClass}>Email Address <span className="text-red-500">*</span></label>
                                                <input
                                                    type="email"
                                                    className={inputClass}
                                                    value={data.email}
                                                    onChange={e => setData('email', e.target.value)}
                                                    placeholder="aminu@example.com"
                                                />
                                                {errors.email && <p className={errorClass}>{errors.email}</p>}
                                            </div>
                                        </div>
                                        <div className="grid sm:grid-cols-2 gap-5">
                                            <div>
                                                <label className={labelClass}>Phone Number <span className="text-red-500">*</span></label>
                                                <input
                                                    type="text"
                                                    className={inputClass}
                                                    value={data.phone}
                                                    onChange={e => setData('phone', e.target.value)}
                                                    placeholder="+234 800 000 0000"
                                                />
                                                {errors.phone && <p className={errorClass}>{errors.phone}</p>}
                                            </div>
                                            <div>
                                                <label className={labelClass}>Date of Birth <span className="text-red-500">*</span></label>
                                                <input
                                                    type="date"
                                                    className={inputClass}
                                                    value={data.date_of_birth}
                                                    onChange={e => setData('date_of_birth', e.target.value)}
                                                />
                                                {errors.date_of_birth && <p className={errorClass}>{errors.date_of_birth}</p>}
                                            </div>
                                        </div>
                                        <div>
                                            <label className={labelClass}>Marital Status</label>
                                            <select className={inputClass} value={data.marital_status} onChange={e => setData('marital_status', e.target.value)}>
                                                <option value="">Select status</option>
                                                <option>Single</option>
                                                <option>Married</option>
                                                <option>Divorced</option>
                                                <option>Widowed</option>
                                            </select>
                                        </div>
                                        <div>
                                            <label className={labelClass}>Residential Address <span className="text-red-500">*</span></label>
                                            <textarea
                                                className={inputClass}
                                                rows={3}
                                                value={data.residential_address}
                                                onChange={e => setData('residential_address', e.target.value)}
                                                placeholder="No. 5, Example Street, Kano, Nigeria"
                                            />
                                            {errors.residential_address && <p className={errorClass}>{errors.residential_address}</p>}
                                        </div>
                                    </div>
                                )}

                                {/* Step 2: Employment */}
                                {currentStep === 2 && (
                                    <div className="space-y-5">
                                        <div>
                                            <label className={labelClass}>Employment Status <span className="text-red-500">*</span></label>
                                            <select className={inputClass} value={data.employment_status} onChange={e => setData('employment_status', e.target.value)}>
                                                <option value="">Select status</option>
                                                <option value="employed">Employed</option>
                                                <option value="self-employed">Self-Employed</option>
                                                <option value="business-owner">Business Owner</option>
                                                <option value="retired">Retired</option>
                                            </select>
                                            {errors.employment_status && <p className={errorClass}>{errors.employment_status}</p>}
                                        </div>
                                        <div>
                                            <label className={labelClass}>Employer / Business Name</label>
                                            <input
                                                type="text"
                                                className={inputClass}
                                                value={data.employer_name}
                                                onChange={e => setData('employer_name', e.target.value)}
                                                placeholder="XYZ Corporation Ltd."
                                            />
                                        </div>
                                        <div className="grid sm:grid-cols-2 gap-5">
                                            <div>
                                                <label className={labelClass}>Monthly Income (₦) <span className="text-red-500">*</span></label>
                                                <input
                                                    type="number"
                                                    className={inputClass}
                                                    value={data.monthly_income}
                                                    onChange={e => setData('monthly_income', e.target.value)}
                                                    placeholder="500000"
                                                    min="0"
                                                />
                                                {errors.monthly_income && <p className={errorClass}>{errors.monthly_income}</p>}
                                            </div>
                                            <div>
                                                <label className={labelClass}>Years Employed</label>
                                                <input
                                                    type="number"
                                                    className={inputClass}
                                                    value={data.years_employed}
                                                    onChange={e => setData('years_employed', e.target.value)}
                                                    placeholder="3"
                                                    min="0"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* Step 3: Vehicle & Finance */}
                                {currentStep === 3 && (
                                    <div className="space-y-5">
                                        <div>
                                            <label className={labelClass}>Select Vehicle <span className="text-red-500">*</span></label>
                                            <select className={inputClass} value={data.vehicle_id} onChange={e => setData('vehicle_id', e.target.value)}>
                                                <option value="">Choose a vehicle...</option>
                                                {vehicles.map(v => (
                                                    <option key={v.id} value={v.id}>{v.title} — {formatNaira(v.price)}</option>
                                                ))}
                                            </select>
                                            {errors.vehicle_id && <p className={errorClass}>{errors.vehicle_id}</p>}
                                        </div>
                                        <div>
                                            <label className={labelClass}>Vehicle Price (₦)</label>
                                            <input
                                                type="text"
                                                className={`${inputClass} bg-gray-50 text-gray-500`}
                                                value={data.vehicle_price ? Number(data.vehicle_price).toLocaleString() : ''}
                                                readOnly
                                                placeholder="Auto-filled from vehicle selection"
                                            />
                                        </div>
                                        <div className="grid sm:grid-cols-2 gap-5">
                                            <div>
                                                <label className={labelClass}>Proposed Deposit (₦) <span className="text-red-500">*</span></label>
                                                <input
                                                    type="number"
                                                    className={inputClass}
                                                    value={data.proposed_deposit}
                                                    onChange={e => setData('proposed_deposit', e.target.value)}
                                                    placeholder="3600000"
                                                    min="0"
                                                />
                                                {errors.proposed_deposit && <p className={errorClass}>{errors.proposed_deposit}</p>}
                                            </div>
                                            <div>
                                                <label className={labelClass}>Preferred Duration <span className="text-red-500">*</span></label>
                                                <select className={inputClass} value={data.preferred_duration} onChange={e => setData('preferred_duration', e.target.value)}>
                                                    <option value="6">6 months</option>
                                                    <option value="12">12 months</option>
                                                    <option value="18">18 months</option>
                                                    <option value="24">24 months</option>
                                                </select>
                                            </div>
                                        </div>

                                        {/* Live Calculation */}
                                        {data.calculated_monthly_payment && (
                                            <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-5">
                                                <h4 className="font-bold text-emerald-800 mb-3">💡 Estimated Breakdown</h4>
                                                <div className="grid grid-cols-2 gap-3 text-sm">
                                                    <div>
                                                        <span className="text-gray-500">Balance to Finance</span>
                                                        <p className="font-bold text-gray-900">{formatNaira(parseFloat(data.vehicle_price) - parseFloat(data.proposed_deposit))}</p>
                                                    </div>
                                                    <div>
                                                        <span className="text-gray-500">Duration</span>
                                                        <p className="font-bold text-gray-900">{data.preferred_duration} months</p>
                                                    </div>
                                                </div>
                                                <div className="mt-3 pt-3 border-t border-emerald-200">
                                                    <span className="text-xs text-emerald-700 uppercase tracking-wider">Est. Monthly Payment</span>
                                                    <p className="text-2xl font-extrabold text-emerald-700">{formatNaira(data.calculated_monthly_payment)}</p>
                                                    <p className="text-xs text-emerald-600 mt-1">*Final terms may vary depending on agreement.</p>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                )}

                                {/* Step 4: Guarantor */}
                                {currentStep === 4 && (
                                    <div className="space-y-5">
                                        <p className="text-sm text-gray-500 bg-amber-50 border border-amber-100 rounded-xl p-4">
                                            ℹ️ A guarantor is optional and may be required based on assessment. If you have one, please fill in their details below.
                                        </p>
                                        <div>
                                            <label className={labelClass}>Guarantor Full Name</label>
                                            <input
                                                type="text"
                                                className={inputClass}
                                                value={data.guarantor_name}
                                                onChange={e => setData('guarantor_name', e.target.value)}
                                                placeholder="Guarantor name"
                                            />
                                        </div>
                                        <div>
                                            <label className={labelClass}>Guarantor Phone Number</label>
                                            <input
                                                type="text"
                                                className={inputClass}
                                                value={data.guarantor_phone}
                                                onChange={e => setData('guarantor_phone', e.target.value)}
                                                placeholder="+234 800 000 0000"
                                            />
                                        </div>
                                        <div>
                                            <label className={labelClass}>Guarantor Residential Address</label>
                                            <textarea
                                                className={inputClass}
                                                rows={3}
                                                value={data.guarantor_address}
                                                onChange={e => setData('guarantor_address', e.target.value)}
                                                placeholder="Guarantor's full address"
                                            />
                                        </div>

                                        {/* Summary */}
                                        <div className="bg-gray-50 rounded-2xl p-5 border border-gray-100">
                                            <h4 className="font-bold text-gray-900 mb-3">Application Summary</h4>
                                            <div className="space-y-2 text-sm">
                                                <div className="flex justify-between"><span className="text-gray-500">Applicant</span><span className="font-medium">{data.full_name || '—'}</span></div>
                                                <div className="flex justify-between"><span className="text-gray-500">Vehicle</span><span className="font-medium">{vehicles.find(v => String(v.id) === String(data.vehicle_id))?.title || '—'}</span></div>
                                                <div className="flex justify-between"><span className="text-gray-500">Vehicle Price</span><span className="font-medium">{formatNaira(data.vehicle_price)}</span></div>
                                                <div className="flex justify-between"><span className="text-gray-500">Deposit</span><span className="font-medium">{formatNaira(data.proposed_deposit)}</span></div>
                                                <div className="flex justify-between"><span className="text-gray-500">Duration</span><span className="font-medium">{data.preferred_duration} months</span></div>
                                                <div className="flex justify-between border-t border-gray-200 pt-2 mt-2"><span className="text-gray-900 font-bold">Est. Monthly</span><span className="font-bold text-emerald-600">{formatNaira(data.calculated_monthly_payment)}</span></div>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Navigation Buttons */}
                            <div className="px-8 pb-8 flex justify-between items-center">
                                <button
                                    type="button"
                                    onClick={prev}
                                    disabled={currentStep === 1}
                                    className="border border-gray-200 text-gray-600 font-bold py-3 px-7 rounded-xl hover:bg-gray-50 transition disabled:opacity-30 disabled:cursor-not-allowed"
                                >
                                    ← Back
                                </button>

                                {currentStep < 4 ? (
                                    <button
                                        type="button"
                                        onClick={next}
                                        className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3 px-8 rounded-xl transition shadow-sm"
                                    >
                                        Continue →
                                    </button>
                                ) : (
                                    <button
                                        type="submit"
                                        disabled={processing}
                                        className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3 px-8 rounded-xl transition shadow-sm disabled:opacity-60 disabled:cursor-not-allowed flex items-center space-x-2"
                                    >
                                        {processing ? (
                                            <>
                                                <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" /></svg>
                                                <span>Submitting...</span>
                                            </>
                                        ) : (
                                            <span>Submit Application</span>
                                        )}
                                    </button>
                                )}
                            </div>

                            {/* WhatsApp CTA */}
                            <div className="bg-gray-50 border-t border-gray-100 px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-4">
                                <p className="text-sm text-gray-500">Prefer to speak with someone directly?</p>
                                <a
                                    href="https://wa.me/2348001234567?text=Hello%2C%20I'm%20interested%20in%20vehicle%20financing."
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center space-x-2 bg-green-500 hover:bg-green-400 text-white font-bold py-2.5 px-6 rounded-full transition text-sm"
                                >
                                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>
                                    <span>Chat on WhatsApp</span>
                                </a>
                            </div>
                        </form>
                    )}
                </div>
            </section>
        </AppLayout>
    );
}
