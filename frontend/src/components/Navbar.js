import React from "react";
import { Link } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa"; // Importing a user icon
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  //console.log("Navbar rendered");
  //const { isAuthenticated, logout } = useAuth();
  const auth = useAuth();

  console.log("Auth Context:", auth);

  const { isAuthenticated, logout } = auth;

  return (
  <nav style={styles.navbar}>
    {/* Left Section: HOME */}
    <div>
      <Link to="/" style={{ ...styles.link, ...styles.home }}>
        HOME
      </Link>
    </div>

    {/* Right Section: Navigation Links and User Icon */}
    <div style={styles.navLinks}>
      <Link to="/events" style={styles.link}>
        Events
      </Link>
      <Link to="/organizations" style={styles.link}>
        Organizations
      </Link>
      <Link to="/calendar" style={styles.link}>
        My Calendar
      </Link>
      <Link to="/profile" style={styles.icon}>
        <FaUserCircle size={24} /> {/* User Icon */}
      </Link>
      {isAuthenticated ? (
        <button style={styles.button} onClick={logout}>
          Logout
        </button>
      ) : (
        <Link to="/login" style={styles.link}>
          Login
        </Link>
      )}
    </div>
  </nav>
  );
};

const styles = {
  navbar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "10px 20px",
    backgroundColor: "#333", // Dark background color
    borderBottom: "3px solid #007bff", // Accent color underline
    boxShadow: "0px 2px 4px rgba(0,0,0,0.1)", // Subtle shadow
  },
  home: {
    fontSize: "1.5rem",
    fontWeight: "bold",
    letterSpacing: "1px",
    color: "#007bff", // Accent color
  },
  navLinks: {
    display: "flex",
    alignItems: "center",
    gap: "20px", // Space between links
  },
  link: {
    color: "#fff", // White text color
    textDecoration: "none",
    fontSize: "1rem",
    transition: "color 0.3s ease",
  },
  icon: {
    color: "#fff",
    transition: "color 0.3s ease",
  },
  linkHover: {
    color: "#007bff", // Accent color on hover
  },
};

export default Navbar;
