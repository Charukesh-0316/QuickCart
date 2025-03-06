package com.quickcart.daos;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.quickcart.entities.Cart;

//import com.QuickCart.Entities.Cart;

public interface CartDao extends JpaRepository<Cart, Integer> {

	Cart findByUserId(int id);

	List<Cart> findCartByUserId(int userId);

}
