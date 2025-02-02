package com.quickcart.daos;

import org.springframework.data.jpa.repository.JpaRepository;

import com.quickcart.entities.Roles;

public interface RolesDao extends JpaRepository<Roles, Integer> {

	
}
