package com.quickcart.daos;

import org.springframework.data.jpa.repository.JpaRepository;

import com.quickcart.entities.OrderItem;
import com.quickcart.entities.OrderItemId;

//import com.QuickCart.Entities.OrderItem;
//import com.QuickCart.Entities.OrderItemId;

public interface OrderItemDao extends JpaRepository<OrderItem, OrderItemId>{

}
