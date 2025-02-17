// Categories.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './categories.css';
import { useNavigate } from 'react-router-dom';

function Categories() {
    const navigate = useNavigate();
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get('http://localhost:8080/admin/categories');
                if (response.data && response.data.status === "success") {
                    console.log('Fetched Data:', response.data.data);
                    setCategories(response.data.data);
                } else {
                    console.log('No data received or error status');
                    setCategories([]); // Ensure state is updated in case of no data
                }
            } catch (error) {
                console.error('Error fetching categories:', error);
                setCategories([]); // Set an empty array on error
            }
        };

        fetchCategories();
    }, []);

    const handleCategoryClick = (id) => {
        console.log('Navigating to Products for Category ID:', id); // Debugging log
        navigate(`/products/${id}`);
    };

    console.log('Categories State:', categories);

    return (
        <div className="categories-container">
            <h2>Categories</h2>
            <ul className="categories-list">
                {Array.isArray(categories) && categories.length > 0 ? (
                    categories.map((category, index) => (
                        <li key={index} className="category-item" onClick={() => handleCategoryClick(category.id)}>
                            <h3>{category.id} - {category.name}</h3>
                        </li>
                    ))
                ) : (
                    <li>No categories found</li>
                )}
            </ul>
        </div>
    );
}

export default Categories;
