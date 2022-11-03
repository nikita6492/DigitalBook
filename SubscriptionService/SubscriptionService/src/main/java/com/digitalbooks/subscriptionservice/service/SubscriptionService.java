package com.digitalbooks.subscriptionservice.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.digitalbooks.subscriptionservice.entity.Subscription;
import com.digitalbooks.subscriptionservice.repository.SubscriptionRepository;


@Service
public class SubscriptionService {
	
	@Autowired
	private SubscriptionRepository subscriptionRepository;
	
	public Subscription saveSubscription(Subscription subscription) {
		return subscriptionRepository.save(subscription);
	}

	public List<Subscription> fetchAllSubscribedBooks(Long userId){
		return subscriptionRepository.findByUserIdAndStatus(userId,"subscribe");
	}
	
	public Subscription fetchSubscriptionByBookIdAndUserIdAndStatus(Long bookId, Long userId, String status) {
		return subscriptionRepository.findByBookIdAndUserIdAndStatus(bookId,userId,status);
	}
	
	public Subscription fetchBookIdByUserIdAndSubscriptionId(Long userId, Long subscriptionId) {
		return subscriptionRepository.findByUserIdAndId(userId, subscriptionId);
	}
	
	public Subscription fetchByUserIdAndBookIdAndStatus(Long userId, Long bookId, String status){
		return subscriptionRepository.findByUserIdAndBookIdAndStatus(userId, bookId, status);
	}
	public Subscription fetchByUserIdAndBookId(Long userId, Long bookId){
		return subscriptionRepository.findByUserIdAndBookId(userId, bookId);
	}
	
}
