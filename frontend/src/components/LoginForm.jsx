import React, { useState } from "react";
import api from "../services/api.js";
import { useNavigate } from "react-router-dom";
import "../styles/LoginForm.css";

const ROLE_MEMBER = "member";
const ROLE_LIBRARIAN = "librarian";

export default function LoginForm() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: "",
    password: "",
    role: ROLE_MEMBER,
  });
  const [errorMessage, setErrorMessage] = useState("");

  const validate = () => {
    if (!form.email || !form.password || !form.role) {
      setErrorMessage("Please enter your email and password");
      return false;
    }

    return true;
  };

  const handleLogin = async (ev) => {
    ev.preventDefault();
    setErrorMessage("");

    if (!validate()) return;

    try {
      // Use Axios to POST login credentials
      const response = await api.post("/users/login", {
        email: form.email,
        password: form.password,
      });
      
      const data = await response.data; // Extract response body from Axios response object
      const welcomeMsg = `Welcome, ${form.email} (${form.role})!`;

      // Store userId in sessionStorage
      sessionStorage.setItem("userId", data.id);

      // Redirect based on role
      if (form.role === ROLE_LIBRARIAN) {
        navigate("/bookmanagement", {
          state: { message: welcomeMsg, userId: data.id },
        });
      } else {
        navigate("/booklist", {
          state: { message: welcomeMsg, userId: data.id },
        });
      }
    } catch (err) {
      // console.error("Login error:", err);
      setErrorMessage(err.response.data.error); // Display server error from Axios response
    }
  };

  const handleRegister = () => {
    setErrorMessage("");
    navigate("/register");
  };

  return (
    <div className="card">
      <h2>Login</h2>
      <form onSubmit={handleLogin} className="form">
        <div className="row">
          <label>Email</label>
          <input
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
        </div>

        <div className="row">
          <label>Password</label>
          <input
            type="password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />
        </div>

        <div className="row">
          <label>Role</label>
          <select
            value={form.role}
            onChange={(e) => setForm({ ...form, role: e.target.value })}
          >
            <option value={ROLE_MEMBER}>Member</option>
            <option value={ROLE_LIBRARIAN}>Librarian</option>
          </select>
        </div>

        <div className="button-group">
          <button type="submit">Login</button>
          <button type="button" onClick={handleRegister}>
            Register
          </button>
        </div>
      </form>

      {errorMessage && (
        <p className="hint error">
          <b>{errorMessage}</b>
        </p>
      )}
    </div>
  );
}
