package com.charukesh.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.charukesh.daos.CategoryDao;
import com.charukesh.daos.ProductCategoryDao;
import com.charukesh.daos.UserDao;
import com.charukesh.entities.Category;
import com.charukesh.entities.Product;
import com.charukesh.entities.ProductCategories;
import com.charukesh.entities.ProductCategoryId;
import com.charukesh.entities.User;
import com.charukesh.models.UserAuthenticate;

@Component
public class UserServiceImpl implements UserService {

	@Autowired
	private UserDao userDao;
	
	@Autowired
	private CategoryDao categoryDao;
	@Autowired
	private ProductCategoryDao productCategoryDao;
	
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

	

}
