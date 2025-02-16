import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text } from 'react-native';
import Toast from 'react-native-toast-message';
import config from '../config';

function AddStore(props) {
    const [store, setStore] = useState({
        name: ''
    });

    const handleInputChange = (name, value) => {
        setStore({ ...store, [name]: value });
    };

    const handleSubmit = async() => {
        console.log('Store Submitted: ', store);
        debugger;
        const userId = await AsyncStorage.getItem('userId');
        const addressId = props.route.params.id;
        const payload = {
            userid:userId,
            addressid:addressId,
            name : store.name
        }
        console.log(payload)
        const url = `${config.URL}/vendor/store`
        console.log(url.toString)
        axios.post(`${config.URL}/vendor/store`,payload)
        .then((result)=>{
            console.log(result.data.status)
            if(result.data.status === 'success'){
                Toast.show({
                    type: "success",
                    text1: "Store Added",
                })
                props.navigation.navigate("go-login");
            }else{
                Toast.show({
                    type: "error",
                    text1: "Failed please try again",
                })
            }
        })
    };

    return (
        <View style={styles.container}>
            <Text style={styles.label}>User ID</Text>
            <Text style={styles.label}>Store Name</Text>
            <TextInput
                style={styles.input}
                placeholder="Enter store name"
                value={store.name}
                onChangeText={(value) => handleInputChange('name', value)}
            />
            <Button title="Submit" onPress={handleSubmit} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
        flex: 1,
    },
    label: {
        marginBottom: 5,
        fontSize: 16,
        fontWeight: 'bold',
    },
    input: {
        marginBottom: 15,
        padding: 10,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 5,
    },
});

export default AddStore;
