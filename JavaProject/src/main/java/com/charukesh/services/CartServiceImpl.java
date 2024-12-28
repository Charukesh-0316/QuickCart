package com.charukesh.services;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.charukesh.DTO.CartItemDTO;
import com.charukesh.daos.CartDao;
import com.charukesh.daos.CartItemDao;
import com.charukesh.daos.ProductDao;
import com.charukesh.daos.UserDao;
import com.charukesh.entities.Cart;
import com.charukesh.entities.CartItem;
import com.charukesh.entities.CartItemId;
import com.charukesh.entities.Product;

//import com.QuickCart.DTO.CartItemDTO;
//import com.QuickCart.Entities.Cart;
//import com.QuickCart.Entities.CartItem;
//import com.QuickCart.Entities.CartItemId;
//import com.QuickCart.Entities.Product;
//import com.QuickCart.daos.CartDao;
//import com.QuickCart.daos.ProductDao;
//import com.QuickCart.daos.UserDao;

@Service
public class CartServiceImpl implements CartServices{
	
	@Autowired
	private CartDao cartDao;
	
	@Autowired
	private CartItemDao cartItemDao;
	
	@Autowired
	private ProductDao productDao;
	
	@Autowired
	private UserDao userDao;

	@Override
	public Cart addCart(Cart cart) {
	 	Cart savedCart = cartDao.save(cart);
		return savedCart;
	}

	@Override
	public Cart getCartById(int cartId) {
		Optional<Cart> cart= cartDao.findById(cartId);
		return cart.get();
	}

	@Override
	public CartItem addItem(CartItemDTO cartItemDTO) {
		CartItemId id = new CartItemId(cartItemDTO.getCartId(), cartItemDTO.getProductId());//composite key
		 Optional<Cart> cart = cartDao.findById(cartItemDTO.getCartId());
		 Optional<Product> product = productDao.findById(cartItemDTO.getProductId());
		CartItem cartItem = new CartItem(id,cartItemDTO.getQuantity(),cart.get(),product.get());
		 CartItem item = cartItemDao.save(cartItem);
		return item;
	}
}