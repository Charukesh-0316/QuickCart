import React, { useEffect, useState } from "react";
import { View, Text, ActivityIndicator, StyleSheet } from "react-native";
import axios from "axios";
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import Toast from "react-native-toast-message";
import config from "../config";

function PlaceOrder(props) {
    const navigation = useNavigation();
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
        const placeOrder = async () => {
            debugger;
            try {
                const userId = await AsyncStorage.getItem('userId');
                const details = {
                    userId: userId,
                    addressId: props.route.params.addressId,
                    productId: props.route.params.pid,
                    quantity: props.route.params.quantity,
                    currentPrice: '',
                    order: {
                        orderDate: new Date().toISOString(),
                        expDeliveryDate: new Date(new Date().setDate(new Date().getDate() + 7)).toISOString(),
                        totalPrice: '',
                        taxRate: '',
                        status: "Ordered"
                    }
                };

                const response = await axios.post(`${config.URL}/user/order`, details);
                
                if (response.data.status === "success") {
                    Toast.show({
                        type: "success",
                        position: "bottom",
                        text1: "Order Placed Successfully! ",
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

        placeOrder();
    }, []);

    return (
        <View style={styles.container}>
            {loading ? (
                <ActivityIndicator size="large" color="#ff6600" />
            ) : (
                <View style={styles.card}>
                    <Text style={styles.header}>Order Placed Successfully!</Text>
                    <Text style={styles.text}>Thank you for your order.</Text>
                    <Text style={styles.text}>We will notify you once it's shipped.</Text>
                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#222",
    },
    card: {
        width: "80%",
        padding: 20,
        borderRadius: 10,
        backgroundColor: "#333",
        alignItems: "center",
    },
    header: {
        fontSize: 20,
        fontWeight: "bold",
        color: "#ff6600",
        marginBottom: 10,
    },
    text: {
        color: "#fff",
        textAlign: "center",
    },
});

export default PlaceOrder;
