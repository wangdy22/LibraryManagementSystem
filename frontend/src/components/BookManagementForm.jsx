import React, { useState, useEffect } from "react";
import api from "../services/api.js";
import { useNavigate } from "react-router-dom";
import "../styles/BookManagementForm.css";

export default function BookManagementForm() {
  const [book, setBook] = useState({ title: "", author: "" });
  const [errors, setErrors] = useState({});
  const [books, setBooks] = useState([]); // array of book objects to display
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [userId, setUserId] = useState(null); // State to store userId
  const navigate = useNavigate();

  // Fetch userId from sessionStorage
  useEffect(() => {
    const storedUserId = sessionStorage.getItem("userId");
    if (storedUserId) {
      setUserId(storedUserId);
    } else {
      navigate("/"); // Redirect to login if userId is not found
    }

    fetchBooks(); // Fetch books when the component mounts
  }, [navigate]);

  const fetchBooks = async () => {
    try {
      const response = await api.get("/books/all");
      setBooks(response.data);
    } catch (error) {
      console.error("Error fetching books:", error);
    }
  };

  const logout = () => {
    sessionStorage.removeItem("userId"); // Remove userId from sessionStorage on logout
    navigate("/"); // Redirect to login page
  };

  const validate = () => {
    const e = {};
    if (!book.title) e.title = "Title required";
    if (!book.author) e.author = "Author required";
    return e;
  };

  const submit = async (ev) => {
    ev.preventDefault();
    const e = validate();
    setErrors(e);
    if (Object.keys(e).length) return;

    try {
      await api.post("/books/add", book);
      setSuccessMessage("Book added successfully!");
      setErrorMessage("");
      setBook({ title: "", author: "" });
      fetchBooks(); // Refresh the list after adding
    } catch (error) {
      setErrorMessage("Failed to add book");
      setSuccessMessage("");
    }
  };

  return (
    <div className="card">
      <button className="logout" onClick={logout}>
        Logout
      </button>
      <h2>Book Management</h2>
      <form onSubmit={submit} className="form">
        <div className="row">
          <label>Title</label>
          <input
            value={book.title}
            onChange={(e) => setBook({ ...book, title: e.target.value })}
            placeholder="Clean Code"
          />
          {errors.title && <span className="error">{errors.title}</span>}
        </div>
        <div className="row">
          <label>Author</label>
          <input
            value={book.author}
            onChange={(e) => setBook({ ...book, author: e.target.value })}
            placeholder="Robert C. Martin"
          />
          {errors.author && <span className="error">{errors.author}</span>}
        </div>
        <button type="submit">Add Book</button>
      </form>

      {/* Inline success and error messages */}
      {successMessage && <p className="hint">{successMessage}</p>}
      {errorMessage && <p className="hint">{errorMessage}</p>}

      <h3>Book List</h3>
      <ul>
        {books.length === 0 && <li>No books available</li>}
        {books.map((b, i) => (
          <li key={i}>
            <strong>{b.title}</strong> by {b.author}
          </li>
        ))}
      </ul>
    </div>
  );
}
