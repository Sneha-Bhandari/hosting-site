'use client';

import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useState } from 'react';

// Validation Schema
const CompanyDetailsSchema = Yup.object().shape({
  registrationNumber: Yup.string(),
  taxId: Yup.string(),
  incorporationDate: Yup.date(),
  businessType: Yup.string(),
  numberOfEmployees: Yup.number().min(0, "Must be a positive number"),
  annualRevenue: Yup.number().min(0, "Must be a positive number"),
  description: Yup.string(),
  bankName: Yup.string(),
  accountNumber: Yup.string(),
  swiftCode: Yup.string(),
});

export default function AddCompanyDetailsModal({ isOpen, onClose, onSubmit, companyName }) {
  const [documents, setDocuments] = useState([]);

  const handleFileUpload = (e, setFieldValue) => {
    const files = Array.from(e.target.files);
    setDocuments([...documents, ...files]);
    setFieldValue('documents', [...documents, ...files]);
  };

  const removeDocument = (index, setFieldValue) => {
    const newDocs = documents.filter((_, i) => i !== index);
    setDocuments(newDocs);
    setFieldValue('documents', newDocs);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/10 flex items-center justify-center z-50 overflow-y-auto">
      <div className="bg-white rounded-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-gray-900">
              Add Company Details - {companyName}
            </h2>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600 text-2xl">×</button>
          </div>

          <Formik
            initialValues={{
              registrationNumber: '',
              taxId: '',
              incorporationDate: '',
              businessType: '',
              numberOfEmployees: '',
              annualRevenue: '',
              description: '',
              bankName: '',
              accountNumber: '',
              swiftCode: '',
              documents: [],
            }}
            validationSchema={CompanyDetailsSchema}
            onSubmit={(values) => {
              onSubmit({ ...values, documents });
              setDocuments([]);
            }}
          >
            {({ setFieldValue, values }) => (
              <Form className="space-y-6">
                <h3 className="text-lg font-semibold text-gray-800">Company Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Registration Number
                    </label>
                    <Field
                      name="registrationNumber"
                      type="text"
                      placeholder="Enter registration number"
                      className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                    <ErrorMessage name="registrationNumber" component="div" className="text-red-500 text-xs mt-1" />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Tax ID / VAT Number
                    </label>
                    <Field
                      name="taxId"
                      type="text"
                      placeholder="Enter tax ID"
                      className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                    <ErrorMessage name="taxId" component="div" className="text-red-500 text-xs mt-1" />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Incorporation Date
                    </label>
                    <Field
                      name="incorporationDate"
                      type="date"
                      className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                    <ErrorMessage name="incorporationDate" component="div" className="text-red-500 text-xs mt-1" />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Business Type
                    </label>
                    <Field
                      as="select"
                      name="businessType"
                      className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    >
                      <option value="">Select Business Type</option>
                      <option value="private">Private Limited</option>
                      <option value="public">Public Limited</option>
                      <option value="llp">LLP</option>
                      <option value="sole">Sole Proprietorship</option>
                      <option value="partnership">Partnership</option>
                    </Field>
                    <ErrorMessage name="businessType" component="div" className="text-red-500 text-xs mt-1" />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Number of Employees
                    </label>
                    <Field
                      name="numberOfEmployees"
                      type="number"
                      placeholder="Enter number of employees"
                      className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                    <ErrorMessage name="numberOfEmployees" component="div" className="text-red-500 text-xs mt-1" />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Annual Revenue (USD)
                    </label>
                    <Field
                      name="annualRevenue"
                      type="number"
                      placeholder="Enter annual revenue"
                      className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                    <ErrorMessage name="annualRevenue" component="div" className="text-red-500 text-xs mt-1" />
                  </div>
                </div>

                <h3 className="text-lg font-semibold text-gray-800">Banking Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Bank Name
                    </label>
                    <Field
                      name="bankName"
                      type="text"
                      placeholder="Enter bank name"
                      className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                    <ErrorMessage name="bankName" component="div" className="text-red-500 text-xs mt-1" />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Account Number
                    </label>
                    <Field
                      name="accountNumber"
                      type="text"
                      placeholder="Enter account number"
                      className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                    <ErrorMessage name="accountNumber" component="div" className="text-red-500 text-xs mt-1" />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      SWIFT Code
                    </label>
                    <Field
                      name="swiftCode"
                      type="text"
                      placeholder="Enter SWIFT code"
                      className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                    <ErrorMessage name="swiftCode" component="div" className="text-red-500 text-xs mt-1" />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Company Description
                  </label>
                  <Field
                    as="textarea"
                    name="description"
                    rows="3"
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    placeholder="Brief description of the company..."
                  />
                  <ErrorMessage name="description" component="div" className="text-red-500 text-xs mt-1" />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Upload Documents & Proofs
                  </label>
                  <input
                    type="file"
                    multiple
                    onChange={(e) => handleFileUpload(e, setFieldValue)}
                    className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                  />
                  {documents.length > 0 && (
                    <div className="mt-2 space-y-2">
                      {documents.map((doc, index) => (
                        <div key={index} className="flex items-center justify-between bg-gray-50 px-3 py-2 rounded">
                          <span className="text-sm text-gray-700">{doc.name}</span>
                          <button
                            type="button"
                            onClick={() => removeDocument(index, setFieldValue)}
                            className="text-red-600 hover:text-red-800"
                          >
                            Remove
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="flex justify-end space-x-3 pt-4 border-t">
                  <button
                    type="button"
                    onClick={onClose}
                    className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700"
                  >
                    Add Details
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