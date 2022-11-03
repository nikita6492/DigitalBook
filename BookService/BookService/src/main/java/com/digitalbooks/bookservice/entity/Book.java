package com.digitalbooks.bookservice.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table (name = "Book")
public class Book {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	@Column
	private String title;
	@Column
	private String category;
	@Column
	private Double price;
	@Column
	private String author;
	@Column
	private String authorEmail;
	@Column
	private String publisher;
	@Column
	private String active;
	@Column
	private String status;
	@Column
	private String content;
	
	
	
	public Book() {
		super();
		// TODO Auto-generated constructor stub
	}




	public Book(Long id, String title, String category, Double price, String author, String authorEmail,
			String publisher, String active, String status, String content) {
		super();
		this.id = id;
		this.title = title;
		this.category = category;
		this.price = price;
		this.author = author;
		this.authorEmail = authorEmail;
		this.publisher = publisher;
		this.active = active;
		this.status = status;
		this.content = content;
		
	}


	public Long getId() {
		return id;
	}


	public void setId(Long id) {
		this.id = id;
	}


	public String getTitle() {
		return title;
	}


	public void setTitle(String title) {
		this.title = title;
	}


	public String getCategory() {
		return category;
	}


	public void setCategory(String category) {
		this.category = category;
	}


	public Double getPrice() {
		return price;
	}


	public void setPrice(Double price) {
		this.price = price;
	}


	public String getAuthor() {
		return author;
	}


	public void setAuthor(String author) {
		this.author = author;
	}


	public String getAuthorEmail() {
		return authorEmail;
	}


	public void setAuthorEmail(String authorEmail) {
		this.authorEmail = authorEmail;
	}


	public String getPublisher() {
		return publisher;
	}


	public void setPublisher(String publisher) {
		this.publisher = publisher;
	}


	public String getActive() {
		return active;
	}


	public void setActive(String active) {
		this.active = active;
	}


	public String getStatus() {
		return status;
	}


	public void setStatus(String status) {
		this.status = status;
	}


	public String getContent() {
		return content;
	}


	public void setContent(String content) {
		this.content = content;
	}


	
	
	
	
}
