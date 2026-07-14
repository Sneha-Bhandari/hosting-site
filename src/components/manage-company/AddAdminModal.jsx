'use client';

import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useState } from 'react';
import toast from "react-hot-toast";

const AdminSchema = Yup.object().shape({
  firstName: Yup.string()
    .required("First name is required")
    .min(2, "First name must be at least 2 characters"),
  lastName: Yup.string()
    .required("Last name is required")
    .min(2, "Last name must be at least 2 characters"),
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  password: Yup.string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters"),
});

export default function AddAdminModal({ isOpen, onClose, companyId, companyName, onAdminAdded }) {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (values, { resetForm, setSubmitting }) => {
    try {
      setIsLoading(true);
      
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: values.email,
          password: values.password,
          role: 'admin',
          companyId: companyId,
          firstName: values.firstName,
          lastName: values.lastName,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Failed to add admin');
      }

      toast.success(`Admin ${values.firstName} ${values.lastName} added successfully!`);
      resetForm();
      
      if (onAdminAdded) {
        onAdminAdded(result.user);
      }
      
      onClose();
      
    } catch (error) {
      console.error("Error adding admin:", error);
      toast.error(error.message || "Failed to add admin. Please try again.");
    } finally {
      setIsLoading(false);
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full mx-4">
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-gray-900">
              Add Company Admin
            </h2>
            <button 
              onClick={onClose} 
              className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors text-gray-400 hover:text-gray-600"
              disabled={isLoading}
            >
              <span className="text-2xl">×</span>
            </button>
          </div>

          <p className="text-sm text-gray-600 mb-4">
            Create an admin account for <span className="font-semibold text-gray-800">{companyName}</span>
          </p>

          <Formik
            initialValues={{
              firstName: '',
              lastName: '',
              email: '',
              password: '',
            }}
            validationSchema={AdminSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting, errors, touched }) => (
              <Form className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    First Name *
                  </label>
                  <Field
                    name="firstName"
                    type="text"
                    placeholder="Enter first name"
                    className={`mt-1 block w-full rounded-xl border ${
                      touched.firstName && errors.firstName 
                        ? 'border-red-500 focus:ring-red-500' 
                        : 'border-gray-300 focus:ring-teal-500'
                    } px-3 py-2.5 focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-500/20 transition-all`}
                    disabled={isLoading || isSubmitting}
                  />
                  <ErrorMessage name="firstName" component="div" className="text-red-500 text-xs mt-1" />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Last Name *
                  </label>
                  <Field
                    name="lastName"
                    type="text"
                    placeholder="Enter last name"
                    className={`mt-1 block w-full rounded-xl border ${
                      touched.lastName && errors.lastName 
                        ? 'border-red-500 focus:ring-red-500' 
                        : 'border-gray-300 focus:ring-teal-500'
                    } px-3 py-2.5 focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-500/20 transition-all`}
                    disabled={isLoading || isSubmitting}
                  />
                  <ErrorMessage name="lastName" component="div" className="text-red-500 text-xs mt-1" />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Email *
                  </label>
                  <Field
                    name="email"
                    type="email"
                    placeholder="Enter admin email"
                    className={`mt-1 block w-full rounded-xl border ${
                      touched.email && errors.email 
                        ? 'border-red-500 focus:ring-red-500' 
                        : 'border-gray-300 focus:ring-teal-500'
                    } px-3 py-2.5 focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-500/20 transition-all`}
                    disabled={isLoading || isSubmitting}
                  />
                  <ErrorMessage name="email" component="div" className="text-red-500 text-xs mt-1" />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Password *
                  </label>
                  <div className="relative">
                    <Field
                      name="password"
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Create password (min 6 characters)"
                      className={`mt-1 block w-full rounded-xl border ${
                        touched.password && errors.password 
                          ? 'border-red-500 focus:ring-red-500' 
                          : 'border-gray-300 focus:ring-teal-500'
                      } px-3 py-2.5 focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-500/20 transition-all pr-16`}
                      disabled={isLoading || isSubmitting}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm font-medium text-teal-600 hover:text-teal-700 transition-colors"
                      disabled={isLoading || isSubmitting}
                    >
                      {showPassword ? 'Hide' : 'Show'}
                    </button>
                  </div>
                  <ErrorMessage name="password" component="div" className="text-red-500 text-xs mt-1" />
                </div>

                <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
                  <button
                    type="button"
                    onClick={onClose}
                    className="px-4 py-2.5 border border-gray-300 rounded-xl text-gray-700 hover:bg-gray-50 transition-colors text-sm font-medium"
                    disabled={isLoading || isSubmitting}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isLoading || isSubmitting}
                    className="px-6 py-2.5 bg-teal-600 text-white rounded-xl hover:bg-teal-700 transition-colors text-sm font-medium flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {(isLoading || isSubmitting) && (
                      <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                    )}
                    {(isLoading || isSubmitting) ? 'Creating...' : 'Create Admin'}
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
}