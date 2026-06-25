"use client";
import {
  X, User, Mail, Globe, Users, BookOpen} from "lucide-react";

export default function ViewStudent({ student, onClose}) {
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between z-10 rounded-t-3xl">
          <div className="flex items-center gap-3">
              <h2 className="text-xl font-bold text-gray-800">
                {student.name} {student.surname}
              </h2>
              <p className="text-sm text-gray-500">{student.email}</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-xl transition-colors"
          >
            <X size={24} className="text-gray-500" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Personal Information */}
            <div className="bg-gray-50 rounded-xl p-4">
              <h3 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                <User size={16} className="text-teal-600" />
                Personal Information
              </h3>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Full Name</span>
                  <span className="font-medium text-gray-800">
                    {student.name} {student.surname}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Date of Birth</span>
                  <span className="font-medium text-gray-800">
                    {student.dateOfBirth}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Gender</span>
                  <span className="font-medium text-gray-800">
                    {student.gender}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Marital Status</span>
                  <span className="font-medium text-gray-800">
                    {student.maritalStatus}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Nationality</span>
                  <span className="font-medium text-gray-800">
                    {student.nationality}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Country of Residence</span>
                  <span className="font-medium text-gray-800">
                    {student.country}
                  </span>
                </div>
              </div>
            </div>

            {/* Contact Information */}
            <div className="bg-gray-50 rounded-xl p-4">
              <h3 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                <Mail size={16} className="text-teal-600" />
                Contact Information
              </h3>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Email</span>
                  <span className="font-medium text-gray-800">
                    {student.email}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Mobile</span>
                  <span className="font-medium text-gray-800">
                    {student.mobile}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Telephone</span>
                  <span className="font-medium text-gray-800">
                    {student.phone || "N/A"}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Full Address</span>
                  <span className="font-medium text-gray-800 text-right">
                    {student.fullAddress}
                  </span>
                </div>
              </div>
            </div>

            {/* Passport Information */}
            <div className="bg-gray-50 rounded-xl p-4">
              <h3 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                <Globe size={16} className="text-teal-600" />
                Passport Information
              </h3>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Passport/ID Number</span>
                  <span className="font-medium text-gray-800">
                    {student.passportNumber}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Issue Place</span>
                  <span className="font-medium text-gray-800">
                    {student.issuePlace}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Issue Country</span>
                  <span className="font-medium text-gray-800">
                    {student.issueCountry}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Issue Date</span>
                  <span className="font-medium text-gray-800">
                    {student.issueDate}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Expiry Date</span>
                  <span className="font-medium text-gray-800">
                    {student.expiryDate}
                  </span>
                </div>
              </div>
            </div>

            {/* Emergency Contact */}
            <div className="bg-gray-50 rounded-xl p-4">
              <h3 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                <Users size={16} className="text-teal-600" />
                Emergency Contact
              </h3>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Contact Name</span>
                  <span className="font-medium text-gray-800">
                    {student.contactName}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Contact Phone</span>
                  <span className="font-medium text-gray-800">
                    {student.contactPhone}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Contact Email</span>
                  <span className="font-medium text-gray-800">
                    {student.contactEmail}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Relationship</span>
                  <span className="font-medium text-gray-800">
                    {student.relationship}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Contact Address</span>
                  <span className="font-medium text-gray-800 text-right">
                    {student.contactAddress}
                  </span>
                </div>
              </div>
            </div>

            {/* Course & Agency */}
            <div className="bg-gray-50 rounded-xl p-4 md:col-span-2">
              <h3 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                <BookOpen size={16} className="text-teal-600" />
                Course & Agency Details
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Course Title</span>
                  <span className="font-medium text-gray-800">
                    {student.course}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Academic Year</span>
                  <span className="font-medium text-gray-800">
                    {student.academicYear}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Agency Name</span>
                  <span className="font-medium text-gray-800">
                    {student.agencyName}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Agency Email</span>
                  <span className="font-medium text-gray-800">
                    {student.agencyEmail}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4 border-t border-gray-200">
            
            <button
              onClick={onClose}
              className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-2.5 px-4 rounded-xl transition-colors flex items-center justify-center gap-2 font-medium"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}