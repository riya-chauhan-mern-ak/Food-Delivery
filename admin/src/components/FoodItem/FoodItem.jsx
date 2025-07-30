import React from 'react'
import { assets } from '../../assets/assets';
import './FoodItem.css';

const FoodItem = ({id,image,name,description,category,price}) => {
    const img = `${import.meta.env.VITE_BASE_URL}/images/${image}`;
  return (
    <div className="food-item" id={id}>
          <div className="food-item-img-container">
            <img src={img} className="food-item-image" alt="" />
          </div>
          <div className="food-item-info">
            <div className="food-item-name-rating">
              <p>{name}</p>
              <img src={assets.rating_starts} alt="" />
            </div>
            <p className="food-item-desc">{description}</p>
            <p className="food-item-cat"><b>Category :</b> {category}</p>
            <p className="food-item-price">${price}</p>
          </div>
        </div>
  )
}

export default FoodItem
