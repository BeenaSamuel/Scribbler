package com.publish.contentpublishonetomany.repository;
import java.util.List;


import javax.transaction.Transactional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.publish.contentpublishonetomany.model.Content;
import com.publish.contentpublishonetomany.model.Publisher;

public interface ContentRepository  extends JpaRepository<Content, Long>{
	List<Content> findByPublisherId(Long postId);
	List<Content> findByTitleContaining(String title);
  @Transactional
  void deleteByPublisherId(long publisherId);

}
