import React from "react";
import "./ExploreMenu.css";
import { menu_list } from "../../Utils/json";

const ExploreMenu = ({category,setCategory}) => {
  return (
    <div className="explore-menu" id="explore-menu">
      <h1>Explore Our Menu</h1>
      <p className="explore-menu-text">
        Choose from a diverse menu featuring a detectable array of dishes
        crafted with finest ingredients and expertise. Our mission is to satify
        your cravings and elevate your dining experience, one delicioous meal at
        a time.
      </p>
      <div className="explore-menu-list">
        {menu_list?.map((item, index) => {
          return (
            <div onClick={()=>setCategory((prev)=>prev===item?.menu_name?'all':item.menu_name)} className="explore-menu-item" key={index}>
              <img className={category===item?.menu_name && 'active'} src={item.menu_image} alt="" />
              <p>{item.menu_name}</p>
            </div>
          );
        })}
      </div>
      <hr />
    </div>
  );
};

export default ExploreMenu;
