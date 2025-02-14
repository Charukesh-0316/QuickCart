import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { View, StyleSheet, ScrollView, Text } from "react-native";
import { Card, Title, Paragraph, Button, ActivityIndicator } from "react-native-paper";
import config from "../config";

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
        const fetchStoreId = async () => {
            const id = await AsyncStorage.getItem('storeId');
            setStoreId(id);
            const payload = {
                storeId: id,
                productId: productId
            };
            axios.post(`${config.URL}/vendor/get_stock`, payload)
                .then((result) => {
                    if (result.data.status === 'success') {
                        setProductStock(result.data.data);
                    }
                })
                .catch((error) => {
                    console.error("Error fetching stock:", error);
                });
        };

        const getProduct = async () => {
            try {
                const result = await axios.get(`${config.URL}/user/product/${productId}`);
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
            <Text style={styles.title}>Product Stock Details</Text>
            <Card style={styles.card}>
                <Card.Content>
                    {product && (
                        <>
                            <Title>{product.name}</Title>
                            <Paragraph>Brand: {product.brand}</Paragraph>
                            <Paragraph>Price: ₹ {product.price}</Paragraph>
                            <Paragraph>Rating: {product.rating} ⭐</Paragraph>
                            <Paragraph>Stock: {productStock.stock} {productStock.available ? "(Available)" : "(Out of stock)"}</Paragraph>
                        </>
                    )}
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
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center'
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
