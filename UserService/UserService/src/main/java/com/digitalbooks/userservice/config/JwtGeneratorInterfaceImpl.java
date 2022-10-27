package com.digitalbooks.userservice.config;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.digitalbooks.userservice.entity.User;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

@Service
public class JwtGeneratorInterfaceImpl implements JwtGeneratorInterface {

	  @Value("${jwt.secret}")
	    private String secret;

	    @Value("${app.jwttoken.message}")
	    private String message;

	    @Override
	    public Map<String, String> generateToken(User user) {
	        String jwtToken="";
	        jwtToken = Jwts.builder().setSubject(user.getEmail()).setIssuedAt(new Date()).signWith(SignatureAlgorithm.HS256, "digitalbooks").compact();
	        Map<String, String> jwtTokenGen = new HashMap<>();
	        jwtTokenGen.put("token", jwtToken);
	        jwtTokenGen.put("message", message);
	        return jwtTokenGen;
	    }

}
