"use client";

import { X } from "lucide-react";
import { useState, useEffect } from "react";
import StudentForm from "./StudentForm";

export default function EditStudent({ student, onClose, onUpdate, isLoading }) {
  const [passportPreview, setPassportPreview] = useState('');
  const [educationalPreview, setEducationalPreview] = useState('');
  const [otherPreview, setOtherPreview] = useState('');
  const [existingFiles, setExistingFiles] = useState({
    passportFileId: null,
    educationalFileId: null,
    otherFileId: null
  });

  useEffect(() => {
    const fetchFileDetails = async () => {
      try {
        if (student.passportFileId) {
          const res = await fetch(`/api/upload?id=${student.passportFileId}`);
          const data = await res.json();
          if (data.success) {
            setPassportPreview(data.data.fileUrl);
            setExistingFiles(prev => ({ ...prev, passportFileId: student.passportFileId }));
          }
        }

        if (student.educationalFileId) {
          const res = await fetch(`/api/upload?id=${student.educationalFileId}`);
          const data = await res.json();
          if (data.success) {
            setEducationalPreview(data.data.fileUrl);
            setExistingFiles(prev => ({ ...prev, educationalFileId: student.educationalFileId }));
          }
        }

        if (student.otherFileId) {
          const res = await fetch(`/api/upload?id=${student.otherFileId}`);
          const data = await res.json();
          if (data.success) {
            setOtherPreview(data.data.fileUrl);
            setExistingFiles(prev => ({ ...prev, otherFileId: student.otherFileId }));
          }
        }
      } catch (error) {
        console.error('Error fetching file details:', error);
      }
    };

    if (student) {
      fetchFileDetails();
    }
  }, [student]);

  const initialValues = {
    id: student.id,
    courseTitle: student.course || '',
    academicYear: student.academicYear || '',
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
    contactName: student.contactName || '',
    contactAddress: student.contactAddress || '',
    contactPhone: student.contactPhone || '',
    contactEmail: student.contactEmail || '',
    relationship: student.relationship || '',
    passportFile: passportPreview || null,
    educationalDocuments: educationalPreview || null,
    otherDocuments: otherPreview || null,
    agencyName: student.agencyName || '',
    agencyEmail: student.agencyEmail || 'admissions@learnkey.com.mt',
    acceptPrivacy: student.acceptPrivacy || false,
    passportFileId: student.passportFileId || null,
    educationalFileId: student.educationalFileId || null,
    otherFileId: student.otherFileId || null,
  };

  const handleUpdate = async (values) => {
    const updateData = {
      ...values,
      id: student.id
    };
    
    await onUpdate(updateData);
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
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
            isEdit={true}
          />
        </div>
      </div>
    </div>
  );
}