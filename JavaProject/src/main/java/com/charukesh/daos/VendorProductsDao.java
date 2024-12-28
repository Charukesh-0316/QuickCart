package com.charukesh.daos;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.charukesh.entities.UserRoleId;
import com.charukesh.entities.UserRoles;
import com.charukesh.entities.VendorProducts;
import com.charukesh.entities.VendorProductsId;

public interface VendorProductsDao extends JpaRepository<VendorProducts, VendorProductsId> {

	List<VendorProducts> findByUserId(int vendorId);
	
}
