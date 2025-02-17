// Products.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './products.css';

function Products() {
    const { id } = useParams();
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            console.log(`Fetching products for category ID: ${id}`); // Debugging log
            try {
                debugger;
                const response = await axios.get(`http://localhost:8080/admin/category/products/${id}`);
                if (response.data && response.data.status === "success") {
                    console.log('Fetched Products:', response.data.data);
                    setProducts(response.data.data);
                } else {
                    console.log('No data received or error status');
                    setProducts([]); // Ensure state is updated in case of no data
                }
            } catch (error) {
                console.error('Error fetching products:', error);
                setProducts([]); // Set an empty array on error
            }
        };

        fetchProducts();
    }, [id]);

    console.log('Products State:', products);

    return (
        <div className="products-container">
            <h2>Products for Category {id}</h2>
            <ul className="products-list">
                {Array.isArray(products) && products.length > 0 ? (
                    products.map((product, index) => (
                        <li key={index} className="product-item">
                            <h3>{product.name}</h3>
                            <p><strong>Brand:</strong> {product.brand}</p>
                            <p><strong>Price:</strong> {product.price}</p>
                            <p><strong>Rating:</strong> {product.rating}</p>
                            <p><strong>Expiry Date:</strong> {product.expiryDate ? new Date(product.expiryDate).toLocaleDateString() : 'N/A'}</p>
                            {product.productImage && <img src={product.productImage} alt={product.name} className="product-image" />}
                        </li>
                    ))
                ) : (
                    <li>No products found</li>
                )}
            </ul>
        </div>
    );
}

export default Products;
