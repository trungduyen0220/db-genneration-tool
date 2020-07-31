package com.dbgeneration.repository;

import org.springframework.data.repository.CrudRepository;

import com.dbgeneration.entity.User;

public interface UserRepository extends CrudRepository<User, Integer> {

	User findByEmail(String email);

}
