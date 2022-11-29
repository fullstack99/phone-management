import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { PencilIcon, TrashIcon, PhoneIcon } from "@heroicons/react/24/solid";
import { Context as ContactContext } from "../context/ContactContext";

const ContactRow = ({ contact }) => {
  const { id, firstName, lastName, phoneNum } = contact;
  const { deleteContact } = useContext(ContactContext);
  const navigate = useNavigate();

  return (
    <div className="flex justify-between items-center p-4">
      <div>
        <div className="text-black capitalize font-semibold">
          {firstName} {lastName}
        </div>
        <div className="flex items-center mt-1">
          <PhoneIcon className="h-6 w-6 text-gray-500" />
          <span className="text-gray-500">{phoneNum}</span>
        </div>
      </div>
      <div className="flex">
        <button
          onClick={() => navigate(`/edit/${id}`)}
          className="bg-blue-600 p-2 rounded-lg mr-4"
        >
          <PencilIcon className="h-6 w-6 text-white" />
        </button>
        <button
          onClick={() => deleteContact(id)}
          className="bg-red-600 p-2 rounded-lg"
        >
          <TrashIcon className="h-6 w-6 text-white" />
        </button>
      </div>
    </div>
  );
};

export default ContactRow;
