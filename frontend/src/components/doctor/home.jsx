import React from "react";

const ComingSoon = () => {
  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>🚧 Coming Soon 🚧</h1>
      <p style={styles.text}>We’re working hard to bring you this feature.</p>
    </div>
  );
};

const styles = {
  container: {
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f9fafb",
    color: "#333",
    fontFamily: "Arial, sans-serif",
  },
  heading: {
    fontSize: "2rem",
    marginBottom: "10px",
  },
  text: {
    fontSize: "1.2rem",
    color: "#555",
  },
};

export default ComingSoon;
