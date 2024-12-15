package com.charukesh.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.charukesh.DTO.ShopResult;
import com.charukesh.DTO.UserDTO;
import com.charukesh.entities.Category;
import com.charukesh.entities.Product;
import com.charukesh.entities.User;
import com.charukesh.models.UserAuthenticate;
import com.charukesh.services.UserService;

@RestController
public class CustomerController {
	
	@Autowired
	private UserService userService;
	
	@PostMapping("user/register")
	public ShopResult<?> registerUser(@RequestBody UserDTO user){
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

}
