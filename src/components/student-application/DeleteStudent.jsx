"use client";

import { useState } from "react";
import {
  X,
  AlertTriangle,
  User,
  Mail,
  Trash2,
  Loader2,
} from "lucide-react";

export default function DeleteStudent({ student, onClose, onDelete, isLoading }) {
  const [confirmText, setConfirmText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState("");

  const handleDelete = async () => {
    setError("");
    
    if (confirmText !== student.name) {
      setError(`Please type "${student.name}" exactly to confirm deletion.`);
      return;
    }

    setIsDeleting(true);
    try {
      await onDelete(student.id);
    } catch (error) {
      console.error("Error deleting student:", error);
      setError(error.message || "Failed to delete student. Please try again.");
    } finally {
      setIsDeleting(false);
    }
  };

  const getInitials = (name, surname) => {
    const firstInitial = name ? name.charAt(0).toUpperCase() : '';
    const lastInitial = surname ? surname.charAt(0).toUpperCase() : '';
    return firstInitial + lastInitial || '?';
  };

  if (!student) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md">
        {/* Header */}
        <div className="border-b border-gray-200 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
              <AlertTriangle className="text-red-600" size={20} />
            </div>
            <h2 className="text-xl font-bold text-gray-800">Delete Student</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-xl transition-colors"
            disabled={isLoading || isDeleting}
          >
            <X size={20} className="text-gray-500" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Student Info */}
          <div className="bg-gray-50 rounded-xl p-4 mb-6">
            <h3 className="text-sm font-medium text-gray-700 mb-3">Student Information</h3>
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-teal-400 to-teal-600 flex items-center justify-center text-white text-sm font-bold shadow-sm">
                  {getInitials(student.name, student.surname)}
                </div>
                <div>
                  <p className="font-medium text-gray-800">
                    {student.name} {student.surname}
                  </p>
                  <p className="text-sm text-gray-500">{student.email}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2 mt-3 pt-3 border-t border-gray-200">
                <div>
                  <p className="text-xs text-gray-400">Course</p>
                  <p className="text-sm font-medium text-gray-700 truncate">{student.course || 'N/A'}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-400">Nationality</p>
                  <p className="text-sm font-medium text-gray-700">{student.nationality || 'N/A'}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-400">Academic Year</p>
                  <p className="text-sm font-medium text-gray-700">{student.academicYear || 'N/A'}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Warning Message */}
          <div className="bg-red-50 border border-red-200 rounded-xl p-3 mb-4">
            <p className="text-sm text-red-700">
              <span className="font-bold">⚠️ Warning:</span> This action cannot be undone. 
              All student data will be permanently removed from the system.
            </p>
          </div>

          {/* Confirmation Input */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Type <span className="font-bold text-red-600">{student.name}</span> to confirm
            </label>
            <input
              type="text"
              value={confirmText}
              onChange={(e) => {
                setConfirmText(e.target.value);
                setError("");
              }}
              placeholder={`Type "${student.name}" here...`}
              className={`w-full px-4 py-2.5 rounded-xl border ${
                error ? 'border-red-500 focus:ring-red-400' : 'border-gray-200 focus:ring-red-400/60'
              } focus:ring-2 focus:border-transparent outline-none transition-all`}
              disabled={isLoading || isDeleting}
            />
            {error && (
              <p className="mt-1 text-xs text-red-500">{error}</p>
            )}
            {confirmText && confirmText !== student.name && !error && (
              <p className="mt-1 text-xs text-red-500">
                Please type the student's name exactly as shown.
              </p>
            )}
            {confirmText === student.name && (
              <p className="mt-1 text-xs text-green-600">
                ✓ Name confirmed. You can now delete the student.
              </p>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <button
              onClick={handleDelete}
              disabled={isLoading || isDeleting || confirmText !== student.name}
              className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2.5 px-4 rounded-xl transition-colors flex items-center justify-center gap-2 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {(isLoading || isDeleting) && <Loader2 className="h-4 w-4 animate-spin" />}
              {(isLoading || isDeleting) ? "Deleting..." : "Delete Student"}
              {!isLoading && !isDeleting && <Trash2 size={18} />}
            </button>
            <button
              onClick={onClose}
              className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-2.5 px-4 rounded-xl transition-colors font-medium"
              disabled={isLoading || isDeleting}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}