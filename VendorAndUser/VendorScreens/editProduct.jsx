import React, { useState } from 'react';
import { 
    View, TextInput, StyleSheet, TouchableOpacity, ScrollView, 
    Text, Image, Platform 
} from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import axios from 'axios';
import Toast from 'react-native-toast-message';
import config from '../config';

const EditProduct = (props) => {
    const { pid, pname, pbrand, pprice, prating, pdate, pimage } = props.route.params;

    const [product, setProduct] = useState({
        id: pid,
        brand: pbrand || '',
        name: pname || '',
        price: String(pprice) || '',
        rating: String(prating) || '',
        expiryDate: pdate || '',
    });

    const [image, setImage] = useState(pimage || null);

    const handleInputChange = (name, value) => {
        setProduct({ ...product, [name]: value });
    };

    const selectImage = () => {
        launchImageLibrary({ mediaType: 'photo' }, (response) => {
            if (response.didCancel) return;
            if (response.error) {
                Toast.show({
                    type: 'error',
                    text1: 'Image selection failed',
                });
                return;
            }
            if (response.assets && response.assets.length > 0) {
                const selectedImage = response.assets[0];
                setImage(selectedImage);
            }
        });
    };

    const editProduct = async () => {
        debugger;
        try {
            const formData = new FormData();
            formData.append('productJson', JSON.stringify({
                id: product.id,
                brand: product.brand,
                name: product.name,
                price: parseFloat(product.price),
                rating: parseFloat(product.rating),
                expiryDate: product.expiryDate,
            }));

            if (image && image !== pimage) {
                const imageUri = image.uri
                // const imageFileName = image.fileName ? image.fileName.split('.').pop().toLowerCase() : 'jpg';
                const extension = image.fileName ? image.fileName.split('.').pop().toLowerCase() : 'jpg';
                const type = image.type || `image/${extension}`;
                

                formData.append('productImage', JSON.stringify({
                    uri: imageUri,
                    name: image.fileName || `image_${Date.now()}.${extension}`,
                    type: type,
                }));
            }

            const response = await axios.put(`${config.URL}/vendor/editProduct/${pid}`, formData);
            if (response.data.status === 'success') {
                Toast.show({
                    type: 'success',
                    text1: 'Product Updated Successfully',
                });
                props.navigation.navigate('go-vendorCategories');
            } else {
                Toast.show({
                    type: 'error',
                    text1: 'Failed to Update Product',
                });
            }
        } catch (error) {
            console.error('Error updating product:', error.response ? error.response.data : error.message);
            Toast.show({
                type: 'error',
                text1: 'Network error, please try again',
            });
        }
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
                value={product.price}
                keyboardType="numeric"
                onChangeText={(value) => handleInputChange('price', value)}
            />
            <TextInput
                style={styles.input}
                placeholder="Enter product rating"
                value={product.rating}
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
            ) : (
                <Text style={styles.noImageText}>No Image Selected</Text>
            )}
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
        alignSelf: 'center',
    },
    noImageText: {
        textAlign: 'center',
        fontSize: 14,
        color: '#777',
        marginBottom: 10,
    }
});

export default EditProduct;
