package com.charukesh.services;

import java.util.List;

import org.springframework.stereotype.Component;

import com.charukesh.DTO.UserDTO;
import com.charukesh.entities.Category;
import com.charukesh.entities.Product;
import com.charukesh.entities.User;
import com.charukesh.models.UserAuthenticate;

@Component
public interface UserService {
	User authenticate(UserAuthenticate userAuthenticate);

	List<User> getAllUsers();

	List<Category> getAllCategories();

	List<Product> getAllProductByCategory(int id);

	User registerUser(UserDTO user);

}
