'use client';
export default function CompanyDetails({ company }) {
  return (
    <div className="bg-white rounded-lg shadow p-12">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">Company Information</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="border p-2 border-gray-200 rounded-2xl bg-gray-100">
            <label className="text-md font-medium text-gray-900">Address 1</label>
            <p className="text-gray-600">{company.address1 || 'N/A'}</p>
          </div>
          <div className="border p-2 border-gray-200 rounded-2xl bg-gray-100">
            <label className="text-sm font-medium text-gray-500">Address 2</label>
            <p className="text-gray-900">{company.address2 || 'N/A'}</p>
          </div>
          <div className="border p-2 border-gray-200 rounded-2xl bg-gray-100">
            <label className="text-sm font-medium text-gray-500">City</label>
            <p className="text-gray-900">{company.city || 'N/A'}</p>
          </div>
          <div className="border p-2 border-gray-200 rounded-2xl bg-gray-100">
            <label className="text-sm font-medium text-gray-500">State</label>
            <p className="text-gray-900">{company.state || 'N/A'}</p>
          </div>
          <div className="border p-2 border-gray-200 rounded-2xl bg-gray-100">
            <label className="text-sm font-medium text-gray-500">Zip Code</label>
            <p className="text-gray-900">{company.zipCode || 'N/A'}</p>
          </div>
          <div className="border p-2 border-gray-200 rounded-2xl bg-gray-100">
            <label className="text-sm font-medium text-gray-500">Country</label>
            <p className="text-gray-900">{company.country || 'N/A'}</p>
          </div>
        </div>
        <div className="space-y-4">
          <div className="border p-2 border-gray-200 rounded-2xl bg-gray-100">
            <label className="text-sm font-medium text-gray-500">Email</label>
            <p className="text-gray-900">{company.email || 'N/A'}</p>
          </div>
          <div className="border p-2 border-gray-200 rounded-2xl bg-gray-100">
            <label className="text-sm font-medium text-gray-500">Contact Number</label>
            <p className="text-gray-900">{company.contactNumber || 'N/A'}</p>
          </div>
          <div className="border p-2 border-gray-200 rounded-2xl bg-gray-100">
            <label className="text-sm font-medium text-gray-500">Financial Contact</label>
            <p className="text-gray-900">{company.financialContact || 'N/A'}</p>
          </div>
          <div className="border p-2 border-gray-200 rounded-2xl bg-gray-100">
            <label className="text-sm font-medium text-gray-500">Regional Incharge</label>
            <p className="text-gray-900">{company.regionalIncharge || 'N/A'}</p>
          </div>
          <div className="border p-2 border-gray-200 rounded-2xl bg-gray-100">
            <label className="text-sm font-medium text-gray-500">Website</label>
            <p className="text-gray-900">{company.website || 'N/A'}</p>
          </div>
        </div>
      </div>

    </div>
  );
}