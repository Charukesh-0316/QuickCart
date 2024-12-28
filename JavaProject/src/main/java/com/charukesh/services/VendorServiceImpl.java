package com.charukesh.services;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.Optional;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.charukesh.DTO.ProductDTO;
import com.charukesh.DTO.ProductStockDTO;
import com.charukesh.DTO.VendorStoreDTO;
import com.charukesh.daos.AddressDao;
import com.charukesh.daos.CategoryDao;
import com.charukesh.daos.ProductCategoryDao;
import com.charukesh.daos.ProductDao;
import com.charukesh.daos.ReviewDao;
import com.charukesh.daos.StoreDao;
import com.charukesh.daos.StoreProductsDao;
import com.charukesh.daos.UserDao;
import com.charukesh.daos.VendorProductsDao;
import com.charukesh.entities.Address;
import com.charukesh.entities.Category;
import com.charukesh.entities.Product;
import com.charukesh.entities.ProductCategories;
import com.charukesh.entities.ProductCategoryId;
import com.charukesh.entities.Review;
import com.charukesh.entities.Store;
import com.charukesh.entities.StoreProducts;
import com.charukesh.entities.StoreProductsId;
import com.charukesh.entities.User;
import com.charukesh.entities.VendorProducts;
import com.charukesh.entities.VendorProductsId;
import com.charukesh.models.ProductCategoryModel;
import com.charukesh.models.StockIsAvailaibleModel;

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
