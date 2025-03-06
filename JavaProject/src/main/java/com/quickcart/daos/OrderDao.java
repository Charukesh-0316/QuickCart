package com.quickcart.daos;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.quickcart.entities.Address;
import com.quickcart.entities.Category;
import com.quickcart.entities.Order;

@Repository
public interface OrderDao extends JpaRepository<Order, Integer> {

	List<Order> findByUserId(int id);

}
