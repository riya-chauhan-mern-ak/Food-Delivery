import { createContext, useEffect, useState } from "react";
import { food_list } from "../Utils/json";

export const StoreItemContext = createContext(null);

const StoreContextProvider = (props) => {
  const [cartItems, setCartItem] = useState({});

  const addToCart = (itemId) => {
    if (!cartItems[itemId]) {
      setCartItem((prev) => ({ ...prev, [itemId]: 1 }));
    } else {
      setCartItem((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
    }
  };

  const removeFromCart = (itemId) => {
    setCartItem((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
  };

  const getTotalCartAmount = () => {
    let total = 0;
    for (const itemId in cartItems) {
      if (cartItems[itemId] > 0) {
        const item = food_list.find((item) => item._id === itemId);
        total += item.price * cartItems[itemId];
      }
    }
    return total;
  }

  const contextValue = {
    food_list,
    cartItems,
    setCartItem,
    addToCart,
    removeFromCart,
    getTotalCartAmount
  };


  return (
    <StoreItemContext.Provider value={contextValue}>
      {props.children}
    </StoreItemContext.Provider>
  );
};

export default StoreContextProvider;
