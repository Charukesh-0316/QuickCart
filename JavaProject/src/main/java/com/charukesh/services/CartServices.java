package com.charukesh.services;

import java.util.Optional;

import org.springframework.stereotype.Service;

import com.charukesh.DTO.CartItemDTO;
import com.charukesh.entities.Cart;
import com.charukesh.entities.CartItem;

//import com.QuickCart.DTO.CartItemDTO;
//import com.QuickCart.Entities.Cart;
//import com.QuickCart.Entities.CartItem;

@Service
public interface CartServices {

	Cart addCart(Cart cart);

	Cart getCartById(int cartId);

	CartItem addItem(CartItemDTO cartItemDTO);

}
