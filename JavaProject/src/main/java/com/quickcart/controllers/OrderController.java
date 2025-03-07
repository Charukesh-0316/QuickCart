package com.quickcart.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.quickcart.DTO.ShopResult;
import com.quickcart.DTO.UserOrdersDTO;
import com.quickcart.entities.Order;
import com.quickcart.services.OrderService;

@RestController
@CrossOrigin
public class OrderController {
	@Autowired
	private OrderService orderService;
	
	@GetMapping("/getOrderBy/{user_id}")
	public ShopResult<?> getOrderByUserId(@PathVariable("user_id")int id){
		List<Order> order = orderService.getOrderByUserId(id);
		return ShopResult.success(order);
	}
	
//	@PostMapping("/user/order")
//	public ShopResult<?> userOrders(@RequestBody UserOrdersDTO userOrdersDTO){
//		Order order = orderService.getOrder(userOrdersDTO);
//		if(order != null) {
//			return ShopResult.success(order);
//		}
//		return ShopResult.error("order not found....");
//	}

//	@PostMapping("/placeOrder")
//	public ShopResult<?> placeOrder(@RequestBody UserOrdersDTO orderDTO){
//		Order pOrder = orderService.placeOrder(orderDTO);
//		if(pOrder!=null)
//			return ShopResult.success(pOrder);
//		return ShopResult.error(null);
//		
//	}
}
