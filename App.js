import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "./Screens/login";
import Register from "./Screens/register";




function App() {

  var Stack= createNativeStackNavigator()
  return ( 

   <NavigationContainer>

    <Stack.Navigator>
    
    <Stack.Screen name="go-login" component={Login}/>
    <Stack.Screen name="go-register" component={Register}/>
    
      </Stack.Navigator>
    
   </NavigationContainer>

    
   );
}

export default App;


