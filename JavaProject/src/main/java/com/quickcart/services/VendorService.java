package com.quickcart.services;

import java.io.IOException;
import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.quickcart.DTO.ProductDTO;
import com.quickcart.DTO.ProductStockDTO;
import com.quickcart.DTO.VendorStoreDTO;
import com.quickcart.entities.Address;
import com.quickcart.entities.Category;
import com.quickcart.entities.Product;
import com.quickcart.entities.Review;
import com.quickcart.entities.Store;
import com.quickcart.entities.StoreProducts;
import com.quickcart.models.ProductCategoryModel;
import com.quickcart.models.ProductEditUploadDTO;
import com.quickcart.models.ProductUploadDTO;
import com.quickcart.models.StockIsAvailaibleModel;

@Service
public interface VendorService {
	
	Product saveProduct(ProductDTO product);

	Category saveCategory(Category category);

	List<Product> getAllProducts(int id);

//	Product updateProduct(int id, Product product);

	String deleteProduct(ProductCategoryModel pc);

	Address saveAddress(Address address);

	Store saveStore(VendorStoreDTO store);

	StockIsAvailaibleModel getStockDetails(ProductStockDTO productStockDTO);

	StoreProducts addStockDetails(StoreProducts storeProducts);

	List<Review> getReviewsOfProduct(int id);

	String logIn(int id);

	List<Product> getProductsByCategoryId(int id);

	Store getStoreByUserId(int id);

	Product updateProduct(int id, Product product, String productImage) throws IOException;

//	List<Product> getProductsByCategoryIdAndVendorId(int id);
	
	ProductDTO addProduct(ProductUploadDTO p) throws Throwable, Throwable;
	
	Product editProduct(int id,ProductEditUploadDTO editUploadDTO) throws Throwable;

	List<Product> getProductsByCategoryIdAndVendorId(int storeId, int categoryId);

//	Product updateProduct(int id, Product product, String productImage) throws IOException;
}
