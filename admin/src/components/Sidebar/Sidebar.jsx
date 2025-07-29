import React from 'react'
import { assets } from '../../assets/assets';
import './Sidebar.css';
import { NavLink } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div className='sidebar'>
      <div className="sidebar-options">
        <NavLink to={'/add'} className="sidebar-opt">
          <img src={assets.add_icon}  />
          <p>Add Items</p>
        </NavLink>
        <NavLink to={'/list'} className="sidebar-opt">
          <img src={assets.order_icon}  />
          <p>List Items</p>
        </NavLink>
        <NavLink to={'/order'} className="sidebar-opt">
          <img src={assets.order_icon}  />
          <p>Orders</p>
        </NavLink>
      </div>
    </div>
  )
}

export default Sidebar
