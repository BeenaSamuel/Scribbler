package com.publish.contentpublishonetomany.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;



import javax.transaction.Transactional;
import com.publish.contentpublishonetomany.model.Comment;

public interface CommentRepository extends JpaRepository<Comment , Long> {
List<Comment> findByContentId(Long postId);
  
  @Transactional
  void deleteByContentId(long contentId);
}
