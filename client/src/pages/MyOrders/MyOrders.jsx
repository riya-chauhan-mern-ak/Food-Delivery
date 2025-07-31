import React, { useContext, useEffect, useState } from 'react';
import "./MyOrders.css"
import { StoreItemContext } from '../../context/StoreItemContext';
import axios from 'axios';
import { assets } from '../../assets/assets';

const MyOrders = () => {

    const {url,token} = useContext(StoreItemContext);
    const [data,setData]  = useState([]);

    const getOrderData = async() => {
        const res = await axios.post(url+'/api/order/userOrder',{},{headers:{token}})

        if(res.data.success){
            setData(res.data.data);
        }
    }

    useEffect(()=>{
        if(token){
            getOrderData()
        }
    },[token])

  return (
    <div className='my-orders'>
        <h2>My Orders </h2>
        <div className="container">
            {data.length>0 && data.map((order,index)=>{
                return(
                    <div className="order" key={index}>
                        <img src={assets.parcel_icon} alt="" />
                        <p>{order.items.map((item,ind)=>{
                            if(ind == order.items.length-1){
                                return item.name + ' x ' + item.quantity
                            }else{
                                return item.name + ' x ' + item.quantity + ', '
                            }
                        })}</p>
                        <p>${order.amount}.00</p>
                        <p>Items : {order.items.length}</p>
                        <p><span>&#x25cf;</span><b>{order.status}</b></p>
                        <button>Track Order</button>
                    </div>
                )
            })}
        </div>
    </div>
  )
}

export default MyOrders
