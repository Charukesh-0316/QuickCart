import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './customers.css';
import { useNavigate } from 'react-router-dom';

function Customers() {
    const navigate = useNavigate();
    const [customers, setCustomers] = useState([]);
    const [customersByRole, setCustomersByRole] = useState([]);
    const [id, setId] = useState(null); // Default to show both customers and vendors

    useEffect(() => {
        const fetchCustomers = async () => {
            try {
                const response = await axios.get('http://localhost:8080/admin/customers');
                if (response.data && response.data.status === "success") {
                    console.log('Fetched Customers:', response.data.data);
                    setCustomers(response.data.data);
                    setCustomersByRole(response.data.data); // Show all customers initially
                } else {
                    console.log('No data received or error status');
                    setCustomers([]); // Ensure state is updated in case of no data
                    setCustomersByRole([]); // Ensure state is updated in case of no data
                }
            } catch (error) {
                console.error('Error fetching customers:', error);
                setCustomers([]); // Set an empty array on error
                setCustomersByRole([]); // Set an empty array on error
            }
        };

        fetchCustomers();
    }, []);

    useEffect(() => {
        const fetchCustomersByRole = async () => {
            if (id === null) {
                setCustomersByRole(customers); // Show both customers and vendors if no role is selected
            } else {
                try {
                    const response = await axios.get(`http://localhost:8080/admin/customersByRole/{role}?role=${id}`);
                    if (response.data && response.data.status === "success") {
                        console.log('Fetched Customers by Role:', response.data.data);
                        setCustomersByRole(response.data.data);
                    } else {
                        console.log('No data received or error status');
                        setCustomersByRole([]); // Ensure state is updated in case of no data
                    }
                } catch (error) {
                    console.error('Error fetching customers by role:', error);
                    setCustomersByRole([]); // Set an empty array on error
                }
            }
        };

        fetchCustomersByRole();
    }, [id, customers]);

    const handleRoleChange = (event) => {
        setId(Number(event.target.value)); // Convert the value to a number
    };

    const handleProductsClick = (vendorId) => {
        // Handle Products button click
        console.log(`Products button clicked for Vendor ID: ${vendorId}`);
        navigate("/products/:id")
    };

    const handleDeleteClick = async (customerId) => {
        console.log("Attempting to delete user with ID:", customerId);
        try {
            const response = await axios.delete(`http://localhost:8080/admin/deleteCustomer/${customerId}?id=${customerId}`);
            if (response.status === 200) {  // Check if the deletion was successful
                console.log("Delete response:", response.data);
                setCustomers(customers.filter((customer) => customer.id !== customerId));
                setCustomersByRole(customersByRole.filter((customer) => customer.id !== customerId));
            } else {
                console.log("Failed to delete customer:", response.data);
            }
        } catch (error) {
            console.error("Error deleting customer:", error);
            if (error.response) {
                console.log("Error details:", error.response.data);
            } else {
                console.log("Error details:", error.message);
            }
        }
    };
    
    

    const handleEditClick = (customerId) => {
        // Handle Edit button click
        console.log(`Edit button clicked for Customer ID: ${customerId}`);
        navigate(`/editCustomers/${customerId}`); // Navigate to EditCustomers page with customer ID
    };
    

    return (
        <div className="customers-container">
            <div className="radio-buttons">
                <label>
                    <input
                        type="radio"
                        value="2" // ID for Customer
                        checked={id === 2}
                        onChange={handleRoleChange}
                    />
                    Customer
                </label>
                <label>
                    <input
                        type="radio"
                        value="3" // ID for Vendor
                        checked={id === 3}
                        onChange={handleRoleChange}
                    />
                    Vendor
                </label>
                <label>
                    <input
                        type="radio"
                        value=""
                        checked={id === null}
                        onChange={() => setId(null)}
                    />
                    Both
                </label>
            </div>

            <h2>{id === 2 ? 'Customers' : (id === 3 ? 'Vendors' : 'All Users')}</h2>
            <ul className="customers-list">
                {Array.isArray(customersByRole) && customersByRole.length > 0 ? (
                    customersByRole.map((customer, index) => (
                        <li key={index} className="customer-item">
                            <div>
                                <h3>{customer.firstName} {customer.lastName}</h3>
                                <p><strong>Email:</strong> {customer.email}</p>
                                <p><strong>Mobile No:</strong> {customer.mobileNo}</p>
                            </div>
                            <div className="button-group">
                                <button onClick={() => handleEditClick(customer.id)}>Edit</button>
                                <button onClick={() => handleDeleteClick(customer.id)}>Delete</button>
                                {id === 3 && (
                                    <div>
                                        <button onClick={() => handleProductsClick(customer.id)}>Products</button>
                                    </div>
                                )}
                            </div>
                        </li>
                    ))
                ) : (
                    <li>No {id === 2 ? 'customers' : (id === 3 ? 'vendors' : 'users')} found</li>
                )}
            </ul>
        </div>
    );
}

export default Customers;
