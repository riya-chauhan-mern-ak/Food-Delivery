import React, { useContext } from "react";
import "./FoodDisplay.css";
import FoodItem from "../FoodItem/FoodItem";
import { StoreItemContext } from "../../context/StoreItemContext";

const FoodDisplay = ({ category }) => {
  const { foodList } = useContext(StoreItemContext);

  return (
    <div className="food-display" id="food-display">
      <h2>Top dishes near your</h2>
      <div className="food-display-list">
        {foodList?.map((item, index) => {
          if(category=='all' || category === item.category){
            return (
              <FoodItem
                key={index}
                id={item?._id}
                name={item?.name}
                price={item?.price}
                image={item?.image}
                description={item?.description}
              />
            );
          }
        })}
      </div>
    </div>
  );
};

export default FoodDisplay;
