import React, { useEffect, useState } from 'react';
import { View, Text, Image, Button, ScrollView, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import Toast from 'react-native-toast-message';

const Dashboard = (props) => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const getProducts = async () => {
            const userId = await AsyncStorage.getItem('userId');
            axios.get(`http://localhost:8080/vendor/get_products/${userId}`)
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

    const productReviews = async (id) => {
        const userId = await AsyncStorage.getItem('userId');
        axios({
            method: 'delete',
            url: 'http://localhost:8080/vendor/deleteProduct',
            data: { vendorId: userId, productId: id },
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

    const getStock = (id) => {
        // Navigate to stock screen with product id
        props.navigation.navigate('go-productStock', { pid: id });
    };

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.title}>Product List</Text>
            {products.map((p) => (
                <View key={p.id} style={styles.productContainer}>
                    <Image source={{ uri: p.productImage }} style={styles.productImage} />
                    <View style={styles.productInfo}>
                        <Text style={styles.productName}>{p.name}</Text>
                        <Text><Text style={styles.boldText}>Brand:</Text> {p.brand}</Text>
                        <Text><Text style={styles.boldText}>Price:</Text> ₹{p.price.toLocaleString()}</Text>
                        <Text><Text style={styles.boldText}>Rating:</Text> {p.rating} ⭐</Text>
                        <Text><Text style={styles.boldText}>Expiry Date:</Text> {new Date(p.expiryDate).toDateString()}</Text>
                        <View style={styles.buttonContainer}>
                            <Button
                                title="See Stock"
                                onPress={() => getStock(p.id)}
                                color="#007bff"
                            />
                            <Button
                                title="Reviews"
                                onPress={() => productReviews(p.id)}
                                color="#dc3545"
                            />
                        </View>
                    </View>
                </View>
            ))}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
    title: {
        textAlign: 'center',
        fontSize: 24,
        marginBottom: 20,
    },
    productContainer: {
        flexDirection: 'row',
        borderColor: '#ccc',
        borderWidth: 1,
        padding: 10,
        marginBottom: 10,
        alignItems: 'center',
    },
    productImage: {
        width: 100,
        height: 100,
        marginRight: 10,
    },
    productInfo: {
        flex: 1,
    },
    productName: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    boldText: {
        fontWeight: 'bold',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10,
    },
});

export default Dashboard;
