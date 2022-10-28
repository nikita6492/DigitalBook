package com.digitalbooks.bookservice.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.digitalbooks.bookservice.entity.Book;

@Repository
public interface BookRepository extends JpaRepository<Book, Long> {
	
	public List<Book> findByCategoryAndStatus(String category,String status);
	public List<Book> findByTitleAndStatus(String title,String status);
	public List<Book> findByAuthorAndStatus(String author,String status);
	public List<Book> findByCategoryAndTitleAndStatus(String category, String title, String status);
	public List<Book> findByCategoryAndAuthorAndStatus(String category, String author, String status);
	public List<Book> findByTitleAndAuthorAndStatus(String title, String author, String status);
	public List<Book> findByCategoryAndTitleAndAuthorAndStatus(String category,String title, String author, String status);
	public List<Book> findByAuthorEmail(String authorEmail);
}
