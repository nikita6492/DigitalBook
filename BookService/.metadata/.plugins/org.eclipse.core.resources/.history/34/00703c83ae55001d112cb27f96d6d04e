package com.digitalbooks.bookservice.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.digitalbooks.bookservice.entity.Book;
import com.digitalbooks.bookservice.repository.BookRepository;

@Service
public class BookService {
	
	@Autowired
	private BookRepository bookRepository;
	
	public Book saveBook(Book book) {
		return bookRepository.save(book);
	}
	

	public List<Book> findByCategoryAndStatus(String category,String status){
		return bookRepository.findByCategoryAndStatus(category, status);
	}
	public List<Book> findByTitleAndStatus(String title,String status){
		return bookRepository.findByTitleAndStatus(title, status);
	}
	public List<Book> findByAuthorAndStatus(String author,String status){
		return bookRepository.findByAuthorAndStatus(author, status);
	}
	public List<Book> findByCategoryAndTitleAndStatus(String category, String title, String status){
		return bookRepository.findByCategoryAndTitleAndStatus(category, title, status);
	}
	public List<Book> findByCategoryAndAuthorAndStatus(String category, String author, String status){
		return bookRepository.findByCategoryAndAuthorAndStatus(category, author, status);
	}
	public List<Book> findByTitleAndAuthorAndStatus(String title, String author, String status){
		return bookRepository.findByTitleAndAuthorAndStatus(title, author, status);
	}
	public List<Book> findByCategoryAndTitleAndAuthorAndStatus(String category,String title, String author, String status){
		return bookRepository.findByCategoryAndTitleAndAuthorAndStatus(category,title, author, status);
	}
	public Optional<Book> fetchByBookId(Long bookId) {
		return bookRepository.findById(bookId);
	}
}
