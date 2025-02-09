import axios from 'axios';
import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Text } from 'react-native-paper';
import Toast from 'react-native-toast-message';

function AddProduct(props) {
    const [product, setProduct] = useState({
        id: 0,
        brand: "",
        name: "",
        price: '',
        rating: '',
        expiryDate: ''
    });
    const [categoryId, setCategoryId] = useState(0);
    const [vendorId, setVendorId] = useState(0);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setProduct({ ...product, [name]: value });
    };

    const handleAddProduct = async() => {
        debugger;
        const userId = await AsyncStorage.getItem('userId');
        console.log(userId + " " + props.route.params.id)
        const productData = {
            product: { ...product },
            category_Id: props.route.params.id,
            vendor_Id: userId
        };

        axios.post("http://localhost:8080/vendor/add_product", productData, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then((result) => {
            if (result.data.status === "success") {
                // alert("Product Added Successfully");
                Toast.show({
                    type : 'success',
                    text1 : "Product Added Successfully"
                })
                props.navigation.navigate('go-addStock',{pid:result.data.data.id});
            } else {
                alert("Failed to Add Product");
            }
        })
        .catch((error) => {
            console.error("Error adding product: ", error);
        });
    };

    return (
        <div className="container mt-5">
            <h1 className="mb-4">Vendor Products</h1>
            <div className="mb-3">
                <input
                    type="text"
                    name="brand"
                    value={product.brand}
                    onChange={handleInputChange}
                    placeholder="Enter product brand"
                    className="form-control mb-3"
                />
                <input
                    type="text"
                    name="name"
                    value={product.name}
                    onChange={handleInputChange}
                    placeholder="Enter product name"
                    className="form-control mb-3"
                />
                <input
                    type="number"
                    name="price"
                    value={product.price}
                    onChange={handleInputChange}
                    placeholder="Enter product price"
                    className="form-control mb-3"
                />
                <input
                    type="number"
                    name="rating"
                    value={product.rating}
                    onChange={handleInputChange}
                    placeholder="Enter product rating"
                    className="form-control mb-3"
                />
               {/* <label htmlFor="expiryDate" className="form-label">Enter expiry date</label>
                <input
                    type="date"
                    name="expiryDate"
                    value={product.expiryDate}
                    onChange={handleInputChange}
                    className="form-control mb-3"
                    id="expiryDate"
                /> */}
                <button
                    onClick={handleAddProduct}
                    className="btn btn-primary"
                >
                    Add Product
                </button>
            </div>
        </div>
    );
}

export default AddProduct;
