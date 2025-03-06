import React, { useEffect, useState } from "react";
import { View, FlatList, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import { Card } from "react-native-paper"; // Import the Card component
import config from "../config";

const Products = (props) => {
  const navigation = useNavigation();
  const categoryId = props.route.params.categoryId; // Getting the categoryId from route params
  const [products, setProducts] = useState([]);

  // Fetch products for a specific category
  useEffect(() => {
    axios
      .get(`${config.URL}/user/category/products/${categoryId}`)
      .then((response) => {
        if (response.data.status === "success") {
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
          <TouchableOpacity onPress={() => handleViewProduct(item.id)}>
            <Card style={styles.card}>
              <Card.Content>
                <View style={styles.productContainer}>
                  <Image source={{ uri: item.productImage }} style={styles.productImage} />
                  <View style={styles.productDetails}>
                    <Text style={styles.productName}>{item.name}</Text>
                    <Text style={styles.price}>Price: ₹{item.price}</Text>
                    <Text style={styles.rating}>{item.rating} ⭐</Text>
                  </View>
                </View>
              </Card.Content>
            </Card>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f5e0df"
  },
  card: {
    marginBottom: 15,
    borderRadius: 10,
    elevation: 4,
    backgroundColor: "#fff",
  },
  productContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  productImage: {
    width: 100,
    height: 100,
    marginRight: 10,
  },
  productDetails: {
    flex: 1,
  },
  productName: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  rating: {
    fontSize: 16,
    marginBottom: 10,
    color: "#f39c12",
  },
  price: {
    fontSize: 18,
    color: "#007bff",
    marginBottom: 10,
  },
});

export default Products;
