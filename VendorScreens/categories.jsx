import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, Alert, StyleSheet, ScrollView, Animated } from "react-native";
import config from "../config";
function VendorCategory({ navigation }) {
  const [categories, setCategories] = useState([]);
  const [scaleValue] = useState(new Animated.Value(1)); // For hover effect

  const getStore = async () => {
    try {
      const userId = await AsyncStorage.getItem("userId");
      if (!userId) {
        Alert.alert("Error", "User ID not found");
        return;
      }
      debugger;
      const response = await axios.get(`${config.URL}/vendor/store/user/${userId}`);
      if (response.data.status === "success") {
        await AsyncStorage.setItem("storeId", response.data.data.id.toString());
      }
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "Failed to get store data");
    }
  };

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(`${config.URL}/user/categories`);
        if (response.data.status === "success") {
          setCategories(response.data.data);
        }
      } catch (error) {
        console.error(error);
        Alert.alert("Error", "Failed to fetch categories");
      }
    };

    fetchCategories();
    getStore();
  }, []);

  const categoryClicked = (id) => {
    console.log(id);
    navigation.navigate("go-categoryProducts", { id });
  };

  const addCategory = () => {
    navigation.navigate("add-vendorCategory");
  };

  const dashboard = () => {
    navigation.navigate("go-dashboard");
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={addCategory} style={styles.button}>
          <Text style={styles.buttonText}>+ Add Category</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={dashboard} style={[styles.button, styles.dashboardButton]}>
          <Text style={styles.buttonText}>Dashboard</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.categoriesContainer}>
        {categories.map((category) => (
          <TouchableOpacity
            key={category.id}
            onPress={() => categoryClicked(category.id)}
            style={styles.categoryCard}
            activeOpacity={0.8}
            onPressIn={() => Animated.spring(scaleValue, { toValue: 1.05, useNativeDriver: true }).start()}
            onPressOut={() => Animated.spring(scaleValue, { toValue: 1, useNativeDriver: true }).start()}
          >
            <Animated.View style={{ transform: [{ scale: scaleValue }] }}>
              <Text style={styles.categoryName}>{category.name}</Text>
            </Animated.View>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#007bff",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: "center",
    flex: 1,
    marginHorizontal: 5,
  },
  dashboardButton: {
    marginLeft: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  categoriesContainer: {
    width: "100%",
    alignItems: "center",
  },
  categoryCard: {
    padding: 20,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    marginBottom: 10,
    width: "90%",
    alignItems: "center",
    backgroundColor: "#f9f9f9",
  },
  categoryName: {
    fontSize: 24,
    color: "#333",
  },
});

export default VendorCategory;
