import React, { useState, useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { ArrowLeftIcon } from "@heroicons/react/24/solid";

import { Context as ContactContext } from "../context/ContactContext";
import ContactForm from "../components/ContactForm";

const EditContact = () => {
  const { updateContact, state } = useContext(ContactContext);
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (params?.id) {
      const contact = state.contacts.find((v) => v._id === params.id);
      setFormValues(contact);
    }
  }, [params, state]);

  const [formValues, setFormValues] = useState({
    firstName: "",
    lastName: "",
    phoneNum: "",
  });

  const onSubmit = async (contactInfo) => {
    await updateContact({
      data: {
        firstName: contactInfo.firstName,
        lastName: contactInfo.lastName,
        phoneNum: contactInfo.phoneNum,
      },
      id: contactInfo._id,
    });
    navigate("/");
  };

  return (
    <div className="container m-auto mt-10 flex justify-center">
      <div className=" w-full max-w-screen-sm">
        <button onClick={() => navigate(-1)} className="p-2 mb-8">
          <ArrowLeftIcon className="text-black-600 h-6 w-6" />
        </button>
        <div className="shadow-md p-4 w-full max-w-screen-sm">
          <ContactForm
            initialValues={formValues}
            onSubmit={onSubmit}
            label="Edit Contact Info"
          />
        </div>
      </div>
    </div>
  );
};

export default EditContact;
