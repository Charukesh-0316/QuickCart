import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import config from "./config";
// import config from "../config"; // Ensure config.js is in the correct path

function Login() {
    const navigate = useNavigate();
    const [credential, setCredential] = useState({ email: "", password: "" });

    const handleLogin = () => {
        console.log("SignIn Clicked");

        axios.post(`${config.URL}/user/login`, credential)
            .then((response) => {
                console.log(response.data);
                if (response.data.status === "success") {
                    console.log("Login Successful");
                    localStorage.setItem("userId", response.data.data.id.toString());

                    const userId = localStorage.getItem("userId");
                    if (userId) {
                        checkUserRole(userId);
                    }
                } else {
                    console.log("Failed: Please check username and password");
                }
            })
            .catch((error) => {
                console.error("Error logging in:", error);
            });
    };

    const checkUserRole = (id) => {
        axios.get(`${config.URL}/vendor/login/${id}`)
            .then((result) => {
                console.log(result.data);
                if (result.data.data === "Customer") {
                    alert("please enter valid email and password")
                } else if (result.data.data === "Vendor") {
                    alert("please enter valid email and password")

                }else if (result.data.data === "Admin") {
                    navigate("/dashboard");
                }
            })
            .catch((error) => {
                console.error("Error fetching role:", error);
            });
    };

    return (
        <div style={{ backgroundColor: "silver", minHeight: "100vh", display: "flex", justifyContent: "center", alignItems: "center", padding: 20 }}>
            <div style={{ width: "300px", textAlign: "center" }}>
                <input
                    type="email"
                    placeholder="Enter your email"
                    style={{ width: "100%", marginBottom: "15px", padding: "10px" }}
                    value={credential.email}
                    onChange={(e) => setCredential({ ...credential, email: e.target.value })}
                />

                <input
                    type="password"
                    placeholder="Enter your password"
                    style={{ width: "100%", marginBottom: "15px", padding: "10px" }}
                    value={credential.password}
                    onChange={(e) => setCredential({ ...credential, password: e.target.value })}
                />

                <button onClick={handleLogin} style={{ width: "100%", padding: "10px", marginBottom: "10px", backgroundColor: "#007bff", color: "#fff", border: "none", cursor: "pointer" }}>
                    Login
                </button>
            </div>
        </div>
    );
}

export default Login;
