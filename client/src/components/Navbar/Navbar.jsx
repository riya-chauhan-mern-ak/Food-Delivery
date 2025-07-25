import React, { useContext, useEffect, useState } from "react";
import "./Navbar.css";
import { assets } from "../../assets/assets";
import { Link } from "react-router-dom";
import { StoreItemContext } from "../../context/StoreItemContext";

const Navbar = ({ setLoginPopup }) => {
  const [menu, setMenu] = useState("home");
  const {getTotalCartAmount} = useContext(StoreItemContext)
  const handleNavigate = (link, id) => {
    setMenu(link);
    // document
    //   .querySelector(id)
    //   .scrollIntoView({
    //     behavior: "smooth",
    //     block: "center",
    //     inline: "nearest",
    //   });

    const el = document.querySelector(id);
    const yOffset = -90;
    const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;

    window.scrollTo({ top: y, behavior: "smooth" });
  };

  useEffect(()=>{
    if (window.location.pathname !== "/") {
      setMenu(null);
    }
  })

  return (
    <div className="navbar">
      <Link to='/'><img src={assets.logo} alt="" className="logo" /></Link>
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
          <div className={getTotalCartAmount() > 0 && 'dot'}></div>
        </div>
        <button onClick={() => setLoginPopup(true)}>Sign In</button>
      </div>
    </div>
  );
};

export default Navbar;
