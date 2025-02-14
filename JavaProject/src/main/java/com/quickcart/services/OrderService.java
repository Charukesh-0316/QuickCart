package com.quickcart.services;

import org.springframework.stereotype.Service;

import com.quickcart.DTO.UserOrdersDTO;
import com.quickcart.entities.Order;

@Service
public interface OrderService {

	Order getOrderByUserId(int id);

	Order placeOrder(UserOrdersDTO orderDTO);

//	Order getOrder(UserOrdersDTO userOrdersDTO);

}
