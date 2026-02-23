<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Financing Application - {{ $application->id }}</title>
    <style>
        body { font-family: 'Helvetica', 'Arial', sans-serif; color: #1a202c; padding: 20px; line-height: 1.5; }
        .header { border-bottom: 2px solid #10b981; padding-bottom: 20px; margin-bottom: 30px; text-align: center; }
        .logo { font-size: 24px; font-weight: bold; color: #10b981; text-transform: uppercase; letter-spacing: 2px; }
        .title { font-size: 20px; font-weight: 800; text-transform: uppercase; margin-top: 10px; font-style: italic; }
        .section { margin-bottom: 25px; }
        .section-title { font-size: 14px; font-weight: 800; text-transform: uppercase; color: #10b981; border-bottom: 1px solid #e5e7eb; padding-bottom: 5px; margin-bottom: 15px; letter-spacing: 1px; }
        .grid { width: 100%; border-collapse: collapse; }
        .label { font-size: 10px; font-weight: 800; text-transform: uppercase; color: #9ca3af; margin-bottom: 2px; }
        .value { font-size: 14px; font-weight: 700; color: #111827; }
        .info-cell { width: 50%; padding-bottom: 15px; vertical-align: top; }
        .footer { position: fixed; bottom: 0; left: 0; right: 0; text-align: center; font-size: 10px; color: #9ca3af; border-top: 1px solid #e5e7eb; padding-top: 10px; }
        .amount { color: #059669; font-weight: 800; }
        .status { padding: 4px 10px; border-radius: 9999px; text-transform: uppercase; font-size: 10px; font-weight: 800; display: inline-block; }
        .status-pending { background-color: #fef3c7; color: #92400e; }
        .status-reviewing { background-color: #dbeafe; color: #1e40af; }
        .status-approved { background-color: #d1fae5; color: #065f46; }
        .status-rejected { background-color: #fee2e2; color: #991b1b; }
    </style>
</head>
<body>
    <div class="header">
        <div class="logo">Sarkin Mota Autos</div>
        <div class="title">Financing Application Form</div>
        <div style="margin-top: 15px;">
            <span class="status status-{{ $application->status }}">{{ $application->status }}</span>
        </div>
    </div>

    <div class="section">
        <div class="section-title">Personal Information</div>
        <table class="grid">
            <tr>
                <td class="info-cell">
                    <div class="label">Full Name</div>
                    <div class="value">{{ $application->full_name }}</div>
                </td>
                <td class="info-cell">
                    <div class="label">Email Address</div>
                    <div class="value">{{ $application->email }}</div>
                </td>
            </tr>
            <tr>
                <td class="info-cell">
                    <div class="label">Phone Number</div>
                    <div class="value">{{ $application->phone }}</div>
                </td>
                <td class="info-cell">
                    <div class="label">Date of Birth</div>
                    <div class="value">{{ \Carbon\Carbon::parse($application->date_of_birth)->format('d M, Y') }}</div>
                </td>
            </tr>
            <tr>
                <td class="info-cell" colspan="2">
                    <div class="label">Residential Address</div>
                    <div class="value">{{ $application->residential_address }}</div>
                </td>
            </tr>
        </table>
    </div>

    <div class="section">
        <div class="section-title">Employment & Income</div>
        <table class="grid">
            <tr>
                <td class="info-cell">
                    <div class="label">Employment Status</div>
                    <div class="value" style="text-transform: capitalize;">{{ $application->employment_status }}</div>
                </td>
                <td class="info-cell">
                    <div class="label">Employer Name</div>
                    <div class="value">{{ $application->employer_name ?: 'N/A' }}</div>
                </td>
            </tr>
            <tr>
                <td class="info-cell">
                    <div class="label">Monthly Income</div>
                    <div class="value amount">₦{{ number_format($application->monthly_income, 2) }}</div>
                </td>
                <td class="info-cell">
                    <div class="label">Years Employed</div>
                    <div class="value">{{ $application->years_employed }} Years</div>
                </td>
            </tr>
        </table>
    </div>

    <div class="section">
        <div class="section-title">Vehicle & Finance Details</div>
        <table class="grid">
            <tr>
                <td class="info-cell">
                    <div class="label">Selected Vehicle</div>
                    <div class="value">{{ $application->vehicle?->title ?: 'Unknown' }}</div>
                </td>
                <td class="info-cell">
                    <div class="label">Vehicle Price</div>
                    <div class="value">₦{{ number_format($application->vehicle_price, 2) }}</div>
                </td>
            </tr>
            <tr>
                <td class="info-cell">
                    <div class="label">Proposed Deposit</div>
                    <div class="value amount">₦{{ number_format($application->proposed_deposit, 2) }}</div>
                </td>
                <td class="info-cell">
                    <div class="label">Loan Duration</div>
                    <div class="value">{{ $application->preferred_duration }} Months</div>
                </td>
            </tr>
            <tr>
                <td class="info-cell" colspan="2">
                    <div class="label">Estimated Monthly Payment</div>
                    <div class="value amount" style="font-size: 18px;">₦{{ number_format($application->calculated_monthly_payment, 2) }}</div>
                </td>
            </tr>
        </table>
    </div>

    <div class="section">
        <div class="section-title">Guarantor Information</div>
        <table class="grid">
            <tr>
                <td class="info-cell">
                    <div class="label">Guarantor Name</div>
                    <div class="value">{{ $application->guarantor_name ?: 'N/A' }}</div>
                </td>
                <td class="info-cell">
                    <div class="label">Guarantor Phone</div>
                    <div class="value">{{ $application->guarantor_phone ?: 'N/A' }}</div>
                </td>
            </tr>
            <tr>
                <td class="info-cell" colspan="2">
                    <div class="label">Guarantor Address</div>
                    <div class="value">{{ $application->guarantor_address ?: 'N/A' }}</div>
                </td>
            </tr>
        </table>
    </div>

    <div class="footer">
        Generated on {{ date('d M, Y H:i:s') }} | Sarkin Mota Autos - Experience the Extraordinary
    </div>
</body>
</html>
