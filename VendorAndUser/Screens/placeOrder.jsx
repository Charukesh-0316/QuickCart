import React, { useEffect, useState } from "react";
import { View, Text, ActivityIndicator, StyleSheet, Modal, Button, Image, ScrollView } from "react-native";
import axios from "axios";
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import Toast from "react-native-toast-message";
import config from "../config";

function PlaceOrder(props) {
    const navigation = useNavigation();
    const [loading, setLoading] = useState(true);
    const [productDetails, setProductDetails] = useState(null);
    const [quantity, setQuantity] = useState(props.route.params.quantity);
    const [modalVisible, setModalVisible] = useState(false);

    useEffect(() => {
        const fetchProductDetails = async () => {
            try {
                const response = await axios.get(`${config.URL}/user/product/${props.route.params.pid}`);
                if (response.data.status === "success") {
                    setProductDetails(response.data.data);
                    setLoading(false);
                } else {
                    console.error("Error fetching product details.");
                }
            } catch (error) {
                console.error(error);
            }
        };

        fetchProductDetails();
    }, [props.route.params.pid]);

    useEffect(() => {
        if (productDetails) {
            console.log("Product Details:", productDetails); // Debugging: Check product details
        }
    }, [productDetails]);

    const calculateTotalPrice = () => {
        if (!productDetails) {
            return { totalPrice: 0, taxRate: 0 };
        }
        const productPrice = productDetails.price * quantity;
        const taxRate = 0.05;
        const totalPrice = productPrice + productPrice * taxRate;
        return { totalPrice, taxRate };
    };

    const confirmOrder = async () => {
        setModalVisible(false);
        setLoading(true);
        try {
            const userId = await AsyncStorage.getItem('userId');
            const { totalPrice, taxRate } = calculateTotalPrice();
            const details = {
                userId: userId,
                addressId: props.route.params.addressId.id,
                productId: props.route.params.pid,
                quantity: quantity,
                currentPrice: productDetails.price,
                order: {
                    orderDate: new Date().toISOString(),
                    expDeliveryDate: new Date(new Date().setDate(new Date().getDate() + 7)).toISOString(),
                    totalPrice: totalPrice,
                    taxRate: taxRate,
                    status: "Pending"
                }
            };

            debugger;
            const response = await axios.post(`${config.URL}/user/order`, details);
            if (response.data.status === "success") {
                Toast.show({
                    type: "success",
                    position: "bottom",
                    text1: "Order Placed Successfully!",
                    visibilityTime: 3000,
                });
                navigation.navigate("go-order", { orderId: response.data.data.id });
            } else {
                // alert("Error placing order.");
            }
        } catch (error) {
            console.error(error);
            // alert("Error placing order.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            {loading ? (
                <ActivityIndicator size="large" color="#ff6600" />
            ) : (
                <View style={styles.card}>
                    <Image 
                        source={{ uri: `http://localhost:8080/images/${productDetails?.productImage}` }} 
                        style={styles.productImage} 
                        resizeMode="contain" 
                    />
                    <Text style={styles.header}>Confirm Your Order</Text>
                    <Text style={styles.text}>Product: {productDetails?.name}</Text>
                    <Text style={styles.text}>Quantity: {quantity}</Text>
                    <Text style={styles.text}>Price per item: ₹{productDetails?.price}</Text>
                    <Text style={styles.text}>Total Price: ₹{calculateTotalPrice().totalPrice.toFixed(2)}</Text>
                    <Text style={styles.text}>Tax Rate: {calculateTotalPrice().taxRate * 100}%</Text>
                    <Button title="Confirm Order" onPress={() => setModalVisible(true)} color="#ff6600" />
                </View>
            )}

            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalText}>Are you sure you want to place this order?</Text>
                        <Button title="Yes" onPress={confirmOrder} />
                        <Button title="No" onPress={() => setModalVisible(false)} />
                    </View>
                </View>
            </Modal>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f5e0df",
        padding: 20,
    },
    card: {
        width: "100%",
        padding: 20,
        borderRadius: 10,
        backgroundColor: "#fff",
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    productImage: {
        width: "100%",
        height: 200,
        marginBottom: 20,
    },
    header: {
        fontSize: 24,
        fontWeight: "bold",
        color: "#333",
        marginBottom: 10,
    },
    text: {
        fontSize: 18,
        color: "#666",
        marginBottom: 10,
        textAlign: "center",
    },
    modalContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
    modalView: {
        width: "80%",
        padding: 20,
        borderRadius: 10,
        backgroundColor: "#fff",
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    modalText: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 20,
        textAlign: "center",
    },
});

export default PlaceOrder;
