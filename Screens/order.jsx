import React, { useState, useEffect } from "react";
import { View, Text, FlatList, StyleSheet, ActivityIndicator } from "react-native";
import axios from "axios";
import config from "../config";


const OrderPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    axios
      .get(`${config.URL}/admin/orders`) // Replace with your machine's IP
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
          renderItem={({ item }) => (
            <View style={styles.orderContainer}>
              <Text style={styles.orderText}>Order ID: {item.id}</Text>
              <Text style={styles.orderText}>Address: {item.address}</Text>
              <Text style={styles.orderText}>
                Products: {item.products ? item.products.length : 0}
              </Text>
              <Text style={styles.orderText}>Total Price: ${item.totalPrice}</Text>
            </View>
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
    backgroundColor: "#f8f9fa",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  orderContainer: {
    backgroundColor: "#fff",
    padding: 15,
    marginBottom: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ddd",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    elevation: 2,
  },
  orderText: {
    fontSize: 16,
    color: "#333",
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
