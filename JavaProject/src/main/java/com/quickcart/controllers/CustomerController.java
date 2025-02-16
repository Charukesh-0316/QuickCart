package com.quickcart.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.quickcart.DTO.ReviewDTO;
import com.quickcart.DTO.ShopResult;
import com.quickcart.DTO.UserAddressDTO;
import com.quickcart.DTO.UserDTO;
import com.quickcart.DTO.UserOrdersDTO;
import com.quickcart.entities.Address;
import com.quickcart.entities.Category;
import com.quickcart.entities.Order;
import com.quickcart.entities.Product;
import com.quickcart.entities.Review;
import com.quickcart.entities.User;
import com.quickcart.models.UserAuthenticate;
import com.quickcart.services.UserService;

@RestController
@CrossOrigin
public class CustomerController {
	
	@Autowired
	private UserService userService;
	
	@PostMapping("user/register")
	public ShopResult<?> registerUser(@RequestBody UserDTO user){
		System.out.println(user.toString());
		User registerdUser = userService.registerUser(user);
		return ShopResult.success(registerdUser);
		
	}
	
	@GetMapping("/users")
	public ShopResult<?> getAllUsers(){
	    List<User> users = userService.getAllUsers(); 
	    System.err.println(users.toString());
	    if (users.isEmpty()) { 
	        return ShopResult.error("No users found"); 
	    } else { 
	        return ShopResult.success(users); 
	    }
	}

	@GetMapping("/user/categories")
	public ShopResult<?> getCategories() {
		List<Category> category_list = userService.getAllCategories();
		if (category_list.isEmpty()) {
			return ShopResult.error("No categories found");
		} else {
			return ShopResult.success(category_list);
		}
	}

	@GetMapping("user/category/products/{id}")
	public ShopResult<?> getProductsByCategory(@PathVariable("id")int id){
		List<Product> product_list = userService.getAllProductByCategory(id);
		if(product_list.isEmpty()) {
			return ShopResult.error("No Product in this category");
		}else {
			return ShopResult.success(product_list);
		}

	}
	
	@PostMapping("user/login")
	public ShopResult<?> logIn(@RequestBody UserAuthenticate userAuthenticate){
		User authenticatedUser = userService.authenticate(userAuthenticate);
		if(authenticatedUser!=null && authenticatedUser.getPassword().equals(userAuthenticate.getPassword())) {
			System.out.println("Found" + authenticatedUser);
			return ShopResult.success(authenticatedUser);
		}else
			return ShopResult.error("Log In Failed");
		
	}
	
	@PostMapping("/user/address")
	public ShopResult<?> saveAddress(@RequestBody UserAddressDTO userAddressDTO){
		Address address = userService.addAddress(userAddressDTO);
		if(address!=null) {
			return ShopResult.success(address);
		}
		return null;
	}
	
	@GetMapping("/user/product/{id}")
	public ShopResult<?> productDetails(@PathVariable("id")int id){
		Product product = userService.getProductDetails(id);
		if(product == null) {
			return ShopResult.error("Product Not Found..");
		}
		return ShopResult.success(product);
		
	}
	
	@PostMapping("/user/order")
	public ShopResult<?> userOrders(@RequestBody UserOrdersDTO userOrdersDTO){
		Order order = userService.getOrder(userOrdersDTO);
		if(order != null) {
			return ShopResult.success(order);
		}
		return ShopResult.error("order not found....");
	}

	
	@PostMapping("/user/review")
	public ShopResult<?> userReview(@RequestBody ReviewDTO reviewDTO){
	 Review review= userService.addReview(reviewDTO);
	 if(review != null) {
		 ReviewDTO ReviewDTO = new ReviewDTO(
				 review.getId(),
				 review.getUser().getId(),
				 review.getProduct().getId(),
				 review.getReviewText()
				 );
		 return ShopResult.success(review);
	 }
		return ShopResult.error("failed to add Review");
		
	}
	
	@GetMapping("/user/address/{id}")
	public ShopResult<?> getAddressByUserId(@PathVariable("id")int id){
		System.out.println("address" + id);
		List<Address> addresses = userService.getAddressByUserId(id);
//		addresses.get(0);
		if(!addresses.isEmpty()) {
			return ShopResult.success(addresses);
		}
		return ShopResult.error(null);
	}

	

}
