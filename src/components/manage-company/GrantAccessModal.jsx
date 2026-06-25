'use client';

import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useState } from 'react';

const COUNTRIES = [
  'Cyprus', 'Germany', 'Croatia', 'France', 'New Zealand',
  'Malaysia', 'Georgia', 'United Kingdom', 'Finland',
  'Netherlands', 'Italy', 'Greece', 'Malta', 'Lithuania'
];

const UNIVERSITIES = [
  'University of Oxford',
  'University of Cambridge',
  'Harvard University',
  'Stanford University',
  'MIT',
  'University of Tokyo',
  'National University of Singapore',
  'University of Melbourne',
  'Technical University of Munich',
  'Sorbonne University',
  'University of Sydney',
  'University of Toronto',
  'University of British Columbia',
  'University of Amsterdam',
  'ETH Zurich'
];

const STUDY_AREAS = [
  'Computer Science',
  'Business Administration',
  'Engineering',
  'Medicine',
  'Law',
  'Arts & Humanities',
  'Social Sciences',
  'Natural Sciences',
  'Mathematics',
  'Economics',
  'Psychology',
  'Data Science',
  'Artificial Intelligence',
  'Environmental Science',
  'Architecture'
];

const GrantAccessSchema = Yup.object().shape({
  countries: Yup.array().min(1, "Please select at least one country"),
  universities: Yup.array(),
  studyAreas: Yup.array(),
});

export default function GrantAccessModal({ 
  isOpen, 
  onClose, 
  onSubmit, 
  companyName,
  initialCountries = [],
  initialUniversities = [],
  initialStudyAreas = []
}) {
  const [newCountry, setNewCountry] = useState('');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">
                Grant Access to Company
              </h2>
              <p className="text-sm text-gray-600 mt-1">
                {companyName}
              </p>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 text-2xl hover:bg-gray-100 rounded-full p-1 transition-colors"
            >
              ×
            </button>
          </div>

          <Formik
            initialValues={{
              countries: initialCountries,
              universities: initialUniversities,
              studyAreas: initialStudyAreas,
            }}
            validationSchema={GrantAccessSchema}
            onSubmit={(values) => {
              onSubmit(values);
            }}
          >
            {({ values, setFieldValue }) => {
              const handleAddCountry = () => {
                if (newCountry && !values.countries.includes(newCountry)) {
                  setFieldValue('countries', [...values.countries, newCountry]);
                  setNewCountry('');
                }
              };

              const handleRemoveCountry = (country) => {
                setFieldValue('countries', values.countries.filter(c => c !== country));
              };

              const handleRemoveUniversity = (university) => {
                setFieldValue('universities', values.universities.filter(u => u !== university));
              };

              const handleRemoveStudyArea = (area) => {
                setFieldValue('studyAreas', values.studyAreas.filter(a => a !== area));
              };

              return (
                <Form className="space-y-6">
                  {/* Countries Section */}
                  <div>
                    <h3 className="text-sm font-medium text-gray-700 mb-2">
                      Countries Granted Access *
                    </h3>
                    
                    {values.countries.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-3 p-2 bg-gray-50 rounded-lg">
                        {values.countries.map((country) => (
                          <span
                            key={country}
                            className="inline-flex items-center gap-1 bg-blue-100 text-blue-800 px-3 py-1.5 rounded-full text-sm border border-blue-200"
                          >
                            {country}
                            <button
                              type="button"
                              onClick={() => handleRemoveCountry(country)}
                              className="text-blue-600 hover:text-blue-800 ml-1 font-bold"
                            >
                              ×
                            </button>
                          </span>
                        ))}
                      </div>
                    )}
                    <ErrorMessage name="countries" component="div" className="text-red-500 text-xs mt-1" />

                    <div className="flex gap-2">
                      <select
                        value={newCountry}
                        onChange={(e) => setNewCountry(e.target.value)}
                        className="flex-1 rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                      >
                        <option value="">Select Country</option>
                        {COUNTRIES.filter(c => !values.countries.includes(c)).map((country) => (
                          <option key={country} value={country}>{country}</option>
                        ))}
                      </select>
                      <button
                        type="button"
                        onClick={handleAddCountry}
                        disabled={!newCountry}
                        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        Add
                      </button>
                    </div>
                  </div>

                  {/* Universities Section */}
                  <div>
                    <h3 className="text-sm font-medium text-gray-700 mb-2">
                      Universities Granted Access (Optional)
                    </h3>
                    
                    {values.universities.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-3 p-2 bg-gray-50 rounded-lg">
                        {values.universities.map((uni) => (
                          <span
                            key={uni}
                            className="inline-flex items-center gap-1 bg-green-100 text-green-800 px-3 py-1.5 rounded-full text-sm border border-green-200"
                          >
                            {uni}
                            <button
                              type="button"
                              onClick={() => handleRemoveUniversity(uni)}
                              className="text-green-600 hover:text-green-800 ml-1 font-bold"
                            >
                              ×
                            </button>
                          </span>
                        ))}
                      </div>
                    )}

                    <div className="flex gap-2">
                      <Field
                        as="select"
                        name="universities"
                        onChange={(e) => {
                          const uni = e.target.value;
                          if (uni && !values.universities.includes(uni)) {
                            setFieldValue('universities', [...values.universities, uni]);
                          }
                        }}
                        className="flex-1 rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                      >
                        <option value="">Select University</option>
                        {UNIVERSITIES.filter(u => !values.universities.includes(u)).map((uni) => (
                          <option key={uni} value={uni}>{uni}</option>
                        ))}
                      </Field>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">Select a university from the dropdown to add</p>
                  </div>

                  {/* Study Areas Section */}
                  <div>
                    <h3 className="text-sm font-medium text-gray-700 mb-2">
                      Study Areas Granted Access (Optional)
                    </h3>
                    
                    {values.studyAreas.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-3 p-2 bg-gray-50 rounded-lg">
                        {values.studyAreas.map((area) => (
                          <span
                            key={area}
                            className="inline-flex items-center gap-1 bg-purple-100 text-purple-800 px-3 py-1.5 rounded-full text-sm border border-purple-200"
                          >
                            {area}
                            <button
                              type="button"
                              onClick={() => handleRemoveStudyArea(area)}
                              className="text-purple-600 hover:text-purple-800 ml-1 font-bold"
                            >
                              ×
                            </button>
                          </span>
                        ))}
                      </div>
                    )}

                    <div className="flex gap-2">
                      <Field
                        as="select"
                        name="studyAreas"
                        onChange={(e) => {
                          const area = e.target.value;
                          if (area && !values.studyAreas.includes(area)) {
                            setFieldValue('studyAreas', [...values.studyAreas, area]);
                          }
                        }}
                        className="flex-1 rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                      >
                        <option value="">Select Study Area</option>
                        {STUDY_AREAS.filter(a => !values.studyAreas.includes(a)).map((area) => (
                          <option key={area} value={area}>{area}</option>
                        ))}
                      </Field>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">Select a study area from the dropdown to add</p>
                  </div>

                 
                  {/* Action Buttons */}
                  <div className="flex justify-end space-x-3 pt-4 border-t">
                    <button
                      type="button"
                      onClick={onClose}
                      className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
                    >
                      Grant Access
                    </button>
                  </div>
                </Form>
              );
            }}
          </Formik>
        </div>
      </div>
    </div>
  );
}