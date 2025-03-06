package com.quickcart.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.quickcart.DTO.CartItemDTO;
import com.quickcart.daos.CartDao;
import com.quickcart.daos.CartItemDao;
import com.quickcart.daos.ProductDao;
import com.quickcart.daos.UserDao;
import com.quickcart.entities.Cart;
import com.quickcart.entities.CartItem;
import com.quickcart.entities.CartItemId;
import com.quickcart.entities.Product;

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
		 Optional<Cart> c = cartDao.findById(cart.getId());
		 if(c.isPresent()) {
			 return c.get();
		 }
	 	Cart savedCart = cartDao.save(cart);
		return savedCart;
	}

	@Override
	public Cart getCartById(int userId) {
		List<Cart> carts= cartDao.findCartByUserId(userId);
		if(!carts.isEmpty()) {
			return carts.get(0);
		}
		return null;
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

	@Override
	public List<CartItem> getProductsByCartId(int id) {
		 List<CartItem> products = cartItemDao.findProductByCartId(id);
			return products;
	}

	@Override
	public Cart getCartByUserId(int id) {
		 Cart c = cartDao.findByUserId(id);
		return c;
	}
	@Override
	public String deleteCartItem(int cartId, int productId) {
		CartItemId itemId = new CartItemId(cartId, productId);
		cartItemDao.deleteById(itemId);
		return "product Deleted Successfully";
	}

}
