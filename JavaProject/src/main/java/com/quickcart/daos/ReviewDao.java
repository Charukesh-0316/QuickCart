package com.quickcart.daos;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.quickcart.entities.Review;

@Repository
public interface ReviewDao extends JpaRepository<Review, Integer> {
	
	List<Review> findByProductId(int id);

}
