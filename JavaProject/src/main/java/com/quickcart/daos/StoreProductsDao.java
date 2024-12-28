package com.quickcart.daos;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.quickcart.entities.StoreProducts;
import com.quickcart.entities.StoreProductsId;

@Repository
public interface StoreProductsDao extends JpaRepository<StoreProducts, StoreProductsId> {

}
