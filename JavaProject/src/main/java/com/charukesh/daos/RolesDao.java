package com.charukesh.daos;

import org.springframework.data.jpa.repository.JpaRepository;

import com.charukesh.entities.Roles;

public interface RolesDao extends JpaRepository<Roles, Integer> {

	
}
