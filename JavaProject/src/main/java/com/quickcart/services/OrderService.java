package com.quickcart.services;

import java.util.List;

import org.springframework.stereotype.Service;

import com.quickcart.DTO.UserOrdersDTO;
import com.quickcart.entities.Order;

@Service
public interface OrderService {

	List<Order> getOrderByUserId(int id);

	Order placeOrder(UserOrdersDTO orderDTO);

//	Order getOrder(UserOrdersDTO userOrdersDTO);

}
