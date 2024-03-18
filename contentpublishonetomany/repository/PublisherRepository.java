package com.publish.contentpublishonetomany.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.publish.contentpublishonetomany.model.Publisher;

public interface PublisherRepository extends JpaRepository<Publisher,Long> {
	

	  List<Publisher> findByNameContaining(String name);
}
