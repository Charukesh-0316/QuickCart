import React from 'react';
import { NavLink, Routes, Route } from 'react-router-dom';
import Categories from './categories';
import './dashboard.css';
import Customers from './customers'; // Import Customers component

function Dashboard() {
  return (
    <div className="dashboard">
      <div className="sidebar">
        <nav>
          <ul>
            <li><NavLink to="/home">Home</NavLink></li>
            <li><NavLink to="/categories">Categories</NavLink></li>
            <li><NavLink to="/customers">All Customers</NavLink></li>
            <li><NavLink to="/view-brands">OrderList</NavLink></li>
            <li><NavLink to="/view-sellers"></NavLink></li>
            <li><NavLink to="/view-users"></NavLink></li>
            <li><NavLink to="/view-orders"></NavLink></li>
            
          </ul>
        </nav>
      </div>
      <div className="main-content">
        <Routes>
          <Route path="/categories" element={<Categories/>} />
          <Route path='/customers' element ={<Customers/>} /> {/* Add route for Customers */}
          {/* Add other routes here */}
        </Routes>
      </div>
    </div>
  );
}

export default Dashboard;
