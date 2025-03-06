package com.quickcart.services;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.quickcart.DTO.UserOrdersDTO;
import com.quickcart.daos.AddressDao;
import com.quickcart.daos.OrderDao;
import com.quickcart.daos.OrderItemDao;
import com.quickcart.daos.ProductDao;
import com.quickcart.daos.UserDao;
import com.quickcart.entities.Address;
import com.quickcart.entities.Order;
import com.quickcart.entities.OrderItem;
import com.quickcart.entities.OrderItemId;
import com.quickcart.entities.Product;
import com.quickcart.entities.User;

@Service
public class OrderServiceImpl implements OrderService {
	
	@Autowired
	private OrderDao orderDao;
	@Autowired
	private UserDao userDao;
	
	@Autowired
	private AddressDao addressDao;
	
	@Autowired
	private ProductDao productDao;
	
	@Autowired
	private OrderItemDao orderItemDao;

	@Override
	public List<Order> getOrderByUserId(int id) {
		List<Order> order=orderDao.findByUserId(id);
		if(order!=null)
			return order;
		return null;
	}

	@Override
	public Order placeOrder(UserOrdersDTO orderDTO) {
		User user = new User();
		user.setId(orderDTO.getUserId());
		Address address = new Address();
		address.setId(orderDTO.getAddressId());
		Order order = new Order(0, user, address, orderDTO.getOrder().getOrderDate(), orderDTO.getOrder().getExpDeliveryDate(), orderDTO.getOrder().getTotalPrice(), orderDTO.getOrder().getTaxRate(),orderDTO.getOrder().getStatus());
		Order placedOrder = orderDao.save(order);
		return placedOrder;
	}

//	@Override
//	@Transactional
//	public Order getOrder(UserOrdersDTO userOrdersDTO) {
//	    // Fetch User
//	    User user = userDao.findById(userOrdersDTO.getUserId())
//	            .orElseThrow(() -> new RuntimeException("User not found"));
//
//	    // Fetch Address
//	    Address address = addressDao.findById(userOrdersDTO.getAddressId())
//	            .orElseThrow(() -> new RuntimeException("Address not found"));
//
//	    // Create Order
//	    Order order = userOrdersDTO.getOrder();
//	    order.setUser(user);
//	    order.setAddress(address);
//
//	    // Save Order
//	    Order savedOrder = orderDao.save(order);
//
//	    // Process each product in the list
//	    for (Integer productId : userOrdersDTO.getProductId()) {
//	        Product product = productDao.findById(productId)
//	                .orElseThrow(() -> new RuntimeException("Product not found: " + productId));
//
//	        OrderItem orderItem = new OrderItem();
//	        OrderItemId orderItemId = new OrderItemId(savedOrder.getId(), productId);
//	        orderItem.setOrderItemId(orderItemId);
//	        orderItem.setOrder(savedOrder);
//	        orderItem.setProduct(product);
//	        orderItem.setQuantity(userOrdersDTO.getQuantity());  // Might need to handle different quantities per product
//	        orderItem.setCurrentPrice(userOrdersDTO.getCurrentPrice()); // Ensure price is handled correctly
//
//	        orderItemDao.save(orderItem);
//	    }
//
//	    return savedOrder;
//	}

	

}
