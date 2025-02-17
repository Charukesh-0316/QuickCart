import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import './editCustomers.css'; // Import the CSS file

const EditCustomers = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState({ firstName: '', lastName: '', email: '', password: '', mobileNo: '' });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUser = async () => {
      try {
        console.log('Fetching user with ID:', id);
        const response = await axios.get(`http://localhost:8080/admin/customers/${id}?id=${id}`);
        console.log('User details:', response.data);
        if (response.data && response.data.data) {
          setUser(response.data.data);
        } else {
          setError('User not found');
        }
      } catch (error) {
        console.error('Error fetching user:', error);
        setError(error.response?.data?.message || 'Error fetching user');
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({ ...prevUser, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`http://localhost:8080/admin/editCustomer/${id}?id=${id}`, user);
      if (response.status === 200) { // Check if the request was successful
        console.log('User updated successfully:', response.data);
        navigate('/customers');
      } else {
        console.error('Failed to update user:', response.data);
        setError('Failed to update user');
      }
    } catch (error) {
      console.error('Error updating user:', error);
      if (error.response) {
        console.log("Error details:", error.response.data);
        setError(error.response.data.message || 'Error updating user');
      } else {
        setError('Network Error');
      }
    }
  };

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className="container">
      <h2>Edit User</h2>
      <form onSubmit={handleSubmit} className="form">
        <div className="formGroup">
          <label className="label">First Name:</label>
          <input
            type="text"
            name="firstName"
            value={user.firstName}
            onChange={handleChange}
            className="input"
            autocomplete="given-name"
          />
        </div>
        <div className="formGroup">
          <label className="label">Last Name:</label>
          <input
            type="text"
            name="lastName"
            value={user.lastName}
            onChange={handleChange}
            className="input"
            autocomplete="family-name"
          />
        </div>
        <div className="formGroup">
          <label className="label">Email:</label>
          <input
            type="email"
            name="email"
            value={user.email}
            onChange={handleChange}
            className="input"
            autocomplete="email"
          />
        </div>
        <div className="formGroup">
          <label className="label">Password:</label>
          <input
            type="password"
            name="password"
            value={user.password}
            onChange={handleChange}
            className="input"
            autocomplete="current-password"
          />
        </div>
        <div className="formGroup">
          <label className="label">Mobile No:</label>
          <input
            type="text"
            name="mobileNo"
            value={user.mobileNo}
            onChange={handleChange}
            className="input"
            autocomplete="tel"
          />
        </div>
        <button type="submit" className="button">Update</button>
      </form>
    </div>
  );
};

export default EditCustomers;
