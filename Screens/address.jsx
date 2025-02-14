import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, ScrollView } from "react-native";
import axios from "axios";
import { useRoute, useNavigation } from "@react-navigation/native";
import Toast from "react-native-toast-message";
import AsyncStorage from "@react-native-async-storage/async-storage";
import config from "../config";

const Address = (props) => {
  const route = useRoute();
  const navigation = useNavigation();
  const selectedItems = props.route.params?.pid?.selectedItems || [];

  const [address, setAddress] = useState({
    block: "",
    street: "",
    area: "",
    city: "",
    state: "",
    country: "",
    zipCode: "",
  });

  const [message, setMessage] = useState("");
  const [addressId, setAddressId] = useState(null); // Store saved address ID

  const handleSaveAddress = async () => {
    const { block, street, area, city, state, country, zipCode } = address;
    if (!block || !street || !area || !city || !state || !country || !zipCode) {
      setMessage("All address fields are required.");
      return;
    }

    try {
      const userId = await AsyncStorage.getItem("userId");
      const parsedUserId = userId ? Number(userId) : null;

      const payload = {
        userId: parsedUserId,
        address: address
      };

      console.log("Sending payload:", JSON.stringify(payload, null, 2));

      const response = await axios.post(`${config.URL}/user/address`, payload);

      if (response.data.status === "success") {
        setAddressId(response.data.data.id); // Store address ID for later use
        Toast.show({
          type: "success",
          text1: "Address Saved",
          text2: "You can now place your order.",
          visibilityTime: 3000,
        });
      } else {
        alert("Error saving address.");
      }
    } catch (error) {
      console.error("API Error:", error.response?.data || error.message);
      alert("Error saving address.");
    }
  };

  const handlePlaceOrder = () => {
    if (!addressId) {
      alert("Please save your address before placing an order.");
      return;
    }

    navigation.navigate("go-placeOrder", {
      addressId: addressId,
      productId: selectedItems,
    });
  };

  const handleChange = (field, value) => {
    setAddress({ ...address, [field]: value });
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Enter Your Address</Text>

      {message ? <Text style={styles.message}>{message}</Text> : null}

      <TextInput style={styles.input} value={address.block} onChangeText={(value) => handleChange("block", value)} placeholder="Block" />
      <TextInput style={styles.input} value={address.street} onChangeText={(value) => handleChange("street", value)} placeholder="Street" />
      <TextInput style={styles.input} value={address.area} onChangeText={(value) => handleChange("area", value)} placeholder="Area" />
      <TextInput style={styles.input} value={address.city} onChangeText={(value) => handleChange("city", value)} placeholder="City" />
      <TextInput style={styles.input} value={address.state} onChangeText={(value) => handleChange("state", value)} placeholder="State" />
      <TextInput style={styles.input} value={address.country} onChangeText={(value) => handleChange("country", value)} placeholder="Country" />
      <TextInput style={styles.input} value={address.zipCode} onChangeText={(value) => handleChange("zipCode", value)} placeholder="Zip Code" keyboardType="numeric" />

      <View style={styles.buttonContainer}>
        <Button title="Save Address" onPress={handleSaveAddress} />
      </View>

      <View style={[styles.buttonContainer, { opacity: addressId ? 1 : 0.5 }]}>
        <Button title="Place Order" onPress={handlePlaceOrder} disabled={!addressId} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    borderColor: "#ccc",
    borderWidth: 1,
    padding: 10,
    marginBottom: 15,
    borderRadius: 5,
  },
  message: {
    color: "red",
    marginBottom: 10,
    textAlign: "center",
  },
  buttonContainer: {
    marginTop: 10,
  },
});

export default Address;
