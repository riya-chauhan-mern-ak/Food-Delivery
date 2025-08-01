import React from "react";
import "./Order.css";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useEffect } from "react";
import { assets } from "../../assets/assets";

const Order = () => {
  const [orders, setOrders] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const baseUrl = import.meta.env.VITE_BASE_URL;

  const fetchAllOrders = async () => {
    await toast.promise(axios.get(`${baseUrl}/api/order/listall`), {
      pending: "Fetching orders...",
      success: {
        render({ data }) {
          if (data.data.success) {
            setOrders(data.data.data);
            return "Orders fetched successfully!";
          } else {
            throw new Error(data.data.message);
          }
        },
      },
      error: {
        render({ data }) {
          return data?.message || "Failed to fetch orders.";
        },
      },
    });
  };

  const statusHandler = async (e, orderId) => {
    const response = await axios.post(`${baseUrl}/api/order/status`, {
      orderId: orderId,
      status: e.target.value,
    });
    
    if (response.data.success) {
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order._id === orderId
            ? { ...order, status: response.data.status }
            : order
        )
      );
    }
  };

  useEffect(() => {
    fetchAllOrders();
  }, []);

  return (
    <div className="order add">
      <h3>Order Page</h3>
      <div className="order-list">
        {orders.length > 0 &&
          orders.map((order) => {
            return (
              <div key={order._id} className="order-item">
                <img src={assets.parcel_icon} alt="" />
                <div>
                  <p className="order-item-food">
                    {order.items.map((item, index) => {
                      if (index == order.items.length - 1) {
                        return item.name + " x " + item.quantity;
                      } else {
                        return item.name + " x " + item.quantity + ", ";
                      }
                    })}
                  </p>
                  <p className="order-item-name">
                    {order.address.firstName + " " + order.address.lastName}
                  </p>
                  <div className="order-item-address">
                    <p>{order.address.street + ","}</p>
                    <p>
                      {order.address.city +
                        ", " +
                        order.address.state +
                        ", " +
                        order.address.country +
                        ", " +
                        order.address.zipcode}
                    </p>
                  </div>
                  <p className="order-item-phone">{order.address.phone}</p>
                </div>
                <p className="">
                  Items : <b>{order.items.length}</b>
                </p>
                <p className="order-amount">${order.amount}</p>
                <select
                  onChange={(e) => statusHandler(e, order._id)}
                  value={order.status}
                >
                  <option value="Food Proceessing">Food Proceessing</option>
                  <option value="Out For Delivery">Out For Delivery</option>
                  <option value="Delivered">Delivered</option>
                  <option value="hh">hh</option>
                </select>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Order;
