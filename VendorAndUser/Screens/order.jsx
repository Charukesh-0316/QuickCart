import React, { useState, useEffect } from "react";
import { View, Text, FlatList, StyleSheet, ActivityIndicator, TouchableOpacity } from "react-native";
import axios from "axios";
import config from "../config";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";

const OrderPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigation = useNavigation();

  useEffect(async () => {
    const userId = await AsyncStorage.getItem("userId");
    axios
      .get(`${config.URL}/getOrderBy/${userId}`) // Replace with your machine's IP
      .then((response) => {
        if (response.data.status === "success") {
          setOrders(response.data.data || []);
        } else {
          setError("Failed to fetch orders");
        }
      })
      .catch((error) => {
        console.error("Error fetching orders:", error);
        setError("Something went wrong! Please try again later.");
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const handleViewOrder = (orderId) => {
    navigation.navigate("go-orderDetails", { orderId });
  };

  const renderOrder = ({ item }) => {
    return (
      <TouchableOpacity onPress={() => handleViewOrder(item.id)}>
        <View style={styles.orderContainer}>
          <Text style={styles.orderText}>Order Date: {item.orderDate}</Text>
          <Text style={styles.orderText}>Expected Delivery: {item.expDeliveryDate}</Text>
          <Text style={[styles.orderText, getStatusStyle(item.status)]}>
            Status: {item.status}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  const getStatusStyle = (status) => {
    switch (status) {
      case "Pending":
        return { color: "orange" };
      case "Delivered":
        return { color: "green" };
      case "Shipped":
        return { color: "blue" };
      case "Ordered":
        return { color: "purple" };
      default:
        return { color: "black" };
    }
  };
  

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Your Orders</Text>

      {loading ? (
        <ActivityIndicator size="large" color="#007bff" />
      ) : error ? (
        <Text style={styles.errorText}>{error}</Text>
      ) : orders.length === 0 ? (
        <Text style={styles.noOrdersText}>No orders found</Text>
      ) : (
        <FlatList
          data={orders}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderOrder}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
    backgroundColor: "#f5e0df",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  orderContainer: {
    backgroundColor: "#fff",
    padding: 20,
    marginBottom: 15,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    elevation: 4,
  },
  orderText: {
    fontSize: 16,
    color: "#333",
    marginBottom: 5,
  },
  errorText: {
    color: "red",
    fontSize: 16,
    textAlign: "center",
  },
  noOrdersText: {
    color: "#777",
    fontSize: 18,
    textAlign: "center",
    marginTop: 20,
  },
});

export default OrderPage;
