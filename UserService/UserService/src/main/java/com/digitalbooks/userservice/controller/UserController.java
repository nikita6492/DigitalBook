package com.digitalbooks.userservice.controller;

import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.digitalbooks.userservice.config.JwtGeneratorInterface;
import com.digitalbooks.userservice.entity.User;
import com.digitalbooks.userservice.service.UserService;


@RestController
public class UserController {
	
	@Autowired
	private UserService userService;
	
	@Autowired
	private JwtGeneratorInterface jwtGeneratorInterface;
	
	@PostMapping("/api/v1/digitalbooks/sign-up")
	@CrossOrigin(origins = "http://localhost:4200")
	public User signUpUser(@RequestBody User user) throws Exception {
		String emailId = user.getEmail();
		
		if(emailId!=null) {
			User userObj =userService.fetchUserByEmailId(emailId);
			if(userObj!=null) {
				throw new Exception("User with email id "+emailId+" is already present!");
			}
		}
		User userObj =null;
		userObj=userService.saveUser(user);
		return userObj;
	}
	
	@PostMapping("/api/v1/digitalbooks/sign-in")
	@CrossOrigin(origins = "http://localhost:4200")
	public String singInUser(@RequestBody User user) throws Exception {
		String emailId = user.getEmail();
		String pass = user.getPassword();
		User userObj=null;
		if(emailId !=null && pass !=null) {
			userObj = userService.fetchUserByEmailIdAndPassword(emailId,pass);
			if(userObj == null) {
				 throw new Exception("NO user found!!");
			}
			
		}
		Map<String, String> token=jwtGeneratorInterface.generateToken(userObj);
		return token.get("token");
	}
	@GetMapping("/api/v1/digitalbooks/fetchuserbyemail/{email}")
	@CrossOrigin(origins = "http://localhost:4200")
	public User fetchUserByEmail(@PathVariable("email") String email) throws Exception {
		User userObj=null;
		if(email !=null) {
			userObj = userService.fetchUserByEmailId(email);
		}
		return userObj;
	}
	
	@GetMapping("/api/v1/digitalbooks/fetchuserbyid/{id}")
	@CrossOrigin(origins = "http://localhost:4200")
	public User fetchUserById(@PathVariable("id") Long id) throws Exception {
		Optional<User> userObj=null;
		if(id !=null) {
			userObj = userService.fetchUserById(id);
		}
		return userObj.get();
	}
	
	
}
