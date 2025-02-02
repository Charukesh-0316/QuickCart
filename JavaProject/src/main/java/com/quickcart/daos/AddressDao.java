package com.quickcart.daos;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.quickcart.entities.Address;
import com.quickcart.entities.Category;

@Repository
public interface AddressDao extends JpaRepository<Address, Integer> {

}
