import axios from 'axios';
import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text } from 'react-native';
import Toast from 'react-native-toast-message';
import config from "../config";

function AddAddress(props) {
    const [address, setAddress] = useState({
        id: 0,
        block: '',
        street: '',
        area: '',
        city: '',
        state: '',
        country: '',
        zipCode: ''
    });

    const handleInputChange = (name, value) => {
        setAddress({ ...address, [name]: value });
    };

    const handleSubmit = () => {
        console.log('Address Submitted: ', address);
        axios.post(`${config.URL}/vendor/address`,address)
        .then((result)=>{
            debugger;
            if(result.data.status === 'success'){
                Toast.show({
                    type: "success",
                    text1: "Address Submitted",
                })
                props.navigation.navigate("go-addStore",{id:result.data.data.id})
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
            <Text style={styles.label}>Block</Text>
            <TextInput
                style={styles.input}
                placeholder="Enter block"
                value={address.block}
                onChangeText={(value) => handleInputChange('block', value)}
            />
            <Text style={styles.label}>Street</Text>
            <TextInput
                style={styles.input}
                placeholder="Enter street"
                value={address.street}
                onChangeText={(value) => handleInputChange('street', value)}
            />
            <Text style={styles.label}>Area</Text>
            <TextInput
                style={styles.input}
                placeholder="Enter area"
                value={address.area}
                onChangeText={(value) => handleInputChange('area', value)}
            />
            <Text style={styles.label}>City</Text>
            <TextInput
                style={styles.input}
                placeholder="Enter city"
                value={address.city}
                onChangeText={(value) => handleInputChange('city', value)}
            />
            <Text style={styles.label}>State</Text>
            <TextInput
                style={styles.input}
                placeholder="Enter state"
                value={address.state}
                onChangeText={(value) => handleInputChange('state', value)}
            />
            <Text style={styles.label}>Country</Text>
            <TextInput
                style={styles.input}
                placeholder="Enter country"
                value={address.country}
                onChangeText={(value) => handleInputChange('country', value)}
            />
            <Text style={styles.label}>Zip Code</Text>
            <TextInput
                style={styles.input}
                placeholder="Enter zip code"
                value={address.zipCode}
                onChangeText={(value) => handleInputChange('zipCode', value)}
                keyboardType="numeric"
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

export default AddAddress;
