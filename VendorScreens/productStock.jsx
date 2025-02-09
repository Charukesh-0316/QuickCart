import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { Card, Title, Paragraph, Button, ActivityIndicator } from "react-native-paper";

function ProductStock(props) {
    const [storeId, setStoreId] = useState(null);
    const [productStock, setProductStock] = useState({
        stock: 0,
        available: false
    });
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const productId = props.route.params.pid;

    useEffect(() => {
        debugger
        const fetchStoreId = async () => {
                const id = await AsyncStorage.getItem('storeId');
                setStoreId(id);
                const payload = {
                    storeId:id,
                    productId:productId
                }
                axios.post("http://localhost:8080/vendor/get_stock",payload)
                .then((result)=>{
                    if (result.data.status === 'success') {
                        debugger;
                        setProductStock(result.data.data);
                    }
                })
        };

        const getProduct = async () => {
            try {
                const result = await axios.get(`http://localhost:8080/user/product/${productId}`);
                setProduct(result.data.data);
            } catch (error) {
                console.error('Error fetching product:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchStoreId();
        getProduct();
    }, [productId]);

    if (loading) {
        return <ActivityIndicator animating={true} size="large" style={styles.loader} />;
    }

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <h1>Product Stock Details</h1>
            <Card style={styles.card}>
                <Card.Content>
                    
                    <Title>{product.name}</Title>
                        <Paragraph>Brand: {product.brand}</Paragraph>
                        <Paragraph>Price: ₹ {product.price}</Paragraph>
                        <Paragraph>Rating: {product.rating} ⭐</Paragraph>
                        <Paragraph>Stock: {productStock.stock} {productStock.available ? "(Available)" : "(Out of stock)"}</Paragraph>
                </Card.Content>
            </Card>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 16,
        backgroundColor: "#f4f4f4"
    },
    card: {
        marginBottom: 16,
        borderRadius: 8,
        elevation: 4,
    },
    loader: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 50
    }
});

export default ProductStock;
