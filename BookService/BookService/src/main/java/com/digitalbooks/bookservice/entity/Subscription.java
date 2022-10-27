package com.digitalbooks.bookservice.entity;



public class Subscription {
	
	private Long id;
	
	private Long bookId;

	private Long userId;
	
	private String status;
	public Subscription() {
		super();
		// TODO Auto-generated constructor stub
	}
	
	public Subscription(Long id, Long bookId, Long userId, String status) {
		super();
		this.id = id;
		this.bookId = bookId;
		this.userId = userId;
		this.status = status;
	}

	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public Long getBookId() {
		return bookId;
	}
	public void setBookId(Long bookId) {
		this.bookId = bookId;
	}
	public Long getUserId() {
		return userId;
	}
	public void setUserId(Long userId) {
		this.userId = userId;
	}
	public String getStatus() {
		return status;
	}
	public void setStatus(String status) {
		this.status = status;
	}
	
	

}
