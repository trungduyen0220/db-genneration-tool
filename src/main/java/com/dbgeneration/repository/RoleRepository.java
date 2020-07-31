package com.dbgeneration.repository;

import org.springframework.data.repository.CrudRepository;

import com.dbgeneration.entity.Role;

public interface RoleRepository extends CrudRepository<Role, Integer> {

	Role findByName(String name);

}