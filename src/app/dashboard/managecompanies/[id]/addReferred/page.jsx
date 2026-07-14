"use client";

import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useRouter, useParams } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

const ReferredSchema = Yup.object().shape({
  name: Yup.string()
    .required("Name is required")
    .min(2, "Name must be at least 2 characters"),

  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),

  contact: Yup.string()
    .required("Contact number is required")
    .matches(/^[0-9+]+$/, "Invalid phone number")
    .min(10, "Contact number must be at least 10 digits"),
});

export default function AddReferredPage() {
  const router = useRouter();
  const params = useParams();

  const id = Array.isArray(params?.id) ? params.id[0] : params?.id;

  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (values, { resetForm, setSubmitting }) => {
    try {
      setIsLoading(true);

      console.log(values);

      const res = await fetch("/api/referred", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...values,
          companyId: id,
        }),
      });

      const result = await res.json();

      if (!result.success) {
        throw new Error(result.message);
      }

      toast.success("Referred user added successfully");

      resetForm();

      setTimeout(() => {
        router.push(`/dashboard/managecompanies/${id}`);
      }, 1000);
    } catch (err) {
      console.log(err);

      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);

      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto py-8 px-4">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <h2 className="text-2xl font-bold mb-1">Add Referred Person</h2>

        <p className="text-sm text-gray-500 mb-6">
          Enter referred person's details
        </p>

        <Formik
          initialValues={{
            name: "",
            email: "",
            contact: "",
          }}
          validationSchema={ReferredSchema}
          onSubmit={handleSubmit}
        >
          {({ touched, errors, isSubmitting }) => (
            <Form className="space-y-5">
              {/* Name */}

              <div>
                <label className="block text-sm font-medium mb-1">Name *</label>

                <Field
                  name="name"
                  placeholder="Enter full name"
                  className={`w-full rounded-xl border px-3 py-2.5

                  ${touched.name && errors.name
                      ? "border-red-500"
                      : "border-gray-300"
                    }

                  focus:outline-none
                  focus:ring-2
                  focus:ring-teal-500/20`}
                />

                <ErrorMessage
                  name="name"
                  component="div"
                  className="text-red-500 text-xs mt-1"
                />
              </div>

              {/* Email */}

              <div>
                <label className="block text-sm font-medium mb-1">
                  Email *
                </label>

                <Field
                  name="email"
                  type="email"
                  placeholder="Enter email"
                  className={`w-full rounded-xl border px-3 py-2.5

                  ${touched.email && errors.email
                      ? "border-red-500"
                      : "border-gray-300"
                    }

                  focus:outline-none
                  focus:ring-2
                  focus:ring-teal-500/20`}
                />

                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-red-500 text-xs mt-1"
                />
              </div>

              {/* Contact */}

              <div>
                <label className="block text-sm font-medium mb-1">
                  Contact *
                </label>

                <Field
                  name="contact"
                  placeholder="98XXXXXXXX"
                  className={`w-full rounded-xl border px-3 py-2.5

                  ${touched.contact && errors.contact
                      ? "border-red-500"
                      : "border-gray-300"
                    }

                  focus:outline-none
                  focus:ring-2
                  focus:ring-teal-500/20`}
                />

                <ErrorMessage
                  name="contact"
                  component="div"
                  className="text-red-500 text-xs mt-1"
                />
              </div>

              <div className="flex justify-end gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => router.back()}
                  className="px-5 py-2.5 border border-gray-300 rounded-xl"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={isLoading || isSubmitting}
                  className="px-5 py-2.5 bg-teal-600 text-white rounded-xl hover:bg-teal-700 disabled:opacity-50"
                >
                  {isLoading || isSubmitting ? "Saving..." : "Save Referred"}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}
