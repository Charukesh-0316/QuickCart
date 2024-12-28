package com.charukesh.daos;

import org.springframework.data.jpa.repository.JpaRepository;

import com.charukesh.entities.OrderItem;
import com.charukesh.entities.OrderItemId;

//import com.QuickCart.Entities.OrderItem;
//import com.QuickCart.Entities.OrderItemId;

public interface OrderItemDao extends JpaRepository<OrderItem, OrderItemId>{

}
