import axios from "axios";
import { useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList, TouchableOpacity, ActivityIndicator } from "react-native";
import { useRoute } from "@react-navigation/native";
import config from "../config";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Cart = (props) => {
  const route = useRoute();
  const { cartId } = route.params;
  const [products, setProducts] = useState([]);
  const [quantity, setQuantity] = useState('');
  const [addresses, setAddresses] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [navigateTo, setNavigateTo] = useState(null);

  useEffect(() => {
    axios.get(`${config.URL}/cart/products/${cartId}`)
      .then((result) => {
        if (result.data.status === 'success') {
          const productIds = result.data.data.map(item => item.cartItemId.productid);
          getProducts(productIds);
        } else {
          console.error("API call was not successful:", result.data.message);
        }
      })
      .catch((error) => {
        console.error("Error fetching cart products:", error);
      });
  }, [cartId]);

  const getProducts = (ids) => {
    Promise.all(ids.map(id => 
      axios.get(`${config.URL}/user/product/${id}`)
        .then((result) => result.data.data)
        .catch((error) => {
          console.error("Error fetching product details:", error);
          return null;
        })
    ))
    .then((products) => {
      setProducts(products.filter(product => product !== null));
    });
  };

  const handleBuyNow = async (product) => {
    const userId = await AsyncStorage.getItem('userId');
    setIsLoading(true);
    setSelectedProduct(product);

    try {
      const result = await axios.get(`${config.URL}/user/address/${userId}`);
      if (result.data.status === 'success') {
        setAddresses(result.data.data);
        setNavigateTo("go-placeOrder");
      } else {
        console.error("Failed to fetch addresses:", result.data.message);
        setNavigateTo("go-address");
      }
    } catch (error) {
      console.error("Error fetching addresses:", error);
      setNavigateTo("go-address");
    }
  };

  useEffect(() => {
    if (navigateTo && selectedProduct) {
      if (navigateTo === "go-placeOrder" && addresses.length > 0) {
        props.navigation.navigate('go-placeOrder', { pid: selectedProduct.id, addressId: addresses[0], quantity: quantity });
      } else if (navigateTo === "go-address") {
        props.navigation.navigate("go-address", { pid: selectedProduct.id });
      }
      setIsLoading(false);
      setNavigateTo(null);
    }
  }, [navigateTo, selectedProduct, addresses]);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Cart {cartId}</Text>
      {isLoading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <FlatList 
          data={products}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.productContainer}>
              <Text style={styles.productName}>Product Name: {item.name}</Text>
              <Text style={styles.productPrice}>Product Price: ${item.price}</Text>
              <Text style={styles.productRating}>Product Rating: {item.rating}</Text>
              <TouchableOpacity 
                style={styles.buyButton} 
                onPress={() => handleBuyNow(item)} 
              >
                <Text style={styles.buyButtonText}>Buy Now</Text>
              </TouchableOpacity>
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
    backgroundColor: "#f8f9fa", // Light gray background, Bootstrap-like
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#343a40", // Dark gray text
    marginBottom: 20,
  },
  productContainer: {
    backgroundColor: "#fff", 
    padding: 15,
    marginBottom: 15,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ddd", 
    shadowColor: "#000", 
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    elevation: 2,
  },
  productName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#007bff", // Bootstrap primary color
  },
  productPrice: {
    fontSize: 16,
    color: "#28a745", // Green for price
  },
  productRating: {
    fontSize: 14,
    color: "#ffc107", // Yellow for rating
  },
  buyButton: {
    backgroundColor: "#007bff", 
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 10,
  },
  buyButtonText: {
    color: "#fff", 
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default Cart;
