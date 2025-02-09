package com.quickcart.daos;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.quickcart.entities.Address;
import com.quickcart.entities.Category;
import com.quickcart.entities.Store;

@Repository
public interface StoreDao extends JpaRepository<Store, Integer> {

//	Store findStoreByUserId(int id);

	List<Store> findStoresByUserId(int id);

}
