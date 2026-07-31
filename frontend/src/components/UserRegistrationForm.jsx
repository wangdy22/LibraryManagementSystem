import React, { useState } from "react";
import api from "../services/api.js";
import { Link } from "react-router-dom";
import "../styles/UserRegistrationForm.css";

/**
 * User Registration form
 * - Controlled inputs for name/email/password
 * - Client-side validation on submit (required fields, email format, password length)
 * - Displays validation errors and backend errors (e.g., email already registered)
 */
export default function UserRegistrationForm() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [userId, setUserId] = useState(null);
  const [registeredName, setRegisteredName] = useState(""); // Store name after registration

  // Validate fields on submit
  const validate = () => {
    const e = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!form.name) {
      e.name = "Name is required";
    }

    if (!form.email) {
      e.email = "Email is required";
    } else if (!emailRegex.test(form.email)) {
      e.email = "Email must be valid";
    }

    if (!form.password) {
      e.password = "Password is required";
    } else if (form.password.length < 8) {
      e.password = "Password must be at least 8 characters long";
    }

    return e;
  };

  const submit = async (ev) => {
    ev.preventDefault();
    const e = validate();
    setErrors(e);
    if (Object.keys(e).length) return;

    try {
      const res = await api.post("/users/register", form);
      setUserId(res.data.id); // show created ID to the user
      setRegisteredName(form.name); // store the name before clearing
      setForm({ name: "", email: "", password: "" }); // clear form fields
      setErrors({});
    } catch (err) {
      const backendMessage = err.response?.data?.error || err.message;

      if (backendMessage.includes("Email already registered")) {
        setErrors({ email: backendMessage });
      } else {
        alert("Registration failed: " + backendMessage);
      }
    }
  };

  const clearError = (field) => {
    if (errors[field]) {
      const { [field]: _, ...rest } = errors;
      setErrors(rest);
    }
  };

  return (
    <div className="card">
      <h2>User Registration</h2>
      <form onSubmit={submit} className="form">
        <div className="row">
          <label>Name</label>
          <input
            value={form.name}
            onChange={(e) => {
              setForm({ ...form, name: e.target.value });
              clearError("name");
            }}
            placeholder="Jane Doe"
          />
          {errors.name && <span className="error">{errors.name}</span>}
        </div>
        <div className="row">
          <label>Email</label>
          <input
            value={form.email}
            onChange={(e) => {
              setForm({ ...form, email: e.target.value });
              clearError("email");
            }}
            placeholder="jane@example.com"
          />
          {errors.email && <span className="error">{errors.email}</span>}
        </div>
        <div className="row">
          <label>Password</label>
          <input
            type="password"
            value={form.password}
            onChange={(e) => {
              setForm({ ...form, password: e.target.value });
              clearError("password");
            }}
            placeholder="••••••••"
          />
          {errors.password && <span className="error">{errors.password}</span>}
        </div>
        <button type="submit">Register</button>
        <Link to="/" className="secondary-button">
          Already have an account? Log in
        </Link>
      </form>

      {userId && (
        <p className="hint">
          Registered successfully, <b>{registeredName}</b>.
        </p>
      )}
    </div>
  );
}
