"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import {
  Edit,
  Trash2,
  Lock,
  Building2,
  UserPlus,
  ChevronRight,
  AlertTriangle,
  X,
  UserRoundPlus,
} from "lucide-react";
import CompanyDetails from "@/components/manage-company/CompanyDetails";
import GrantAccessModal from "@/components/manage-company/GrantAccessModal";
import AddCompanyDetailsModal from "@/components/manage-company/AddCompanyDetailsModal";
import AddAdminModal from "@/components/manage-company/AddAdminModal";
import EditCompanyModal from "@/components/manage-company/EditCompanyModal";
import toast from "react-hot-toast";


export default function CompanyDetailsPage() {
  const [company, setCompany] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isGrantAccessOpen, setIsGrantAccessOpen] = useState(false);
  const [isAddDetailsOpen, setIsAddDetailsOpen] = useState(false);
  const [isAddAdminOpen, setIsAddAdminOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const router = useRouter();
  const params = useParams();
  const id = Array.isArray(params?.id) ? params.id[0] : params?.id;

  useEffect(() => {
    if (!id) return;

    const fetchCompany = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/company?id=${id}`);
        const result = await res.json();

        if (result.success) {
          setCompany(result.data);
        } else {
          setCompany(null);
        }
      } catch (error) {
        console.log(error);
        toast.error("Failed to load company");
      } finally {
        setLoading(false);
      }
    };

    fetchCompany();
  }, [id]);

  const handleEdit = () => {
    setIsEditModalOpen(true);
  };

  const handleUpdateCompany = async (updatedData) => {
    setCompany({
      ...company,
      ...updatedData,
    });
    
    try {
      const res = await fetch(`/api/company?id=${id}`);
      const result = await res.json();
      if (result.success) {
        setCompany(result.data);
      }
    } catch (error) {
      console.error('Error refreshing company data:', error);
    }
    
    setIsEditModalOpen(false);
    toast.success("Company updated successfully!");
  };

  const confirmDelete = async () => {
    try {
      const res = await fetch(`/api/company?id=${id}`, {
        method: "DELETE",
      });

      const result = await res.json();

      if (result.success) {
        toast.success("Company deleted successfully!");
        router.push("/dashboard/managecompanies");
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to delete company");
    }
  };

  const handleGrantAccess = (accessData) => {
    setCompany({
      ...company,
      grantedCountries: accessData.countries || [],
      grantedUniversities: accessData.universities || [],
      grantedStudyAreas: accessData.studyAreas || [],
    });
    setIsGrantAccessOpen(false);
    toast.success("Access granted successfully!");
  };

  const handleAddDetails = (detailsData) => {
    setCompany({
      ...company,
      bankName: detailsData.bankName || "",
      accountNumber: detailsData.accountNumber || "",
      swiftCode: detailsData.swiftCode || "",
      documents: detailsData.documents?.map((doc) => doc.name) || [],
    });
    setIsAddDetailsOpen(false);
    toast.success("Company banking details added successfully!");
  };

  const handleAddAdmin = (newAdmin) => {
    setCompany({
      ...company,
      admins: [...(company?.admins || []), newAdmin],
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading company details...</p>
        </div>
      </div>
    );
  }

  if (!company) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center bg-white p-8 rounded-lg shadow-lg max-w-md">
          <div className="text-6xl mb-4">🔍</div>
          <h2 className="text-2xl font-bold text-gray-900">
            Company not found
          </h2>
          <p className="text-gray-600 mt-2">
            The company you're looking for doesn't exist.
          </p>
          <button
            onClick={() => router.push("/dashboard/managecompanies")}
            className="mt-6 px-6 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors"
          >
            Go back to companies
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-8xl mx-auto py-6 px-4">
          <div className="flex items-center gap-2 text-sm text-gray-500 mb-6">
            <span
              className="hover:text-teal-600 cursor-pointer"
              onClick={() => router.push("/dashboard/managecompanies")}
            >
              Companies
            </span>
            <ChevronRight size={14} />
            <span className="text-gray-700 font-medium">{company.name}</span>
          </div>

          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-6">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-teal-100 rounded-xl flex items-center justify-center">
                <Building2 className="text-teal-600" size={28} />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  {company.name}
                </h1>
                <p className="text-sm text-gray-500">
                  Company details and access management
                </p>
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              <button
                onClick={handleEdit}
                className="px-2 py-2 bg-gray-100 text-black rounded-lg hover:bg-gray-300 transition-colors text-sm flex items-center gap-1.5 cursor-pointer"
              >
                <Edit size={16} />
                Edit
              </button>

              <button
                onClick={() =>
                  router.push(`/dashboard/managecompanies/${id}/addReferred`)
                }
                className="px-2 py-2 bg-indigo-200 text-black rounded-lg hover:bg-indigo-300 transition-colors text-sm flex items-center gap-1.5 cursor-pointer"
              >
                <UserRoundPlus size={16} />
                Add Referred
              </button>

              <button
                onClick={() => setIsGrantAccessOpen(true)}
                className="px-4 py-2 bg-green-500/20 text-black rounded-lg hover:bg-teal-200 cursor-pointer transition-colors text-sm flex items-center gap-1.5"
              >
                <Lock size={16} />
                Allow Access
              </button>

              <button
                onClick={() => setIsAddAdminOpen(true)}
                className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 cursor-pointer transition-colors text-sm flex items-center gap-1.5"
              >
                <UserPlus size={16} />
                Add Admin
              </button>

              {/* Delete Button */}
              <button
                onClick={() => setIsDeleteModalOpen(true)}
                className="px-4 py-2 bg-red-500/20 text-red-600 rounded-lg hover:bg-red-200 cursor-pointer transition-colors text-sm flex items-center gap-1.5"
              >
                <Trash2 size={16} />
                Delete
              </button>
            </div>
          </div>

          <CompanyDetails company={company} isEditMode={false} />

          <GrantAccessModal
            isOpen={isGrantAccessOpen}
            onClose={() => setIsGrantAccessOpen(false)}
            onGrantAccess={handleGrantAccess}
            companyId={id}
            companyName={company.name}
            initialCountries={company.grantedCountries || []}
            initialUniversities={company.grantedUniversities || []}
            initialStudyAreas={company.grantedStudyAreas || []}
          />

          <AddCompanyDetailsModal
            isOpen={isAddDetailsOpen}
            onClose={() => setIsAddDetailsOpen(false)}
            onSubmit={handleAddDetails}
            companyName={company.name}
          />

          <AddAdminModal
            isOpen={isAddAdminOpen}
            onClose={() => setIsAddAdminOpen(false)}
            companyId={id}
            companyName={company.name}
            onAdminAdded={handleAddAdmin}
          />

          <EditCompanyModal
            isOpen={isEditModalOpen}
            onClose={() => setIsEditModalOpen(false)}
            onSubmit={handleUpdateCompany}
            companyData={company}
          />

          {/* Delete Confirmation Modal */}
          {isDeleteModalOpen && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
              <div className="bg-white rounded-xl max-w-md w-full mx-4 overflow-hidden shadow-2xl">
                <div className="bg-red-50 px-6 py-4 border-b border-red-100 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                      <AlertTriangle className="text-red-600" size={20} />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      Delete Company
                    </h3>
                  </div>
                  <button
                    onClick={() => setIsDeleteModalOpen(false)}
                    className="text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    <X size={20} />
                  </button>
                </div>

                <div className="px-6 py-4">
                  <p className="text-gray-700">
                    Are you sure you want to delete{" "}
                    <span className="font-semibold text-gray-900">
                      {company.name}
                    </span>
                    ?
                  </p>
                  <p className="text-sm text-gray-500 mt-1">
                    This action cannot be undone. All company data will be
                    permanently removed.
                  </p>
                </div>

                <div className="bg-gray-50 px-6 py-4 border-t border-gray-100 flex justify-end gap-3">
                  <button
                    onClick={() => setIsDeleteModalOpen(false)}
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
      </div>
    </>
  );
}