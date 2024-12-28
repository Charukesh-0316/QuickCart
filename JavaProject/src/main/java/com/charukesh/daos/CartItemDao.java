package com.charukesh.daos;



import org.springframework.data.jpa.repository.JpaRepository;

import com.charukesh.entities.CartItem;
//
//import com.QuickCart.Entities.CartItem;
//import com.QuickCart.Entities.CartItemId;
import com.charukesh.entities.CartItemId;

public interface CartItemDao extends JpaRepository<CartItem, CartItemId> {

}
