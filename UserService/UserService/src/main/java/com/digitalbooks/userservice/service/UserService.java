package com.digitalbooks.userservice.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.digitalbooks.userservice.entity.User;
import com.digitalbooks.userservice.repository.UserRepository;


@Service
public class UserService {
	
	@Autowired
	private UserRepository userRepository;
	
	public User saveUser(User user) {
		return userRepository.save(user);
	}

	public User fetchUserByEmailId(String email) {
		return userRepository.findByEmail(email);
	}
	
	public User fetchUserByEmailIdAndPassword(String email, String pass) {
		return userRepository.findByEmailAndPassword(email,pass);
	}
	
	public Optional<User> fetchUserById(Long authorId) {
		return userRepository.findById(authorId);
	}
	
	
}
