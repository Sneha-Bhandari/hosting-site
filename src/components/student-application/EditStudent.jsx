"use client";

import { X } from "lucide-react";
import { useState, useEffect } from "react";
import StudentForm from "./StudentForm";

export default function EditStudent({ student, onClose, onUpdate, isLoading }) {
  const [passportPreview, setPassportPreview] = useState('');
  const [educationalPreview, setEducationalPreview] = useState('');
  const [otherPreview, setOtherPreview] = useState('');

  useEffect(() => {
    if (student.passportFile && typeof student.passportFile === 'string') {
      setPassportPreview(student.passportFile);
    }
    if (student.educationalDocuments && typeof student.educationalDocuments === 'string') {
      setEducationalPreview(student.educationalDocuments);
    }
    if (student.otherDocuments && typeof student.otherDocuments === 'string') {
      setOtherPreview(student.otherDocuments);
    }
  }, [student]);

  // Map student data to match the form field names
  const initialValues = {
    // Course Details
    courseTitle: student.course || '',
    academicYear: student.academicYear || '',
    
    // Personal Details
    name: student.name || '',
    surname: student.surname || '',
    dateOfBirth: student.dateOfBirth || '',
    gender: student.gender || '',
    maritalStatus: student.maritalStatus || '',
    email: student.email || '',
    telephone: student.phone || student.telephone || '',
    mobile: student.mobile || '',
    fullAddress: student.fullAddress || '',
    country: student.country || '',
    nationality: student.nationality || '',
    countryOfResidence: student.countryOfResidence || student.country || '',
    passportNumber: student.passportNumber || '',
    issuePlace: student.issuePlace || '',
    issueCountry: student.issueCountry || '',
    issueDate: student.issueDate || '',
    expiryDate: student.expiryDate || '',
    
    // Emergency Contact
    contactName: student.contactName || '',
    contactAddress: student.contactAddress || '',
    contactPhone: student.contactPhone || '',
    contactEmail: student.contactEmail || '',
    relationship: student.relationship || '',
    
    // Attachments - Keep the URLs for existing files
    passportFile: student.passportFile || null,
    educationalDocuments: student.educationalDocuments || null,
    otherDocuments: student.otherDocuments || null,
    
    // Agency
    agencyName: student.agencyName || '',
    agencyEmail: student.agencyEmail || 'admissions@learnkey.com.mt',
    
    // Privacy Policy
    acceptPrivacy: student.acceptPrivacy || false,
  };

  const handleUpdate = async (values) => {
    // Pass the updated values with the student ID
    await onUpdate({ ...values, id: student.id });
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between z-10 rounded-t-3xl">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">Edit Student Application</h2>
            <p className="text-sm text-gray-500 mt-0.5">
              Update information for {student.name} {student.surname}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-xl transition-colors"
            disabled={isLoading}
          >
            <X size={24} className="text-gray-500" />
          </button>
        </div>

        {/* Form Content */}
        <div className="p-6">
          <StudentForm
            onSubmit={handleUpdate}
            isLoading={isLoading}
            initialValues={initialValues}
            onClose={onClose}
            isInline={true}
            existingPreviews={{
              passport: passportPreview,
              educational: educationalPreview,
              other: otherPreview
            }}
          />
        </div>
      </div>
    </div>
  );
}