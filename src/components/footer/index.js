import React from "react";
import "./footer.css";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <p>&copy; {new Date().getFullYear()} Task Manager. All rights reserved.</p>
        <div className="footer-links">
          <Link to="/tasks">Home</Link>
          <Link to="/profile">Profile</Link>
          <a href="https://github.com/DaveedGangi" target="_blank" rel="noreferrer">GitHub</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
