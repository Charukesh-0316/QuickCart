package com.quickcart.controllers;

import java.util.Iterator;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.quickcart.DTO.CartItemDTO;
import com.quickcart.DTO.ShopResult;
import com.quickcart.entities.Cart;
import com.quickcart.entities.CartItem;
import com.quickcart.services.CartServices;
import com.quickcart.services.UserService;

@RestController
@CrossOrigin
public class CartController {
	
	@Autowired
	private CartServices cartServices;
	
	@Autowired
	private UserService userservice;

	@PostMapping("/user/cart")
	public ShopResult<?> createCart(@RequestBody Cart cart ){
		Cart savedCart=cartServices.addCart(cart);
		if(savedCart!=null)
			return ShopResult.success(savedCart);
		return ShopResult.error(null);
	}
	
	@PostMapping("/cart/additem")
	public ShopResult<?> addItemsToCart(@RequestBody CartItemDTO cartItemDTO) {
		CartItem item = cartServices.addItem(cartItemDTO);
		if(item!=null)
			return ShopResult.success(item);
		return ShopResult.error(null);
	}
	
	@DeleteMapping("/{cardId}/items/{productId}")
	public ShopResult<Cart> removeItemToCart(@PathVariable int cartId,@PathVariable int productId){
		boolean itemRemoved = false;
		Cart cart = cartServices.getCartById(cartId);
		 Iterator<CartItem> iterator =cart.getItems().iterator();
		 while(iterator.hasNext()) {
			 CartItem cartItem = iterator.next();
			 if(cartItem.getProduct().getId() == productId) {
				 iterator.remove();
				 cart.setTotalItems(cart.getTotalItems() - cartItem.getQuantity());
				 itemRemoved = true;
				 break;
			 }
		 }
		 Cart updatedCart = cartServices.addCart(cart);
		return ShopResult.success(updatedCart);
	}
	
	
	@PutMapping("/{cartId}/items/{productId}")
	public ShopResult<Cart> updateItemToCart(@RequestBody CartItemDTO cartIdDto){
		 Cart cart = cartServices.getCartById(cartIdDto.getCartId());
		 boolean itemUpdated = false;
		 for(CartItem cartItem : cart.getItems()) {
			 if(cartItem.getProduct().getId()== cartIdDto.getProductId()) {
				 cartItem.setQuantity(cartIdDto.getQuantity());
				 itemUpdated = true;
				 break;
			 }
		 }
		 Cart updatedCart = cartServices.addCart(cart);
		return ShopResult.success(updatedCart);
	}
	
	
	//get cart items by user id
	
	@GetMapping("/cart/{user_id}")
	public ShopResult<?> getCartByUserId(@PathVariable("user_id") int id){
		System.out.println(id);
		Cart cart = cartServices.getCartByUserId(id);
		if(cart!=null)
			return ShopResult.success(cart);
		return ShopResult.error(null);
	}
	
	@GetMapping("/cartItems/{id}")
	public ShopResult<?> getCartItemsByCartID(@PathVariable("id")int id){
		 List<CartItem> itemList = cartServices.getCartItemsByCartId(id);
		 if(!itemList.isEmpty())
			 return ShopResult.success(itemList);
		 return ShopResult.error(null);
	}
	

}
