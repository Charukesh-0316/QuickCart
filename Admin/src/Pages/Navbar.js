import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../images/logo.jpg";

function CustomNavbar() {
  const [permission, setPermission] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const userId = sessionStorage.getItem("id");
    if (userId) {
      setPermission(true);
    }
  }, []);

  const Logout = () => {
    sessionStorage.removeItem("id");
    setPermission(false);
    navigate("/"); // Redirect to Home after logout
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        {/* Logo */}
        <button className="navbar-brand btn btn-link text-white" onClick={() => navigate("/")}>
          <img src={logo} height="35" alt="Logo" />
        </button>

        {/* About Us Button */}
        <button className="btn text-white" onClick={() => navigate("/AboutUs")}>
          About Us
        </button>

        {/* Single Login/Dashboard Button */}
        <button className="btn btn-outline-light ms-2" onClick={() => navigate("/Login")}>
          {permission ? "Dashboard" : "Login"}
        </button>

        {/* Logout Button (Only if logged in)
        {permission && (
          <button className="btn btn-danger ms-2" onClick={Logout}>
            Logout
          </button>
        )} */}
      </div>
    </nav>
  );
}

export default CustomNavbar;
