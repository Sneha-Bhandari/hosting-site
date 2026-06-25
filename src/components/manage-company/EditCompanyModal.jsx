"use client";

import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import toast from "react-hot-toast";

const COUNTRIES = ["Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Argentina", "Armenia", "Australia", "Austria", "Azerbaijan", "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bhutan", "Bolivia", "Bosnia and Herzegovina", "Botswana", "Brazil", "Brunei", "Bulgaria", "Burkina Faso", "Burundi", "Cambodia", "Cameroon", "Canada", "Cape Verde", "Central African Republic", "Chad", "Chile", "China", "Colombia", "Comoros", "Congo", "Costa Rica", "Croatia", "Cuba", "Cyprus", "Czech Republic", "Denmark", "Djibouti", "Dominica", "Dominican Republic", "Ecuador", "Egypt", "El Salvador", "Equatorial Guinea", "Eritrea", "Estonia", "Eswatini", "Ethiopia", "Fiji", "Finland", "France", "Gabon", "Gambia", "Georgia", "Germany", "Ghana", "Greece", "Grenada", "Guatemala", "Guinea", "Guyana", "Haiti", "Honduras", "Hungary", "Iceland", "India", "Indonesia", "Iran", "Iraq", "Ireland", "Israel", "Italy", "Jamaica", "Japan", "Jordan", "Kazakhstan", "Kenya", "Kuwait", "Kyrgyzstan", "Laos", "Latvia", "Lebanon", "Lesotho", "Liberia", "Libya", "Liechtenstein", "Lithuania", "Luxembourg", "Madagascar", "Malawi", "Malaysia", "Maldives", "Mali", "Malta", "Mauritania", "Mauritius", "Mexico", "Moldova", "Monaco", "Mongolia", "Montenegro", "Morocco", "Mozambique", "Myanmar", "Namibia", "Nauru", "Nepal", "Netherlands", "New Zealand", "Nicaragua", "Niger", "Nigeria", "North Macedonia", "Norway", "Oman", "Pakistan", "Panama", "Papua New Guinea", "Paraguay", "Peru", "Philippines", "Poland", "Portugal", "Qatar", "Romania", "Russia", "Rwanda", "Saint Kitts and Nevis", "Saint Lucia", "Samoa", "San Marino", "Saudi Arabia", "Senegal", "Serbia", "Seychelles", "Sierra Leone", "Singapore", "Slovakia", "Slovenia", "Solomon Islands", "Somalia", "South Africa", "South Korea", "Spain", "Sri Lanka", "Sudan", "Suriname", "Sweden", "Switzerland", "Syria", "Taiwan", "Tajikistan", "Tanzania", "Thailand", "Togo", "Tonga", "Trinidad and Tobago", "Tunisia", "Turkey", "Turkmenistan", "Tuvalu", "Uganda", "Ukraine", "United Arab Emirates", "United Kingdom", "United States", "Uruguay", "Uzbekistan", "Vanuatu", "Vatican City", "Venezuela", "Vietnam", "Yemen", "Zambia", "Zimbabwe"];

const COUNTRY_CODES = { 
  Nepal: "+977", 
  India: "+91", 
  USA: "+1", 
  UK: "+44", 
  Australia: "+61", 
  Canada: "+1", 
  Germany: "+49", 
  France: "+33", 
  Italy: "+39", 
  Spain: "+34", 
  Portugal: "+351", 
  Netherlands: "+31", 
  Belgium: "+32", 
  Switzerland: "+41", 
  Austria: "+43", 
  Sweden: "+46", 
  Norway: "+47", 
  Denmark: "+45", 
  Finland: "+358", 
  Ireland: "+353", 
  "New Zealand": "+64", 
  Singapore: "+65", 
  Malaysia: "+60", 
  China: "+86", 
  Japan: "+81", 
  "South Korea": "+82", 
  Brazil: "+55", 
  Mexico: "+52", 
  Argentina: "+54", 
  "South Africa": "+27", 
  Egypt: "+20", 
  Nigeria: "+234", 
  Kenya: "+254", 
  Ghana: "+233", 
  Morocco: "+212", 
  UAE: "+971", 
  "Saudi Arabia": "+966", 
  Turkey: "+90", 
  Russia: "+7", 
  Ukraine: "+380", 
  Poland: "+48", 
  Romania: "+40", 
  Greece: "+30", 
  Hungary: "+36", 
  "Czech Republic": "+420", 
  Vietnam: "+84", 
  Thailand: "+66", 
  Indonesia: "+62", 
  Philippines: "+63", 
  Pakistan: "+92", 
  Bangladesh: "+880", 
  "Sri Lanka": "+94" 
};

const detectCountryFromPhone = (phoneNumber) => {
  if (!phoneNumber) return "Nepal";
  const cleanNumber = phoneNumber.replace(/\s/g, '');
  // Check each country code to see if it matches
  for (const [country, code] of Object.entries(COUNTRY_CODES)) {
    if (cleanNumber.startsWith(code)) {
      return country;
    }
  }
  return "Nepal";
};

const extractPhoneNumber = (phoneNumber) => {
  if (!phoneNumber) return "";
  // Remove the country code from the beginning
  const cleanNumber = phoneNumber.replace(/\s/g, '');
  for (const code of Object.values(COUNTRY_CODES)) {
    if (cleanNumber.startsWith(code)) {
      return cleanNumber.substring(code.length);
    }
  }
  return cleanNumber;
};

const CompanySchema = Yup.object().shape({
  name: Yup.string().required("Company name is required"),
  contactNumber: Yup.string()
    .required("Contact number is required")
    .matches(/^[0-9+\-\s]+$/, "Invalid phone number format"),
  financialContact: Yup.string()
    .required("Financial contact number is required")
    .matches(/^[0-9+\-\s]+$/, "Invalid phone number format"),
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  address1: Yup.string().required("Address 1 is required"),
  address2: Yup.string(),
  city: Yup.string().required("City is required"),
  country: Yup.string().required("Country is required"),
  state: Yup.string().required("State is required"),
  website: Yup.string().url("Invalid URL format"),
  zipCode: Yup.string().required("Zip code is required"),
  regionalIncharge: Yup.string().required("Regional incharge is required"),
});

export default function EditCompanyModal({ isOpen, onClose, onSubmit, companyData }) {
  const [contactCountry, setContactCountry] = useState("Nepal");
  const [financialContactCountry, setFinancialContactCountry] = useState("Nepal");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (companyData) {
      const detectedContactCountry = detectCountryFromPhone(companyData.contactNumber);
      const detectedFinancialCountry = detectCountryFromPhone(companyData.financialContact);
      setContactCountry(detectedContactCountry);
      setFinancialContactCountry(detectedFinancialCountry);
    }
  }, [companyData]);

  if (!isOpen) return null;

  const handleSubmit = async (values, { resetForm, setSubmitting }) => {
    try {
      setIsLoading(true);
      // Combine country code with the phone number
      const fullContactNumber = `${COUNTRY_CODES[contactCountry]}${values.contactNumber}`;
      const fullFinancialContact = `${COUNTRY_CODES[financialContactCountry]}${values.financialContact}`;
      
      const updatedValues = {
        ...values,
        contactNumber: fullContactNumber,
        financialContact: fullFinancialContact,
      };
      
      await onSubmit(updatedValues);
    //   toast.success("Company updated successfully!");
      resetForm();
      setTimeout(() => {
        onClose();
      }, 1000);
    } catch (error) {
      console.error("Error updating company:", error);
      toast.error("Failed to update company. Please try again.");
    } finally {
      setIsLoading(false);
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50 overflow-y-auto">
      <div className="bg-white rounded-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
              <span className="bg-teal-100 text-teal-600 p-2 rounded-lg">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  <path d="M12 8v4" />
                  <path d="M12 16h.01" />
                </svg>
              </span>
              Edit Company
            </h2>
            <button 
              onClick={onClose} 
              className="text-gray-400 hover:text-gray-600 transition-colors"
              disabled={isLoading}
            >
              <div className="bg-red-600 text-white font-bold rounded-full w-8 h-8 flex items-center justify-center hover:bg-red-700 transition-colors">
                <X size={18} />
              </div>
            </button>
          </div>

          <Formik
            initialValues={{
              name: companyData?.name || "",
              contactNumber: extractPhoneNumber(companyData?.contactNumber || ""),
              financialContact: extractPhoneNumber(companyData?.financialContact || ""),
              email: companyData?.email || "",
              address1: companyData?.address1 || "",
              address2: companyData?.address2 || "",
              city: companyData?.city || "",
              country: companyData?.country || "",
              state: companyData?.state || "",
              website: companyData?.website || "",
              zipCode: companyData?.zipCode || "",
              regionalIncharge: companyData?.regionalIncharge || "",
            }}
            validationSchema={CompanySchema}
            onSubmit={handleSubmit}
            enableReinitialize
          >
            {({ values, setFieldValue, errors, touched, isSubmitting }) => (
              <Form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider">Name of the Company *</label>
                      <Field
                        name="name"
                        type="text"
                        placeholder="Enter Name"
                        className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-teal-500 focus:ring-2 focus:ring-teal-400/60 focus:outline-none transition-all text-sm"
                        disabled={isLoading || isSubmitting}
                      />
                      <ErrorMessage name="name" component="div" className="text-red-500 text-xs mt-1" />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider">Contact Number *</label>
                      <div className="mt-1 flex items-center gap-1">
                        <div className="w-24">
                          <select
                            className="w-full rounded-md border border-gray-300 px-2 py-2 bg-gray-50 focus:border-teal-500 focus:outline-none text-sm"
                            value={contactCountry}
                            onChange={(e) => setContactCountry(e.target.value)}
                            disabled={isLoading || isSubmitting}
                          >
                            <option value="Nepal">Nepal</option>
                            <option value="India">India</option>
                            <option value="USA">USA</option>
                            <option value="UK">UK</option>
                            <option value="Australia">Australia</option>
                            <option value="Canada">Canada</option>
                            <option value="Germany">Germany</option>
                            <option value="France">France</option>
                            <option value="Italy">Italy</option>
                            <option value="Spain">Spain</option>
                            <option value="China">China</option>
                            <option value="Japan">Japan</option>
                            <option value="Singapore">Singapore</option>
                            <option value="Malaysia">Malaysia</option>
                            <option value="UAE">UAE</option>
                          </select>
                        </div>
                        <div className="flex-1 flex">
                          <input
                            type="text"
                            value={COUNTRY_CODES[contactCountry] || "+977"}
                            readOnly
                            className="w-16 rounded-l-md border border-r-0 border-gray-300 px-2 py-2 bg-gray-100 text-gray-700 text-sm text-center"
                          />
                          <Field
                            name="contactNumber"
                            type="tel"
                            placeholder="Enter contact number"
                            className="flex-1 rounded-r-md border border-gray-300 px-3 py-2 focus:border-teal-500 focus:ring-2 focus:ring-teal-400/60 focus:outline-none transition-all text-sm"
                            disabled={isLoading || isSubmitting}
                          />
                        </div>
                      </div>
                      <ErrorMessage name="contactNumber" component="div" className="text-red-500 text-xs mt-1" />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider">Financial Contact Number *</label>
                      <div className="mt-1 flex items-center gap-1">
                        <div className="w-24">
                          <select
                            className="w-full rounded-md border border-gray-300 px-2 py-2 bg-gray-50 focus:border-teal-500 focus:outline-none text-sm"
                            value={financialContactCountry}
                            onChange={(e) => setFinancialContactCountry(e.target.value)}
                            disabled={isLoading || isSubmitting}
                          >
                            <option value="Nepal">Nepal</option>
                            <option value="India">India</option>
                            <option value="USA">USA</option>
                            <option value="UK">UK</option>
                            <option value="Australia">Australia</option>
                            <option value="Canada">Canada</option>
                            <option value="Germany">Germany</option>
                            <option value="France">France</option>
                            <option value="Italy">Italy</option>
                            <option value="Spain">Spain</option>
                            <option value="China">China</option>
                            <option value="Japan">Japan</option>
                            <option value="Singapore">Singapore</option>
                            <option value="Malaysia">Malaysia</option>
                            <option value="UAE">UAE</option>
                          </select>
                        </div>
                        <div className="flex-1 flex">
                          <input
                            type="text"
                            value={COUNTRY_CODES[financialContactCountry] || "+977"}
                            readOnly
                            className="w-16 rounded-l-md border border-r-0 border-gray-300 px-2 py-2 bg-gray-100 text-gray-700 text-sm text-center"
                          />
                          <Field
                            name="financialContact"
                            type="tel"
                            placeholder="Enter financial contact"
                            className="flex-1 rounded-r-md border border-gray-300 px-3 py-2 focus:border-teal-500 focus:ring-2 focus:ring-teal-400/60 focus:outline-none transition-all text-sm"
                            disabled={isLoading || isSubmitting}
                          />
                        </div>
                      </div>
                      <ErrorMessage name="financialContact" component="div" className="text-red-500 text-xs mt-1" />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider">Email Address *</label>
                      <Field
                        name="email"
                        type="email"
                        placeholder="Email"
                        className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-teal-500 focus:ring-2 focus:ring-teal-400/60 focus:outline-none transition-all text-sm"
                        disabled={isLoading || isSubmitting}
                      />
                      <ErrorMessage name="email" component="div" className="text-red-500 text-xs mt-1" />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider">Address 1 *</label>
                      <Field
                        name="address1"
                        type="text"
                        placeholder="Enter Address 1"
                        className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-teal-500 focus:ring-2 focus:ring-teal-400/60 focus:outline-none transition-all text-sm"
                        disabled={isLoading || isSubmitting}
                      />
                      <ErrorMessage name="address1" component="div" className="text-red-500 text-xs mt-1" />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider">Address 2</label>
                      <Field
                        name="address2"
                        type="text"
                        placeholder="Enter Address 2"
                        className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-teal-500 focus:ring-2 focus:ring-teal-400/60 focus:outline-none transition-all text-sm"
                        disabled={isLoading || isSubmitting}
                      />
                      <ErrorMessage name="address2" component="div" className="text-red-500 text-xs mt-1" />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider">City *</label>
                      <Field
                        name="city"
                        type="text"
                        placeholder="Enter City"
                        className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-teal-500 focus:ring-2 focus:ring-teal-400/60 focus:outline-none transition-all text-sm"
                        disabled={isLoading || isSubmitting}
                      />
                      <ErrorMessage name="city" component="div" className="text-red-500 text-xs mt-1" />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider">Country *</label>
                      <Field
                        as="select"
                        name="country"
                        className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-teal-500 focus:ring-2 focus:ring-teal-400/60 focus:outline-none transition-all text-sm"
                        disabled={isLoading || isSubmitting}
                      >
                        <option value="">Select Country</option>
                        {COUNTRIES.map((country) => (
                          <option key={country} value={country}>{country}</option>
                        ))}
                      </Field>
                      <ErrorMessage name="country" component="div" className="text-red-500 text-xs mt-1" />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider">State *</label>
                      <Field
                        name="state"
                        type="text"
                        placeholder="Enter State"
                        className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-teal-500 focus:ring-2 focus:ring-teal-400/60 focus:outline-none transition-all text-sm"
                        disabled={isLoading || isSubmitting}
                      />
                      <ErrorMessage name="state" component="div" className="text-red-500 text-xs mt-1" />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider">Company Website URL</label>
                      <Field
                        name="website"
                        type="url"
                        placeholder="Enter company website url"
                        className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-teal-500 focus:ring-2 focus:ring-teal-400/60 focus:outline-none transition-all text-sm"
                        disabled={isLoading || isSubmitting}
                      />
                      <ErrorMessage name="website" component="div" className="text-red-500 text-xs mt-1" />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider">Zip Code *</label>
                      <Field
                        name="zipCode"
                        type="text"
                        placeholder="Enter Zip Code"
                        className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-teal-500 focus:ring-2 focus:ring-teal-400/60 focus:outline-none transition-all text-sm"
                        disabled={isLoading || isSubmitting}
                      />
                      <ErrorMessage name="zipCode" component="div" className="text-red-500 text-xs mt-1" />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider">Regional Incharge *</label>
                      <Field
                        name="regionalIncharge"
                        type="text"
                        placeholder="Enter Regional Incharge"
                        className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-teal-500 focus:ring-2 focus:ring-teal-400/60 focus:outline-none transition-all text-sm"
                        disabled={isLoading || isSubmitting}
                      />
                      <ErrorMessage name="regionalIncharge" component="div" className="text-red-500 text-xs mt-1" />
                    </div>
                  </div>
                </div>

                <div className="flex justify-end space-x-3 pt-4 border-t">
                  <button
                    type="button"
                    onClick={onClose}
                    className="px-6 py-2.5 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors text-sm"
                    disabled={isLoading || isSubmitting}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isLoading || isSubmitting}
                    className="px-6 py-2.5 bg-teal-600 text-white rounded-md hover:bg-teal-700 transition-colors text-sm flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {(isLoading || isSubmitting) && (
                      <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                    )}
                    {(isLoading || isSubmitting) ? 'Updating...' : 'Update Company'}
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