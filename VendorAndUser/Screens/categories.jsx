import React, { useEffect, useState } from 'react';
import { View, FlatList, Text, ActivityIndicator, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import axios from 'axios';
import config from '../config';
import AsyncStorage from '@react-native-async-storage/async-storage';

function CategoriesScreen(props) {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cartId, setCartId] = useState();

  useEffect(() => {
    // Fetch categories
    axios
      .get(`${config.URL}/user/categories`)
      .then((response) => {
        if (response.data.status === 'success') {
          setCategories(response.data.data);
        } else {
          alert('Failed to fetch categories');
        }
      })
      .catch((error) => {
        console.error(error);
        alert('Error fetching categories');
      })
      .finally(() => {
        setLoading(false);
      });

    // Fetch cart information
    const checkCart = async () => {
      try {
        const userId = await AsyncStorage.getItem('userId'); // Retrieve userId from storage
        if (userId) {
          const cartResponse = await axios.get(`${config.URL}/user/cart/${userId}`);
          if (cartResponse.data.status === 'success' && cartResponse.data.data) {
            setCartId(cartResponse.data.data.id); // Set cartId
          }
        } else {
          console.error("User ID not found");
        }
      } catch (error) {
        console.error("Error fetching cart:", error);
      }
    };

    checkCart(); // Call checkCart
  }, []);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.navButtonsContainer}>
        {/* Navigate to My Cart Button */}
        <TouchableOpacity
          style={styles.navButton}
          onPress={() => props.navigation.navigate('go-cart', { cartId: cartId })}
        >
          <Text style={styles.navButtonText}>My Cart</Text>
        </TouchableOpacity>

        {/* Navigate to My Orders Button */}
        <TouchableOpacity
          style={styles.navButton}
          onPress={() => props.navigation.navigate('go-order')}
        >
          <Text style={styles.navButtonText}>My Orders</Text>
        </TouchableOpacity>
      </View>

      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <View style={styles.categoriesContainer}>
          {categories.map((item) => (
            <TouchableOpacity
              key={item.id}
              onPress={() => props.navigation.navigate('go-products', { categoryId: item.id })}
              style={styles.categoryItem}
            >
              <Text style={styles.categoryText}>{item.name}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f5e0df"
  },
  navButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  navButton: {
    flex: 0.48,
    padding: 15,
    backgroundColor: '#007bff', // Bootstrap primary color
    borderRadius: 8,
    alignItems: 'center',
  },
  navButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  categoriesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  categoryItem: {
    width: '48%',
    padding: 20,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    backgroundColor: '#f9f9f9',
    alignItems: 'center',
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    elevation: 4,
  },
  categoryText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
});

export default CategoriesScreen;
