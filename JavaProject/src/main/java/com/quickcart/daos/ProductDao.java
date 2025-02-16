package com.quickcart.daos;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.quickcart.entities.Product;
import com.quickcart.entities.Roles;

public interface ProductDao extends JpaRepository<Product, Integer> {

//	Optional<Roles> findById(List<Integer> productId);
//	@Query("SELECT p FROM Product p " +
//		       "JOIN p.productCategories pc " +
//		       "JOIN p.storeProducts sp " +
//		       "JOIN UserProduct up ON p.id = up.userProductId.productId " +
//		       "WHERE pc.category.id = :categoryId AND up.userProductId.userId = :vendorId")
//		List<Product> findProductsByCategoryIdAndVendorId(@Param("categoryId") int categoryId, @Param("vendorId") int vendorId);

}
