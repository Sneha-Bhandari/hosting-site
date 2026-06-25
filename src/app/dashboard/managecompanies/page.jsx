'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Building2,
  Plus,
  Search,
  Trash2,
  AlertTriangle,
  X
} from 'lucide-react';
import AddCompanyModal from '@/components/manage-company/AddCompanyModal';
import Pagination from '../../ui/Pagination';
import toast from 'react-hot-toast';

const ITEMS_PER_PAGE = 5;

// Mock data
const MOCK_COMPANIES = [
  {
    id: '1',
    name: 'Raj Education Private Limited',
    email: 'Raaj.Edubutwal@Gmail.Com',
    contactNumber: '+9779857439227',
    financialContact: '+9779857439227',
    address1: 'Chauraha',
    address2: 'Butwal',
    city: 'Butwal',
    country: 'Nepal',
    state: 'Lumbini Province',
    zipCode: '32900',
    website: 'www.rajeducation.com',
    regionalIncharge: 'Sadhana Gautam',
    createdAt: '2024-01-15',
  },
  {
    id: '2',
    name: 'Global Study Solutions',
    email: 'info@globalstudy.com',
    contactNumber: '+9779812345678',
    financialContact: '+9779812345678',
    address1: 'Kathmandu',
    address2: 'Lalitpur',
    city: 'Kathmandu',
    country: 'Nepal',
    state: 'Bagmati Province',
    zipCode: '44600',
    website: 'www.globalstudy.com',
    regionalIncharge: 'Ram Sharma',
    createdAt: '2024-02-20',
  },
  {
    id: '3',
    name: 'Elite Education Consultancy',
    email: 'contact@eliteedu.com',
    contactNumber: '+9779845678901',
    financialContact: '+9779845678901',
    address1: 'Biratnagar',
    address2: 'Morang',
    city: 'Biratnagar',
    country: 'Nepal',
    state: 'Province No. 1',
    zipCode: '56613',
    website: 'www.eliteedu.com',
    regionalIncharge: 'Sita Pandey',
    createdAt: '2024-03-10',
  },
  {
    id: '4',
    name: 'Bright Future Education',
    email: 'info@brightfuture.com',
    contactNumber: '+9779845678902',
    financialContact: '+9779845678902',
    address1: 'Pokhara',
    address2: 'Kaski',
    city: 'Pokhara',
    country: 'Nepal',
    state: 'Gandaki Province',
    zipCode: '33700',
    website: 'www.brightfuture.com',
    regionalIncharge: 'Hari Prasad',
    createdAt: '2024-04-05',
  },
  {
    id: '5',
    name: 'Nepal Education Consultancy',
    email: 'info@nepaledu.com',
    contactNumber: '+9779856789012',
    financialContact: '+9779856789012',
    address1: 'Lalitpur',
    address2: 'Patan',
    city: 'Lalitpur',
    country: 'Nepal',
    state: 'Bagmati Province',
    zipCode: '44700',
    website: 'www.nepaledu.com',
    regionalIncharge: 'Gita Sharma',
    createdAt: '2024-05-12',
  },
];

export default function ManageCompanies() {
  const [companies, setCompanies] = useState(MOCK_COMPANIES);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [deleteModal, setDeleteModal] = useState({ isOpen: false, companyId: null, companyName: '' });
  const router = useRouter();

  // Filter companies based on search
  const filteredCompanies = companies.filter((company) => {
    const matchesSearch =
      company.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      company.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      company.city?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      company.regionalIncharge?.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSearch;
  });

  // Pagination logic
  const totalPages = Math.ceil(filteredCompanies.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentItems = filteredCompanies.slice(startIndex, endIndex);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleAddCompany = (companyData) => {
    const newCompany = {
      id: Date.now().toString(),
      ...companyData,
      createdAt: new Date().toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric', 
        year: 'numeric' 
      }),
    };
    setCompanies([...companies, newCompany]);
    setIsAddModalOpen(false);
  };

  // Open delete confirmation modal
  const openDeleteModal = (id, name) => {
    setDeleteModal({ isOpen: true, companyId: id, companyName: name });
  };

  // Close delete confirmation modal
  const closeDeleteModal = () => {
    setDeleteModal({ isOpen: false, companyId: null, companyName: '' });
  };

  // Confirm delete
  const confirmDelete = () => {
    if (deleteModal.companyId) {
      setCompanies(companies.filter(company => company.id !== deleteModal.companyId));
      toast.success('Company deleted successfully!');
      closeDeleteModal();
    }
  };

  const handleRowClick = (id) => {
    router.push(`/dashboard/managecompanies/${id}`);
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800 flex items-center gap-2">
            <Building2 className="text-teal-700" size={28} />
            Company Management
          </h1>
          <p className="text-sm text-gray-500 mt-0.5">
            Manage all registered companies and their access
          </p>
        </div>
        <button 
          onClick={() => setIsAddModalOpen(true)}
          className="px-5 py-2.5 bg-teal-600 hover:bg-teal-700 text-white rounded-xl font-medium shadow-sm transition-all flex items-center gap-2 whitespace-nowrap cursor-pointer"
        >
          <Plus size={18} />
          Add New Company
        </button>
      </div>

      {/* Filters & Search */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 md:p-6">
        <div className="flex flex-col sm:flex-row gap-4 sm:items-center sm:justify-between">
          <div className="flex flex-1 gap-4">
            <div className="relative flex-1">
              <Search
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              />
              <input
                type="text"
                placeholder="Search by company name, email, city, or regional incharge..."
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full rounded-xl border border-gray-200 bg-gray-50 py-2.5 pl-10 pr-4 text-sm outline-none focus:ring-2 focus:ring-teal-400/60 focus:border-transparent transition-all"
              />
            </div>
          </div>
          <p className="text-sm text-gray-400 whitespace-nowrap">
            {filteredCompanies.length} companies found
          </p>
        </div>
      </div>

      {/* Companies Table - Built-in */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  SN
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Company Name
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden md:table-cell">
                  Email
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden lg:table-cell">
                  Contact
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden xl:table-cell">
                  City
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden 2xl:table-cell">
                  Regional Incharge
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden sm:table-cell">
                  Created
                </th>
                <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {currentItems.map((company, index) => (
                <tr
                  key={company.id}
                  className="hover:bg-gray-50/70 transition-colors cursor-pointer"
                  onClick={() => handleRowClick(company.id)}
                >
                  <td className="px-4 py-3 text-sm text-gray-500 font-medium">
                    {startIndex + index + 1}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <p className="text-sm font-medium text-teal-600 hover:underline cursor-pointer">
                        {company.name}
                      </p>
                      <p className="text-xs text-gray-400 md:hidden">
                        {company.email}
                      </p>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600 hidden md:table-cell">
                    {company.email}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600 hidden lg:table-cell">
                    {company.contactNumber}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600 hidden xl:table-cell">
                    {company.city}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600 hidden 2xl:table-cell">
                    {company.regionalIncharge}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-500 hidden sm:table-cell">
                    {company.createdAt}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-center gap-2" onClick={(e) => e.stopPropagation()}>
                      <button
                        onClick={() => openDeleteModal(company.id, company.name)}
                        className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors text-gray-400 hover:text-red-600"
                        title="Delete Company"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Empty State */}
        {filteredCompanies.length === 0 && (
          <div className="text-center py-12">
            <Building2 className="mx-auto text-gray-300" size={48} />
            <p className="text-gray-500 mt-3">No companies found</p>
            <p className="text-sm text-gray-400">Try adjusting your search or filters</p>
          </div>
        )}

        {/* Pagination */}
        {filteredCompanies.length > 0 && (
          <div className="px-4 py-3 border-t border-gray-100 flex items-center justify-between">
            <p className="text-sm text-gray-500">
              Showing {startIndex + 1} to {Math.min(endIndex, filteredCompanies.length)} of {filteredCompanies.length} companies
            </p>
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </div>
        )}
      </div>

      {/* Add Company Modal */}
      <AddCompanyModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSubmit={handleAddCompany}
      />

      {/* Delete Confirmation Modal */}
      {deleteModal.isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
          onClick={closeDeleteModal}
        >
          <div 
            className="bg-white rounded-xl max-w-md w-full mx-4 overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="bg-red-50 px-6 py-4 border-b border-red-100 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                  <AlertTriangle className="text-red-600" size={20} />
                </div>
                <h3 className="text-lg font-semibold text-gray-900">Delete Company</h3>
              </div>
              <button
                onClick={closeDeleteModal}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Body */}
            <div className="px-6 py-4">
              <p className="text-gray-700">
                Are you sure you want to delete <span className="font-semibold text-gray-900">{deleteModal.companyName}</span>?
              </p>
              <p className="text-sm text-gray-500 mt-1">
                This action cannot be undone. All company data will be permanently removed.
              </p>
            </div>

            {/* Footer */}
            <div className="bg-gray-50 px-6 py-4 border-t border-gray-100 flex justify-end gap-3">
              <button
                onClick={closeDeleteModal}
                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors text-sm"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm flex items-center gap-2"
              >
                <Trash2 size={16} />
                Delete Company
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}