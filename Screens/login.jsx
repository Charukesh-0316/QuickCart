import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { useState } from "react";
import { View } from "react-native";
import { Button, TextInput } from "react-native-paper";
import Toast from "react-native-toast-message";
import config from "../config";

function Login(props) {

    const [credential, setCredential] = useState({ email: "", password: "" });

    const RegisterHere = () => {
        props.navigation.navigate("go-register");
    };

    const SignIn = () => {
        debugger;
        console.log("SignIn Clicked")
        axios
      .post(`${config.URL}/user/login`, credential)
      .then(async(response) => {
        console.log(response.data.data)
        if(response.data.status==='success'){
        // alert("Success", response.data.success);
        Toast.show({
            type: "success",
            text1: "LogIn Successful",
        })
        await AsyncStorage.setItem('userId', response.data.data.id.toString());
        const userId = await AsyncStorage.getItem('userId');
        debugger;
        if (userId !== null) {
            navigate(userId);
        }
        }else{
            Toast.show({
                type: "error",
                text1: "Failed please check username and password",
            })
        }
      })
      .catch((error) => {
        console.error(error);
        // alert("Error", "Failed to register user");
      });
    };

    const navigate = (id) =>{
        debugger;
        axios.get(`${config.URL}/vendor/login/${id}`)
        .then((result)=>{
            console.log(result.data)
            debugger;
            if(result.data.data === "Customer"){
                props.navigation.navigate("go-categories");
            }else if(result.data.data === "Vendor"){
                props.navigation.navigate("go-vendorCategories");
            }
        })
    }

    return (
        <View
            style={{
                backgroundColor: "silver",
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
                padding: 20,
            }}>
           
            <TextInput
                label="Enter your email"
                mode="outlined"
                style={{ width: "80%", marginBottom: 15 }}
                value={credential.email}
                onChangeText={(value) => setCredential({ ...credential, email: value })}
            />

            <TextInput
                label="Enter your password"
                mode="outlined"
                secureTextEntry={true}
                style={{ width: "80%", marginBottom: 15 }}
                value={credential.password}
                onChangeText={(value) => setCredential({ ...credential, password: value })}
            />

            <Button mode="contained" onPress={SignIn} style={{ marginBottom: 10 }}>
                Login
            </Button>

            <Button mode="text" onPress={RegisterHere}>
                Register
            </Button>
        </View>
    );
}

export default Login;
