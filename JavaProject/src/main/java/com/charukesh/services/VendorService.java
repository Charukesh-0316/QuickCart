package com.charukesh.services;

import java.util.List;

import org.springframework.stereotype.Service;

import com.charukesh.DTO.ProductDTO;
import com.charukesh.DTO.ProductStockDTO;
import com.charukesh.DTO.VendorStoreDTO;
import com.charukesh.entities.Address;
import com.charukesh.entities.Category;
import com.charukesh.entities.Product;
import com.charukesh.entities.Review;
import com.charukesh.entities.Store;
import com.charukesh.entities.StoreProducts;
import com.charukesh.models.ProductCategoryModel;
import com.charukesh.models.StockIsAvailaibleModel;

@Service
public interface VendorService {
	
	Product saveProduct(ProductDTO product);

	Category saveCategory(Category category);

	List<Product> getAllProducts(int id);

	Product updateProduct(int id, Product product);

	String deleteProduct(ProductCategoryModel pc);

	Address saveAddress(Address address);

	Store saveStore(VendorStoreDTO store);

	StockIsAvailaibleModel getStockDetails(ProductStockDTO productStockDTO);

	StoreProducts addStockDetails(StoreProducts storeProducts);

	Review getReviewOfProduct(int id);
}
