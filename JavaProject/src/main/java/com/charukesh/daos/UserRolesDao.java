package com.charukesh.daos;

import org.springframework.data.jpa.repository.JpaRepository;

import com.charukesh.entities.UserRoleId;
import com.charukesh.entities.UserRoles;

public interface UserRolesDao extends JpaRepository<UserRoles, UserRoleId> {

	
}
