import axios from "axios";
import { useState } from "react";
import { View } from "react-native";
import { Button, TextInput } from "react-native-paper";

function Login(props) {


    const [credential, setCredential] = useState({ email: "", password: "" });

    
    const RegisterHere = () => {
        props.navigation.navigate("go-register");
    };

    
    const SignIn = () => {

    

        axios
      .post("http://localhost:8080/user/login", credential)
      .then((response) => {
        console.log("response"+response)
        if(response.data.status=='success'){
        alert("Success", response.data.success);
        props.navigation.navigate("go-showbooks");
        }
        else{

        }
      })
      .catch((error) => {
        console.error(error);
        alert("Error", "Failed to register user");
      });
    
    };

    return (
        <View
            style={{
                backgroundColor: "silver",
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
                padding: 20,
            }}
        >
           
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
