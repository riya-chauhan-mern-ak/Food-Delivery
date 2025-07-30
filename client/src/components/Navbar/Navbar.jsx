import React, { useContext, useEffect, useState } from "react";
import "./Navbar.css";
import { assets } from "../../assets/assets";
import { Link, useNavigate } from "react-router-dom";
import { StoreItemContext } from "../../context/StoreItemContext";
import { toast } from "react-toastify";

const Navbar = ({ setLoginPopup }) => {
  const navigate = useNavigate();
  const [menu, setMenu] = useState("home");
  const { getTotalCartAmount, token, setToken } = useContext(StoreItemContext);
  const handleNavigate = (link, id) => {
    setMenu(link);

    const el = document.querySelector(id);
    const yOffset = -90;
    const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;

    window.scrollTo({ top: y, behavior: "smooth" });
  };

  const logoutHandler = () => {
    setToken("");
    localStorage.removeItem("token");
    navigate("/");
    toast.success("Logged out successfully.");
  };

  useEffect(() => {
    if (window.location.pathname !== "/") {
      setMenu(null);
    }
  });

  return (
    <div className="navbar">
      <Link to="/">
        <img src={assets.logo} alt="" className="logo" />
      </Link>
      <ul className="navbar-menu">
        <Link
          to={"/"}
          className={menu === "home" && "active"}
          onClick={() => handleNavigate("home", "#header")}
        >
          Home
        </Link>
        <li
          className={menu === "menu" && "active"}
          onClick={() => handleNavigate("menu", "#explore-menu")}
        >
          Menu
        </li>
        <li
          className={menu === "mobile-app" && "active"}
          onClick={() => handleNavigate("mobile-app", "#app-download")}
        >
          Mobile-app
        </li>
        <li
          className={menu === "contact-us" && "active"}
          onClick={() => handleNavigate("contact-us", "#footer")}
        >
          Contact us
        </li>
      </ul>
      <div className="navbar-right">
        <img src={assets.search_icon} alt="" />
        <div className="navbar-search-icon">
          <Link to="/cart">
            {" "}
            <img src={assets.basket_icon} alt="" />
          </Link>
          <div className={getTotalCartAmount() > 0 && "dot"}></div>
        </div>
        {!token ? (
          <button onClick={() => setLoginPopup(true)}>Sign Up</button>
        ) : (
          <div className="navbar-profile">
            <img src={assets.profile_icon} alt="" />
            <ul className="nav-profile-dropdown">
              <li onClick={() => navigate("/order")}>
                <img src={assets.bag_icon} alt="" />
                <p>Orders</p>
              </li>
              <hr />
              <li onClick={logoutHandler}>
                <img src={assets.logout_icon} alt="" />
                <p>Logout</p>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
