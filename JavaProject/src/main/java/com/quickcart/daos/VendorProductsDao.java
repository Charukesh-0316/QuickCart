package com.quickcart.daos;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.quickcart.entities.UserRoleId;
import com.quickcart.entities.UserRoles;
import com.quickcart.entities.VendorProducts;
import com.quickcart.entities.VendorProductsId;

public interface VendorProductsDao extends JpaRepository<VendorProducts, VendorProductsId> {

	List<VendorProducts> findByUserId(int vendorId);
	
}
