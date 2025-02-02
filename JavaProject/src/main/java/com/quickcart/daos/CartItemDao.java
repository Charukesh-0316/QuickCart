package com.quickcart.daos;



import org.springframework.data.jpa.repository.JpaRepository;

import com.quickcart.entities.CartItem;
import com.quickcart.entities.CartItemId;

public interface CartItemDao extends JpaRepository<CartItem, CartItemId> {

}
