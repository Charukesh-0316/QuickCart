package com.quickcart.daos;

import org.springframework.data.jpa.repository.JpaRepository;

import com.quickcart.entities.Product;

public interface ProductDao extends JpaRepository<Product, Integer> {

}
