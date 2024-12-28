package com.charukesh.services;

import java.util.List;
import java.util.Optional;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.charukesh.DTO.ReviewDTO;
import com.charukesh.DTO.UserAddressDTO;
import com.charukesh.DTO.UserDTO;
import com.charukesh.DTO.UserOrdersDTO;
import com.charukesh.daos.AddressDao;
import com.charukesh.daos.CategoryDao;
import com.charukesh.daos.OrderDao;
import com.charukesh.daos.OrderItemDao;
import com.charukesh.daos.ProductCategoryDao;
import com.charukesh.daos.ProductDao;
import com.charukesh.daos.ReviewDao;
import com.charukesh.daos.RolesDao;
import com.charukesh.daos.UserAddressDao;
import com.charukesh.daos.UserDao;
import com.charukesh.daos.UserRolesDao;
import com.charukesh.entities.Address;
import com.charukesh.entities.Category;
import com.charukesh.entities.Order;
import com.charukesh.entities.OrderItem;
import com.charukesh.entities.OrderItemId;
import com.charukesh.entities.Product;
import com.charukesh.entities.ProductCategories;
import com.charukesh.entities.ProductCategoryId;
import com.charukesh.entities.Review;
import com.charukesh.entities.Roles;
import com.charukesh.entities.User;
import com.charukesh.entities.UserAddress;
import com.charukesh.entities.UserAddressId;
import com.charukesh.entities.UserRoleId;
import com.charukesh.entities.UserRoles;
import com.charukesh.models.UserAuthenticate;

@Component
public class UserServiceImpl implements UserService {

	@Autowired
	private UserDao userDao;
	
	@Autowired
	private CategoryDao categoryDao;
	@Autowired
	private ProductCategoryDao productCategoryDao;
	@Autowired
	private UserRolesDao userRolesDao;
	@Autowired
	private RolesDao rolesDao;
	
	@Autowired
	private AddressDao addressDao;
	
	@Autowired
	private UserAddressDao userAddressDao;
	
	@Autowired
	private ProductDao dao;
	
	@Autowired
	private OrderDao orderDao;
	
	@Autowired
	private OrderItemDao orderItemDao;
	
	@Autowired
	private ProductDao productDao;
	
	@Autowired
	private ReviewDao reviewDao;
	
	@Override
	public User authenticate(UserAuthenticate userAuthenticate) {
		User exist = userDao.findByEmailAndPassword(userAuthenticate.getEmail(), userAuthenticate.getPassword());
		if(exist!=null)
			return exist;
		return null;
	}

	@Override
	public List<User> getAllUsers() {
		 List<User> users = userDao.findAll();
		 System.out.println(users.toString());
		return users;
	}

	@Override
	public List<Category> getAllCategories() {
		List<Category> list = categoryDao.findAll();
		return list;
	}

	@Override
	public List<Product> getAllProductByCategory(int id) {
		List<Product> list = productCategoryDao.findProductsByCategoryId(id);
		return list;
	}

	@Override
	public User registerUser(UserDTO user) {
		 User savedUser = userDao.save(user.getUser());//User
//		 System.out.println(savedUser.toString());
		 UserRoles userRoles = new UserRoles(); //UserRoles
		 int role_Id= user.getRole_Id();
	
			UserRoleId userRoleId = new UserRoleId(savedUser.getId(), role_Id); //userRoleID
			userRoles.setUserRoleId(userRoleId);
			userRoles.setUser(savedUser);
			Optional<Roles> role = rolesDao.findById(role_Id);
			if(role.isPresent()) {
				Roles result = role.get();
				userRoles.setRole(result);
			}
			userRolesDao.save(userRoles);
		return savedUser;
	}
	
	
	@Override
	@Transactional
	public Address addAddress(UserAddressDTO userAddressDTO) {
	    // Save the address first
	    Address addressToSave = userAddressDTO.getAddress();
	    Address savedAddress = addressDao.save(addressToSave);

	    // Create UserAddressId using the saved address ID
	    UserAddressId userAddressId = new UserAddressId(userAddressDTO.getUserId(), savedAddress.getId());

	    Optional<User> optionalUser = userDao.findById(userAddressDTO.getUserId());
	    if (optionalUser.isPresent()) {
	        User user = optionalUser.get();

	        // Create UserAddress object
	        UserAddress userAddress = new UserAddress();
	        userAddress.setUserAddressId(userAddressId);
	        userAddress.setUser(user);
	        userAddress.setAddress(savedAddress);

	        // Save UserAddress
	        userAddressDao.save(userAddress);

	        return savedAddress;
	    } else {
	        // Handle the case where the user does not exist
	        throw new RuntimeException("User with ID " + userAddressDTO.getUserId() + " not found.");
	    }
	}

	@Override
	public Product getProductDetails(int id) {
		Product product = dao.getById(id);
		return product;
	}

	@Override
	@Transactional
	public Order getOrder(UserOrdersDTO userOrdersDTO) {
	    Order order = userOrdersDTO.getOrder();
	    Order savedOrder = orderDao.save(order);

	    OrderItemId orderItemId = new OrderItemId(savedOrder.getId(), userOrdersDTO.getProductId());

	    Optional<User> optionalUser = userDao.findById(userOrdersDTO.getUserId());
	    if (optionalUser.isPresent()) {
	        User user = optionalUser.get();

	        OrderItem orderItem = new OrderItem();
	        orderItem.setOrderItemId(orderItemId);
	        orderItem.setOrder(savedOrder);
	        orderItem.setProduct(productDao.findById(userOrdersDTO.getProductId()).orElse(null));
	        orderItem.setQuantity(userOrdersDTO.getQuantity());
	        orderItem.setCurrentPrice(userOrdersDTO.getCurrentPrice());

	        orderItemDao.save(orderItem);

	        return savedOrder;
	    }
	    return null;
	}

	@Override
	public Product getProductById(int id) {
		Optional<Product> productid=productDao.findById(id);
		return productid.get();
	}

	@Override
	public Review addReview(ReviewDTO reviewDTO) {
		
		Optional<User> optionalUser = userDao.findById(reviewDTO.getUserId());
		if(!optionalUser.isPresent()) {
			return null;
					
		}
		
		Optional<Product> optionalproduct = productDao.findById(reviewDTO.getProductId());
		
		if(!optionalproduct.isPresent()) {
			return null;
		}
		User user = optionalUser.get();
		Product product = optionalproduct.get();
		
		Review review = new Review();
		
		review.setUser(user);
		review.setProduct(product);
		review.setReviewText(reviewDTO.getReviewText());
		
		review = reviewDao.save(review);
		
		return review;
	}



	

}
