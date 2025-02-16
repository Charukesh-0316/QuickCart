import React, { useEffect, useState } from "react";
import { View, FlatList, Text, Button, StyleSheet, TouchableOpacity } from "react-native";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import { Card } from "react-native-paper"; // Import the Card component
import config from "../config";

const Products = (props) => {
  const navigation = useNavigation();
  const categoryId  = props.route.params.categoryId; // Getting the categoryId from route params
  const [products, setProducts] = useState([]);

  // Fetch products for a specific category
  useEffect(() => {
    axios
      .get(`${config.URL}/user/category/products/${categoryId}`)
      .then((response) => {
        if (response.data.status === "success") {
          debugger;
          setProducts(response.data.data);
        } else {
          alert("No products found.");
        }
      })
      .catch((error) => {
        console.error(error);
        alert("Error fetching products.");
      });
  }, [categoryId]);

  const handleViewProduct = (productId) => {
    // Navigate to Product Details page with the product ID
    navigation.navigate("go-productdetails", { productId });
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={products}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <Card style={styles.card}>
            <Card.Content>
              <Text style={styles.productName}>{item.name}</Text>
              <TouchableOpacity
                style={styles.viewButton}
                onPress={() => handleViewProduct(item.id)}
              >
                <Text style={styles.buttonText}>View Details</Text>
              </TouchableOpacity>
            </Card.Content>
          </Card>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  card: {
    marginBottom: 15,
    borderRadius: 10,
    elevation: 4,
    backgroundColor: "#fff",
  },
  productName: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  viewButton: {
    backgroundColor: "#007bff",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default Products;
