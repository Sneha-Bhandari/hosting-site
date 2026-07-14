"use client";

import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import {
  X, Upload, FileText, AlertCircle, Check, Loader2, Eye, Trash2
} from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import toast from 'react-hot-toast';

export default function StudentForm({ 
  onSubmit, 
  isLoading, 
  initialValues, 
  onClose, 
  isInline = false,
  existingPreviews = {},
  isEdit = false
}) {
  const passportInputRef = useRef(null);
  const educationalInputRef = useRef(null);
  const otherInputRef = useRef(null);

  const safeInitialValues = initialValues || {};

  const [passportPreview, setPassportPreview] = useState(existingPreviews.passport || '');
  const [educationalPreview, setEducationalPreview] = useState(existingPreviews.educational || '');
  const [otherPreview, setOtherPreview] = useState(existingPreviews.other || '');

  const [uploadingPassport, setUploadingPassport] = useState(false);
  const [uploadingEducational, setUploadingEducational] = useState(false);
  const [uploadingOther, setUploadingOther] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [viewFile, setViewFile] = useState({ url: '', name: '', type: '' });
  const [isHovering, setIsHovering] = useState({ passport: false, educational: false, other: false });
  const [isSubmittingForm, setIsSubmittingForm] = useState(false);

  const courses = [
    "Business Administration and Management BSc",
    "International Business Economics BSc",
    "Vehicle Engineering BSc",
    "Computer Science Engineering BSc",
    "Horticultural Engineering BSc",
    "Mechanical Engineering BSc",
    "Regional and Environmental Economics",
    "Master of Business Administration MBA",
    "Doctoral School of Management and Business Administration (PhD)",
    "Bsc Logistics Engineering BSc",
    "Bsc Business Administration and Management",
    "Bsc Tourism and Catering ",
    "BSc Vehicle Engineering"
  ];

  const countries = [
    "Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Argentina",
    "Australia", "Austria", "Bangladesh", "Belgium", "Brazil", "Canada",
    "China", "Denmark", "Egypt", "Finland", "France", "Germany",
    "Greece", "India", "Indonesia", "Iran", "Iraq", "Ireland",
    "Israel", "Italy", "Japan", "Jordan", "Kenya", "Kuwait",
    "Lebanon", "Malaysia", "Malta", "Mexico", "Morocco", "Nepal",
    "Netherlands", "New Zealand", "Nigeria", "Norway", "Pakistan",
    "Philippines", "Poland", "Portugal", "Russia", "Saudi Arabia",
    "Singapore", "South Africa", "South Korea", "Spain", "Sweden",
    "Switzerland", "Thailand", "Turkey", "Ukraine", "United Arab Emirates",
    "United Kingdom", "United States", "Vietnam"
  ];

  const nationalities = [
    "Afghan", "Albanian", "Algerian", "Andorran", "Angolan", "Argentinian",
    "Australian", "Austrian", "Bangladeshi", "Belgian", "Brazilian", "Canadian",
    "Chinese", "Danish", "Egyptian", "Finnish", "French", "German",
    "Greek", "Indian", "Indonesian", "Iranian", "Iraqi", "Irish",
    "Israeli", "Italian", "Japanese", "Jordanian", "Kenyan", "Kuwaiti",
    "Lebanese", "Malaysian", "Maltese", "Mexican", "Moroccan", "Nepali",
    "Dutch", "New Zealander", "Nigerian", "Norwegian", "Pakistani",
    "Filipino", "Polish", "Portuguese", "Russian", "Saudi Arabian",
    "Singaporean", "South African", "South Korean", "Spanish", "Swedish",
    "Swiss", "Thai", "Turkish", "Ukrainian", "Emirati",
    "British", "American", "Vietnamese"
  ];

  const validationSchema = Yup.object().shape({
    courseTitle: Yup.string().required('Course Title is required'),
    academicYear: Yup.string()
      .required('Academic Year is required')
      .matches(/^\d{4}$/, 'Academic Year must be a valid year (e.g., 2026)'),
    name: Yup.string().required('Name is required'),
    surname: Yup.string().required('Surname is required'),
    dateOfBirth: Yup.string().required('Date of Birth is required'),
    gender: Yup.string().required('Gender is required'),
    maritalStatus: Yup.string().required('Marital Status is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    telephone: Yup.string(),
    mobile: Yup.string().required('Mobile number is required'),
    fullAddress: Yup.string().required('Full address is required'),
    country: Yup.string().required('Country is required'),
    nationality: Yup.string().required('Nationality is required'),
    countryOfResidence: Yup.string().required('Country of Residence is required'),
    passportNumber: Yup.string().required('Passport/ID Number is required'),
    issuePlace: Yup.string().required('Issue Place is required'),
    issueCountry: Yup.string().required('Issue Country is required'),
    issueDate: Yup.string().required('Issue Date is required'),
    expiryDate: Yup.string().required('Expiry Date is required'),
    contactName: Yup.string(),
    contactAddress: Yup.string(),
    contactPhone: Yup.string().required('Contact Phone is required'),
    contactEmail: Yup.string().email('Invalid email'),
    relationship: Yup.string(),
    agencyName: Yup.string(),
    agencyEmail: Yup.string().email('Invalid email').required('Agency Email is required'),
    acceptPrivacy: Yup.boolean().oneOf([true], 'You must accept the Privacy Policy'),
    passportFile: isEdit ? Yup.mixed().nullable() : Yup.mixed().required('Passport / ID is required'),
    educationalDocuments: isEdit ? Yup.mixed().nullable() : Yup.mixed().required('Educational Documents are required'),
    otherDocuments: Yup.mixed().nullable(),
  });

  const initialFormValues = {
    id: safeInitialValues.id || '',
    courseTitle: safeInitialValues.courseTitle || '',
    academicYear: safeInitialValues.academicYear || '2026',
    name: safeInitialValues.name || '',
    surname: safeInitialValues.surname || '',
    dateOfBirth: safeInitialValues.dateOfBirth || '',
    gender: safeInitialValues.gender || '',
    maritalStatus: safeInitialValues.maritalStatus || '',
    email: safeInitialValues.email || '',
    telephone: safeInitialValues.telephone || '',
    mobile: safeInitialValues.mobile || '',
    fullAddress: safeInitialValues.fullAddress || '',
    country: safeInitialValues.country || '',
    nationality: safeInitialValues.nationality || '',
    countryOfResidence: safeInitialValues.countryOfResidence || '',
    passportNumber: safeInitialValues.passportNumber || '',
    issuePlace: safeInitialValues.issuePlace || '',
    issueCountry: safeInitialValues.issueCountry || '',
    issueDate: safeInitialValues.issueDate || '',
    expiryDate: safeInitialValues.expiryDate || '',
    contactName: safeInitialValues.contactName || '',
    contactAddress: safeInitialValues.contactAddress || '',
    contactPhone: safeInitialValues.contactPhone || '',
    contactEmail: safeInitialValues.contactEmail || '',
    relationship: safeInitialValues.relationship || '',
    passportFile: safeInitialValues.passportFile || null,
    educationalDocuments: safeInitialValues.educationalDocuments || null,
    otherDocuments: safeInitialValues.otherDocuments || null,
    agencyName: safeInitialValues.agencyName || '',
    agencyEmail: safeInitialValues.agencyEmail || 'admissions@learnkey.com.mt',
    acceptPrivacy: safeInitialValues.acceptPrivacy || false,
    passportFileId: safeInitialValues.passportFileId || null,
    educationalFileId: safeInitialValues.educationalFileId || null,
    otherFileId: safeInitialValues.otherFileId || null,
  };

  useEffect(() => {
    return () => {
      if (passportPreview && passportPreview.startsWith('blob:')) {
        URL.revokeObjectURL(passportPreview);
      }
      if (educationalPreview && educationalPreview.startsWith('blob:')) {
        URL.revokeObjectURL(educationalPreview);
      }
      if (otherPreview && otherPreview.startsWith('blob:')) {
        URL.revokeObjectURL(otherPreview);
      }
    };
  }, [passportPreview, educationalPreview, otherPreview]);

  const handleFileUpload = async (file, setFieldValue, fieldName) => {
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      alert('File must be under 5MB');
      return;
    }

    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'application/pdf'];
    if (!allowedTypes.includes(file.type)) {
      alert('Only JPG, JPEG, PNG, and PDF files are allowed');
      return;
    }

    const previewUrl = URL.createObjectURL(file);

    try {
      if (fieldName === 'passport') {
        setUploadingPassport(true);
        setPassportPreview(previewUrl);
        setFieldValue('passportFile', file);
        setFieldValue('passportFileId', null);
      } else if (fieldName === 'educational') {
        setUploadingEducational(true);
        setEducationalPreview(previewUrl);
        setFieldValue('educationalDocuments', file);
        setFieldValue('educationalFileId', null);
      } else {
        setUploadingOther(true);
        setOtherPreview(previewUrl);
        setFieldValue('otherDocuments', file);
        setFieldValue('otherFileId', null);
      }

      await new Promise(resolve => setTimeout(resolve, 500));

    } catch (error) {
      console.error('Upload error:', error);
      alert('Failed to upload file. Please try again.');
      if (fieldName === 'passport') {
        setPassportPreview('');
        setFieldValue('passportFile', null);
      } else if (fieldName === 'educational') {
        setEducationalPreview('');
        setFieldValue('educationalDocuments', null);
      } else {
        setOtherPreview('');
        setFieldValue('otherDocuments', null);
      }
    } finally {
      if (fieldName === 'passport') {
        setUploadingPassport(false);
      } else if (fieldName === 'educational') {
        setUploadingEducational(false);
      } else {
        setUploadingOther(false);
      }
    }
  };

  const handleFileChange = (e, setFieldValue, fieldName) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileUpload(file, setFieldValue, fieldName);
    }
  };

  const handleRemoveFile = (setFieldValue, fieldName) => {
    if (fieldName === 'passport') {
      if (passportPreview && passportPreview.startsWith('blob:')) {
        URL.revokeObjectURL(passportPreview);
      }
      setPassportPreview('');
      setFieldValue('passportFile', null);
      setFieldValue('passportFileId', null);
      if (passportInputRef.current) passportInputRef.current.value = '';
    } else if (fieldName === 'educational') {
      if (educationalPreview && educationalPreview.startsWith('blob:')) {
        URL.revokeObjectURL(educationalPreview);
      }
      setEducationalPreview('');
      setFieldValue('educationalDocuments', null);
      setFieldValue('educationalFileId', null);
      if (educationalInputRef.current) educationalInputRef.current.value = '';
    } else {
      if (otherPreview && otherPreview.startsWith('blob:')) {
        URL.revokeObjectURL(otherPreview);
      }
      setOtherPreview('');
      setFieldValue('otherDocuments', null);
      setFieldValue('otherFileId', null);
      if (otherInputRef.current) otherInputRef.current.value = '';
    }
  };

  const handleViewFile = (preview, name, type) => {
    setViewFile({ url: preview, name, type });
    setViewModalOpen(true);
  };

  const renderFilePreview = (preview, uploading, fieldName, setFieldValue) => {
    const isImage = preview && preview.match(/\.(jpeg|jpg|png|gif|webp)$/i);
    const fileName = preview ? preview.split('/').pop() || 'file' : '';

    if (preview) {
      return (
        <div 
          className="relative w-full h-32 rounded-xl overflow-hidden border-2 border-gray-200 bg-gray-50 group"
          onMouseEnter={() => setIsHovering(prev => ({ ...prev, [fieldName]: true }))}
          onMouseLeave={() => setIsHovering(prev => ({ ...prev, [fieldName]: false }))}
        >
          {isImage ? (
            <img
              src={preview}
              className="w-full h-full object-cover"
              alt={fieldName}
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center bg-gray-100 p-2">
              <FileText className="h-8 w-8 text-gray-500" />
              <span className="text-xs text-gray-500 mt-1 text-center truncate w-full px-2">
                {fileName || 'PDF Document'}
              </span>
            </div>
          )}

          {uploading && (
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
              <Loader2 className="h-6 w-6 text-white animate-spin" />
            </div>
          )}
          <button
            type="button"
            onClick={() => handleRemoveFile(setFieldValue, fieldName)}
            disabled={uploading}
            className="absolute top-2 right-2 p-1.5 bg-red-500 rounded-full hover:bg-red-600 transition-all duration-200 text-white shadow-lg z-10 disabled:opacity-50 hover:scale-110"
            title="Remove File"
          >
            <Trash2 className="w-4 h-4" />
          </button>

          <button
            type="button"
            onClick={() => handleViewFile(preview, fieldName, isImage ? 'image' : 'pdf')}
            className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-2.5 bg-white/90 rounded-full hover:bg-white transition-all duration-200 text-gray-700 shadow-lg hover:scale-110 ${
              isHovering[fieldName] ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
            }`}
            title="View File"
          >
            <Eye className="w-5 h-5" />
          </button>

          <div className="absolute bottom-0 left-0 right-0 bg-black/60 backdrop-blur-sm px-2 py-1">
            <p className="text-white text-xs truncate">{fileName}</p>
          </div>
        </div>
      );
    }

    return (
      <label
        htmlFor={`file-upload-${fieldName}`}
        className={`relative w-full h-32 flex flex-col items-center justify-center border-2 border-dashed rounded-xl cursor-pointer transition-all duration-200 ${
          uploading ? 'opacity-50 cursor-wait border-gray-300 bg-gray-50' : 'border-gray-300 bg-gray-50 hover:border-teal-400 hover:bg-teal-50/30'
        }`}
      >
        {uploading ? (
          <Loader2 className="h-8 w-8 text-teal-500 animate-spin" />
        ) : (
          <>
            <Upload className="h-8 w-8 text-gray-400" />
            <span className="text-xs text-gray-500 mt-1">Upload</span>
            <span className="text-[10px] text-gray-400 mt-0.5">(jpg, png, pdf)</span>
          </>
        )}
      </label>
    );
  };

  const uploadFile = async (file) => {
    const formData = new FormData();
    formData.append("file", file);

    const response = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });

    const result = await response.json();
    
    if (!result.success) {
      throw new Error(result.message || "File upload failed");
    }

    return result.data;
  };

  const createStudent = async (payload) => {
    console.log('=== SENDING STUDENT DATA ===');
    console.log('payload:', payload);
    
    let userId = 'system';
    try {
      const userStr = localStorage.getItem('user');
      if (userStr) {
        const user = JSON.parse(userStr);
        userId = user.id || 'system';
      }
    } catch (error) {
      console.error('Error getting user from localStorage:', error);
    }
    
    console.log('Sending with userId:', userId);
    
    const response = await fetch("/api/students", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-user-id": userId
      },
      body: JSON.stringify(payload)
    });

    const result = await response.json();

    if (response.status === 409) {
      throw new Error(result.message || "Student with this email already exists!");
    }

    if (!response.ok) {
      throw new Error(result.message || "Student creation failed");
    }

    return result;
  };

  const updateStudent = async (payload) => {
    let userId = 'system';
    try {
      const userStr = localStorage.getItem('user');
      if (userStr) {
        const user = JSON.parse(userStr);
        userId = user.id || 'system';
      }
    } catch (error) {
      console.error('Error getting user from localStorage:', error);
    }
    
    console.log('Updating with userId:', userId);
    
    const response = await fetch("/api/students", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "x-user-id": userId
      },
      body: JSON.stringify(payload)
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(
        result.message || "Student update failed"
      );
    }

    return result;
  };

 const handleSubmit = async (values, { setSubmitting }) => {
  if (isSubmittingForm) {
    console.log('Form already submitting, skipping...');
    return;
  }
  
  setIsSubmittingForm(true);
  
  try {
    let passportFileId = null;
    let educationalFileId = null;
    let otherFileId = null;

    const existingPassportId = values.passportFileId || safeInitialValues.passportFileId || null;
    const existingEducationalId = values.educationalFileId || safeInitialValues.educationalFileId || null;
    const existingOtherId = values.otherFileId || safeInitialValues.otherFileId || null;

    if (values.passportFile && values.passportFile instanceof File) {
      const uploadedPassport = await uploadFile(values.passportFile);
      passportFileId = uploadedPassport.id;
    } else if (isEdit && existingPassportId && passportPreview) {
      passportFileId = existingPassportId;
    }

    if (values.educationalDocuments && values.educationalDocuments instanceof File) {
      const uploadedEducation = await uploadFile(values.educationalDocuments);
      educationalFileId = uploadedEducation.id;
    } else if (isEdit && existingEducationalId && educationalPreview) {
      educationalFileId = existingEducationalId;
    }

    if (values.otherDocuments && values.otherDocuments instanceof File) {
      const uploadedOther = await uploadFile(values.otherDocuments);
      otherFileId = uploadedOther.id;
    } else if (isEdit && existingOtherId && otherPreview) {
      otherFileId = existingOtherId;
    }

    let companyId = null;
    try {
      const userStr = localStorage.getItem('user');
      if (userStr) {
        const user = JSON.parse(userStr);
        
        if (user.role === 'superadmin') {
          companyId = values.companyId || null;
        } else if (user.role === 'admin') {
          companyId = user.companyId || null;
        }
      }
    } catch (error) {
      console.error('Error getting user data:', error);
    }

    if (!companyId || companyId === '' || companyId === 'null' || companyId === 'undefined') {
      companyId = null;
    }

    console.log('Final companyId:', companyId, 'Type:', typeof companyId);

    const studentPayload = {
      name: values.name,
      surname: values.surname,
      email: values.email,
      course: values.courseTitle,
      academicYear: values.academicYear,
      nationality: values.nationality,
      phone: values.telephone,
      mobile: values.mobile,
      country: values.country,
      countryOfResidence: values.countryOfResidence,
      fullAddress: values.fullAddress,
      dateOfBirth: values.dateOfBirth,
      gender: values.gender,
      maritalStatus: values.maritalStatus,
      passportNumber: values.passportNumber,
      issuePlace: values.issuePlace,
      issueCountry: values.issueCountry,
      issueDate: values.issueDate,
      expiryDate: values.expiryDate,
      contactName: values.contactName,
      contactAddress: values.contactAddress,
      contactPhone: values.contactPhone,
      contactEmail: values.contactEmail,
      relationship: values.relationship,
      agencyName: values.agencyName,
      agencyEmail: values.agencyEmail,
      acceptPrivacy: values.acceptPrivacy,
      passportFileId: passportFileId,
      educationalFileId: educationalFileId,
      otherFileId: otherFileId,
      companyId: companyId,
    };

    console.log('Sending student payload with companyId:', studentPayload.companyId);

    if (isEdit) {
      const studentId = values.id || safeInitialValues.id;
      if (!studentId) {
        throw new Error("Student ID is missing for update");
      }
      studentPayload.id = studentId;
      await updateStudent(studentPayload);
    } else {
      await createStudent(studentPayload);
    }

    setSubmitSuccess(true);
    setSubmitting(false);

     toast.success(isEdit ? "Student updated successfully!" : "Student added successfully!");
  } catch (error) {
    console.error('Error in handleSubmit:', error);
    alert(error.message || "An error occurred while saving the student");
    setSubmitting(false);
  } finally {
    setIsSubmittingForm(false);
  }
};

  const isUploading = uploadingPassport || uploadingEducational || uploadingOther;

  const renderViewModal = () => {
    if (!viewModalOpen) return null;

    const isImage = viewFile.type === 'image';

    return (
      <div
        className="fixed inset-0 bg-black/70 backdrop-blur-sm z-60 flex items-center justify-center p-4"
        onClick={() => setViewModalOpen(false)}
      >
        <div
          className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="p-4 border-b border-gray-200 flex items-center justify-between">
            <h3 className="font-semibold text-gray-800">
              {viewFile.name.charAt(0).toUpperCase() + viewFile.name.slice(1)}
            </h3>
            <button
              onClick={() => setViewModalOpen(false)}
              className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </div>
          <div className="p-4 flex items-center justify-center bg-gray-50 min-h-[200] max-h-[70vh] overflow-auto">
            {isImage ? (
              <img
                src={viewFile.url}
                alt={viewFile.name}
                className="max-w-full max-h-[65vh] object-contain rounded-lg"
              />
            ) : (
              <div className="flex flex-col items-center justify-center p-8">
                <FileText className="h-16 w-16 text-gray-400" />
                <p className="text-gray-500 mt-2">PDF Document</p>
                <a
                  href={viewFile.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors"
                >
                  Open PDF
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  if (submitSuccess && !isInline) {
    return (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md p-8 text-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Check className="text-green-600" size={40} />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Application Submitted!</h2>
          <p className="text-gray-500">The student application has been successfully submitted.</p>
        </div>
      </div>
    );
  }

  if (submitSuccess && isInline) {
    return (
      <div className="bg-green-50 border border-green-200 rounded-xl p-6 text-center">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
          <Check className="text-green-600" size={32} />
        </div>
        <h3 className="text-lg font-bold text-green-800 mb-1">Application Submitted!</h3>
        <p className="text-green-600">The student application has been successfully submitted.</p>
        <button
          onClick={onClose}
          className="mt-4 px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
        >
          Back to List
        </button>
      </div>
    );
  }

  if (isInline) {
    return (
      <div className="w-full">
        {renderViewModal()}
        <Formik
          initialValues={initialFormValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
          enableReinitialize
        >
          {({ setFieldValue, values, errors, touched, isSubmitting }) => (
            <Form className="space-y-8">
              {/* Important Notice */}
              <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
                <div className="flex items-start gap-3">
                  <AlertCircle className="text-yellow-600 shrink-0 mt-0.5" size={20} />
                  <div>
                    <p className="text-sm font-medium text-yellow-800">VERY IMPORTANT</p>
                    <p className="text-sm text-yellow-700">
                      Input exactly as shown in passport/ID document. Incorrect information in this section
                      may result in your application being canceled.
                    </p>
                  </div>
                </div>
              </div>

              {/* 1. COURSE DETAILS */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-800 border-b border-gray-200 pb-2">
                  COURSE DETAILS
                </h3>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Course Title <span className="text-red-500">*</span>
                  </label>
                  <Field
                    as="select"
                    name="courseTitle"
                    className={`w-full px-4 py-2.5 rounded-xl border ${touched.courseTitle && errors.courseTitle ? 'border-red-500' : 'border-gray-200'
                      } focus:ring-2 focus:ring-teal-400/60 focus:border-transparent outline-none transition-all`}
                  >
                    <option value="">Select a course</option>
                    {courses.map((course) => (
                      <option key={course} value={course}>{course}</option>
                    ))}
                  </Field>
                  <ErrorMessage name="courseTitle" component="div" className="mt-1 text-sm text-red-500" />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Academic Year <span className="text-red-500">*</span>
                  </label>
                  <Field
                    type="text"
                    name="academicYear"
                    placeholder="e.g. 2026"
                    className={`w-full px-4 py-2.5 rounded-xl border ${touched.academicYear && errors.academicYear ? 'border-red-500' : 'border-gray-200'
                      } focus:ring-2 focus:ring-teal-400/60 focus:border-transparent outline-none transition-all`}
                  />
                  <ErrorMessage name="academicYear" component="div" className="mt-1 text-sm text-red-500" />
                  <p className="mt-1 text-xs text-gray-400">Enter the academic year (e.g., 2026)</p>
                </div>
              </div>

              {/* 2. PERSONAL DETAILS */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-800 border-b border-gray-200 pb-2">
                  PERSONAL DETAILS
                </h3>
                <p className="text-sm text-gray-500">Exactly as shown in passport/ID document</p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Name <span className="text-red-500">*</span>
                    </label>
                    <Field
                      type="text"
                      name="name"
                      placeholder="e.g. John"
                      className={`w-full px-4 py-2.5 rounded-xl border ${touched.name && errors.name ? 'border-red-500' : 'border-gray-200'
                        } focus:ring-2 focus:ring-teal-400/60 focus:border-transparent outline-none transition-all`}
                    />
                    <ErrorMessage name="name" component="div" className="mt-1 text-sm text-red-500" />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Surname <span className="text-red-500">*</span>
                    </label>
                    <Field
                      type="text"
                      name="surname"
                      placeholder="e.g. Lenon"
                      className={`w-full px-4 py-2.5 rounded-xl border ${touched.surname && errors.surname ? 'border-red-500' : 'border-gray-200'
                        } focus:ring-2 focus:ring-teal-400/60 focus:border-transparent outline-none transition-all`}
                    />
                    <ErrorMessage name="surname" component="div" className="mt-1 text-sm text-red-500" />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Date of Birth <span className="text-red-500">*</span>
                    </label>
                    <Field
                      type="date"
                      name="dateOfBirth"
                      className={`w-full px-4 py-2.5 rounded-xl border ${touched.dateOfBirth && errors.dateOfBirth ? 'border-red-500' : 'border-gray-200'
                        } focus:ring-2 focus:ring-teal-400/60 focus:border-transparent outline-none transition-all`}
                    />
                    <ErrorMessage name="dateOfBirth" component="div" className="mt-1 text-sm text-red-500" />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Gender <span className="text-red-500">*</span>
                    </label>
                    <div className="flex gap-4 pt-2">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <Field type="radio" name="gender" value="Male" className="w-4 h-4 text-teal-600" />
                        Male
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <Field type="radio" name="gender" value="Female" className="w-4 h-4 text-teal-600" />
                        Female
                      </label>
                    </div>
                    <ErrorMessage name="gender" component="div" className="mt-1 text-sm text-red-500" />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Marital Status <span className="text-red-500">*</span>
                    </label>
                    <div className="flex gap-4 pt-2">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <Field type="radio" name="maritalStatus" value="Single" className="w-4 h-4 text-teal-600" />
                        Single
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <Field type="radio" name="maritalStatus" value="Married" className="w-4 h-4 text-teal-600" />
                        Married
                      </label>
                    </div>
                    <ErrorMessage name="maritalStatus" component="div" className="mt-1 text-sm text-red-500" />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email Address <span className="text-red-500">*</span>
                    </label>
                    <Field
                      type="email"
                      name="email"
                      className={`w-full px-4 py-2.5 rounded-xl border ${touched.email && errors.email ? 'border-red-500' : 'border-gray-200'
                        } focus:ring-2 focus:ring-teal-400/60 focus:border-transparent outline-none transition-all`}
                    />
                    <ErrorMessage name="email" component="div" className="mt-1 text-sm text-red-500" />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Telephone
                    </label>
                    <Field
                      type="tel"
                      name="telephone"
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-teal-400/60 focus:border-transparent outline-none transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Mobile <span className="text-red-500">*</span>
                    </label>
                    <Field
                      type="tel"
                      name="mobile"
                      className={`w-full px-4 py-2.5 rounded-xl border ${touched.mobile && errors.mobile ? 'border-red-500' : 'border-gray-200'
                        } focus:ring-2 focus:ring-teal-400/60 focus:border-transparent outline-none transition-all`}
                    />
                    <ErrorMessage name="mobile" component="div" className="mt-1 text-sm text-red-500" />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Full Address <span className="text-red-500">*</span>
                    </label>
                    <Field
                      as="textarea"
                      name="fullAddress"
                      rows="2"
                      className={`w-full px-4 py-2.5 rounded-xl border ${touched.fullAddress && errors.fullAddress ? 'border-red-500' : 'border-gray-200'
                        } focus:ring-2 focus:ring-teal-400/60 focus:border-transparent outline-none transition-all`}
                    />
                    <ErrorMessage name="fullAddress" component="div" className="mt-1 text-sm text-red-500" />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Country <span className="text-red-500">*</span>
                    </label>
                    <Field
                      as="select"
                      name="country"
                      className={`w-full px-4 py-2.5 rounded-xl border ${touched.country && errors.country ? 'border-red-500' : 'border-gray-200'
                        } focus:ring-2 focus:ring-teal-400/60 focus:border-transparent outline-none transition-all`}
                    >
                      <option value="">None</option>
                      {countries.map((country) => (
                        <option key={country} value={country}>{country}</option>
                      ))}
                    </Field>
                    <ErrorMessage name="country" component="div" className="mt-1 text-sm text-red-500" />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Nationality <span className="text-red-500">*</span>
                    </label>
                    <Field
                      as="select"
                      name="nationality"
                      className={`w-full px-4 py-2.5 rounded-xl border ${touched.nationality && errors.nationality ? 'border-red-500' : 'border-gray-200'
                        } focus:ring-2 focus:ring-teal-400/60 focus:border-transparent outline-none transition-all`}
                    >
                      <option value="">Select Nationality</option>
                      {nationalities.map((nationality) => (
                        <option key={nationality} value={nationality}>{nationality}</option>
                      ))}
                    </Field>
                    <ErrorMessage name="nationality" component="div" className="mt-1 text-sm text-red-500" />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Country of Residence <span className="text-red-500">*</span>
                    </label>
                    <Field
                      as="select"
                      name="countryOfResidence"
                      className={`w-full px-4 py-2.5 rounded-xl border ${touched.countryOfResidence && errors.countryOfResidence ? 'border-red-500' : 'border-gray-200'
                        } focus:ring-2 focus:ring-teal-400/60 focus:border-transparent outline-none transition-all`}
                    >
                      <option value="">None</option>
                      {countries.map((country) => (
                        <option key={country} value={country}>{country}</option>
                      ))}
                    </Field>
                    <ErrorMessage name="countryOfResidence" component="div" className="mt-1 text-sm text-red-500" />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Passport/ID Number <span className="text-red-500">*</span>
                    </label>
                    <Field
                      type="text"
                      name="passportNumber"
                      className={`w-full px-4 py-2.5 rounded-xl border ${touched.passportNumber && errors.passportNumber ? 'border-red-500' : 'border-gray-200'
                        } focus:ring-2 focus:ring-teal-400/60 focus:border-transparent outline-none transition-all`}
                    />
                    <ErrorMessage name="passportNumber" component="div" className="mt-1 text-sm text-red-500" />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Issue Place <span className="text-red-500">*</span>
                    </label>
                    <Field
                      type="text"
                      name="issuePlace"
                      className={`w-full px-4 py-2.5 rounded-xl border ${touched.issuePlace && errors.issuePlace ? 'border-red-500' : 'border-gray-200'
                        } focus:ring-2 focus:ring-teal-400/60 focus:border-transparent outline-none transition-all`}
                    />
                    <ErrorMessage name="issuePlace" component="div" className="mt-1 text-sm text-red-500" />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Issue Country <span className="text-red-500">*</span>
                    </label>
                    <Field
                      as="select"
                      name="issueCountry"
                      className={`w-full px-4 py-2.5 rounded-xl border ${touched.issueCountry && errors.issueCountry ? 'border-red-500' : 'border-gray-200'
                        } focus:ring-2 focus:ring-teal-400/60 focus:border-transparent outline-none transition-all`}
                    >
                      <option value="">None</option>
                      {countries.map((country) => (
                        <option key={country} value={country}>{country}</option>
                      ))}
                    </Field>
                    <ErrorMessage name="issueCountry" component="div" className="mt-1 text-sm text-red-500" />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Issue Date <span className="text-red-500">*</span>
                    </label>
                    <Field
                      type="date"
                      name="issueDate"
                      className={`w-full px-4 py-2.5 rounded-xl border ${touched.issueDate && errors.issueDate ? 'border-red-500' : 'border-gray-200'
                        } focus:ring-2 focus:ring-teal-400/60 focus:border-transparent outline-none transition-all`}
                    />
                    <ErrorMessage name="issueDate" component="div" className="mt-1 text-sm text-red-500" />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Expiry Date <span className="text-red-500">*</span>
                    </label>
                    <Field
                      type="date"
                      name="expiryDate"
                      className={`w-full px-4 py-2.5 rounded-xl border ${touched.expiryDate && errors.expiryDate ? 'border-red-500' : 'border-gray-200'
                        } focus:ring-2 focus:ring-teal-400/60 focus:border-transparent outline-none transition-all`}
                    />
                    <ErrorMessage name="expiryDate" component="div" className="mt-1 text-sm text-red-500" />
                  </div>
                </div>
              </div>

              {/* 3. EMERGENCY CONTACT */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-800 border-b border-gray-200 pb-2">
                  CONTACT PERSON IN CASE OF EMERGENCY
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Contact Name
                    </label>
                    <Field
                      type="text"
                      name="contactName"
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-teal-400/60 focus:border-transparent outline-none transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Contact Address
                    </label>
                    <Field
                      type="text"
                      name="contactAddress"
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-teal-400/60 focus:border-transparent outline-none transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Contact Phone <span className="text-red-500">*</span>
                    </label>
                    <Field
                      type="tel"
                      name="contactPhone"
                      className={`w-full px-4 py-2.5 rounded-xl border ${touched.contactPhone && errors.contactPhone ? 'border-red-500' : 'border-gray-200'
                        } focus:ring-2 focus:ring-teal-400/60 focus:border-transparent outline-none transition-all`}
                    />
                    <ErrorMessage name="contactPhone" component="div" className="mt-1 text-sm text-red-500" />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Contact Email
                    </label>
                    <Field
                      type="email"
                      name="contactEmail"
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-teal-400/60 focus:border-transparent outline-none transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Relationship to Applicant
                    </label>
                    <Field
                      type="text"
                      name="relationship"
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-teal-400/60 focus:border-transparent outline-none transition-all"
                    />
                  </div>
                </div>
              </div>

              {/* 4. ATTACHMENTS */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-800 border-b border-gray-200 pb-2">
                  ATTACHMENTS
                </h3>
                <p className="text-sm text-gray-500">Maximum 5MB (jpg, jpeg, png, pdf)</p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {/* Passport/ID Upload */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Passport / ID {!isEdit && <span className="text-red-500">*</span>}
                    </label>
                    <input
                      id="file-upload-passport"
                      ref={passportInputRef}
                      type="file"
                      hidden
                      accept="image/*,.pdf"
                      onChange={(e) => handleFileChange(e, setFieldValue, 'passport')}
                      disabled={uploadingPassport}
                    />
                    {renderFilePreview(passportPreview, uploadingPassport, 'passport', setFieldValue)}
                    {!isEdit && <ErrorMessage name="passportFile" component="div" className="mt-1 text-sm text-red-500" />}
                  </div>

                  {/* Educational Documents Upload */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Educational Documents {!isEdit && <span className="text-red-500">*</span>}
                    </label>
                    <input
                      id="file-upload-educational"
                      ref={educationalInputRef}
                      type="file"
                      hidden
                      accept="image/*,.pdf"
                      onChange={(e) => handleFileChange(e, setFieldValue, 'educational')}
                      disabled={uploadingEducational}
                    />
                    {renderFilePreview(educationalPreview, uploadingEducational, 'educational', setFieldValue)}
                    {!isEdit && <ErrorMessage name="educationalDocuments" component="div" className="mt-1 text-sm text-red-500" />}
                  </div>

                  {/* Other Documents Upload */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Other Documents
                    </label>
                    <input
                      id="file-upload-other"
                      ref={otherInputRef}
                      type="file"
                      hidden
                      accept="image/*,.pdf"
                      onChange={(e) => handleFileChange(e, setFieldValue, 'other')}
                      disabled={uploadingOther}
                    />
                    {renderFilePreview(otherPreview, uploadingOther, 'other', setFieldValue)}
                  </div>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-xl p-3">
                  <p className="text-xs text-blue-700">
                    To minimize your file size, you can use{' '}
                    <a href="https://tinypng.com/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                      https://tinypng.com/
                    </a>
                    {' '}(for images) and{' '}
                    <a href="https://tools.pdf24.org/en/optimize-pdf" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                      https://tools.pdf24.org/en/optimize-pdf
                    </a>
                    {' '}(for PDFs)
                  </p>
                </div>
              </div>

              {/* 5. AGENCY DETAILS */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-800 border-b border-gray-200 pb-2">
                  AGENCY
                </h3>
                <p className="text-sm text-gray-500">If you are a student, please input your email address here.</p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Agency Name
                    </label>
                    <Field
                      type="text"
                      name="agencyName"
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-teal-400/60 focus:border-transparent outline-none transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Agency Email <span className="text-red-500">*</span>
                    </label>
                    <Field
                      type="email"
                      name="agencyEmail"
                      className={`w-full px-4 py-2.5 rounded-xl border ${touched.agencyEmail && errors.agencyEmail ? 'border-red-500' : 'border-gray-200'
                        } focus:ring-2 focus:ring-teal-400/60 focus:border-transparent outline-none transition-all`}
                    />
                    <ErrorMessage name="agencyEmail" component="div" className="mt-1 text-sm text-red-500" />
                  </div>
                </div>
              </div>

              {/* 6. PRIVACY POLICY */}
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Field
                    type="checkbox"
                    name="acceptPrivacy"
                    className="mt-1 w-4 h-4 text-teal-600 border-gray-300 rounded focus:ring-teal-500"
                  />
                  <div>
                    <label className="text-sm text-gray-700">
                      I accept the <span className="text-teal-600 font-medium">Privacy Policy</span> <span className="text-red-500">*</span>
                    </label>
                    <ErrorMessage name="acceptPrivacy" component="div" className="mt-1 text-sm text-red-500" />
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div className="flex gap-3 pt-4 border-t border-gray-200">
                <button
                  type="submit"
                  disabled={isLoading || isSubmitting || isUploading || isSubmittingForm}
                  className="flex-1 bg-teal-600 text-white py-3 px-4 rounded-xl hover:bg-teal-700 transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed font-medium"
                >
                  {(isLoading || isSubmitting || isSubmittingForm) && <Loader2 className="h-4 w-4 animate-spin" />}
                  {(isLoading || isSubmitting || isSubmittingForm) ? 'Saving...' : (isEdit ? 'Update Application' : 'Submit Application')}
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  className="px-6 py-3 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-colors font-medium"
                >
                  Cancel
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between z-10 rounded-t-3xl">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">Non-EU Student Application</h2>
            <p className="text-sm text-gray-500">Please fill in all required fields (*)</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-xl transition-colors"
            disabled={isLoading || isUploading}
          >
            <X size={24} className="text-gray-500" />
          </button>
        </div>

        {renderViewModal()}
        <Formik
          initialValues={initialFormValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
          enableReinitialize
        >
          {({ setFieldValue, values, errors, touched, isSubmitting }) => (
            <Form className="p-6 space-y-8">
              {/* Submit Button */}
              <div className="flex gap-3 pt-4 border-t border-gray-200">
                <button
                  type="submit"
                  disabled={isLoading || isSubmitting || isUploading || isSubmittingForm}
                  className="flex-1 bg-teal-600 text-white py-3 px-4 rounded-xl hover:bg-teal-700 transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed font-medium"
                >
                  {(isLoading || isSubmitting || isSubmittingForm) && <Loader2 className="h-4 w-4 animate-spin" />}
                  {(isLoading || isSubmitting || isSubmittingForm) ? 'Saving...' : (isEdit ? 'Update Application' : 'Submit Application')}
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  className="px-6 py-3 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-colors font-medium"
                >
                  Cancel
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}