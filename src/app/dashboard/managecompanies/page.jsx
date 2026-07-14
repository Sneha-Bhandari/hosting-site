'use client';

import { useState, useEffect } from 'react';
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

export default function ManageCompanies() {
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [deleteModal, setDeleteModal] = useState({ isOpen: false, companyId: null, companyName: '' });
  const router = useRouter();

  const fetchCompanies = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/company");
      const result = await res.json();

      if (result.success) {
        setCompanies(result.data);
      } else {
        toast.error(result.message || "Failed to load companies");
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to load companies");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCompanies();
  }, []);

  const filteredCompanies = companies.filter((company) => {
    const matchesSearch =
      company.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      company.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      company.city?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      company.regionalIncharge?.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSearch;
  });

  const totalPages = Math.ceil(filteredCompanies.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentItems = filteredCompanies.slice(startIndex, endIndex);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleAddCompany = async (companyData) => {
    try {
      const res = await fetch("/api/company", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(companyData)
      });

      const result = await res.json();

      if (result.success) {
        toast.success("Company created successfully");
        setIsAddModalOpen(false);
        fetchCompanies();
      } else {
        toast.error(result.message || "Failed to create company");
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to create company");
    }
  };

  const openDeleteModal = (id, name) => {
    setDeleteModal({ isOpen: true, companyId: id, companyName: name });
  };

  const closeDeleteModal = () => {
    setDeleteModal({ isOpen: false, companyId: null, companyName: '' });
  };

  const confirmDelete = async () => {
    if (!deleteModal.companyId) return;

    try {
      const res = await fetch(`/api/company?id=${deleteModal.companyId}`, {
        method: "DELETE",
      });

      const result = await res.json();

      if (result.success) {
        toast.success('Company deleted successfully!');
        closeDeleteModal();
        fetchCompanies();
      } else {
        toast.error(result.message || "Failed to delete company");
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to delete company");
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

      {/* Companies Table */}
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
              {loading ? (
                <tr>
                  <td colSpan="8" className="text-center py-10">
                    <div className="flex items-center justify-center">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-teal-600"></div>
                    </div>
                    <p className="text-gray-500 mt-2">Loading companies...</p>
                  </td>
                </tr>
              ) : currentItems.length === 0 ? (
                <tr>
                  <td colSpan="8" className="text-center py-12">
                    <Building2 className="mx-auto text-gray-300" size={48} />
                    <p className="text-gray-500 mt-3">No companies found</p>
                    <p className="text-sm text-gray-400">
                      {searchTerm ? 'Try adjusting your search' : 'Click "Add New Company" to get started'}
                    </p>
                  </td>
                </tr>
              ) : (
                currentItems.map((company, index) => (
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
                      {company.city || '-'}
                    </td>

                    <td className="px-4 py-3 text-sm text-gray-600 hidden 2xl:table-cell">
                      {company.regionalIncharge || '-'}
                    </td>

                    <td className="px-4 py-3 text-sm text-gray-500 hidden sm:table-cell">
                      {company.createdAt ? new Date(company.createdAt).toLocaleDateString() : '-'}
                    </td>

                    <td className="px-4 py-3">
                      <div
                        className="flex items-center justify-center gap-2"
                        onClick={(e) => e.stopPropagation()}
                      >
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
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {!loading && filteredCompanies.length > 0 && (
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