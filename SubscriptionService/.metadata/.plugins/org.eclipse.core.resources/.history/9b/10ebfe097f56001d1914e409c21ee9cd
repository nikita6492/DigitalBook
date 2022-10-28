package com.digitalbooks.subscriptionservice.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import com.digitalbooks.subscriptionservice.entity.Book;
import com.digitalbooks.subscriptionservice.entity.Subscription;
import com.digitalbooks.subscriptionservice.entity.User;
import com.digitalbooks.subscriptionservice.service.SubscriptionService;



@RestController
@CrossOrigin(origins = "*")
public class SubscriptionController {
	
	@Autowired
	private SubscriptionService subscriptionService;
	
	@Autowired
	private RestTemplate restTemplate;
	
	@PostMapping("/api/v1/digitalbooks/subscribe")
	public Long subscribeBook(@RequestParam Long bookId, @RequestParam String email) throws Exception {
		Subscription subscriptionObj =null;
		User user = restTemplate.getForObject("http://localhost:9091/api/v1/digitalbooks/fetchuserbyemail/"+email, User.class);
		String role = user.getRole();
		if(role!=null && role.equalsIgnoreCase("reader")) {
			Book book=restTemplate.getForObject("http://localhost:9092/api/v1/digitalbooks/fetchBookById/"+bookId, Book.class);
			String status=book.getStatus();
			if(status!=null && status.equalsIgnoreCase("unblock")) {
				Subscription tempSub=subscriptionService.fetchSubscriptionByBookIdAndUserIdAndStatus(bookId,user.getId(),"subscribe");
				if(tempSub!=null) {
					throw new Exception("Book is already subscribed !");
				}else {
				Subscription subscription = new Subscription();
				subscription.setBookId(bookId);
				subscription.setUserId(user.getId());
				subscription.setStatus("subscribe");
				subscriptionObj= subscriptionService.saveSubscription(subscription);
				return subscriptionObj.getId();
				}
			}
			else {
				throw new Exception("Book is blocked so you cannot subscribe to it.");
			}
		}else {
			throw new Exception("Only Readers can subscribe book.");
		}
		
		
	}
	

	@PostMapping("/api/v1/digitalbooks/reader/{email}/books/{subscriptionId}/cancel-subscription")
	public String canceSubscription(@PathVariable("email") String email,
			@PathVariable("subscriptionId") Long subscriptionId) {
		String cancel;
		User user = restTemplate.getForObject("http://localhost:9091/api/v1/digitalbooks/fetchuserbyemail/"+email, User.class);
		Subscription subscription = subscriptionService.fetchBookIdByUserIdAndSubscriptionId(user.getId(),subscriptionId);
		subscription.setStatus("unsubscribe");
		Subscription subscriptionObj =subscriptionService.saveSubscription(subscription);
		if(subscriptionObj!=null) {
			cancel = "Book is successfully unsubscribed";
		}else {
			cancel = "Book is not unsubscribed";
		}
		return cancel;
	}
	
	@GetMapping("/api/v1/digitalbooks/fetchallsubscribedbook/{userId}")
	public List<Subscription> fetchAllSubscribedBooks(@PathVariable("userId") Long userId){
		return subscriptionService.fetchAllSubscribedBooks(userId);
	}
	
	@GetMapping("/api/v1/digitalbooks/fetchsubscribedbook/{userId}/{subscriptionId}")
	public Subscription fetchBookIdByUserIdAndSubscriptionId(@PathVariable("userId") Long userId, @PathVariable("subscriptionId") Long subscriptionId) {
		return subscriptionService.fetchBookIdByUserIdAndSubscriptionId(userId, subscriptionId);
	}
	
}
