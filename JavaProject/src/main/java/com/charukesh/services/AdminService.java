package com.charukesh.services;

import java.util.List;

import com.charukesh.entities.Category;
import com.charukesh.entities.Order;
import com.charukesh.entities.Product;
import com.charukesh.entities.User;

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
