import React, { useEffect, useState } from "react";
import { View, Text, Button, StyleSheet, TouchableOpacity, Image } from "react-native";
import axios from "axios";
import { useRoute, useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Card } from "react-native-paper"; // Import Card component for better design
import config from "../config";


const ProductDetails = (props) => {
  const route = useRoute();
  const navigation = useNavigation();
  const { productId } = route.params;  // Retrieve productId from navigation params
  const [product, setProduct] = useState(null);

  // Fetch product details using productId
  useEffect(() => {
    axios
      .get(`${config.URL}/user/product/${productId}`)
      .then((response) => {
        if (response.data.status === "success") {
          setProduct(response.data.data);
        } else {
          alert("Product not found.");
        }
      })
      .catch((error) => {
        console.error(error);
        alert("Error fetching product details.");
      });
  }, [productId]);

  const handleAddToCart = async () => {
    try {
      debugger
      const userId = await AsyncStorage.getItem('userId');
      // const userId = JSON.stringify(id);
      console.log("Retrieved userId:", userId); 
  
      if (!userId) {
        alert("User ID not found. Please log in.");
        return;
      }
  
      // Check if a cart already exists for the user
      const cartResponse = await axios.get(`${config.URL}/user/cart/${userId}`);
  
      let cartId;
      if (cartResponse.data.status === "success" && cartResponse.data.data) {
        // Cart exists, use the existing cart ID
        cartId = cartResponse.data.data.id;
      } else {
        // Create a new cart
        const cart = {
          id: 0,
          userId: userId,
          createdOn: new Date().toISOString(),
          totalItems: 0
        };
  
        const newCartResponse = await axios.post(`${config.URL}/user/cart`, cart);
  
        if (newCartResponse.data.status === "success") {
          cartId = newCartResponse.data.data.id;
        } else {
          alert("Failed to create a new cart. Please try again.");
          return;
        }
      }
  
      // Add item to the cart
      const addItemResponse = await axios.post(`${config.URL}/cart/additem`, {
        cartId: cartId,
        productId: productId,
        quantity: 1  // Update with desired quantity
      });
  
      if (addItemResponse.data.status === 'success') {
        props.navigation.navigate('go-cart',{cartId:cartId});
      } else {
        alert("Failed to add product to the cart. Please try again.");
      }
    } catch (error) {
      console.error("Error adding to cart:", error);
      alert("An error occurred while adding to cart.");
    }
  };

  if (!product) {
    return <Text>Loading...</Text>;
  }

  return (
    <View style={styles.container}>
      <Card style={styles.card}>
        {product.image && <Image source={{ uri: product.image }} style={styles.productImage} />}
        <Card.Content>
          <Text style={styles.title}>{product.name}</Text>
          <Text style={styles.price}>Price: ${product.price}</Text>
          <Text style={styles.rating}>Rating: {product.rating} stars</Text>
          <Text style={styles.expiry}>Expiry Date: {product.expiry_date}</Text>
          
          <TouchableOpacity style={styles.addToCartButton} onPress={handleAddToCart}>
            <Text style={styles.addToCartText}>Add to Cart</Text>
          </TouchableOpacity>
        </Card.Content>
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f8f9fa",
  },
  card: {
    borderRadius: 10,
    elevation: 4,
    backgroundColor: "#fff",
    padding: 20,
  },
  productImage: {
    width: "100%",
    height: 250,
    resizeMode: "contain",
    marginBottom: 15,
    borderRadius: 10,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#333",
  },
  price: {
    fontSize: 18,
    color: "#007bff",
    marginBottom: 10,
  },
  rating: {
    fontSize: 16,
    marginBottom: 10,
    color: "#f39c12",
  },
  expiry: {
    fontSize: 16,
    marginBottom: 20,
    color: "#333",
  },
  addToCartButton: {
    backgroundColor: "#007bff",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  addToCartText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default ProductDetails;
