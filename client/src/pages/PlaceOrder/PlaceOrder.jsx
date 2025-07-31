import React, { useContext, useEffect, useState } from "react";
import "./PlaceOrder.css";
import { StoreItemContext } from "../../context/StoreItemContext";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const PlaceOrder = () => {
  const navigate = useNavigate();
  const { getTotalCartAmount, token, foodList, cartItems, url } = useContext(StoreItemContext);

  const [data,setData] = useState({
    firstName:'',
    lastName:'',
    email:'',
    street:'',
    city:'',
    state:'',
    zipcode:'',
    country:'',
    phone:'',
  })

  const onChangeHandler = (e) => {
    const {name,value} = e.target;

    setData((prev)=>({...prev,[name]:value}))
  }

  const cartPlaceOrder = async(e) => {
    e.preventDefault();
    let orderItem = [];
    foodList.map((item)=>{
      if(cartItems[item._id]>0){
        let itemInfo = item;
        itemInfo.quantity = cartItems[item._id];
        orderItem.push(itemInfo)
      }
    })

    let orderData = {
      address:data,
      items:orderItem,
      amount:getTotalCartAmount()+2,
    }

    let response = await axios.post(`${url}/api/order/place`,orderData,{headers:{token}});

    if(response.data.success){
      const {session_url} = response.data;
      window.location.replace(session_url);
    }else{
      toast.error('Error')
    }
  }

  useEffect(()=>{
    if(!token || getTotalCartAmount() === 0){
      navigate('/cart')
    }
  },[token])

  return (
    <div>
      <form className="place-order" onSubmit={cartPlaceOrder}>
        <div className="place-order-left">
          <p className="title">Delivery Information</p>
          <div className="multi-fields">
            <input type="text" placeholder="First Name" name="firstName" value={data.firstName} onChange={onChangeHandler} />
            <input type="text" placeholder="Last Name" name="lastName" value={data.lastName} onChange={onChangeHandler}/>
          </div>

          <input type="email" placeholder="Email Address" name="email" value={data.email} onChange={onChangeHandler}/>
          <input type="text" placeholder="Street" name="street" value={data.street} onChange={onChangeHandler}/>

          <div className="multi-fields">
            <input type="text" placeholder="City" name="city" value={data.city} onChange={onChangeHandler}/>
            <input type="text" placeholder="State" name="state" value={data.state} onChange={onChangeHandler}/>
          </div>
          <div className="multi-fields">
            <input type="text" placeholder="Zipcode" name="zipcode" value={data.zipcode} onChange={onChangeHandler}/>
            <input type="text" placeholder="Country" name="country" value={data.country} onChange={onChangeHandler}/>
          </div>
          <input type="text" placeholder="Phone" name="phone" value={data.phone} onChange={onChangeHandler}/>
        </div>
        <div className="place-order-right">
           <div className="cart-total">
          <h2>Cart Total</h2>
          <div>
            <div className="cart-total-details">
              <p>SubTotal</p>
              <p>${getTotalCartAmount()}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Delivery Fee</p>
              <p>${getTotalCartAmount()>0?2:0}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <b>Total</b>
              <b>${getTotalCartAmount()>0?getTotalCartAmount()+2:getTotalCartAmount()}</b>
            </div>
          </div>
          <button type="submit">PROCEED TO PAYMENT</button>
        </div>
        </div>
      </form>
    </div>
  );
};

export default PlaceOrder;
