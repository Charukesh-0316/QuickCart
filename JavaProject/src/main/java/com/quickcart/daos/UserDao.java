package com.quickcart.daos;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.quickcart.entities.User;
import com.quickcart.models.UserAuthenticate;

@Repository
public interface UserDao extends JpaRepository<User, Integer> {
		
	User findByEmailAndPassword(String email,String password);
	User save(User user);
}
