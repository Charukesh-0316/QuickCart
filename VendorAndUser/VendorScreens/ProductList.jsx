import React, { useEffect, useState } from 'react';
import { ScrollView, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import Toast from 'react-native-toast-message';
import config from '../config';

const ProductList = (props) => {
  // If you pass categoryId via route parameters, uncomment the next line.
  // const { categoryId } = props.route.params;

  const [products, setProducts] = useState([]);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const userId = await AsyncStorage.getItem('userId');
        const result = await axios.get(`${config.URL}/vendor/get_products/${userId}`);
        if (result.data.status === 'success') {
          setProducts(result.data.data);
        } else {
          alert(result.data.data);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    getProducts();
  }, []);

  const deleteProduct = async (id) => {
    try {
      const userId = await AsyncStorage.getItem('userId');
      // If you're using categoryId from route params, include it here.
      // For example: data: { vendorId: userId, productId: id, categoryId }
      const response = await axios({
        method: 'delete',
        url: `${config.URL}/vendor/deleteProduct`,
        data: { vendorId: userId, productId: id /*, categoryId */ },
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (response.data.status === 'success') {
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
    } catch (error) {
      console.error("Error deleting product:", error);
      Toast.show({
        type: 'error',
        text1: 'Network error, please try again',
      });
    }
  };

  const editProduct = (id) => {
    // Navigate to edit-product screen with the product id.
    props.navigation.navigate("edit-product", { pid: id });
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Product List</Text>
      {products.map((p) => (
        <View key={p.id} style={styles.productCard}>
          <Text style={styles.productName}>{p.name}</Text>
          <Text>
            <Text style={styles.boldText}>Brand: </Text>
            {p.brand}
          </Text>
          <Text>
            <Text style={styles.boldText}>Price: </Text>₹{p.price.toLocaleString()}
          </Text>
          <Text>
            <Text style={styles.boldText}>Rating: </Text>{p.rating} ⭐
          </Text>
          <Text>
            <Text style={styles.boldText}>Expiry Date: </Text>
            {new Date(p.expiryDate).toDateString()}
          </Text>
          <View style={styles.buttonRow}>
            <TouchableOpacity style={styles.editButton} onPress={() => editProduct(p.id)}>
              <Text style={styles.buttonText}>Edit</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.deleteButton} onPress={() => deleteProduct(p.id)}>
              <Text style={styles.buttonText}>Delete</Text>
            </TouchableOpacity>
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
    textAlign: "center",
    fontSize: 24,
    marginBottom: 20,
  },
  productCard: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginVertical: 10,
  },
  productName: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  boldText: {
    fontWeight: "bold",
  },
  buttonRow: {
    flexDirection: 'row',
    marginTop: 10,
    justifyContent: 'space-between',
  },
  editButton: {
    backgroundColor: "#007bff",
    padding: 10,
    borderRadius: 4,
  },
  deleteButton: {
    backgroundColor: "#dc3545",
    padding: 10,
    borderRadius: 4,
  },
  buttonText: {
    color: "#fff",
    fontSize: 14,
  },
});

export default ProductList;
