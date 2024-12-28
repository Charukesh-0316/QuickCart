package com.charukesh.daos;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.charukesh.entities.Review;

@Repository
public interface ReviewDao extends JpaRepository<Review, Integer> {
	
	Review findByProductId(int id);

}
