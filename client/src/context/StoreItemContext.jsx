import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export const StoreItemContext = createContext(null);

const StoreContextProvider = (props) => {
  const url = import.meta.env.VITE_BASE_URL;
  const [cartItems, setCartItem] = useState({});
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [foodList, setFoodList] = useState([]);

  const addToCart = async (itemId) => {
    if (token) {
      try {
        const res = await axios.post(
          `${url}/api/cart/add`,
          { itemId },
          { headers: { token } }
        );
        if (res.data.success) {
          setCartItem((prev) =>
            !prev[itemId]
              ? { ...prev, [itemId]: 1 }
              : { ...prev, [itemId]: prev[itemId] + 1 }
          );
        }
      } catch (error) {}
    } else {
      toast.info("Please log in to add items to your cart");
    }
  };

  const removeFromCart = async (itemId) => {
    if (token) {
      try {
        const res = await axios.post(
          `${url}/api/cart/remove`,
          { itemId },
          { headers: { token } }
        );
        if (res.data.success) {
          setCartItem((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
        }
      } catch (error) {}
    } else {
      toast.info("Please log in to add items to your cart");
    }
  };

  const loadCartData = async () => {
    const response = await axios.post(
      `${url}/api/cart/getcart`,
      {},
      { headers: { token } }
    );

    if(response.data.success){
      setCartItem(response.data.cartData)
    }
  };

  const getTotalCartAmount = () => {
    let total = 0;
    for (const itemId in cartItems) {
      if (cartItems[itemId] > 0) {
        const item = foodList.find((item) => item._id === itemId);
        total += item.price * cartItems[itemId];
      }
    }
    return total;
  };

  const fetchFoodList = async () => {
    const res = await axios.get(`${url}/api/food/getall`);
    if (res.data.success) {
      setFoodList(res.data.data);
    }
  };

  useEffect(() => {
    async function loadData() {
      await fetchFoodList();
      await loadCartData();
    }
    loadData();
  }, []);

  const contextValue = {
    cartItems,
    setCartItem,
    addToCart,
    removeFromCart,
    getTotalCartAmount,
    token,
    setToken,
    foodList,
    url,
  };

  return (
    <StoreItemContext.Provider value={contextValue}>
      {props.children}
    </StoreItemContext.Provider>
  );
};

export default StoreContextProvider;
