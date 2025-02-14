import { useState } from "react";
import { View, Switch } from "react-native";
import { TextInput, Button, Text } from "react-native-paper";
import axios from "axios";
import Toast from "react-native-toast-message";
import config from "../config";

function Register(props) {
  const [firstName, setfirstName] = useState("");
  const [lastName, setlastName] = useState("");
  const [email, setEmail] = useState("");
  const [mobileNo, setmobileNo] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  // const [shopName, setShopName] = useState("");
  const [isVendor, setIsVendor] = useState(false);

  // const RegisterUser = () => {
  //   if (!firstName || !lastName || !email || !password || !mobileNo || (isVendor && !shopName)) {
  //     alert("All fields are required!");
  //     return;
  //   }
  const RegisterUser = () => {
    if (!firstName || !lastName || !email || !password || !mobileNo) {
      alert("All fields are required!");
      return;
    }

    const userDetails = {
      user: {
        firstName,
        lastName,
        email,
        mobileNo,
        password,
        // shop_name: isVendor ? shopName : null,
      },
      role_Id: isVendor ? 3 : 2,
    };

    axios
      .post(`${config.URL}/user/register`, userDetails)
      .then((response) => {
        debugger;
        if (response.data.status === "success" && userDetails.role_Id === 2) {
          Toast.show({
            type: "success",
            text1: "Customer Registration Successful",
          });
          props.navigation.navigate("go-login");
        } else if (response.data.status === "success" && userDetails.role_Id === 3) {
          Toast.show({
            type: "success",
            text1: "Vendor Registration Successful",
          });
          props.navigation.navigate("go-addAddress");
        } else {
          Toast.show({
            type: "error",
            text1: "Registration Failed",
          });
        }
        // props.navigation.navigate("go-login");
      })
      .catch((error) => {
        console.error(error);
        // alert("Error", "Failed to register user");
      });
  };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
      }}
    >
      <Text style={{ fontSize: 24, fontWeight: "bold", marginBottom: 20 }}>
        Registration
      </Text>

      <View
        style={{ flexDirection: "row", alignItems: "center", marginBottom: 20 }}
      >
        <Text>Customer</Text>
        <Switch value={isVendor} onValueChange={setIsVendor} />
        <Text>Vendor</Text>
      </View>

      <TextInput
        label="First Name"
        mode="outlined"
        value={firstName}
        onChangeText={setfirstName}
        style={{ width: "100%", marginBottom: 10 }}
      />
      <TextInput
        label="Last Name"
        mode="outlined"
        value={lastName}
        onChangeText={setlastName}
        style={{ width: "100%", marginBottom: 10 }}
      />
      <TextInput
        label="Email"
        mode="outlined"
        value={email}
        onChangeText={setEmail}
        style={{ width: "100%", marginBottom: 10 }}
      />
      <TextInput
        label="mobileNo"
        mode="outlined"
        value={mobileNo}
        onChangeText={setmobileNo}
        style={{ width: "100%", marginBottom: 10 }}
      />

      {/* {isVendor && (
        <TextInput label="Shop Name" mode="outlined" value={shopName} onChangeText={setShopName} style={{ width: "100%", marginBottom: 10 }} />
      )} */}

      <TextInput
        label="Password"
        mode="outlined"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        style={{ width: "100%", marginBottom: 10 }}
      />
      <TextInput
        label="Confirm Password"
        mode="outlined"
        secureTextEntry
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        style={{ width: "100%", marginBottom: 10 }}
      />

      <Button mode="contained" onPress={RegisterUser} style={{ marginTop: 20 }}>
        Register
      </Button>
    </View>
  );
}

export default Register;
