"use client";

import { useState, useEffect } from "react";
import {
  Users,
  UserPlus,
  Search,
  ArrowLeft,
  Eye,
  Pencil,
  Trash2,
} from "lucide-react";
import StudentForm from "./StudentForm";
import ViewStudent from "./ViewStudent";
import EditStudent from "./EditStudent";
import DeleteStudent from "./DeleteStudent";
import Pagination from "../../app/ui/Pagination";
import toast, { Toaster } from "react-hot-toast";

const ITEMS_PER_PAGE = 5;

export default function UserManagement() {
  const [searchTerm, setSearchTerm] = useState("");
  const [showAddForm, setShowAddForm] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [students, setStudents] = useState([]);
  const [isFetching, setIsFetching] = useState(true);

  const getUserInfo = () => {
    try {
      const userStr = localStorage.getItem('user');
      if (userStr) {
        return JSON.parse(userStr);
      }
      return null;
    } catch (error) {
      return null;
    }
  };

  useEffect(() => {
    const loadStudents = async () => {
      try {
        setIsFetching(true);
        const user = getUserInfo();
        const userId = user?.id || 'system';
        
        const res = await fetch("/api/students", {
          headers: {
            "x-user-id": userId
          }
        });
        const data = await res.json();

        setStudents(
          Array.isArray(data)
            ? data.map(student => ({
                ...student,
                joined: student.createdAt ? new Date(student.createdAt).toLocaleDateString() : new Date().toLocaleDateString()
              }))
            : data.students || []
        );
      } catch (error) {
        console.log(error);
        toast.error("Failed loading students");
      } finally {
        setIsFetching(false);
      }
    };

    loadStudents();
  }, []);

  const filteredUsers = students.filter((user) => {
    const matchesSearch =
      user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.surname?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.course?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.nationality?.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSearch;
  });

  const totalPages = Math.ceil(filteredUsers.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentItems = filteredUsers.slice(startIndex, endIndex);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
const handleAddStudent = async (newStudent) => {
  const studentWithDate = {
    ...newStudent,
    joined: new Date().toLocaleDateString()
  };

  setStudents([
    ...students,
    studentWithDate
  ]);

  setShowAddForm(false);
  toast.success("Student added successfully!");
  setIsLoading(false);
};
  const handleViewStudent = (student) => {
    setSelectedStudent(student);
    setShowViewModal(true);
  };

  const handleEditStudent = (student) => {
    setSelectedStudent(student);
    setShowEditModal(true);
  };

  const handleDeleteStudent = (student) => {
    setSelectedStudent(student);
    setShowDeleteModal(true);
  };

  const handleUpdateStudent = async (updatedStudent) => {
    setIsLoading(true);

    try {
      const user = getUserInfo();
      const userId = user?.id || 'system';
      
      const response = await fetch("/api/students", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "x-user-id": userId
        },
        body: JSON.stringify(updatedStudent)
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to update student");
      }

      setStudents(
        students.map(student =>
          student.id === updatedStudent.id
            ? { ...student, ...updatedStudent, joined: student.joined }
            : student
        )
      );

      setShowEditModal(false);
      setSelectedStudent(null);
      toast.success("Student updated successfully");

    } catch (error) {
      console.log(error);
      toast.error(error.message || "Failed to update student");
    } finally {
      setIsLoading(false);
    }
  };

  const handleConfirmDelete = async (id) => {
    setIsLoading(true);

    try {
      const user = getUserInfo();
      const userId = user?.id || 'system';
      
      const response = await fetch(`/api/students?id=${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "x-user-id": userId
        }
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to delete student");
      }

      setStudents(
        students.filter(student => student.id !== id)
      );

      setShowDeleteModal(false);
      setSelectedStudent(null);
      toast.success("Student deleted successfully");

    } catch (error) {
      console.log(error);
      toast.error(error.message || "Failed to delete student");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <Toaster position="top-right" />
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800 flex items-center gap-2">
            <Users className="text-teal-600" size={28} />
            Student Management
          </h1>
          <p className="text-sm text-gray-500 mt-0.5">
            Manage Non-EU student applications and profiles
          </p>
        </div>
        {!showAddForm && (
          <button
            onClick={() => setShowAddForm(true)}
            className="px-5 py-2.5 bg-teal-600 hover:bg-teal-700 text-white rounded-xl font-medium shadow-sm transition-all flex items-center gap-2 whitespace-nowrap"
          >
            <UserPlus size={18} />
            Add New Student
          </button>
        )}
      </div>

      {/* Show Form when adding */}
      {showAddForm ? (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-800">Add New Student</h2>
            <button
              onClick={() => setShowAddForm(false)}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors"
            >
              <ArrowLeft size={20} />
              <span>Back to List</span>
            </button>
          </div>
          <StudentForm
            onSubmit={handleAddStudent}
            isLoading={isLoading}
            onClose={() => setShowAddForm(false)}
            isInline={true}
          />
        </div>
      ) : (
        <>
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
                    placeholder="Search by name, email, course, or nationality..."
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
                {filteredUsers.length} students found
              </p>
            </div>
          </div>

          {/* Students Table */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-100">
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      SN
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Student
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden md:table-cell">
                      Email
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden lg:table-cell">
                      Course
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden xl:table-cell">
                      Nationality
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden 2xl:table-cell">
                      Academic Year
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden sm:table-cell">
                      Joined
                    </th>
                    <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {isFetching ? (
                    <tr>
                      <td colSpan="8" className="py-12 text-center">
                        <div className="flex justify-center items-center gap-3 text-gray-500">
                          <div className="w-6 h-6 border-4 border-teal-600 border-t-transparent rounded-full animate-spin"></div>
                          <span className="text-sm">Loading students...</span>
                        </div>
                      </td>
                    </tr>
                  ) : (
                    currentItems.map((user, index) => (
                      <tr
                        key={user.id}
                        className="hover:bg-gray-50/70 transition-colors"
                      >
                        <td className="px-4 py-3 text-sm text-gray-500 font-medium">
                          {startIndex + index + 1}
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-3">
                            <p className="text-sm font-medium text-gray-800">
                              {user.name} {user.surname}
                            </p>
                            <p className="text-xs text-gray-400 md:hidden">
                              {user.email}
                            </p>
                          </div>
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-600 hidden md:table-cell">
                          {user.email}
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-600 hidden lg:table-cell max-w-[200] truncate">
                          {user.course}
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-600 hidden xl:table-cell">
                          {user.nationality}
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-600 hidden 2xl:table-cell">
                          {user.academicYear}
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-500 hidden sm:table-cell">
                          {user.joined || new Date(user.createdAt).toLocaleDateString()}
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex items-center justify-end gap-2">
                            <button
                              onClick={() => handleViewStudent(user)}
                              className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors text-gray-400 hover:text-teal-600"
                              title="View Details"
                            >
                              <Eye size={16} />
                            </button>
                            <button
                              onClick={() => handleEditStudent(user)}
                              className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors text-gray-400 hover:text-blue-600"
                              title="Edit Student"
                            >
                              <Pencil size={16} />
                            </button>
                            <button
                              onClick={() => handleDeleteStudent(user)}
                              className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors text-gray-400 hover:text-red-600"
                              title="Delete Student"
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
            {filteredUsers.length === 0 && (
              <div className="text-center py-12">
                <Users className="mx-auto text-gray-300" size={48} />
                <p className="text-gray-500 mt-3">No students found</p>
                <p className="text-sm text-gray-400">Try adjusting your search or filters</p>
              </div>
            )}
            {filteredUsers.length > 0 && (
              <div className="px-4 py-3 border-t border-gray-100 flex items-center justify-between">
                <p className="text-sm text-gray-500">
                  Showing {startIndex + 1} to {Math.min(endIndex, filteredUsers.length)} of {filteredUsers.length} students
                </p>
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={handlePageChange}
                />
              </div>
            )}
          </div>
        </>
      )}

      {/* View Student Modal */}
      {showViewModal && selectedStudent && (
        <ViewStudent
          student={selectedStudent}
          onClose={() => {
            setShowViewModal(false);
            setSelectedStudent(null);
          }}
        />
      )}

      {/* Edit Student Modal */}
      {showEditModal && selectedStudent && (
        <EditStudent
          student={selectedStudent}
          onClose={() => {
            setShowEditModal(false);
            setSelectedStudent(null);
          }}
          onUpdate={handleUpdateStudent}
          isLoading={isLoading}
        />
      )}

      {/* Delete Student Modal */}
      {showDeleteModal && selectedStudent && (
        <DeleteStudent
          student={selectedStudent}
          onClose={() => {
            setShowDeleteModal(false);
            setSelectedStudent(null);
          }}
          onDelete={handleConfirmDelete}
          isLoading={isLoading}
        />
      )}
    </div>
  );
}