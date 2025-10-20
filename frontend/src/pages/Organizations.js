// src/pages/Organizations.js
import React, { useState, useEffect } from "react";
import { fetchOrganizations } from "../api/OrganizationApi";
import OrganizationCard from "../components/OrganizationCard";
import { Link } from "react-router-dom";

const Organizations = () => {
  const [organizations, setOrganizations] = useState([]);
  const [filteredOrganizations, setFilteredOrganizations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const loadOrganizations = async () => {
      try {
        console.log("Loading organizations...");
        const baseOrganizations = await fetchOrganizations();

        if (!Array.isArray(baseOrganizations)) {
          throw new Error("API returned data in an unexpected format. Expected an array.");
        }

        // Sort by name alphabetically
        const sortedOrganizations = baseOrganizations.sort((a, b) => a.name.localeCompare(b.name));
        
        setOrganizations(sortedOrganizations);
        setFilteredOrganizations(sortedOrganizations);
        setLoading(false);
      } catch (err) {
        console.error("Failed to fetch Organizations:", err);
        setError("Unable to load Organizations. Please try again later.");
        setLoading(false);
      }
    };

    loadOrganizations();
  }, []);

  const handleSearch = (organization) => {
    const term = organization.target.value.toLowerCase();
    setSearchTerm(term);

    if (!term) {
      setFilteredOrganizations(organizations);
      return;
    }

    const filtered = organizations.filter(
      (org) => org.name && org.name.toLowerCase().includes(term)
    );
    setFilteredOrganizations(filtered);
  };

  if (loading) {
    return (
      <div style={styles.spinnerContainer}>
        <div className="spinner"></div>
      </div>
    );
  }

  if (error) {
    return <div style={styles.error}>{error}</div>;
  }

  return (
    <div style={styles.pageWrapper}>
      <div style={styles.container}>
        <h2 style={styles.heading}>Organizations</h2>
        <input
          type="text"
          placeholder="Search Organizations by name..."
          value={searchTerm}
          onChange={handleSearch}
          style={styles.searchBar}
        />
        {filteredOrganizations.length === 0 ? (
          <p style={styles.noOrganizations}>No Organizations match your search.</p>
        ) : (
          <div style={styles.orgGrid}>
            {filteredOrganizations.map((organization) => (
              <Link to={`/organization/${organization.id}`} key={organization.id} style={styles.link}>
                <OrganizationCard organization={organization} />
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

const styles = {
  pageWrapper: {
    minHeight: "100vh",
    background: "linear-gradient(to bottom right, #f9f9f9, #eef3f8)",
    fontFamily: "'Roboto', sans-serif",
  },
  container: {
    padding: "40px 20px",
    maxWidth: "1200px",
    margin: "0 auto",
  },
  heading: {
    textAlign: "center",
    marginBottom: "30px",
    fontSize: "3rem",
    color: "#333",
    fontWeight: "700",
    letterSpacing: "1px",
    textShadow: "0px 1px 2px rgba(0,0,0,0.1)",
  },
  searchBar: {
    width: "100%",
    padding: "12px 15px",
    marginBottom: "30px",
    fontSize: "1rem",
    border: "1px solid #ccc",
    borderRadius: "8px",
    boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
    outline: "none",
  },
  orgGrid: {
    display: "flex",
    flexWrap: "wrap",
    gap: "30px",
    justifyContent: "center",
  },
  spinnerContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    background: "#f0f2f5",
  },
  error: {
    textAlign: "center",
    color: "#d9534f",
    fontSize: "1.5rem",
    marginTop: "50px",
  },
  noOrganizations: {
    textAlign: "center",
    color: "#555",
    fontSize: "1.2rem",
    marginTop: "20px",
  },
  link: {
    textDecoration: "none",
    color: "inherit",
  },
};

export default Organizations;
