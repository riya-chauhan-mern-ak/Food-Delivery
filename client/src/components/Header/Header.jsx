import React from "react";
import "./Header.css";

const Header = () => {
  return (
    <div className="header" id="header">
      <div className="header-contents">
        <h2>Order your favourite food here</h2>
        <p>
          Choose from a diverse menu featuring a detectable array of dishes
          crafted with finest ingredients and expertise. Our mission is to
          satify your cravings and elevate your dining experience, one
          delicioous meal at a time.
        </p>
        <button>View Menu</button>
      </div>
    </div>
  );
};

export default Header;
