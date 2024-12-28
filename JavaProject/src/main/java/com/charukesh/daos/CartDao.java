package com.charukesh.daos;

import org.springframework.data.jpa.repository.JpaRepository;

import com.charukesh.entities.Cart;

//import com.QuickCart.Entities.Cart;

public interface CartDao extends JpaRepository<Cart, Integer> {

}
