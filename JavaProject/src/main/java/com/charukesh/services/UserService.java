package com.charukesh.services;

import java.util.List;

import org.springframework.stereotype.Component;

import com.charukesh.DTO.ReviewDTO;
import com.charukesh.DTO.UserAddressDTO;
import com.charukesh.DTO.UserDTO;
import com.charukesh.DTO.UserOrdersDTO;
import com.charukesh.entities.Address;
import com.charukesh.entities.Category;
import com.charukesh.entities.Order;
import com.charukesh.entities.Product;
import com.charukesh.entities.Review;
import com.charukesh.entities.User;
import com.charukesh.models.UserAuthenticate;

@Component
public interface UserService {
	User authenticate(UserAuthenticate userAuthenticate);

	List<User> getAllUsers();

	List<Category> getAllCategories();

	List<Product> getAllProductByCategory(int id);

	User registerUser(UserDTO user);
	
	Address addAddress(UserAddressDTO userAddressDTO);

	Product getProductDetails(int id);

	Order getOrder(UserOrdersDTO userOrdersDTO);

	Product getProductById(int id);

	Review addReview(ReviewDTO reviewDTO);


}
