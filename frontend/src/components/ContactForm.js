import React, { useEffect, useMemo } from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import InputMask from "react-input-mask";

const ContactForm = ({ label, initialValues, onSubmit }) => {
  const validationSchema = Yup.object().shape({
    firstName: Yup.string()
      .required("First Name is required")
      .max(50, "First Name is not valid"),
    lastName: Yup.string()
      .required("Last Name is required")
      .max(50, "Last Name is not valid"),
    phoneNum: Yup.string().required("Phone number is required"),
  });

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      phoneNum: "",
    },
    validationSchema: validationSchema,
    onSubmit: (val) => {
      onSubmit(val);
    },
  });

  useEffect(() => {
    if (initialValues) {
      formik.setValues(initialValues);
    }
  }, [initialValues]);
  const disabled = useMemo(() => {
    const { firstName, lastName, phoneNum } = formik.values;
    if (firstName && lastName && phoneNum.trim().length === 12) return false;
    return true;
  }, [formik.values]);

  return (
    <div className="form-wrapper">
      <p className="font-bold text-xl text-center mb-4">{label}</p>
      <form onSubmit={formik.handleSubmit} noValidate className="form">
        <div className="form">
          <div className="flex flex-col mb-4">
            <label
              className="text-black text-sm font-semibold mb-2"
              id="firstName"
            >
              First Name
            </label>
            <input
              id="firstName"
              className="rounded-lg border p-2"
              type="text"
              placeholder="First Name"
              {...formik.getFieldProps("firstName")}
            />
            {formik.touched.firstName && formik.errors.firstName && (
              <div className="text-red-600 text-xs mt-1">
                {formik.errors.firstName}
              </div>
            )}
          </div>

          <div className="flex flex-col mb-4">
            <label
              className="text-black text-sm font-semibold mb-2"
              id="lastName"
            >
              Last Name
            </label>
            <input
              id="lastName"
              className="rounded-lg border p-2"
              type="text"
              placeholder="Last Name"
              {...formik.getFieldProps("lastName")}
            />
            {formik.touched.lastName && formik.errors.lastName && (
              <div className="text-red-600 text-xs mt-1">
                {formik.errors.lastName}
              </div>
            )}
          </div>

          <div className="flex flex-col mb-4">
            <label className="text-black text-sm font-semibold mb-2" id="phone">
              Phone Number
            </label>
            <InputMask
              id="phone"
              className="rounded-lg border p-2"
              mask="999-999-9999"
              placeholder="Phone Number"
              {...formik.getFieldProps("phoneNum")}
              maskChar=" "
            />
            {formik.touched.phoneNum && formik.errors.phoneNum && (
              <div className="text-red-600 text-xs mt-1">
                {formik.errors.phoneNum}
              </div>
            )}
          </div>
          <button
            type="submit"
            className="btn bg-green-600 text-white rounded-lg hover:bg-green-400 px-4 py-2 w-full disabled:bg-slate-300"
            disabled={
              formik.isSubmitting ||
              !formik.isValid ||
              !formik.touched ||
              disabled
            }
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default ContactForm;
