package com.digitalbooks.userservice.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.digitalbooks.userservice.entity.User;


@Repository
public interface UserRepository extends JpaRepository<User, Long>{
	
	public User findByEmail(String email);
	public User findByEmailAndPassword(String email, String pass); 
}
