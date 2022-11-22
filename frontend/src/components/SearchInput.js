import React from "react";

const SearchInput = ({ value, setValue }) => {
  return (
    <input
      id="firstName"
      className="rounded-lg border p-2 w-full mb-8"
      type="text"
      placeholder="Search for contact by last name..."
      value={value}
      onChange={(e) => setValue(e.target.value)}
    />
  );
};

export default SearchInput;
