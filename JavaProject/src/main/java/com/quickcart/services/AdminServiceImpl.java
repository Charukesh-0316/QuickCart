package com.quickcart.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.quickcart.daos.CategoryDao;
import com.quickcart.daos.OrderDao;
import com.quickcart.daos.ProductCategoryDao;
import com.quickcart.daos.UserDao;
import com.quickcart.daos.UserRolesDao;
import com.quickcart.entities.Category;
import com.quickcart.entities.Order;
import com.quickcart.entities.Product;
import com.quickcart.entities.User;

@Service
public class AdminServiceImpl implements AdminService {
	
	@Autowired
	private OrderDao orderDao;
	
	@Autowired
	private ProductCategoryDao productCategoryDao;
	
	@Autowired
	private UserDao userDao;
	
	@Autowired
	private UserRolesDao rolesDao;
	
	@Autowired
	private CategoryDao categoryDao;

	@Override
	public List<User> getAllCustomers() {
		 List<User> users = userDao.findAll();
		return users;
	}

	@Override
	public List<User> getCustomersByRole(int role) {
		List<User> users=rolesDao.findUserByRoleId(role);
		return users;
	}

	@Override
	public User getCustomer(int id) {
		 Optional<User> cust = userDao.findById(id);
		return cust.get();
	}

	@Override
	public User editCustomer(int id,User user) {
		 Optional<User> cust = userDao.findById(id);
		 if(cust.isPresent()) {
			 User existingUser = cust.get();
			 existingUser.setFirstName(user.getFirstName());
			 existingUser.setLastName(user.getLastName());
			 existingUser.setEmail(user.getEmail());
			 existingUser.setMobileNo(user.getMobileNo());
			 existingUser.setPassword(user.getPassword());//updated new values in existing user by id
			  User updatedUser = userDao.save(existingUser);
			  return updatedUser;
		 }
		return null;
	}

	@Override
	public String deleteCustomer(int id) {
		userDao.deleteById(id);
		return "User Deleted";
	}

	@Override
	public List<Category> getAllCategories() {
		List<Category> list = categoryDao.findAll();
		return list;
	}

	@Override
	public List<Product> getAllProductByCategory(int id) {
		List<Product> list = productCategoryDao.findProductsByCategoryId(id);
		return list;
	}

	@Override
	public List<Order> getAllOrders() {
	List<Order> orders = orderDao.findAll();
		return orders;
	}

	@Override
	public Order updateStatus(Order order) {
		 Optional<Order> o = orderDao.findById(order.getId());
		 if(o.isPresent()) {
			 Order existingOrder = o.get();
			 existingOrder.setUser(order.getUser());
			 existingOrder.setAddress(order.getAddress());
			 existingOrder.setOrderDate(order.getOrderDate());
			 existingOrder.setExpDeliveryDate(order.getExpDeliveryDate());
			 existingOrder.setTotalPrice(order.getTotalPrice());
			 existingOrder.setTaxRate(order.getTaxRate());
			 existingOrder.setStatus(order.getStatus());//status changed
			 Order updatedStatusOrder = orderDao.save(existingOrder);
			 return updatedStatusOrder;
		 }
		return null;
	}
}
