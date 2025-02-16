import axios from "axios";
import React, { useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import { TextInput, Button, Card, Title, Paragraph, Switch, Text } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import config from "../config";

function AddStock(props) {
  const productId = props.route.params.pid;
  const [stock, setStock] = useState({
    storeProductsId: {
      storeId: 0,
      productId: productId,
    },
    stock: 0,
    available: false,
  });
  const [storeId, setStoreId] = useState(null);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchStoreId = async () => {
      try {
        const id = await AsyncStorage.getItem('storeId');
        setStoreId(id);
        setStock(prevStock => ({
          ...prevStock,
          storeProductsId: { ...prevStock.storeProductsId, storeId: id }
        }));
      } catch (error) {
        console.error('Error fetching storeId:', error);
      }
    };

    fetchStoreId();
  }, [productId]);

  const handleAddStock = () => {
    axios.post(`${config.URL}/vendor/add_stock`, stock)
      .then((result) => {
        if (result.data.status === 'success') {
          setMessage('Stock added successfully!');
        props.navigation.navigate('go-vendorCategories');
        } else {
          setMessage('Failed to add stock.');
        }
      })
      .catch((error) => {
        console.error('Error adding stock:', error);
        setMessage('Error adding stock.');
      });
  };

  return (
    <View style={styles.container}>
      <Card>
        <Card.Content>
          <Title>Add Stock</Title>
          <TextInput
            label="Stock Quantity"
            keyboardType="numeric"
            value={stock.stock.toString()}
            onChangeText={(value) => setStock({ ...stock, stock: parseInt(value) })}
            style={styles.input}
          />
          <View style={styles.switchContainer}>
            <Paragraph>Available:</Paragraph>
            <Switch
              value={stock.available}
              onValueChange={(value) => setStock({ ...stock, available: value })}
            />
          </View>
          <Button mode="contained" onPress={handleAddStock} style={styles.button}>
            Add Stock
          </Button>
          {message && <Text style={styles.message}>{message}</Text>}
        </Card.Content>
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f8f9fa',
  },
  input: {
    marginBottom: 20,
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  button: {
    marginTop: 20,
  },
  message: {
    marginTop: 20,
    fontSize: 16,
    color: 'green',
  },
});

export default AddStock;
