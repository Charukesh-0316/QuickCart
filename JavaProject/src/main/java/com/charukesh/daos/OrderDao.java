package com.charukesh.daos;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.charukesh.entities.Address;
import com.charukesh.entities.Category;
import com.charukesh.entities.Order;

@Repository
public interface OrderDao extends JpaRepository<Order, Integer> {

}
