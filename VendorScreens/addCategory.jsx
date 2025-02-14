import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import axios from 'axios';
import config from '../config'; // Make sure to import the config properly

function AddCategory(props) {
    const [categoryName, setCategoryName] = useState("");

    const handleAddCategory = async () => {
        console.log("Category Added: ", categoryName);
        const categoryData = {
            id: 0,
            name: categoryName
        };
        try {
            const result = await axios.post(`${config.URL}/vendor/add_category`, categoryData);
            if (result.data.status === "success") {
                Alert.alert("Success", "Category Added Successfully");
                props.navigation.navigate("go-vendorCategories");
            } else {
                Alert.alert("Error", "Failed to Add Category");
            }
        } catch (error) {
            console.error("Error adding category:", error);
            Alert.alert("Error", "Failed to Add Category");
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Add Category</Text>
            <TextInput
                value={categoryName}
                onChangeText={setCategoryName}
                placeholder="Enter category name"
                style={styles.input}
            />
            <TouchableOpacity onPress={handleAddCategory} style={styles.button}>
                <Text style={styles.buttonText}>Add Category</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
        backgroundColor: "#f5f5f5",
        borderRadius: 8,
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        alignItems: 'center'
    },
    title: {
        marginBottom: 20,
        color: "#333",
        fontSize: 24,
        fontWeight: 'bold'
    },
    input: {
        padding: 10,
        width: "100%",
        marginBottom: 20,
        borderRadius: 4,
        borderWidth: 1,
        borderColor: "#ddd",
        fontSize: 16
    },
    button: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 4,
        backgroundColor: "#007bff",
    },
    buttonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold"
    }
});

export default AddCategory;
