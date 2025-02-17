import React from 'react';
import image from '../image/QuickCart_DesktopView.jpg';
import "./home.css";
import { useNavigate } from 'react-router-dom';
import CustomNavbar from '../Pages/Navbar';
import MainPage from "../Pages/Main-Page"

function Home() {
    const navigate = useNavigate();

    const signIn = () => {
        navigate("/login");
    };

    return (
        <div className=''>
            <CustomNavbar/>
            <MainPage/>
            <nav className='navbar'>
                <ul className='nav-links'>
                    <li><a href='#' onClick={signIn}>Sign In</a></li>
                    <li><a href='/signUp'>Sign Up</a></li>
                </ul>
            </nav>
            <img src={image} alt="Image" style={{ display: 'none' }} />
        </div>
    );
}

export default Home;
