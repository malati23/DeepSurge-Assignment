import React, { useState, useEffect } from "react";

const ContactManager = () => {
  // State to store form inputs
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");

  // State to store contacts
  const [contacts, setContacts] = useState([]);

  // State for search input
  const [searchTerm, setSearchTerm] = useState("");

  // Load contacts from localStorage on mount
  useEffect(() => {
    const savedContacts = localStorage.getItem("contacts");
    if (savedContacts) setContacts(JSON.parse(savedContacts));
  }, []);

  // Save contacts to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("contacts", JSON.stringify(contacts));
  }, [contacts]);

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Validation
    if (!fullName || !phone) {
      alert("Please fill in all fields.");
      return;
    }

    if (!/^\d+$/.test(phone)) {
      alert("Phone number must contain digits only.");
      return;
    }

    const newContact = { id: Date.now(), fullName, phone };
    setContacts([...contacts, newContact]);

    // Clear form
    setFullName("");
    setPhone("");
  };

  // Handle delete contact
  const handleDelete = (id) => {
    setContacts(contacts.filter((contact) => contact.id !== id));
  };

  // Filter contacts dynamically
  const filteredContacts = contacts.filter(
    (contact) =>
      contact.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.phone.includes(searchTerm)
  );

  return (
    <div style={{ maxWidth: "400px", margin: "auto", padding: "20px" }}>
      <h2>Contact Manager</h2>

      {/* Form */}
      <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
        <div>
          <input
            type="text"
            placeholder="Full Name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            style={{ width: "100%", padding: "8px", marginBottom: "10px" }}
          />
        </div>
        <div>
          <input
            type="text"
            placeholder="Phone Number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            style={{ width: "100%", padding: "8px", marginBottom: "10px" }}
          />
        </div>
        <button type="submit" style={{ width: "100%", padding: "10px" }}>
          Add Contact
        </button>
      </form>

      {/* Search Input */}
      <input
        type="text"
        placeholder="Search contacts..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{ width: "100%", padding: "8px", marginBottom: "20px" }}
      />

      {/* Contacts List */}
      <ul style={{ listStyle: "none", padding: 0 }}>
        {filteredContacts.map((contact) => (
          <li
            key={contact.id}
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: "10px",
              border: "1px solid #ccc",
              padding: "10px",
              borderRadius: "5px",
            }}
          >
            <span>
              {contact.fullName} - {contact.phone}
            </span>
            <button
              onClick={() => handleDelete(contact.id)}
              style={{ background: "red", color: "white", border: "none", padding: "5px 10px", borderRadius: "5px" }}
            >
              Delete
            </button>
          </li>
        ))}
        {filteredContacts.length === 0 && <p>No contacts found.</p>}
      </ul>
    </div>
  );
};

export default ContactManager;
