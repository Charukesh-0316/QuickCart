import React, { useEffect, useState } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  Button, 
  StyleSheet, 
  Image, 
  TouchableOpacity, 
  PermissionsAndroid, 
  Platform,
  Alert 
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import Toast from 'react-native-toast-message';
import { launchImageLibrary } from 'react-native-image-picker';
import config from '../config';

function AddProduct(props) {

  // Request appropriate storage/media permission on Android
  async function requestStoragePermission() {
    if (Platform.OS === 'android') {
      try {
        // For Android 13 and above, request READ_MEDIA_IMAGES
        if (Platform.Version >= 33) {
          const result = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES,
            {
              title: "Media Permission Needed",
              message: "This app needs access to your media to select images.",
              buttonNeutral: "Ask Me Later",
              buttonNegative: "Cancel",
              buttonPositive: "OK",
            }
          );
          if (result !== PermissionsAndroid.RESULTS.GRANTED) {
            console.log("Media permission denied");
            return false;
          } else {
            console.log("Media permission granted");
            return true;
          }
        } else {
          // For Android versions below 13, request READ_EXTERNAL_STORAGE
          const result = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
            {
              title: "Storage Permission Needed",
              message: "This app needs access to your storage to select images.",
              buttonNeutral: "Ask Me Later",
              buttonNegative: "Cancel",
              buttonPositive: "OK",
            }
          );
          if (result !== PermissionsAndroid.RESULTS.GRANTED) {
            console.log("Storage permission denied");
            return false;
          } else {
            console.log("Storage permission granted");
            return true;
          }
        }
      } catch (err) {
        console.warn(err);
        return false;
      }
    }
    return true; // iOS or other platforms
  }

  // Request permission on component mount
  useEffect(() => {
    requestStoragePermission();
  }, []);

  const [product, setProduct] = useState({
    id: 0,
    brand: "",
    name: "",
    price: '',
    rating: '',
    expiryDate: '',
    productImage: null,
  });

  const handleInputChange = (name, value) => {
    setProduct({ ...product, [name]: value });
  };

  const pickImage = async () => {
    // Check permission first
    let permissionGranted = false;
    if (Platform.OS === 'android') {
      if (Platform.Version >= 33) {
        permissionGranted = await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES);
      } else {
        permissionGranted = await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE);
      }
      if (!permissionGranted) {
        permissionGranted = await requestStoragePermission();
        if (!permissionGranted) {
          Alert.alert("Permission required", "Storage permission is required to select an image.");
          return;
        }
      }
    }
  
    console.log("Launching image library...");
    const options = {
      mediaType: "photo",
    };
  
    launchImageLibrary(options, (response) => {
      if (response.didCancel) {
        console.log("User cancelled image picker");
      } else if (response.error) {
        console.log("Image Picker Error: ", response.error);
      } else if (response.assets && response.assets.length > 0) {
        const selectedImage = response.assets[0];
        
        // Extract file extension and type
        let extension = selectedImage.fileName ? selectedImage.fileName.split('.').pop().toLowerCase() : 'jpg';
        let type = selectedImage.type || `image/${extension}`;
  
        // Use Date.now() to generate a unique name for each image
        setProduct((prev) => ({
          ...prev,
          productImage: {
            uri: selectedImage.uri,
            type: type,
            name: selectedImage.fileName || `image_${Date.now()}.${extension}`
          },
        }));
      } else {
        console.log("No assets returned from image picker");
      }
    });
  };
  

  const handleAddProduct = async () => {
    debugger;
    try {
      const userId = await AsyncStorage.getItem("userId");
      const categoryId = props.route.params.id;

      if (!userId) {
        alert("User ID not found. Please log in again.");
        return;
      }

      if (!categoryId) {
        alert("Category ID is missing.");
        return;
      }

      const formData = new FormData();
      formData.append("productJson", JSON.stringify({
        id: product.id,
        brand: product.brand,
        name: product.name,
        price: product.price,
        rating: product.rating,
        expiryDate: product.expiryDate,
      }));
      formData.append("categoryId", categoryId);
      formData.append("vendorId", userId);

      if (product.productImage) {

        formData.append("productImage", JSON.stringify({
            uri: product.productImage.uri,
      type: product.productImage.type,
      name: product.productImage.fileName || product.productImage.name,
        })
    );
      }

      console.log("Category ID:", categoryId);
      console.log("Vendor ID:", userId);
      console.log("Product Image:", product.productImage);
      console.log("FormData before sending:", formData);

      const response = await axios.post(`${config.URL}/vendor/add_product`, formData);
      console.log("Response:", response.data);

      if (response.data.status === "success") {
        Toast.show({
          type: "success",
          text1: "Product Added Successfully",
        });
        props.navigation.navigate("go-addStock", { pid: response.data.data.id });
      } else {
        alert("Failed to Add Product");
      }
    } catch (error) {
      console.error("Error adding product: ", error.response ? error.response.data : error.message);
      alert("An error occurred while adding the product.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Vendor Products</Text>
      <TextInput
        placeholder="Enter product brand"
        value={product.brand}
        onChangeText={(value) => handleInputChange('brand', value)}
        style={styles.input}
      />
      <TextInput
        placeholder="Enter product name"
        value={product.name}
        onChangeText={(value) => handleInputChange('name', value)}
        style={styles.input}
      />
      <TextInput
        placeholder="Enter product price"
        value={product.price}
        onChangeText={(value) => handleInputChange('price', value)}
        keyboardType="numeric"
        style={styles.input}
      />
      <TextInput
        placeholder="Enter product rating"
        value={product.rating}
        onChangeText={(value) => handleInputChange('rating', value)}
        keyboardType="numeric"
        style={styles.input}
      />
      <TouchableOpacity onPress={pickImage} style={styles.imagePicker}>
        <Text style={styles.imagePickerText}>Pick Product Image</Text>
      </TouchableOpacity>
      {product.productImage && (
        <Image source={{ uri: product.productImage.uri }} style={styles.imagePreview} />
      )}
      <Button title="Add Product" onPress={handleAddProduct} color="#007bff" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff'
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center'
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5
  },
  imagePicker: {
    backgroundColor: "#007bff",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    marginBottom: 10,
  },
  imagePickerText: {
    color: "white",
    fontWeight: "bold",
  },
  imagePreview: {
    width: 100,
    height: 100,
    alignSelf: "center",
    marginBottom: 10,
  },
});

export default AddProduct;
