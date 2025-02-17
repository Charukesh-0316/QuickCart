import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './login.css';
import axios from 'axios';

function LogIn() {
    const navigate = useNavigate();
    const [credentials, setCredentials] = useState({ email: "", password: "" });
    const [id] = useState(45); // Set the ID value here or get it from props or other sources

    const onTextChange = (e) => {
        const { name, value } = e.target;
        setCredentials((prevCredentials) => ({
            ...prevCredentials,
            [name]: value
        }));
    }

    const SignIn = async (e) => {
        e.preventDefault(); // Prevent default form submission behavior
        try {
            debugger;
            const result = await axios.get(`http://localhost:8080/vendor/login/${id}`, {
                params: {
                    email: credentials.email,
                    password: credentials.password
                }
            });
            const data = result.data.data;
            if (data === "Admin") {
                sessionStorage.setItem("Admin", data.id);
                navigate("/dashboard");
            } else if (data === "Customer") {
                sessionStorage.setItem("user", data.id);
                navigate("/home");
            } else if (data === "Vendor") {
                sessionStorage.setItem("vendor", data.id);
                navigate("/vendor");
            } else {
                navigate("/failed");
            }
        } catch (error) {
            console.error("Login error:", error);
        }
    }

    return (
        <div className="login-container">
            <div className="login-form">
                <h2>Login</h2>
                <form onSubmit={SignIn}>
                    <div className="input-group">
                        <label htmlFor="email">Email</label>
                        <input
                            type="text"
                            id="email"
                            name="email"
                            value={credentials.email}
                            onChange={onTextChange}
                            placeholder="Enter Your Email"
                            required
                        />
                    </div>
                    <div className="input-group">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={credentials.password}
                            onChange={onTextChange}
                            placeholder="Enter Your Password"
                            required
                        />
                    </div>
                    <button type="submit" className="login-button">Sign In</button>
                </form>
            </div>
        </div>
    );
}

export default LogIn;
