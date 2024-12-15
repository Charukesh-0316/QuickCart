package com.charukesh.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.charukesh.DTO.UserDTO;
import com.charukesh.daos.CategoryDao;
import com.charukesh.daos.ProductCategoryDao;
import com.charukesh.daos.RolesDao;
import com.charukesh.daos.UserDao;
import com.charukesh.daos.UserRolesDao;
import com.charukesh.entities.Category;
import com.charukesh.entities.Product;
import com.charukesh.entities.ProductCategories;
import com.charukesh.entities.ProductCategoryId;
import com.charukesh.entities.Roles;
import com.charukesh.entities.User;
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
		 User savedUser = userDao.save(user.getUser());
//		 System.out.println(savedUser.toString());
		 UserRoles userRoles = new UserRoles();
		 int role_Id= user.getRole_Id();
	
			UserRoleId userRoleId = new UserRoleId(savedUser.getId(), role_Id);
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

	

}
