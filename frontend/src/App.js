import React from "react";
import { BrowserRouter, Routes, Outlet, Route } from "react-router-dom";
import ContactList from "./pages/ContactList";
import CreateContact from "./pages/CreateContact";
import EditContact from "./pages/EditContact";
import { Provider as ContactContextProvider } from "./context/ContactContext";

function App() {
  return (
    <ContactContextProvider>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<ContactList />} />
          <Route path="/create" element={<CreateContact />} />
          <Route path="/edit/:id" element={<EditContact />} />
        </Routes>
      </BrowserRouter>
    </ContactContextProvider>
  );
}

export default App;
