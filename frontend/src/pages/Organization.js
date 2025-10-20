import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function Organization() {
  const { clubName } = useParams();
  const [club, setClub] = useState(null);

  useEffect(() => {
    axios
      .get("https://cors-anywhere.herokuapp.com/http:/localhost:8002/organizations/?skip=0&limit=100")
      .then((response) => {
        console.log("Fetched organizations:", response.data); // Debug: Log the fetched data
        const clubDetails = response.data.find((org) => org.name === decodeURIComponent(clubName));
        setClub(clubDetails || null);
      })
      .catch((error) => {
        console.error("Error fetching organization:", error);
      });
  }, [clubName]);

  if (!club) {
    return <div style={{ textAlign: "center", marginTop: "50px" }}>Organization not found</div>;
  }

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <div style={styles.logo}></div>
        <div>
          <h2>{club.name}</h2>
          <p>{club.description}</p>
          <p>
            <strong>Contact Email:</strong> {club.email || "N/A"}
          </p>
          <p>
            <strong>Website:</strong>{" "}
            <a href={club.website} target="_blank" rel="noopener noreferrer">
              {club.website || "N/A"}
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: { padding: "20px" },
  header: { display: "flex", alignItems: "center", marginBottom: "20px" },
  logo: {
    width: "150px",
    height: "150px",
    backgroundColor: "#ddd",
    borderRadius: "50%",
    marginRight: "20px",
  },
};

export default Organization;
