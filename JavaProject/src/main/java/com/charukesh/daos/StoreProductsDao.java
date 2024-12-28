package com.charukesh.daos;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.charukesh.entities.StoreProducts;
import com.charukesh.entities.StoreProductsId;

@Repository
public interface StoreProductsDao extends JpaRepository<StoreProducts, StoreProductsId> {

}
