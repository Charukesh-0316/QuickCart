package com.quickcart.daos;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.quickcart.entities.Product;
import com.quickcart.entities.ProductCategories;
import com.quickcart.entities.ProductCategoryId;

@Repository
public interface ProductCategoryDao extends JpaRepository<ProductCategories, ProductCategoryId> {
	@Query("SELECT p FROM Product p JOIN ProductCategories pc ON p.id = pc.id.product_id WHERE pc.id.category_id = :categoryId")
	List<Product> findProductsByCategoryId(@Param("categoryId")int categoryId);
	}
