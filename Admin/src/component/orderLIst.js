import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const OrderList = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("http://localhost:8080/admin/admin/orders")
      .then((response) => {
        if (Array.isArray(response.data)) {
          setOrders(response.data); // Handle direct array response
        } else {
          setOrders(response.data.data || []); // Handle wrapped data object
        }
      })
      .catch((error) => {
        console.error("Error fetching orders:", error);
        setError("Failed to fetch orders");
      })
      .finally(() => setLoading(false));
  }, []);

  const handleAllCategoriesClick = () => {
    // Add your logic to handle the "All Categories" button click here
    console.log("All Categories button clicked");

    // Example logic to check all categories (this is just a placeholder)
    const allCategoriesChecked = true; // Change this based on your actual logic

    if (allCategoriesChecked) {
      navigate("/all-categories");
    }
  };

  if (loading) return <div style={styles.textCenter}>Loading...</div>;
  if (error) return <div style={styles.error}>{error}</div>;

  return (
    <div style={styles.adminContainer}>
      <header style={styles.adminHeader}>
        <h1>Order Management</h1>
      </header>
      <main>
        <div style={styles.tableContainer}>
          <table style={styles.table}>
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Order Date</th>
                <th>Expected Delivery</th>
                <th>Total Price</th>
                <th>Tax Rate</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {orders.length > 0 ? (
                orders.map(order => (
                  <tr key={order.id}>
                    <td>{order.id}</td>
                    <td>{order.orderDate || "N/A"}</td>
                    <td>{order.expDeliveryDate || "N/A"}</td>
                    <td>${order.totalPrice.toFixed(2)}</td>
                    <td>{order.taxRate}%</td>
                    <td style={{ color: getStatusColor(order.status) }}>{order.status}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" style={styles.noData}>No orders found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        {/* All Categories Button at the Bottom */}
        <div style={styles.buttonContainerBottom}>
          <button style={styles.allCategoriesButton} onClick={handleAllCategoriesClick}>
            All Categories
          </button>
        </div>
      </main>
    </div>
  );
};

const getStatusColor = (status) => {
  switch (status?.toLowerCase()) {
    case "pending": return "orange";
    case "shipped": return "blue";
    case "delivered": return "green";
    case "cancelled": return "red";
    default: return "black";
  }
};

const styles = {
  adminContainer: {
    maxWidth: "1200px",
    margin: "20px auto",
    backgroundColor: "#fff",
    padding: "20px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    borderRadius: "8px",
  },
  adminHeader: {
    textAlign: "center",
    backgroundColor: "#007BFF",
    color: "white",
    padding: "15px",
    borderRadius: "8px 8px 0 0",
  },
  tableContainer: {
    overflowX: "auto",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    backgroundColor: "#fff",
  },
  textCenter: {
    textAlign: "center",
    fontSize: "1.25rem",
    marginTop: "10px",
  },
  error: {
    color: "red",
    textAlign: "center",
    marginTop: "10px",
  },
  noData: {
    textAlign: "center",
    fontSize: "1rem",
    padding: "10px",
    color: "#555",
  },
  buttonContainerBottom: {
    textAlign: "center",
    marginTop: "20px",
  },
  allCategoriesButton: {
    backgroundColor: "#007BFF",
    color: "white",
    padding: "10px 20px",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
};

export default OrderList;
