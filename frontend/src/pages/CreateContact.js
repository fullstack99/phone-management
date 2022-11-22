import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeftIcon } from "@heroicons/react/24/solid";

import { Context as ContactContext } from "../context/ContactContext";
import ContactForm from "../components/ContactForm";

const CreateContact = () => {
  const { createContact, state } = useContext(ContactContext);
  const navigate = useNavigate();

  const onSubmit = (contactInfo) => {
    createContact(contactInfo);
  };

  useEffect(() => {
    console.log(111, state.loading);
  }, [state.loading]);

  return (
    <div className="container m-auto mt-10 flex justify-center">
      <div className=" w-full max-w-screen-sm">
        <button onClick={() => navigate(-1)} className="p-2 mb-8">
          <ArrowLeftIcon className="text-black-600 h-6 w-6" />
        </button>
        <div className="shadow-md p-4">
          <ContactForm onSubmit={onSubmit} label="Create Contact Info" />
        </div>
      </div>
    </div>
  );
};

export default CreateContact;
