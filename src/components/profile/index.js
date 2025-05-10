import React from "react";
import { useHistory } from "react-router-dom";
import Cookies from "js-cookie";

import "./profile.css";

const Profile = () => {
  const history = useHistory();

  const handleLogout = () => {
    Cookies.remove("jwtOritso");
    history.push("/login"); // or "/" based on your app
  };

  return (
    <div className="profile-container">
      <h2>Welcome to your profile</h2>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Profile;
