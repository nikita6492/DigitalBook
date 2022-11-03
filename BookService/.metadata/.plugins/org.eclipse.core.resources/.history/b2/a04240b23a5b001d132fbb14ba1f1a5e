package com.digitalbooks.bookservice.controller;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import com.digitalbooks.bookservice.entity.Book;
import com.digitalbooks.bookservice.entity.Subscription;
import com.digitalbooks.bookservice.entity.User;
import com.digitalbooks.bookservice.service.BookService;

@RestController
public class BookController {

	@Autowired
	private BookService bookService;

	@Autowired
	private RestTemplate restTemplate;

	@PostMapping("/api/v1/digitalbooks/author/{authorEmail}/books")
	@CrossOrigin(origins = "http://localhost:4200")
	public Book createBook(@PathVariable("authorEmail") String authorEmail, @RequestBody Book book) throws Exception {
		User user = restTemplate.getForObject("http://localhost:9091/api/v1/digitalbooks/fetchuserbyemail/" + authorEmail,
				User.class);
		if (user != null) {
			book.setAuthor(user.getFirstName());
			book.setStatus(book.getStatus().toLowerCase());
			book.setActive(book.getActive().toLowerCase());
		} else {
			throw new Exception("Author not found!");
		}
		bookService.saveBook(book);
		return book;
	}

	@GetMapping("/api/v1/digitalbooks/search")
	@CrossOrigin(origins = "http://localhost:4200")
	public List<Book> searchBook(@RequestParam(name = "category", required = false) String category,
			@RequestParam(name = "title", required = false) String title,
			@RequestParam(name = "author", required = false) String author) throws Exception {
		List<Book> book = null;
		if((category!=null) && (title==null || title.isEmpty()) && (author==null || author.isEmpty())) {
			book=bookService.findByCategoryAndStatus(category, "unblock");
		}else if((category==null || category.isEmpty()) && (title!=null) && (author==null || author.isEmpty())) {
			book=bookService.findByTitleAndStatus(title, "unblock");
		}else if((category==null || category.isEmpty()) && (title==null || title.isEmpty()) && (author!=null)) {
			book=bookService.findByAuthorAndStatus(author, "unblock");
		}else if(category!=null && title!=null && (author==null || author.isEmpty())) {
			book=bookService.findByCategoryAndTitleAndStatus(category, title, "unblock");
		}else if(category!=null && (title==null || title.isEmpty()) && author!=null) {
			book=bookService.findByCategoryAndAuthorAndStatus(category, author, "unblock");
		}else if((category==null || category.isEmpty()) && title!=null && author!=null) {
			book=bookService.findByTitleAndAuthorAndStatus(title, author, "unblock");
		}else if(category!=null && title!=null && author!=null) {
			book =bookService.findByCategoryAndTitleAndAuthorAndStatus(category, title, author, "unblock");
		}
		if (book != null ) {
			return book;
		} else {
			throw new Exception("No book found!");
		}
	}

	@SuppressWarnings("unchecked")
	@GetMapping("/api/v1/digitalbooks/reader/{email}/books")
	@CrossOrigin(origins = "http://localhost:4200")
	public List<Book> fetchAllSubscribedBooks(@PathVariable("email") String email) throws Exception {
		ParameterizedTypeReference<List<Subscription>> typeRef = new ParameterizedTypeReference<List<Subscription>>() {
		};
		ResponseEntity<List<Subscription>> responseEntity = restTemplate.exchange(
				"http://localhost:9093/api/v1/digitalbooks/fetchallsubscribedbook/" + email, HttpMethod.GET,
				null, typeRef);
		List<Subscription> subscriptionList = responseEntity.getBody();
		
		List<Book> bookList = new ArrayList<>();
		for (Subscription subscription : subscriptionList) {
			Optional<Book> book = bookService.fetchByBookId(subscription.getBookId());
			bookList.add(book.get());
		}
		if(bookList!=null && !bookList.isEmpty())
		return bookList;
		else
			throw new Exception("No subscribed books for you !!");
	}

	@GetMapping("/api/v1/digitalbooks/reader/{email}/books/{subscriptionId}")
	@CrossOrigin(origins = "http://localhost:4200")
	public Book fetchSubscribedBook(@PathVariable("email") String email,
			@PathVariable("subscriptionId") Long subscriptionId) {
		User user = restTemplate.getForObject("http://localhost:9091/api/v1/digitalbooks/fetchuserbyemail/" + email,
				User.class);
		Subscription subscription = restTemplate.getForObject(
				"http://localhost:9093/api/v1/digitalbooks/fetchsubscribedbook/" + user.getId() + "/" + subscriptionId,
				Subscription.class);
		Optional<Book> book = bookService.fetchByBookId(subscription.getBookId());
		return book.get();
	}

	@GetMapping("/api/v1/digitalbooks/reader/{email}/books/{bookId}/read")
	@CrossOrigin(origins = "http://localhost:4200")
	public Book readBookContent(@PathVariable("email") String email,
			@PathVariable("bookId") Long bookId) {
		Optional<Book> book = bookService.fetchByBookId(bookId);
		return book.get();
	}

	@PutMapping("/api/v1/digitalbooks/author/{authorEmail}/books/{bookId}")
	@CrossOrigin(origins = "http://localhost:4200")
	public Book editBook(@PathVariable("authorEmail") String authorEmail, @PathVariable("bookId") Long bookId,
			@RequestBody Book book) throws Exception {
		Optional<Book> bookObj = bookService.fetchByBookId(bookId);
		if (book.getActive() != null) {
			bookObj.get().setActive(book.getActive().toLowerCase());
		}
		if (book.getAuthor() != null) {
			bookObj.get().setAuthor(book.getAuthor());
		}
		if (book.getCategory() != null) {
			bookObj.get().setCategory(book.getCategory());
		}
		if (book.getContent() != null) {
			bookObj.get().setContent(book.getContent());
		}
		if (book.getPrice() != null) {
			bookObj.get().setPrice(book.getPrice());
		}
		if (book.getPublisher() != null) {
			bookObj.get().setPublisher(book.getPublisher());
		}
		if (book.getStatus() != null) {
			bookObj.get().setStatus(book.getStatus().toLowerCase());
		}
		if (book.getTitle() != null) {
			bookObj.get().setTitle(book.getTitle());
		}
		bookService.saveBook(bookObj.get());
		return bookObj.get();
	}

	@PostMapping("/api/v1/digitalbooks/author/{authorEmail}/books/{bookId}")
	@CrossOrigin(origins = "http://localhost:4200")
	public String blockBook(@PathVariable("authorEmail") String authorEmail, @PathVariable("bookId") Long bookId,
			@RequestParam(value = "block") String block) {
		String status = null;
		Optional<Book> book = bookService.fetchByBookId(bookId);
		if (block.equalsIgnoreCase("yes")) {
			book.get().setStatus("block");
			status = "Book is blocked";
		} else if (block.equalsIgnoreCase("no")) {
			book.get().setStatus("unblock");
			status = "Book is unblocked";
		}
		bookService.saveBook(book.get());
		return status;
	}

	@GetMapping("/api/v1/digitalbooks/fetchBookById/{bookId}")
	@CrossOrigin(origins = "http://localhost:4200")
	public Book fetchBookById(@PathVariable("bookId") Long bookId) {
		Optional<Book> bookObj = bookService.fetchByBookId(bookId);
		return bookObj.get();
	}
	
	@GetMapping("/api/v1/digitalbooks/viewAddedBooks/{authorEmail}")
	@CrossOrigin(origins = "http://localhost:4200")
	public List<Book> viewAddedBooksByAuthor(@PathVariable("authorEmail") String authorEmail) {
		List<Book> bookObj = bookService.fetchByAuthorEmail(authorEmail);
		return bookObj;
	}
	
	@DeleteMapping("/api/v1/digitalbooks/deleteBook/{bookId}")
	@CrossOrigin(origins = "http://localhost:4200")
	public void deleteBook(@PathVariable("bookId") Long bookId) {
		bookService.deleteBook(bookId);
	}
	
	@GetMapping("/api/v1/digitalbooks/searchForReader")
	@CrossOrigin(origins = "http://localhost:4200")
	public List<Book> searchBookForReader(@RequestParam(name = "category", required = false) String category,
			@RequestParam(name = "title", required = false) String title,
			@RequestParam(name = "author", required = false) String author, @RequestParam("email") String email) throws Exception {
		List<Book> book = null;
		if((category!=null) && (title==null || title.isEmpty()) && (author==null || author.isEmpty())) {
			book=bookService.findByCategoryAndStatus(category, "unblock");
		}else if((category==null || category.isEmpty()) && (title!=null) && (author==null || author.isEmpty())) {
			book=bookService.findByTitleAndStatus(title, "unblock");
		}else if((category==null || category.isEmpty()) && (title==null || title.isEmpty()) && (author!=null)) {
			book=bookService.findByAuthorAndStatus(author, "unblock");
		}else if(category!=null && title!=null && (author==null || author.isEmpty())) {
			book=bookService.findByCategoryAndTitleAndStatus(category, title, "unblock");
		}else if(category!=null && (title==null || title.isEmpty()) && author!=null) {
			book=bookService.findByCategoryAndAuthorAndStatus(category, author, "unblock");
		}else if((category==null || category.isEmpty()) && title!=null && author!=null) {
			book=bookService.findByTitleAndAuthorAndStatus(title, author, "unblock");
		}else if(category!=null && title!=null && author!=null) {
			book =bookService.findByCategoryAndTitleAndAuthorAndStatus(category, title, author, "unblock");
		}
		User user = restTemplate.getForObject("http://localhost:9091/api/v1/digitalbooks/fetchuserbyemail/" + email,
				User.class);
		List<Book> bookList = new ArrayList<>();
		for(Book b:book) {
			Boolean flag=false;
			ParameterizedTypeReference<List<Subscription>> typeRef = new ParameterizedTypeReference<List<Subscription>>() {
			};
			ResponseEntity<List<Subscription>> responseEntity = restTemplate.exchange(
					"http://localhost:9093/api/v1/digitalbooks/fetchallsubscribedbookById/" + user.getId(), HttpMethod.GET,
					null, typeRef);
			List<Subscription> subscriptionList = responseEntity.getBody();
			for (Subscription subscription : subscriptionList) {
				
				if(b.getId()==subscription.getBookId()) {
					flag=true;
				}
			}
			if(flag==false) {
				bookList.add(b);
			}
		}
		
		if (bookList != null && !bookList.isEmpty()) {
			return bookList;
		} else {
			throw new Exception("No book found!");
		}
	}
}
