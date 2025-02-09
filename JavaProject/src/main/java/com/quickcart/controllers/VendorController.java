package com.quickcart.controllers;

import java.io.File;
import java.io.IOException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
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
import com.quickcart.models.ProductCategoryModel;
import com.quickcart.models.StockIsAvailaibleModel;
import com.quickcart.services.VendorService;

@RestController
@CrossOrigin()
public class VendorController {
	
	@Autowired
	private VendorService vendorService;
	
	@GetMapping("vendor/login/{id}")
	private ShopResult<?> vendorLogIn(@PathVariable("id") int id){
		System.out.println("LogIn Vendor Called");
		String role = vendorService.logIn(id);
		if (role!=null)
			return ShopResult.success(role);
		return ShopResult.error(null);
	}
	
	@PostMapping("vendor/address")
	public ShopResult<?> addAddress(@RequestBody Address address){
		Address savedAddress = vendorService.saveAddress(address);
		if(savedAddress!=null) {
			return ShopResult.success(savedAddress);
		}
		return ShopResult.error("Failed");
		
	}

//	@PostMapping("/vendor/add_product")
//	public ShopResult<?> addProduct(@RequestBody ProductDTO product){
//		Product result = vendorService.saveProduct(product);
//		if(result!=null) {
//			return ShopResult.success(result); 
//		}else {
//			return ShopResult.error("product add failed");
//		}
//	}
	
	
	@Value("${images.path}")
    private String imageFolderPath;

	@PostMapping(value = "/vendor/add_product", consumes = {"multipart/form-data"})
	public ShopResult<?> addProduct(
	    @RequestPart("product") String productJson, 
	    @RequestPart("productImage") MultipartFile productImage,
	    @RequestPart("category_Id") String categoryId,
	    @RequestPart("vendor_Id") String vendorId
	) throws IOException {
	    // Convert JSON string to Product object
	    ObjectMapper objectMapper = new ObjectMapper();
	    Product product = objectMapper.readValue(productJson, Product.class);

	    // Save the image file
	    String fileName = productImage.getOriginalFilename();
	    File outFile = new File(imageFolderPath + fileName);
	    System.out.println("file with path :" + imageFolderPath + fileName);
	    productImage.transferTo(outFile);

	    product.setProductImage(fileName); // Save the file name in the product entity

	    // Create ProductDTO
	    ProductDTO productDTO = new ProductDTO();
	    productDTO.setProduct(product);
	    productDTO.setCategory_Id(Integer.parseInt(categoryId));
	    productDTO.setVendor_Id(Integer.parseInt(vendorId));
	    productDTO.setProductImage(productImage);

	    // Save the product
	    Product result = vendorService.saveProduct(productDTO);
	    if (result != null) {
	        return ShopResult.success(result);
	    } else {
	        return ShopResult.error("Product addition failed");
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
	
//	@PutMapping("/vendor/editProduct/{id}")
//	public ShopResult<?> editProduct(@PathVariable("id") int id,@RequestBody Product product){
//		Product updatedProduct = vendorService.updateProduct(id,product);
//		if(updatedProduct!=null)
//			return ShopResult.success(updatedProduct);
//		return ShopResult.error("Failed");
//	}
	

	@PutMapping(value = "/vendor/editProduct/{id}", consumes = {"multipart/form-data"})
	public ShopResult<?> editProduct(
	    @PathVariable("id") int id,
	    @RequestPart("product") String productJson,
	    @RequestPart(value = "productImage", required = false) MultipartFile productImage
	) throws IOException {
		 System.out.println("editProduct endpoint hit");

		    // Log productImage details
		    System.out.println("Received product image: " + productImage);
		    if (productImage != null) {
		        System.out.println("Product image name: " + productImage.getOriginalFilename());
		        System.out.println("Product image size: " + productImage.getSize());
		        System.out.println("Product image content type: " + productImage.getContentType());
		    }

	    // Parse the JSON string into a Product object
	    ObjectMapper objectMapper = new ObjectMapper();
	    Product product = objectMapper.readValue(productJson, Product.class);

	    Product updatedProduct = vendorService.updateProduct(id, product, productImage);
	    if (updatedProduct != null) {
	        System.out.println("Product updated successfully");
	        return ShopResult.success(updatedProduct);
	    }
	    System.out.println("Failed to update product");
	    return ShopResult.error("Failed");
	}


	
	@DeleteMapping("/vendor/deleteProduct")
	public ShopResult<?> deleteProduct(@RequestBody ProductCategoryModel pc){
		System.out.println(pc.toString());
		String deletedProduct = vendorService.deleteProduct(pc);
		if(deletedProduct!=null)
			return ShopResult.success(deletedProduct);
		return ShopResult.error("Failed");
	}
	
	//To add store of new Vendor after registration
	@PostMapping("/vendor/store")
	public ShopResult<?> addStore(@RequestBody VendorStoreDTO store){
		System.out.println(store.toString());
		Store savedStore = vendorService.saveStore(store);
		System.out.println(savedStore.toString());
		if(savedStore!=null) {
			return ShopResult.success(savedStore);
		}
		return null;
	}
	
	@PostMapping("/vendor/get_stock")
	public ShopResult<?> getStock(@RequestBody ProductStockDTO productStockDTO){ // stock should be get on store id and product id for specific product stock of vendor store
		System.out.println("get stock is called" + productStockDTO.toString());
		StockIsAvailaibleModel stockDetails=vendorService.getStockDetails(productStockDTO);
		System.out.println("STock details" + stockDetails);
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
	
	
	@GetMapping("/vendor/products/category/{id}")
	public ShopResult<?> getProductsByCategoryId(@PathVariable("id") int id){
		List<Product> products = vendorService.getProductsByCategoryId(id);
		if(!products.isEmpty())
			return ShopResult.success(products);
		return ShopResult.error(null);
	}
	
	@GetMapping("vendor/store/user/{id}")
	public ShopResult<?> getStoreByUserId(@PathVariable("id") int id){
		System.out.println(id  + "store called");
		Store store = vendorService.getStoreByUserId(id);
		System.out.println(store);
		if(store!=null)
			return ShopResult.success(store);
		return ShopResult.error(null);
	}
	
}
