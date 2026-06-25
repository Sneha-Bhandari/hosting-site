// components/UserManagement.js
"use client";

import { useState } from "react";
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
import toast,{Toaster} from "react-hot-toast";

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
  const [students, setStudents] = useState([
    {
      id: 1,
      name: "John",
      surname: "Doe",
      email: "john.doe@mailhost.com",
      joined: "Jan 15, 2024",
      course: "Business Administration and Management BSc",
      nationality: "American",
      academicYear: "2026",
      phone: "+1 234 567 8900",
      mobile: "+1 234 567 8900",
      country: "United States",
      fullAddress: "123 Main Street, New York, NY 10001",
      dateOfBirth: "1995-05-15",
      gender: "Male",
      maritalStatus: "Single",
      passportNumber: "AB123456",
      issuePlace: "New York",
      issueCountry: "United States",
      issueDate: "2020-01-15",
      expiryDate: "2030-01-15",
      contactName: "Jane Doe",
      contactAddress: "123 Main Street, New York, NY 10001",
      contactPhone: "+1 234 567 8901",
      contactEmail: "jane.doe@example.com",
      relationship: "Spouse",
      agencyName: "Education First",
      agencyEmail: "admissions@learnkey.com.mt",
      acceptPrivacy: true,
      countryOfResidence: "United States",
    },
    {
      id: 2,
      name: "Jane",
      surname: "Smith",
      email: "jane.smith@mailhost.com",
      joined: "Feb 3, 2024",
      course: "Computer Science Engineering BSc",
      nationality: "British",
      academicYear: "2025",
      phone: "+44 20 1234 5678",
      mobile: "+44 20 1234 5678",
      country: "United Kingdom",
      fullAddress: "456 Oxford Street, London, UK",
      dateOfBirth: "1996-08-20",
      gender: "Female",
      maritalStatus: "Single",
      passportNumber: "CD789012",
      issuePlace: "London",
      issueCountry: "United Kingdom",
      issueDate: "2019-03-10",
      expiryDate: "2029-03-10",
      contactName: "James Smith",
      contactAddress: "456 Oxford Street, London, UK",
      contactPhone: "+44 20 1234 5679",
      contactEmail: "james.smith@example.com",
      relationship: "Brother",
      agencyName: "Study UK",
      agencyEmail: "admissions@learnkey.com.mt",
      acceptPrivacy: true,
      countryOfResidence: "United Kingdom",
    },
    {
      id: 3,
      name: "Mike",
      surname: "Johnson",
      email: "mike.j@mailhost.com",
      joined: "Mar 20, 2024",
      course: "Mechanical Engineering BSc",
      nationality: "Canadian",
      academicYear: "2026",
      phone: "+1 345 678 9012",
      mobile: "+1 345 678 9012",
      country: "Canada",
      fullAddress: "789 Queen Street, Toronto, Canada",
      dateOfBirth: "1994-11-25",
      gender: "Male",
      maritalStatus: "Married",
      passportNumber: "EF345678",
      issuePlace: "Toronto",
      issueCountry: "Canada",
      issueDate: "2018-07-05",
      expiryDate: "2028-07-05",
      contactName: "Sarah Johnson",
      contactAddress: "789 Queen Street, Toronto, Canada",
      contactPhone: "+1 345 678 9013",
      contactEmail: "sarah.johnson@example.com",
      relationship: "Spouse",
      agencyName: "Canada Education",
      agencyEmail: "admissions@learnkey.com.mt",
      acceptPrivacy: true,
      countryOfResidence: "Canada",
    },
    {
      id: 4,
      name: "Sarah",
      surname: "Williams",
      email: "sarah.w@mailhost.com",
      joined: "Apr 10, 2024",
      course: "Medicine and Surgery MBBS",
      nationality: "Australian",
      academicYear: "2027",
      phone: "+61 2 1234 5678",
      mobile: "+61 2 1234 5678",
      country: "Australia",
      fullAddress: "101 George Street, Sydney, Australia",
      dateOfBirth: "1997-02-14",
      gender: "Female",
      maritalStatus: "Single",
      passportNumber: "GH901234",
      issuePlace: "Sydney",
      issueCountry: "Australia",
      issueDate: "2020-05-20",
      expiryDate: "2030-05-20",
      contactName: "Robert Williams",
      contactAddress: "101 George Street, Sydney, Australia",
      contactPhone: "+61 2 1234 5679",
      contactEmail: "robert.williams@example.com",
      relationship: "Father",
      agencyName: "Study Down Under",
      agencyEmail: "admissions@learnkey.com.mt",
      acceptPrivacy: true,
      countryOfResidence: "Australia",
    },
    {
      id: 5,
      name: "David",
      surname: "Brown",
      email: "david.b@mailhost.com",
      joined: "May 5, 2024",
      course: "Business Administration and Management BSc",
      nationality: "German",
      academicYear: "2025",
      phone: "+49 30 1234 5678",
      mobile: "+49 30 1234 5678",
      country: "Germany",
      fullAddress: "202 Berliner Strasse, Berlin, Germany",
      dateOfBirth: "1995-09-30",
      gender: "Male",
      maritalStatus: "Single",
      passportNumber: "IJ567890",
      issuePlace: "Berlin",
      issueCountry: "Germany",
      issueDate: "2019-11-10",
      expiryDate: "2029-11-10",
      contactName: "Maria Brown",
      contactAddress: "202 Berliner Strasse, Berlin, Germany",
      contactPhone: "+49 30 1234 5679",
      contactEmail: "maria.brown@example.com",
      relationship: "Sister",
      agencyName: "Edu Germany",
      agencyEmail: "admissions@learnkey.com.mt",
      acceptPrivacy: true,
      countryOfResidence: "Germany",
    },
    {
      id: 6,
      name: "Emily",
      surname: "Davis",
      email: "emily.d@mailhost.com",
      joined: "Jun 12, 2024",
      course: "Computer Science Engineering BSc",
      nationality: "French",
      academicYear: "2026",
      phone: "+33 1 1234 5678",
      mobile: "+33 1 1234 5678",
      country: "France",
      fullAddress: "303 Rue de Paris, Paris, France",
      dateOfBirth: "1996-07-08",
      gender: "Female",
      maritalStatus: "Married",
      passportNumber: "KL123456",
      issuePlace: "Paris",
      issueCountry: "France",
      issueDate: "2020-02-15",
      expiryDate: "2030-02-15",
      contactName: "Thomas Davis",
      contactAddress: "303 Rue de Paris, Paris, France",
      contactPhone: "+33 1 1234 5679",
      contactEmail: "thomas.davis@example.com",
      relationship: "Spouse",
      agencyName: "Study in France",
      agencyEmail: "admissions@learnkey.com.mt",
      acceptPrivacy: true,
      countryOfResidence: "France",
    },
  ]);

  // Filter students based on search
  const filteredUsers = students.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.surname.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.course?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.nationality?.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSearch;
  });

  // Pagination logic
  const totalPages = Math.ceil(filteredUsers.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentItems = filteredUsers.slice(startIndex, endIndex);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleAddStudent = async (newStudent) => {
    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const student = {
        id: students.length + 1,
        ...newStudent,
        joined: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
        phone: newStudent.telephone || newStudent.mobile,
        country: newStudent.country,
        countryOfResidence: newStudent.countryOfResidence || newStudent.country,
      };
      setStudents([...students, student]);
      setShowAddForm(false);
      toast.success("Student added successfully!");
    } catch (error) {
      console.error("Error adding student:", error);
      toast.error("Failed to add student. Please try again.");
    } finally {
      setIsLoading(false);
    }
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
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const updatedStudents = students.map(student => 
        student.id === updatedStudent.id ? { 
          ...student, 
          ...updatedStudent,
          phone: updatedStudent.telephone || updatedStudent.mobile,
          country: updatedStudent.country,
          countryOfResidence: updatedStudent.countryOfResidence || updatedStudent.country,
        } : student
      );
      setStudents(updatedStudents);
      setShowEditModal(false);
      setSelectedStudent(null);
      toast.success("Student updated successfully!");
    } catch (error) {
      console.error("Error updating student:", error);
      toast.error("Failed to update student. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleConfirmDelete = async (id) => {
    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setStudents(students.filter(student => student.id !== id));
      setShowDeleteModal(false);
      setSelectedStudent(null);
      toast.success("Student deleted successfully!");
    } catch (error) {
      console.error("Error deleting student:", error);
      toast.error("Failed to delete student. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <Toaster position="top-right"/>
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
                  {currentItems.map((user, index) => (
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
                        {user.joined}
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
                  ))}
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
          onEdit={() => {
            setShowViewModal(false);
            handleEditStudent(selectedStudent);
          }}
          onDelete={() => {
            setShowViewModal(false);
            handleDeleteStudent(selectedStudent);
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