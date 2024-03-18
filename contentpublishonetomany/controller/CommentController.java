package com.publish.contentpublishonetomany.controller;
import java.util.List;



import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.publish.contentpublishonetomany.repository.ContentRepository;
import com.publish.contentpublishonetomany.exception.ResourceNotFoundException;
import com.publish.contentpublishonetomany.model.Comment;
import com.publish.contentpublishonetomany.repository.CommentRepository;


@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/publishers/{publisherId}")
public class CommentController {

	@Autowired
  private ContentRepository contentRepository;

  @Autowired
  private CommentRepository commentRepository;

  @GetMapping("/contents/{contentId}/comments")
  public ResponseEntity<List<Comment>> getAllCommentsByContentId(@PathVariable(value = "contentId") Long contentId) {
    if (!contentRepository.existsById(contentId)) {
      throw new ResourceNotFoundException("Not found Content with id = " + contentId);
    }

    List<Comment> comments = commentRepository.findByContentId(contentId);
    return new ResponseEntity<>(comments, HttpStatus.OK);
  }

  @GetMapping("/comments/{id}")
  public ResponseEntity<Comment> getCommentsByContentId(@PathVariable(value = "id") Long id) {
    Comment comment = commentRepository.findById(id)
        .orElseThrow(() -> new ResourceNotFoundException("Not found Comment with id = " + id));

    return new ResponseEntity<>(comment, HttpStatus.OK);
  }

  @PostMapping("/contents/{contentId}/comments")
  public ResponseEntity<Comment> createComment(@PathVariable(value = "contentId") Long contentId,
      @RequestBody Comment commentRequest) {
    Comment comment = contentRepository.findById(contentId).map(content -> {
      commentRequest.setContent(content);
      return commentRepository.save(commentRequest);
    }).orElseThrow(() -> new ResourceNotFoundException("Not found Content with id = " + contentId));

    return new ResponseEntity<>(comment, HttpStatus.CREATED);
  }

  @PutMapping("/comments/{id}")
  public ResponseEntity<Comment> updateComment(@PathVariable("id") long id, @RequestBody Comment commentRequest) {
    Comment comment = commentRepository.findById(id)
        .orElseThrow(() -> new ResourceNotFoundException("CommentId " + id + "not found"));

    comment.setComment(commentRequest.getComment());

    return new ResponseEntity<>(commentRepository.save(comment), HttpStatus.OK);
  }

  @DeleteMapping("/comments/{id}")
  public ResponseEntity<HttpStatus> deleteComment(@PathVariable("id") long id) {
    commentRepository.deleteById(id);

    return new ResponseEntity<>(HttpStatus.NO_CONTENT);
  }
  
  @DeleteMapping("/contents/{contentId}/comments")
  public ResponseEntity<List<Comment>> deleteAllCommentsOfContent(@PathVariable(value = "contentId") Long contentId) {
    if (!contentRepository.existsById(contentId)) {
      throw new ResourceNotFoundException("Not found Content with id = " + contentId);
    }

    commentRepository.deleteByContentId(contentId);
    return new ResponseEntity<>(HttpStatus.NO_CONTENT);
  }

}
