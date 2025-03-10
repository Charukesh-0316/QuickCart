package com.quickcart.services;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.quickcart.DTO.CartItemDTO;
import com.quickcart.entities.Cart;
import com.quickcart.entities.CartItem;
import com.quickcart.entities.Product;

//import com.QuickCart.DTO.CartItemDTO;
//import com.QuickCart.Entities.Cart;
//import com.QuickCart.Entities.CartItem;

@Service
public interface CartServices {

	Cart addCart(Cart cart);

	Cart getCartById(int cartId);

	CartItem addItem(CartItemDTO cartItemDTO);

	Cart getCartByUserId(int id);

	List<CartItem> getProductsByCartId(int id);

	String deleteCartItem(int cartId, int productId);

}
