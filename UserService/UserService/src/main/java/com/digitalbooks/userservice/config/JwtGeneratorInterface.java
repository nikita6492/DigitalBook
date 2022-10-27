package com.digitalbooks.userservice.config;

import java.util.Map;

import com.digitalbooks.userservice.entity.User;

public interface JwtGeneratorInterface {

	public Map<String, String> generateToken(User user);
}
