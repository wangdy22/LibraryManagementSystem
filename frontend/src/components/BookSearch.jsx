import React, { useEffect, useState } from "react";
import api from "../services/api.js";
import { useNavigate } from "react-router-dom";
import "../styles/BookSearch.css";

/**
 * Search books by title and borrow/return them (with user-specific ID)
 */
export default function BookSearch() {
  const [q, setQ] = useState("");
  const [results, setResults] = useState([]);
  const [userId, setUserId] = useState(null); // Added state for userId
  const navigate = useNavigate();

  // Get userId from sessionStorage when the component mounts
  useEffect(() => {
    const storedUserId = sessionStorage.getItem("userId");
    if (storedUserId) {
      setUserId(storedUserId); // Set userId from sessionStorage
    } else {
      navigate("/"); // Redirect to login page if no userId is found
    }
  }, [navigate]);

  const logout = () => {
    sessionStorage.removeItem("userId"); // Clear sessionStorage on logout
    navigate("/"); // Redirect to login
  };

  const search = async () => {
    const res = await api.get("/books/search", { params: { title: q } });
    setResults(res.data);
  };

  const borrow = async (bookId) => {
    await api.post(`/borrow/${userId}/${bookId}`);
    await search();
  };

  const returnBook = async (bookId) => {
    await api.post(`/borrow/return/${bookId}`);
    await search();
  };

  useEffect(() => {
    if (q === "") setResults([]);
  }, [q]);

  return (
    <div className="card">
      <button className="logout" onClick={logout}>
        Logout
      </button>
      <h2>Search & Borrow</h2>
      <div className="toolbar">
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search by title..."
        />
        <button onClick={search}>Search</button>
      </div>

      <div className="list">
        {results.map((b) => (
          <div key={b.id} className="item">
            <div>
              <div className="title">{b.title}</div>
              <div className="author">by {b.author}</div>
            </div>
            <div className="actions">
              <span
                className={
                  "status " +
                  (b.status === "BORROWED" ? "borrowed" : "available")
                }
              >
                {b.status}
              </span>
              {b.status === "AVAILABLE" ? (
                <button onClick={() => borrow(b.id)}>Borrow</button>
              ) : (
                <button className="secondary" onClick={() => returnBook(b.id)}>
                  Return
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
