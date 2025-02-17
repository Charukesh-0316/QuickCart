import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './home';
import Login from './logIn';
import Dashboard from './dashboard';
import Categories from './categories';
import Products from './products';
import Customers from './customers'; // Import Customers component
import AboutUsPage from './AboutUs';
import EditCustomers from './editCustomers';
import OrderList from './orderLIst';

function Launcher() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/home" element={<Home />} />
                <Route path="/AboutUs" element={<AboutUsPage />} />
                <Route path="/login" element={<Login />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/categories" element={<Categories />} />
                <Route path="/products/:id" element={<Products />} />
                <Route path="/customers" element={<Customers />} /> 
                <Route path='/editCustomers/:id' element={<EditCustomers />} /> {/* Update route for EditCustomers */}
                <Route path='/orderList' element={<OrderList/>}/>
            </Routes>
        </Router>
    );
}

export default Launcher;
