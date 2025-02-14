package com.quickcart.services;

import java.util.List;

import org.springframework.stereotype.Component;

import com.quickcart.DTO.ReviewDTO;
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

	List<Address> getAddressByUserId(int id);


}
