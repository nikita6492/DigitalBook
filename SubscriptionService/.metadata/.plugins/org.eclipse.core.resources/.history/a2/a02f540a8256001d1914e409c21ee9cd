package com.digitalbooks.subscriptionservice.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.digitalbooks.subscriptionservice.entity.Subscription;



@Repository
public interface SubscriptionRepository extends JpaRepository<Subscription, Long>{

	
	public List<Subscription> findByUserIdAndStatus(Long userId, String status);
	
	public Subscription findByBookIdAndUserIdAndStatus(Long bookId, Long userId, String status);
	
	public Subscription findByUserIdAndId(Long userId, Long id);
}
