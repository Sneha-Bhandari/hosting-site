"use client";

import { useState, useEffect } from "react";
import {
  Shield,
  Search,
  User,
  Mail,
  Building2,
  CheckCircle,
  XCircle,
  MoreVertical,
  Eye,
  UserX,
  UserCheck,
  Loader2
} from "lucide-react";
import toast, { Toaster } from "react-hot-toast";

const ITEMS_PER_PAGE = 10;

export default function AdminManagement() {
  const [admins, setAdmins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [actionLoading, setActionLoading] = useState(null);

  const fetchAdmins = async () => {
    try {
      setLoading(true);
      const userId = localStorage.getItem("userId") || "system";
      const response = await fetch("/api/admin", {
        headers: {
          "x-user-id": userId,
        },
      });
      const result = await response.json();

      if (result.success) {
        setAdmins(result.data);
      } else {
        toast.error(result.message || "Failed to load admins");
      }
    } catch (error) {
      console.error("Error fetching admins:", error);
      toast.error("Failed to load admins");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAdmins();
  }, []);

  const toggleAdminStatus = async (adminId, currentStatus) => {
    setActionLoading(adminId);
    try {
      const userId = localStorage.getItem("userId") || "system";
      const response = await fetch("/api/admin", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "x-user-id": userId,
        },
        body: JSON.stringify({
          adminId: adminId,
          isActive: !currentStatus,
        }),
      });

      const result = await response.json();

      if (result.success) {
        toast.success(result.message);
        setAdmins(admins.map(admin =>
          admin.id === adminId
            ? { ...admin, isActive: !currentStatus }
            : admin
        ));
      } else {
        toast.error(result.message || "Failed to update admin status");
      }
    } catch (error) {
      console.error("Error updating admin status:", error);
      toast.error("Failed to update admin status");
    } finally {
      setActionLoading(null);
    }
  };

  const filteredAdmins = admins.filter((admin) => {
    const searchLower = searchTerm.toLowerCase();
    return (
      admin.email?.toLowerCase().includes(searchLower) ||
      admin.firstName?.toLowerCase().includes(searchLower) ||
      admin.lastName?.toLowerCase().includes(searchLower) ||
      admin.companyName?.toLowerCase().includes(searchLower)
    );
  });

  const totalPages = Math.ceil(filteredAdmins.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentItems = filteredAdmins.slice(startIndex, endIndex);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const formatDate = (date) => {
    if (!date) return "N/A";
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading admins...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Toaster position="top-right" />
      
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800 flex items-center gap-2">
            <Shield className="text-teal-600" size={28} />
            Admin Management
          </h1>
          <p className="text-sm text-gray-500 mt-0.5">
            Manage all admin accounts across the platform
          </p>
        </div>
        <div className="text-sm text-gray-500">
          {admins.length} admin{admins.length !== 1 ? "s" : ""} found
        </div>
      </div>

      {/* Search */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 md:p-6">
        <div className="relative">
          <Search
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />
          <input
            type="text"
            placeholder="Search by name, email, or company..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
            className="w-full rounded-xl border border-gray-200 bg-gray-50 py-2.5 pl-10 pr-4 text-sm outline-none focus:ring-2 focus:ring-teal-400/60 focus:border-transparent transition-all"
          />
        </div>
      </div>

      {/* Admins Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  # Admin
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Name & Email
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden md:table-cell">
                  Company
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden lg:table-cell">
                  Status
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden xl:table-cell">
                  Joined
                </th>
                <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {currentItems.length === 0 ? (
                <tr>
                  <td colSpan="6" className="text-center py-12">
                    <Shield className="mx-auto text-gray-300" size={48} />
                    <p className="text-gray-500 mt-3">No admins found</p>
                    <p className="text-sm text-gray-400">
                      {searchTerm ? "Try adjusting your search" : "Admins will appear here once they are created"}
                    </p>
                  </td>
                </tr>
              ) : (
                currentItems.map((admin, index) => (
                  <tr
                    key={admin.id}
                    className="hover:bg-gray-50/70 transition-colors"
                  >
                    <td className="px-4 py-3 text-sm text-gray-500 font-medium">
                      {startIndex + index + 1}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-teal-400 to-teal-600 flex items-center justify-center text-white text-sm font-bold shadow-sm">
                          {(admin.firstName?.charAt(0) || admin.email?.charAt(0) || "A").toUpperCase()}
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-800">
                            {admin.firstName || ""} {admin.lastName || ""}
                          </p>
                          <p className="text-xs text-gray-500 flex items-center gap-1">
                            <Mail size={12} />
                            {admin.email}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-600 hidden md:table-cell">
                      <div className="flex items-center gap-1.5">
                        <Building2 size={14} className="text-gray-400" />
                        {admin.companyName || "No Company"}
                      </div>
                    </td>
                    <td className="px-4 py-3 hidden lg:table-cell">
                      {admin.isActive !== undefined ? (
                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${
                          admin.isActive
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }`}>
                          {admin.isActive ? (
                            <>
                              <CheckCircle size={12} />
                              Active
                            </>
                          ) : (
                            <>
                              <XCircle size={12} />
                              Inactive
                            </>
                          )}
                        </span>
                      ) : (
                        <span className="text-gray-400 text-xs">Unknown</span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-500 hidden xl:table-cell">
                      {formatDate(admin.createdAt)}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => toggleAdminStatus(admin.id, admin.isActive)}
                          disabled={actionLoading === admin.id}
                          className={`p-1.5 rounded-lg transition-colors ${
                            admin.isActive
                              ? "text-red-600 hover:bg-red-50 hover:text-red-700"
                              : "text-green-600 hover:bg-green-50 hover:text-green-700"
                          }`}
                          title={admin.isActive ? "Deactivate Admin" : "Activate Admin"}
                        >
                          {actionLoading === admin.id ? (
                            <Loader2 size={16} className="animate-spin" />
                          ) : admin.isActive ? (
                            <UserX size={16} />
                          ) : (
                            <UserCheck size={16} />
                          )}
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
        {filteredAdmins.length > 0 && (
          <div className="px-4 py-3 border-t border-gray-100 flex items-center justify-between">
            <p className="text-sm text-gray-500">
              Showing {startIndex + 1} to {Math.min(endIndex, filteredAdmins.length)} of {filteredAdmins.length} admins
            </p>
            <div className="flex items-center gap-2">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-3 py-1 border border-gray-300 rounded-lg text-sm text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Previous
              </button>
              <span className="text-sm text-gray-600">
                Page {currentPage} of {totalPages}
              </span>
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="px-3 py-1 border border-gray-300 rounded-lg text-sm text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}