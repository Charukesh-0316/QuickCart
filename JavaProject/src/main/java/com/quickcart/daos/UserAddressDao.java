package com.quickcart.daos;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.quickcart.entities.UserAddress;
import com.quickcart.entities.UserAddressId;

//import com.QuickCart.Entities.Address;
//import com.QuickCart.Entities.UserAddress;
////import com.QuickCart.Entities.Category;
//import com.QuickCart.Entities.UserAddressId;

@Repository
public interface UserAddressDao extends JpaRepository<UserAddress, UserAddressId> {

	List<UserAddress> findAddressByUserId(int id);

}
