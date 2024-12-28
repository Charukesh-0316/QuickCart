package com.charukesh.daos;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.charukesh.entities.UserAddress;
import com.charukesh.entities.UserAddressId;

//import com.QuickCart.Entities.Address;
//import com.QuickCart.Entities.UserAddress;
////import com.QuickCart.Entities.Category;
//import com.QuickCart.Entities.UserAddressId;

@Repository
public interface UserAddressDao extends JpaRepository<UserAddress, UserAddressId> {

}
