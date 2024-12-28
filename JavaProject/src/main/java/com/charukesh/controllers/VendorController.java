package com.charukesh.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.charukesh.DTO.ProductDTO;
import com.charukesh.DTO.ProductStockDTO;
import com.charukesh.DTO.ShopResult;
import com.charukesh.DTO.VendorStoreDTO;
//import com.charukesh.DTO.VendorStoreDTO;
import com.charukesh.entities.Address;
import com.charukesh.entities.Category;
import com.charukesh.entities.Product;
import com.charukesh.entities.Review;
import com.charukesh.entities.Store;
import com.charukesh.entities.StoreProducts;
import com.charukesh.models.ProductCategoryModel;
import com.charukesh.models.StockIsAvailaibleModel;
import com.charukesh.services.VendorService;

@RestController
public class VendorController {
	
	@Autowired
	private VendorService vendorService;
	
	@PostMapping("vendor/address")
	public ShopResult<?> addAddress(@RequestBody Address address){
		Address savedAddress = vendorService.saveAddress(address);
		if(savedAddress!=null) {
			return ShopResult.success(savedAddress);
		}
		return ShopResult.error("Failed");
		
	}

	@PostMapping("/vendor/add_product")
	public ShopResult<?> addProduct(@RequestBody ProductDTO product){
		Product result = vendorService.saveProduct(product);
		if(result!=null) {
			return ShopResult.success(result); 
		}else {
			return ShopResult.error("product add failed");
		}
	}
	
	@PostMapping("/vendor/add_category")
	public ShopResult<?> addCategory(@RequestBody Category category){
		Category result = vendorService.saveCategory(category);
		if(result!=null) {
			return ShopResult.success(result); 
		}else {
			return ShopResult.error("product add failed");
		}
	}
	
	@GetMapping("/vendor/get_products/{id}")
	public ShopResult<?> getProducts(@PathVariable("id") int id){
		List<Product> products = vendorService.getAllProducts(id);
		if(!products.isEmpty())
			return ShopResult.success(products);
		return ShopResult.error("Failed");
	}
	
	@PutMapping("/vendor/editProduct/{id}")
	public ShopResult<?> editProduct(@PathVariable("id") int id,@RequestBody Product product){
		Product updatedProduct = vendorService.updateProduct(id,product);
		if(updatedProduct!=null)
			return ShopResult.success(updatedProduct);
		return ShopResult.error("Failed");
	}
	
	@DeleteMapping("/vendor/deleteProduct")
	public ShopResult<?> deleteProduct(@RequestBody ProductCategoryModel pc){
		String deletedProduct = vendorService.deleteProduct(pc);
		if(deletedProduct!=null)
			return ShopResult.success(deletedProduct);
		return ShopResult.error("Failed");
	}
	
	//To add store of new Vendor after registration
	@PostMapping("/vendor/store")
	public ShopResult<?> addStore(@RequestBody VendorStoreDTO store){
		Store savedStore = vendorService.saveStore(store);
		if(savedStore!=null) {
			return ShopResult.success(savedStore);
		}
		return null;
	}
	
	@PostMapping("/vendor/get_stock")
	public ShopResult<?> getStock(@RequestBody ProductStockDTO productStockDTO){ // stock should be get on store id and product id for specific product stock of vendor store
		StockIsAvailaibleModel stockDetails=vendorService.getStockDetails(productStockDTO);
		if(stockDetails!=null)
			return ShopResult.success(stockDetails);
		return ShopResult.error("Failed");
	}
	
	@PostMapping("/vendor/add_stock")
	public ShopResult<?> addStock(@RequestBody StoreProducts storeProducts){ // adding stock and can change the status of available
		StoreProducts stockDetails=vendorService.addStockDetails(storeProducts);
		if(stockDetails!=null)
			return ShopResult.success(stockDetails);
		return ShopResult.error("Failed");
	}
	
	@GetMapping("/vendor/reviewProduct/{id}")
	public ShopResult<?> getReview(@RequestParam("id")int id){
		Review review =vendorService.getReviewOfProduct(id);
		if(review!=null)
			return ShopResult.success(review.getReviewText());
		return ShopResult.error(null);
	}
	
}
