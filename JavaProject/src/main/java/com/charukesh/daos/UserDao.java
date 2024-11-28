package com.charukesh.daos;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

//import com.charukesh.entities;
import com.charukesh.entities.User;

@Repository
public interface UserDao extends JpaRepository<User, Integer> {
		
	User findByEmailAndPassword(String email,String password);
	
}
