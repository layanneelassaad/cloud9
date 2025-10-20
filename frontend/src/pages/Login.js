import React from "react";
import { auth, provider } from "../api/firebase";
import { signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      console.log("User Info:", result.user);
      
      // Pass the user's email to the login function
      login(result.user.email);
  
      navigate("/"); // Redirect to the home or the desired page
    } catch (error) {
      console.error("Error logging in:", error.message);
    }
  };
  

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Welcome to Columbia Events Management</h1>
      <button style={styles.button} onClick={handleLogin}>
        Login with Google
      </button>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    backgroundColor: "#f5f5f5",
  },
  title: {
    marginBottom: "20px",
    fontSize: "2rem",
    color: "#333",
  },
  button: {
    padding: "10px 20px",
    fontSize: "1rem",
    color: "white",
    backgroundColor: "#4285f4",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
};

export default Login;