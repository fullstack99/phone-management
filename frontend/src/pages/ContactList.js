import React, { useState, useEffect, useContext, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Context as ContactContext } from "../context/ContactContext";
import ContactRow from "../components/ContactRow";
import SearchInput from "../components/SearchInput";

const ContactList = () => {
  const [searchKey, setSearchKey] = useState("");
  const { getContacts, state } = useContext(ContactContext);
  const navigate = useNavigate();
  useEffect(() => {
    getContacts();
  }, []);

  const contacts = useMemo(() => {
    if (searchKey) {
      return state.contacts.filter((v) => v.lastName.includes(searchKey));
    }
    return state.contacts;
  }, [state.contacts, searchKey]);

  return (
    <div className="container pt-8 m-auto shadow-md px-4 py-8 bg-slate-100 sm:px-12 min-h-screen">
      <p className="text-center font-bold text-2xl mb-10">Phone Book App</p>
      <div className="flex justify-between items-center mb-10">
        <p className="font-bold text-xl">Contacts</p>
        <button
          className="bg-blue-600 text-white p-2 rounded-lg"
          onClick={() => navigate("/create")}
        >
          + Add Contact
        </button>
      </div>
      <SearchInput value={searchKey} setValue={(val) => setSearchKey(val)} />
      {contacts.length > 0 ? (
        <div className="divide-y rounded-lg border border-gray-300">
          {contacts.map((contact) => (
            <ContactRow contact={contact} key={contact._id} />
          ))}
        </div>
      ) : (
        <div className="text-center py-4 text-gray-500">No contacts</div>
      )}
    </div>
  );
};

export default ContactList;
