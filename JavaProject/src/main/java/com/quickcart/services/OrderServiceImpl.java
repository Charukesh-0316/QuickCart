package com.quickcart.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.quickcart.DTO.UserOrdersDTO;
import com.quickcart.daos.OrderDao;
import com.quickcart.entities.Address;
import com.quickcart.entities.Order;
import com.quickcart.entities.User;

@Service
public class OrderServiceImpl implements OrderService {
	
	@Autowired
	private OrderDao orderDao;

	@Override
	public Order getOrderByUserId(int id) {
		Order order=orderDao.findByUserId(id);
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

	

}
