import axios from "axios";
import { useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList, TouchableOpacity, ActivityIndicator, Image } from "react-native";
import { useRoute } from "@react-navigation/native";
import config from "../config";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Cart = (props) => {
  const route = useRoute();
  const { cartId } = route.params;
  const [products, setProducts] = useState([]);
  const [quantities, setQuantities] = useState([]);
  const [addresses, setAddresses] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [navigateTo, setNavigateTo] = useState(null);

  useEffect(() => {
    axios.get(`${config.URL}/cart/products/${cartId}`)
      .then((result) => {
        if (result.data.status === 'success') {
          debugger;
          const quantities = result.data.data.map(item => item.quantity);
          setQuantities(quantities);
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

  const handleBuyNow = async (product, index) => {
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

  const handleDelete = async (productId) => {
    setIsLoading(true);
    try {
      const result = await axios.delete(`${config.URL}/${cartId}/items/${productId}`);
      if (result.data.status === 'success') {
        setProducts(products.filter(product => product.id !== productId));
        const newQuantities = [...quantities];
        newQuantities.splice(products.findIndex(product => product.id === productId), 1);
        setQuantities(newQuantities);
      } else {
        console.error("Failed to delete product:", result.data.message);
      }
    } catch (error) {
      console.error("Error deleting product:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (navigateTo && selectedProduct) {
      if (navigateTo === "go-placeOrder" && addresses.length > 0) {
        const index = products.findIndex(product => product.id === selectedProduct.id);
        const quantity = quantities[index];
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
      <Text style={styles.header}>My Cart</Text>
      {isLoading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <FlatList 
          data={products}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item, index }) => (
            <View style={styles.productContainer}>
              <Image source={{ uri: `http://localhost:8080/images/${item.productImage}` }} style={styles.productImage} />
              <View style={styles.productDetails}>
                <Text style={styles.productName}>Product Name: {item.name}</Text>
                <Text style={styles.productPrice}>Product Price: ${item.price}</Text>
                <Text style={styles.productRating}>Product Rating: {item.rating}</Text>
                <Text style={styles.productQuantity}>Product Quantity: {quantities[index]}</Text>
              </View>
              <TouchableOpacity 
                style={styles.buyButton} 
                onPress={() => handleBuyNow(item, index)} 
              >
                <Text style={styles.buyButtonText}>Buy Now</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={styles.deleteButton} 
                onPress={() => handleDelete(item.id)} 
              >
                <Text style={styles.deleteButtonText}>Delete</Text>
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
    backgroundColor: "#f8f9fa", // Light gray background
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#343a40", // Dark gray text
    marginBottom: 20,
  },
  productContainer: {
    flexDirection: "row",
    backgroundColor: "#fff", 
    padding: 10,
    marginBottom: 15,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ddd", 
    shadowColor: "#000", 
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    elevation: 2,
    alignItems: "center",
  },
  productImage: {
    width: 50,
    height: 50,
    marginRight: 10,
    borderRadius: 4,
  },
  productDetails: {
    flex: 1,
  },
  productName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#007bff", // Bootstrap primary color
  },
  productPrice: {
    fontSize: 14,
    color: "#28a745", // Green for price
  },
  productRating: {
    fontSize: 12,
    color: "#ffc107", // Yellow for rating
  },
  productQuantity: {
    fontSize: 14,
    color: "#17a2b8", // Info color for quantity
  },
  buyButton: {
    backgroundColor: "#007bff", 
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 5,
    alignItems: "center",
    marginLeft: 5,
  },
  buyButtonText: {
    color: "#fff", 
    fontSize: 12,
    fontWeight: "bold",
  },
  deleteButton: {
    backgroundColor: "#dc3545", // Bootstrap danger color
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 5,
    alignItems: "center",
    marginLeft: 5,
  },
  deleteButtonText: {
    color: "#fff", 
    fontSize: 12,
    fontWeight: "bold",
  },
});

export default Cart;
