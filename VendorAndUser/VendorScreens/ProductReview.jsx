import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import axios from "axios";
import config from "../config";
import AsyncStorage from "@react-native-async-storage/async-storage";

function ProductReviews(props) {
    const [reviews, setReviews] = useState([]); // Changed to an array for initial state
    const productId = props.route.params.pid;

    useEffect(() => {
        const getReviews = async () => {
            try {
                const result = await axios.get(`${config.URL}/vendor/reviewProduct/${productId}`);
                if (result.data.status === 'success') {
                    setReviews(result.data.data);
                }
            } catch (error) {
                console.error("Error fetching reviews:", error);
            }
        };

        getReviews();
    }, [productId]);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Product Reviews</Text>
            {reviews.length > 0 ? (
                reviews.map((review, index) => (
                    <View key={index} style={styles.reviewContainer}>
                        <View style={styles.userContainer}>
                            <Text style={styles.userName}>{review.user.firstName} {review.user.lastName}</Text>
                        </View>
                        <View style={styles.reviewTextContainer}>
                            <Text style={styles.reviewIndex}>{index + 1}.</Text>
                            <Text style={styles.reviewText}>{review.reviewText}</Text>
                        </View>
                    </View>
                ))
            ) : (
                <Text style={styles.noReviewText}>No Reviews</Text>
            )}
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
        textAlign: 'center',
        color: '#007bff'
    },
    reviewContainer: {
        marginBottom: 15,
        padding: 10,
        borderRadius: 5,
        backgroundColor: '#f9f9f9'
    },
    userContainer: {
        marginBottom: 5,
        padding: 5,
        borderRadius: 5,
        backgroundColor: '#f0f0f0'
    },
    userName: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333'
    },
    reviewTextContainer: {
        flexDirection: 'row',
        alignItems: 'flex-start',
    },
    reviewIndex: {
        fontWeight: 'bold',
        marginRight: 5
    },
    reviewText: {
        flex: 1,
        fontSize: 16,
        color: '#555'
    },
    noReviewText: {
        fontSize: 16,
        color: '#aaa',
        textAlign: 'center'
    }
});

export default ProductReviews;
