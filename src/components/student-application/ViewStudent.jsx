"use client";

import { useState, useEffect } from "react";
import {
  X, User, Mail, Globe, Users, BookOpen, FileText, Download, Eye, Image as ImageIcon
} from "lucide-react";

export default function ViewStudent({ student, onClose }) {
  const [passportFile, setPassportFile] = useState(null);
  const [educationalFile, setEducationalFile] = useState(null);
  const [otherFile, setOtherFile] = useState(null);
  const [loadingFiles, setLoadingFiles] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);

  useEffect(() => {
    if (student) {
      fetchFileDetails();
    }
  }, [student]);

  const fetchFileDetails = async () => {
    setLoadingFiles(true);
    try {
      if (student.passportFileId) {
        const passportRes = await fetch(`/api/upload?id=${student.passportFileId}`);
        const passportData = await passportRes.json();
        if (passportData.success) {
          setPassportFile(passportData.data);
        }
      }

      if (student.educationalFileId) {
        const educationalRes = await fetch(`/api/upload?id=${student.educationalFileId}`);
        const educationalData = await educationalRes.json();
        if (educationalData.success) {
          setEducationalFile(educationalData.data);
        }
      }

      if (student.otherFileId) {
        const otherRes = await fetch(`/api/upload?id=${student.otherFileId}`);
        const otherData = await otherRes.json();
        if (otherData.success) {
          setOtherFile(otherData.data);
        }
      }
    } catch (error) {
      console.error('Error fetching files:', error);
    } finally {
      setLoadingFiles(false);
    }
  };

  const handleViewImage = (fileUrl) => {
    setPreviewImage(fileUrl);
  };

  const handleDownload = (fileUrl, fileName) => {
    const link = document.createElement('a');
    link.href = fileUrl;
    link.download = fileName || 'file';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const isImageFile = (fileName) => {
    if (!fileName) return false;
    const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.bmp'];
    return imageExtensions.some(ext => fileName.toLowerCase().endsWith(ext));
  };

  const renderFilePreview = (file, label) => {
    if (!file) return null;

    const isImage = isImageFile(file.fileName);

    return (
      <div className="bg-gray-50 rounded-lg p-3">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-medium text-gray-600">{label}</span>
          <div className="flex items-center gap-2">
            {isImage && (
              <button
                onClick={() => handleViewImage(file.fileUrl)}
                className="p-1.5 bg-teal-100 text-teal-600 rounded-lg hover:bg-teal-200 transition-colors"
                title="View Image"
              >
                <Eye size={14} />
              </button>
            )}
            <button
              onClick={() => handleDownload(file.fileUrl, file.fileName)}
              className="p-1.5 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition-colors"
              title="Download File"
            >
              <Download size={14} />
            </button>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {isImage ? (
            <ImageIcon size={16} className="text-teal-600" />
          ) : (
            <FileText size={16} className="text-blue-600" />
          )}
          <span className="text-xs text-gray-600 truncate flex-1">
            {file.fileName || 'File'}
          </span>
        </div>
        {isImage && (
          <div className="mt-2">
            <img
              src={file.fileUrl}
              alt={file.fileName}
              className="w-full h-24 object-cover rounded-lg cursor-pointer hover:opacity-80 transition-opacity"
              onClick={() => handleViewImage(file.fileUrl)}
            />
          </div>
        )}
      </div>
    );
  };

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
                    {student.contactName || "N/A"}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Contact Phone</span>
                  <span className="font-medium text-gray-800">
                    {student.contactPhone || "N/A"}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Contact Email</span>
                  <span className="font-medium text-gray-800">
                    {student.contactEmail || "N/A"}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Relationship</span>
                  <span className="font-medium text-gray-800">
                    {student.relationship || "N/A"}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Contact Address</span>
                  <span className="font-medium text-gray-800 text-right">
                    {student.contactAddress || "N/A"}
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
                    {student.course || "N/A"}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Academic Year</span>
                  <span className="font-medium text-gray-800">
                    {student.academicYear || "N/A"}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Agency Name</span>
                  <span className="font-medium text-gray-800">
                    {student.agencyName || "N/A"}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Agency Email</span>
                  <span className="font-medium text-gray-800">
                    {student.agencyEmail || "N/A"}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Attachments Section */}
          {(passportFile || educationalFile || otherFile) && (
            <div className="border-t border-gray-200 pt-4">
              <h3 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                <FileText size={16} className="text-teal-600" />
                Attachments
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {passportFile && renderFilePreview(passportFile, "Passport / ID")}
                {educationalFile && renderFilePreview(educationalFile, "Educational Documents")}
                {otherFile && renderFilePreview(otherFile, "Other Documents")}
              </div>
            </div>
          )}

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

      {/* Image Preview Modal */}
      {previewImage && (
        <div
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[60] flex items-center justify-center p-4"
          onClick={() => setPreviewImage(null)}
        >
          <div
            className="relative max-w-4xl max-h-[90vh]"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setPreviewImage(null)}
              className="absolute -top-12 right-0 text-white hover:text-gray-300 transition-colors"
            >
              <X size={32} />
            </button>
            <img
              src={previewImage}
              alt="Preview"
              className="max-w-full max-h-[80vh] object-contain rounded-lg"
            />
            <button
              onClick={() => handleDownload(previewImage, 'image')}
              className="absolute -bottom-12 right-0 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors flex items-center gap-2"
            >
              <Download size={18} />
              Download
            </button>
          </div>
        </div>
      )}
    </div>
  );
}