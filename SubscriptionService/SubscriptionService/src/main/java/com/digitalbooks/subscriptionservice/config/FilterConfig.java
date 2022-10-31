package com.digitalbooks.subscriptionservice.config;

import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.digitalbooks.subscriptionservice.filter.JwtFilter;

@Configuration
public class FilterConfig {
	@Bean
	public FilterRegistrationBean jwtFilter() {
		FilterRegistrationBean filter = new FilterRegistrationBean();
		filter.setFilter(new JwtFilter());
//        provide endpoints which needs to be restricted.
//        All Endpoints would be restricted if unspecified
		filter.addUrlPatterns("/api/v1/digitalbooks/fetchByUserEmailAndBookId/{userEmail}/{bookId}",
				"/api/v1/digitalbooks/fetchsubscribedbook/{userEmail}/{subscriptionId}",
				"/api/v1/digitalbooks/fetchallsubscribedbook/{userEmail}",
				"/api/v1/digitalbooks/reader/{email}/books/{bookId}/cancel-subscription");
		return filter;
	}

}
