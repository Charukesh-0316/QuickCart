import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "./Screens/login";
import Register from "./Screens/register";
import Category from "./Screens/categories";
import Products from "./Screens/products";
import VendorCategory from "./VendorScreens/categories";
import VendorProducts from "./VendorScreens/Addproduct";
import addCategory from "./VendorScreens/addCategory";
import 'bootstrap/dist/css/bootstrap.min.css';
import ProductList from "./VendorScreens/ProductList";
import AddAddress from "./VendorScreens/addAddress";
import AddStore from "./VendorScreens/addStore";
import Toast from "react-native-toast-message";
import EditProduct from "./VendorScreens/editProduct";
import CategoryProducts from "./VendorScreens/categoryProducts";
import AddProduct from "./VendorScreens/Addproduct";
import Dashboard from "./VendorScreens/dashboard";
import ProductStock from "./VendorScreens/productStock";
import ProductReviews from "./VendorScreens/ProductReview";
import AddStock from "./VendorScreens/addStock";


function App() {

  var Stack= createNativeStackNavigator()
  return ( 

   <NavigationContainer>

    <Stack.Navigator>
    
    <Stack.Screen name="go-login" component={Login}/>
    <Stack.Screen name="go-register" component={Register}/>
    <Stack.Screen name="go-category" component={Category}/>
    <Stack.Screen name="go-products" component={Products}/>

    {/* Vendor Screen */}
    <Stack.Screen name="go-vendorCategories" component={VendorCategory}/>
    <Stack.Screen name="go-addProduct" component={AddProduct}/>
    <Stack.Screen name="add-vendorCategory" component={addCategory}/>
    <Stack.Screen name="go-productList" component={ProductList}/>
    <Stack.Screen name="go-addAddress" component={AddAddress}/>
    <Stack.Screen name="go-addStore" component={AddStore}/>
    <Stack.Screen name="go-editProduct" component={EditProduct}/>
    <Stack.Screen name="go-categoryProducts" component={CategoryProducts}/>
    <Stack.Screen name="go-dashboard" component={Dashboard}/>
    <Stack.Screen name="go-productStock" component={ProductStock}/>
    <Stack.Screen name="go-reviewProduct" component={ProductReviews}/>
    <Stack.Screen name="go-addStock" component={AddStock}/>
    </Stack.Navigator>
    
<Toast ref={(ref) => Toast.setRef(ref)} />
  
  
   </NavigationContainer>

    
   );
}

export default App;


