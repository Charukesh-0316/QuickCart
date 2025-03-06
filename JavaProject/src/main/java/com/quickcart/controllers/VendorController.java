package com.quickcart.controllers;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.OutputStream;
import java.util.Base64;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.quickcart.DTO.ProductDTO;
import com.quickcart.DTO.ProductStockDTO;
import com.quickcart.DTO.ShopResult;
import com.quickcart.DTO.VendorStoreDTO;
import com.quickcart.entities.Address;
import com.quickcart.entities.Category;
import com.quickcart.entities.Product;
import com.quickcart.entities.Review;
import com.quickcart.entities.Store;
import com.quickcart.entities.StoreProducts;
import com.quickcart.models.ImageDTO;
import com.quickcart.models.ProductCategoryModel;
import com.quickcart.models.ProductEditUploadDTO;
import com.quickcart.models.ProductUploadDTO;
import com.quickcart.models.StockIsAvailaibleModel;
import com.quickcart.services.VendorService;

@RestController
@CrossOrigin()
public class VendorController {

	@Autowired
	private VendorService vendorService;

	@GetMapping("vendor/login/{id}")
	private ShopResult<?> vendorLogIn(@PathVariable("id") int id) {
		System.out.println("LogIn Vendor Called" + id);
		String role = vendorService.logIn(id);
		if (role != null)
			return ShopResult.success(role);
		return ShopResult.error(null);
	}

	@PostMapping("vendor/address")
	public ShopResult<?> addAddress(@RequestBody Address address) {
		Address savedAddress = vendorService.saveAddress(address);
		if (savedAddress != null) {
			return ShopResult.success(savedAddress);
		}
		return ShopResult.error("Failed");

	}

	@Value("${images.path}")
	private String imageFolderPath;

	@PostMapping(value = "/vendor/add_product", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
	public ShopResult<?> addProduct(ProductUploadDTO p) throws Throwable {
		ProductDTO productDTO = vendorService.addProduct(p);
		Product result = vendorService.saveProduct(productDTO);
		if (result != null) {
			return ShopResult.success(result);
		} else {
			return ShopResult.error("Product addition failed");
		}
	}

	@PostMapping("/vendor/add_category")
	public ShopResult<?> addCategory(@RequestBody Category category) {
		Category result = vendorService.saveCategory(category);
		if (result != null) {
			return ShopResult.success(result);
		} else {
			return ShopResult.error("product add failed");
		}
	}

	@GetMapping("/vendor/get_products/{id}")
	public ShopResult<?> getProducts(@PathVariable("id") int id) {
		List<Product> products = vendorService.getAllProducts(id);
		if (!products.isEmpty())
			return ShopResult.success(products);
		return ShopResult.error("Failed");
	}

	@PutMapping(value = "/vendor/editProduct/{id}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
	public ShopResult<?> editProduct(@PathVariable("id") int id, ProductEditUploadDTO editUploadDTO) throws Throwable {
		Product updatedProduct = vendorService.editProduct(id, editUploadDTO);
				if (updatedProduct != null) {
			System.out.println("Product updated successfully");
			return ShopResult.success(updatedProduct);
		}
		System.out.println("Failed to update product");
		return ShopResult.error("Failed");
	}

	@DeleteMapping("/vendor/deleteProduct")
	public ShopResult<?> deleteProduct(ProductCategoryModel pc) {
		System.out.println(pc.toString());
		String deletedProduct = vendorService.deleteProduct(pc);
		if (deletedProduct != null)
			return ShopResult.success(deletedProduct);
		return ShopResult.error("Failed");
	}

	// To add store of new Vendor after registration
	@PostMapping("/vendor/store")
	public ShopResult<?> addStore(@RequestBody VendorStoreDTO store) {
		System.out.println(store.toString());
		Store savedStore = vendorService.saveStore(store);
		System.out.println(savedStore.toString());
		if (savedStore != null) {
			return ShopResult.success(savedStore);
		}
		return null;
	}

	@PostMapping("/vendor/get_stock")
	public ShopResult<?> getStock(@RequestBody ProductStockDTO productStockDTO) { 
		// stock should be get on store id and																	
		// product id for specific product
		// stock of vendor store
		System.out.println("get stock is called" + productStockDTO.toString());
		StockIsAvailaibleModel stockDetails = vendorService.getStockDetails(productStockDTO);
		System.out.println("STock details" + stockDetails);
		if (stockDetails != null)
			return ShopResult.success(stockDetails);
		return ShopResult.error("Failed");
	}

	@PostMapping("/vendor/add_stock")
	public ShopResult<?> addStock(@RequestBody StoreProducts storeProducts) { 
		// adding stock and can change the status
		// of available
		StoreProducts stockDetails = vendorService.addStockDetails(storeProducts);
		if (stockDetails != null)
			return ShopResult.success(stockDetails);
		return ShopResult.error("Failed");
	}

	@GetMapping("/vendor/reviewProduct/{id}")
	public ShopResult<?> getReview(@PathVariable("id") int id) {
		List<Review> reviews = vendorService.getReviewsOfProduct(id);
		if (!reviews.isEmpty())
			return ShopResult.success(reviews);
		return ShopResult.error("No Reviews");
	}

	@GetMapping("/vendor/products/category/{id}")
	public ShopResult<?> getProductsByCategoryId(@PathVariable("id") int id) {
		List<Product> products = vendorService.getProductsByCategoryId(id);
		if (!products.isEmpty())
			return ShopResult.success(products);
		return ShopResult.error(null);
	}

	@GetMapping("/vendor/products/category/{storeId}/{categoryId}")
	public ShopResult<?> getProductsByCategoryIdAndVendorId(@PathVariable("storeId") int storeId, @PathVariable("categoryId") int categoryId) {
		List<Product> products = vendorService.getProductsByCategoryIdAndVendorId(storeId,categoryId);
		if (!products.isEmpty())
			return ShopResult.success(products);
		return ShopResult.error("No products found");
	}

	@GetMapping("vendor/store/user/{id}")
	public ShopResult<?> getStoreByUserId(@PathVariable("id") int id) {
		System.out.println(id + "store called");
		Store store = vendorService.getStoreByUserId(id);
		System.out.println(store);
		if (store != null)
			return ShopResult.success(store);
		return ShopResult.error(null);
	}

}
