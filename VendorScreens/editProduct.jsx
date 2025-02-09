import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, TouchableOpacity, ScrollView, Text, Image } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import axios from 'axios';
import Toast from 'react-native-toast-message';
import { Platform } from 'react-native';

const EditProduct = (props) => {
    const { pid, pname, pbrand, pprice, prating, pdate, pimage } = props.route.params;

    const [product, setProduct] = useState({
        id: pid,
        brand: pbrand,
        name: pname,
        price: pprice,
        rating: prating,
        expiryDate: pdate,
    });

    const [image, setImage] = useState(pimage);

    const handleInputChange = (name, value) => {
        setProduct({ ...product, [name]: value });
    };

    const selectImage = () => {
        launchImageLibrary({ mediaType: 'photo' }, (response) => {
            if (!response.didCancel && !response.error) {
                const { uri } = response.assets[0];
                setImage(uri);
            }
        });
    };

    const editProduct = () => {
        const formData = new FormData();
    
        // Append the product as a JSON string
        formData.append('product', JSON.stringify(product));
    
        if (image) {
            // Adjust the URI for different platforms
            const imageUri = Platform.OS === 'android' ? image : image.replace('file://', '');
            const imageFileName = imageUri.split('/').pop();
    
            // Create a new FormData entry with proper fields
            formData.append('productImage', {
                uri: imageUri,
                name: imageFileName,
                type: 'image/jpeg',
            });
        } else {
            console.log('No image selected');
        }
    
        // IMPORTANT: Do not set the 'Content-Type' header manually
        axios.put(`http://localhost:8080/vendor/editProduct/${pid}`, formData)
        .then((result) => {
            if (result.data.status === 'success') {
                Toast.show({
                    type: 'success',
                    text1: 'Product Updated',
                });
                props.navigation.navigate('go-vendorCategories');
            } else {
                Toast.show({
                    type: 'error',
                    text1: 'Failed to Update Product',
                });
            }
        })
        .catch((error) => {
            console.error('Error updating product:', error);
            Toast.show({
                type: 'error',
                text1: 'Network error, please try again',
            });
        });
    };

    const cancel = () => {
        props.navigation.navigate('go-vendorCategories');
    };

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.title}>Edit Product</Text>
            <TextInput
                style={styles.input}
                placeholder="Enter product brand"
                value={product.brand}
                onChangeText={(value) => handleInputChange('brand', value)}
            />
            <TextInput
                style={styles.input}
                placeholder="Enter product name"
                value={product.name}
                onChangeText={(value) => handleInputChange('name', value)}
            />
            <TextInput
                style={styles.input}
                placeholder="Enter product price"
                value={product.price.toString()}
                keyboardType="numeric"
                onChangeText={(value) => handleInputChange('price', value)}
            />
            <TextInput
                style={styles.input}
                placeholder="Enter product rating"
                value={product.rating.toString()}
                keyboardType="numeric"
                onChangeText={(value) => handleInputChange('rating', value)}
            />
            <TextInput
                style={styles.input}
                placeholder="Enter expiry date"
                value={product.expiryDate}
                onChangeText={(value) => handleInputChange('expiryDate', value)}
            />
            {image ? (
                <Image source={{ uri: image }} style={styles.productImage} />
            ) : null}
            <TouchableOpacity style={styles.button} onPress={selectImage}>
                <Text style={styles.buttonText}>Select Image</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={editProduct}>
                <Text style={styles.buttonText}>Edit Product</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={cancel}>
                <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>
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
        textAlign: 'center',
        fontSize: 24,
        marginBottom: 20,
    },
    input: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        marginBottom: 10,
        padding: 10,
        borderRadius: 4,
    },
    button: {
        backgroundColor: '#007bff',
        padding: 10,
        borderRadius: 4,
        marginBottom: 10,
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
    },
    productImage: {
        width: 100,
        height: 100,
        marginBottom: 10,
    },
});

export default EditProduct;
