package com.quickcart.services;

import java.util.List;

import com.quickcart.entities.Category;
import com.quickcart.entities.Order;
import com.quickcart.entities.Product;
import com.quickcart.entities.User;

public interface AdminService {

	List<User> getAllCustomers();

	List<User> getCustomersByRole(int role);

	User getCustomer(int id);

	User editCustomer(int id, User user);

	String deleteCustomer(int id);

	List<Category> getAllCategories();

	List<Product> getAllProductByCategory(int id);

	List<Order> getAllOrders();

	Order updateStatus(Order order);

}
