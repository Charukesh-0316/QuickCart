package com.charukesh.daos;

import org.springframework.data.jpa.repository.JpaRepository;

import com.charukesh.entities.Product;

public interface ProductDao extends JpaRepository<Product, Integer> {

}
