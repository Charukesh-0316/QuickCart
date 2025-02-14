import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { useEffect, useState } from "react";

function ProductList(props) {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const getProducts = async () => {
            const userId = await AsyncStorage.getItem('userId');
            axios.get(`${config.URL}/vendor/get_products/${userId}`)
                .then((result) => {
                    if (result.data.status === 'success') {
                        setProducts(result.data.data);
                    }
                })
                .catch((error) => {
                    console.error("Error fetching products:", error);
                });
        };
        getProducts();
    }, []);

    const deleteProduct = async (id) => {
        const userId = await AsyncStorage.getItem('userId');
        axios({
            method: 'delete',
            url: '${config.URL}/vendor/deleteProduct',
            data: { vendorId: userId, productId: id, categoryId: categoryId },
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then((reply) => {
            if (reply.data.status === 'success') {
                setProducts(products.filter(product => product.id !== id));
                Toast.show({
                    type: 'success',
                    text1: 'Product deleted successfully',
                });
            } else {
                Toast.show({
                    type: 'error',
                    text1: 'Failed to delete product',
                });
            }
        })
        .catch((error) => {
            console.error("Error deleting product:", error);
            Toast.show({
                type: 'error',
                text1: 'Network error, please try again',
            });
        });
    };

    const editProduct = (id) => {
        // Navigate to edit product screen with product id
        props.navigation.navigate("edit-product", { pid:id });
    };

    return (
        <div style={{ height: "1000px", overflow: "auto", padding: "20px" }}>
            <h2 style={{ textAlign: "center" }}>Product List</h2>
            {products.map((p) => (
                <div key={p.id} style={{ border: "1px solid #ccc", padding: "10px", margin: "10px" }}>
                    <h3>{p.name}</h3>
                    <p><strong>Brand:</strong> {p.brand}</p>
                    <p><strong>Price:</strong> ₹{p.price.toLocaleString()}</p>
                    <p><strong>Rating:</strong> {p.rating} ⭐</p>
                    <p><strong>Expiry Date:</strong> {new Date(p.expiryDate).toDateString()}</p>
                    <button
                        onClick={() => editProduct(p.id)}
                        style={{
                            cursor: "pointer",
                            padding: "5px 10px",
                            marginRight: "10px",
                            border: "none",
                            borderRadius: "4px",
                            backgroundColor: "#007bff",
                            color: "#fff",
                            fontSize: "14px",
                        }}
                    >
                        Edit
                    </button>
                    <button
                        onClick={() => deleteProduct(p.id)}
                        style={{
                            cursor: "pointer",
                            padding: "5px 10px",
                            border: "none",
                            borderRadius: "4px",
                            backgroundColor: "#dc3545",
                            color: "#fff",
                            fontSize: "14px",
                        }}
                    >
                        Delete
                    </button>
                </div>
            ))}
        </div>
    );
}

export default ProductList;
