import { useState } from "react";
import { View, Switch } from "react-native";
import { TextInput, Button, Text } from "react-native-paper";
import axios from "axios";

function Register(props) {
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [shopName, setShopName] = useState("");
  const [isVendor, setIsVendor] = useState(false);

  const RegisterUser = () => {
    if (!first_name || !last_name || !email || !password || !phone || (isVendor && !shopName)) {
      alert("All fields are required!");
      return;
    }

    const userDetails = {
      first_name,
      last_name,
      email,
      phone,
      password,
      shop_name: isVendor ? shopName : null,
    };

    axios
      .post("http://localhost:8080/user/register", userDetails)
      .then((response) => {
        alert("Success", response.data.success);
        props.navigation.navigate("go-login");
      })
      .catch((error) => {
        console.error(error);
        alert("Error", "Failed to register user");
      });
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center", padding: 20 }}>
      <Text style={{ fontSize: 24, fontWeight: "bold", marginBottom: 20 }}>Registration</Text>
      
      <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 20 }}>
        <Text>Vendor</Text>
        <Switch value={isVendor} onValueChange={setIsVendor} />
        <Text>User</Text>
      </View>

      <TextInput label="First Name" mode="outlined" value={first_name} onChangeText={setFirstName} style={{ width: "100%", marginBottom: 10 }} />
      <TextInput label="Last Name" mode="outlined" value={last_name} onChangeText={setLastName} style={{ width: "100%", marginBottom: 10 }} />
      <TextInput label="Email" mode="outlined" value={email} onChangeText={setEmail} style={{ width: "100%", marginBottom: 10 }} />
      <TextInput label="Phone" mode="outlined" value={phone} onChangeText={setPhone} style={{ width: "100%", marginBottom: 10 }} />
      
      {isVendor && (
        <TextInput label="Shop Name" mode="outlined" value={shopName} onChangeText={setShopName} style={{ width: "100%", marginBottom: 10 }} />
      )}
      
      <TextInput label="Password" mode="outlined" secureTextEntry value={password} onChangeText={setPassword} style={{ width: "100%", marginBottom: 10 }} />
      <TextInput label="Confirm Password" mode="outlined" secureTextEntry value={confirmPassword} onChangeText={setConfirmPassword} style={{ width: "100%", marginBottom: 10 }} />
      
      <Button mode="contained" onPress={RegisterUser} style={{ marginTop: 20 }}>Register</Button>
    </View>
  );
}

export default Register;