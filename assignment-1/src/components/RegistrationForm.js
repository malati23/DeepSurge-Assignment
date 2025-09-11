import React, { useState } from "react";

const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});

  // handle typing
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({ ...prev, [name]: value }));
    // clear this field's error as the user types
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  // validation rules
  const validate = () => {
    const newErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!formData.email.includes("@") || !formData.email.includes(".")) {
      // simple format check as requested
      newErrors.email = "Enter a valid email address";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    }

    return newErrors;
  };

  // submit
  const handleSubmit = (e) => {
    e.preventDefault();

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    // success: log data
    console.log("Registration Data:", formData);

    // optional: save to localStorage (simulated persistence)
    localStorage.setItem("registeredUser", JSON.stringify(formData));

    // reset form
    setFormData({ fullName: "", email: "", password: "" });

    alert("Registration successful!");
  };

  // a tiny helper for consistent input styles
  const inputStyle = {
    display: "block",
    width: "100%",
    padding: "8px",
    border: "1px solid #ccc",
    borderRadius: "6px",
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        maxWidth: 420,
        margin: "2rem auto",
        padding: "1.25rem",
        border: "1px solid #e5e5e5",
        borderRadius: "12px",
        background: "#fafafa",
      }}
    >
      <h2 style={{ textAlign: "center", marginBottom: 20 }}>Registration Form</h2>

      {/* Full Name */}
      <div style={{ marginBottom: 14 }}>
        <label htmlFor="fullName">Full Name</label>
        <input
          id="fullName"
          name="fullName"
          type="text"
          value={formData.fullName}
          onChange={handleChange}
          style={inputStyle}
          aria-invalid={Boolean(errors.fullName)}
        />
        {errors.fullName && (
          <span style={{ color: "red", fontSize: 12 }}>{errors.fullName}</span>
        )}
      </div>

      {/* Email */}
      <div style={{ marginBottom: 14 }}>
        <label htmlFor="email">Email Address</label>
        <input
          id="email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          style={inputStyle}
          aria-invalid={Boolean(errors.email)}
        />
        {errors.email && (
          <span style={{ color: "red", fontSize: 12 }}>{errors.email}</span>
        )}
      </div>

      {/* Password */}
      <div style={{ marginBottom: 14 }}>
        <label htmlFor="password">Password</label>
        <input
          id="password"
          name="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
          style={inputStyle}
          aria-invalid={Boolean(errors.password)}
        />
      {errors.password && (
          <span style={{ color: "red", fontSize: 12 }}>{errors.password}</span>
        )}
      </div>

      <button
        type="submit"
        style={{
          width: "100%",
          padding: "10px 14px",
          border: "none",
          borderRadius: "8px",
          background: "#007bff",
          color: "white",
          cursor: "pointer",
          fontWeight: 600,
        }}
      >
        Register
      </button>
    </form>
  );
};

export default RegistrationForm;
