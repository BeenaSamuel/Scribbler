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

import com.publish.contentpublishonetomany.repository.PublisherRepository;
import com.publish.contentpublishonetomany.exception.ResourceNotFoundException;
import com.publish.contentpublishonetomany.model.Content;
import com.publish.contentpublishonetomany.repository.ContentRepository;


@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api")
public class ContentController {
	
	@Autowired
  private PublisherRepository publisherRepository;

  @Autowired
  private ContentRepository contentRepository;

  @GetMapping("/publishers/{publisherId}/contents")
  public ResponseEntity<List<Content>> getAllContentsByPublisherId(@PathVariable(value = "publisherId") Long publisherId) {
    if (!publisherRepository.existsById(publisherId)) {
      throw new ResourceNotFoundException("Not found Publisher with id = " + publisherId);
    }

    List<Content> contents = contentRepository.findByPublisherId(publisherId);
    return new ResponseEntity<>(contents, HttpStatus.OK);
  }
  @GetMapping("/contents/{title}")
  public ResponseEntity<List<Content>> getAllContentByTitle(@PathVariable(value = "title") String title) {
    List<Content> content = contentRepository.findByTitleContaining(title);
      
    return new ResponseEntity<>(content, HttpStatus.OK);
  }

  @GetMapping("/contents/{id}")
  public ResponseEntity<Content> getContentsByPublisherId(@PathVariable(value = "id") Long id) {
    Content content = contentRepository.findById(id)
        .orElseThrow(() -> new ResourceNotFoundException("Not found Content with id = " + id));

    return new ResponseEntity<>(content, HttpStatus.OK);
  }

  @PostMapping("/publishers/{publisherId}/contents")
  public ResponseEntity<Content> createContent(@PathVariable(value = "publisherId") Long publisherId,
      @RequestBody Content contentRequest) {
    Content content = publisherRepository.findById(publisherId).map(publisher -> {
      contentRequest.setPublisher(publisher);
      return contentRepository.save(contentRequest);
    }).orElseThrow(() -> new ResourceNotFoundException("Not found Publisher with id = " + publisherId));

    return new ResponseEntity<>(content, HttpStatus.CREATED);
  }

  @PutMapping("/contents/{id}")
  public ResponseEntity<Content> updateContent(@PathVariable("id") long id, @RequestBody Content contentRequest) {
    Content content = contentRepository.findById(id)
        .orElseThrow(() -> new ResourceNotFoundException("ContentId " + id + "not found"));

    content.setContent(contentRequest.getContent());

    return new ResponseEntity<>(contentRepository.save(content), HttpStatus.OK);
  }

  @DeleteMapping("/contents/{id}")
  public ResponseEntity<HttpStatus> deleteContent(@PathVariable("id") long id) {
    contentRepository.deleteById(id);

    return new ResponseEntity<>(HttpStatus.NO_CONTENT);
  }
  
  @DeleteMapping("/publishers/{publisherId}/contents")
  public ResponseEntity<List<Content>> deleteAllContentsOfPublisher(@PathVariable(value = "publisherId") Long publisherId) {
    if (!publisherRepository.existsById(publisherId)) {
      throw new ResourceNotFoundException("Not found Publisher with id = " + publisherId);
    }

    contentRepository.deleteByPublisherId(publisherId);
    return new ResponseEntity<>(HttpStatus.NO_CONTENT);
  }

}
