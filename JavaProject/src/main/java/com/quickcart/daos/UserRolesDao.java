package com.quickcart.daos;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.quickcart.entities.User;
import com.quickcart.entities.UserRoleId;
import com.quickcart.entities.UserRoles;

@Repository
public interface UserRolesDao extends JpaRepository<UserRoles, UserRoleId> {

	@Query("select ur.user from UserRoles ur where ur.role.id = ?1") //it will get user using role_id (1.Admin,2.Customer,3.Vendor)
	List<User> findUserByRoleId(int role);
	
}
