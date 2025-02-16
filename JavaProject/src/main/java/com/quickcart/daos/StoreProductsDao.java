package com.quickcart.daos;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.quickcart.entities.StoreProducts;
import com.quickcart.entities.StoreProductsId;

@Repository
public interface StoreProductsDao extends JpaRepository<StoreProducts, StoreProductsId> {

//    @Query("SELECT sp FROM StoreProducts sp WHERE sp.storeProductsId.productId = :productId")
//	List<StoreProducts> findByProductId(int productId);

    @Query("SELECT sp FROM StoreProducts sp WHERE sp.storeProductsId.productId = :productId")
	List<StoreProducts> findByStoreProductsIdProductId(int productId);

//	Optional<StoreProducts> findStoreProductsById(StoreProductsId id);

}
