package com.quickcart.services;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.Optional;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.quickcart.DTO.ProductDTO;
import com.quickcart.DTO.ProductStockDTO;
import com.quickcart.DTO.VendorStoreDTO;
import com.quickcart.daos.AddressDao;
import com.quickcart.daos.CategoryDao;
import com.quickcart.daos.ProductCategoryDao;
import com.quickcart.daos.ProductDao;
import com.quickcart.daos.ReviewDao;
import com.quickcart.daos.StoreDao;
import com.quickcart.daos.StoreProductsDao;
import com.quickcart.daos.UserDao;
import com.quickcart.daos.VendorProductsDao;
import com.quickcart.entities.Address;
import com.quickcart.entities.Category;
import com.quickcart.entities.Product;
import com.quickcart.entities.ProductCategories;
import com.quickcart.entities.ProductCategoryId;
import com.quickcart.entities.Review;
import com.quickcart.entities.Store;
import com.quickcart.entities.StoreProducts;
import com.quickcart.entities.StoreProductsId;
import com.quickcart.entities.User;
import com.quickcart.entities.VendorProducts;
import com.quickcart.entities.VendorProductsId;
import com.quickcart.models.ProductCategoryModel;
import com.quickcart.models.StockIsAvailaibleModel;

@Service
public class VendorServiceImpl implements VendorService{
	
	@Autowired
	private ProductDao productDao;
	
	@Autowired
	private ProductCategoryDao productCategoryDao;
	
	@Autowired
	private ProductCategoryId categoryId;
	
	@Autowired
	private CategoryDao categoryDao;
	
	@Autowired
	private VendorProductsDao vendorProductsDao;
	
	@Autowired
	private UserDao userDao;
	
	@Autowired
	private AddressDao addressDao;
	
	@Autowired
	private StoreDao storeDao;
	
	@Autowired
	private StoreProductsDao storeProductsDao;
	
	@Autowired
	private ReviewDao reviewDao;
	

	@Override
	public Product saveProduct(ProductDTO product) {
		Product result = productDao.save(product.getProduct());
		VendorProductsId vendorProductsId = new VendorProductsId(product.getVendor_Id(), product.getProduct().getId());
		 Optional<User> vendor = userDao.findById(product.getVendor_Id());
		 if(vendor != null) {
			 User vendorExist = vendor.get();
		VendorProducts vendorProducts = new VendorProducts(vendorProductsId, vendorExist, product.getProduct());
		vendorProductsDao.save(vendorProducts);
		 }
		
		ProductCategoryId productCategoryId = new ProductCategoryId(product.getProduct().getId(),product.getCategory_Id());
		ProductCategories productCategories = new ProductCategories();
		productCategories.setCategoryId(productCategoryId);
		productCategories.setProduct(result);
		 Optional<Category> category = categoryDao.findById(product.getCategory_Id());
		 if(category.isPresent()) {
			productCategoryDao.save(productCategories);
			return result;
		 }else {
			 return null;
		 }
		
	}

	@Override
	public Category saveCategory(Category category) {
		Category result = categoryDao.save(category);
		if(result!=null) {
			return result;
		}
		return null;
	}

	@Override
	public List<Product> getAllProducts(int id) {
		List<VendorProducts> vendorProducts = vendorProductsDao.findByUserId(id);
		List<Product> products = new ArrayList<Product>();
		 for (VendorProducts vp : vendorProducts) {
			Product product = vp.getProduct();
			products.add(product);
		}
		 if(!products.isEmpty()) {
//			 System.out.println(products.toString());
			 return products;
		 }
		 return null;
	}

	@Override
	public Product updateProduct(int id, Product product) {
		Optional<Product> exists = productDao.findById(id);
		if(exists.isPresent()) {
			Product p = exists.get();
			p.setId(id);
			p.setName(product.getName());
			p.setBrand(product.getBrand());
			p.setPrice(product.getPrice());
			p.setRating(product.getRating());
			p.setExpiryDate(product.getExpiryDate());
			productDao.save(p);
			return p;
		}
		return null;
	}

	@Override
	@Transactional
	public String deleteProduct(ProductCategoryModel pc) {
	    // Check if the product exists
	    Optional<Product> productOpt = productDao.findById(pc.getProductId());

	    if (productOpt.isPresent()) {
	        // Check if related entries exist in the vendorproducts table
	        VendorProductsId vpid = new VendorProductsId(pc.getVendorId(), pc.getProductId());
	        if (vendorProductsDao.existsById(vpid)) {
	            vendorProductsDao.deleteById(vpid);
	        }

	        // Check if related entries exist in the productcategories table
	        ProductCategoryId pcid = new ProductCategoryId(pc.getProductId(), pc.getCategoryId());
	        if (productCategoryDao.existsById(pcid)) {
	            productCategoryDao.deleteById(pcid);
	        }

	        // Delete the product
	        productDao.delete(productOpt.get());

	        return "Product and related categories deleted successfully.";
	    } else {
	        return "Product not found.";
	    }
	}

	@Override
	public Address saveAddress(Address address) {
		 Address savedAddress = addressDao.save(address);
		 if(savedAddress!=null) {
			 return savedAddress;
		 }
		return null;
	}

	@Override
	public Store saveStore(VendorStoreDTO storedto) {
		
		Optional<User> dummyUser = userDao.findById(storedto.getUserid());
		Optional<Address> dummyAddress = addressDao.findById(storedto.getAddressid());
		if(dummyUser.isPresent() && dummyAddress.isPresent()) {
			Store store = new Store(0,dummyUser.get(),dummyAddress.get(),storedto.getName());
			Store savedStore = storeDao.save(store);
			if(savedStore!=null)
				return savedStore;
		}
		return null;
	}

	@Override
	public StockIsAvailaibleModel getStockDetails(ProductStockDTO productStockDTO) {
		StoreProductsId id = new StoreProductsId(productStockDTO.getStoreId(),productStockDTO.getProductId());
		Optional<StoreProducts> storeProducts = storeProductsDao.findById(id);//finding specific product of specific store
		if(storeProducts.isPresent()) {
			//StockIsAvailable Model for getting exact stock and isAvailable status
			StockIsAvailaibleModel stockIsAvailaibleModel = new StockIsAvailaibleModel(storeProducts.get().getStock(), storeProducts.get().isAvailable());
			return stockIsAvailaibleModel;
		}
		return null;
	}

	@Override
	public StoreProducts addStockDetails(StoreProducts storeProducts) {
		 StoreProducts savedStockDetails = storeProductsDao.save(storeProducts);
		 if(savedStockDetails!=null) {
			 return savedStockDetails;
		 }
		return null;
	}

	@Override
	public Review getReviewOfProduct(int id) {
		Review review = reviewDao.findByProductId(id);
		return review;
	}
}
