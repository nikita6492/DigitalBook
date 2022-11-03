package com.digitalbooks.bookservice.config;

import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.digitalbooks.bookservice.filter.JwtFilter;

@Configuration
public class FilterConfig {
	@Bean
	public FilterRegistrationBean<JwtFilter> jwtFilter() {
		FilterRegistrationBean<JwtFilter> filter = new FilterRegistrationBean<JwtFilter>();
		filter.setFilter(new JwtFilter());

//        provide endpoints which needs to be restricted.
//        All Endpoints would be restricted if unspecified
		filter.addUrlPatterns("/api/v1/digitalbooks/author/{authorEmail}/books",
				"/api/v1/digitalbooks/reader/{email}/books",
				"/api/v1/digitalbooks/reader/{email}/books/{subscriptionId}",
				"/api/v1/digitalbooks/reader/{email}/books/{subscriptionId}/read",
				"/api/v1/digitalbooks/author/{authorEmail}/books/{bookId}",
				"/api/v1/digitalbooks/author/{authorEmail}/books/{bookId}", "/api/v1/digitalbooks/fetchBookById/{bookId}",
                "/api/v1/digitalbooks/reader/{readerEmail}/viewInvoice");
		return filter;
	}
}
