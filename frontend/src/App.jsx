import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginForm from './components/LoginForm.jsx';
import UserRegistrationForm from "./components/UserRegistrationForm.jsx";
import BookManagementForm from "./components/BookManagementForm.jsx";
import BookSearch from "./components/BookSearch.jsx";

// Global layout styling component
function PageLayout({ children }) {
  return (
    <div
      style={{
        fontFamily: "Arial",
        padding: "20px",
        maxWidth: "500px",
        margin: "0 auto"
      }}
    >
      <h1>Library Management System</h1>
      <p style={{ color: "#a9abacff" }}>
        Registration, Book Management, Search, Borrow/Return
      </p>
      {children}
    </div>
  );
}

// Main App component with routing
export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={
          <PageLayout>
            <LoginForm />
          </PageLayout>
        } />
        <Route path="/register" element={
          <PageLayout>
            <UserRegistrationForm />
          </PageLayout>
        } />
        <Route path="/bookmanagement" element={
          <PageLayout>
            <BookManagementForm />
          </PageLayout>
        } />
        <Route path="/booklist" element={
          <PageLayout>
            <BookSearch />
          </PageLayout>
        } />
      </Routes>
    </Router>
  );
}
