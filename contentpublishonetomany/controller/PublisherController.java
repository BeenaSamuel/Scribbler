package com.publish.contentpublishonetomany.controller;

import java.util.ArrayList;


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
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import com.publish.contentpublishonetomany.exception.ResourceNotFoundException;
import com.publish.contentpublishonetomany.model.Publisher;
import com.publish.contentpublishonetomany.repository.PublisherRepository;



@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api")
public class PublisherController {
 @Autowired
  PublisherRepository publisherRepository;

  @GetMapping("/publishers")
  public ResponseEntity<List<Publisher>> getAllPublishers(@RequestParam(required = false) String name) {
    List<Publisher> publishers = new ArrayList<Publisher>();

    if (name == null)
      publisherRepository.findAll().forEach(publishers::add);
    else
      publisherRepository.findByNameContaining(name).forEach(publishers::add);

    if (publishers.isEmpty()) {
      return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    return new ResponseEntity<>(publishers, HttpStatus.OK);
  }

  @GetMapping("/publishers/{id}")
  public ResponseEntity<Publisher> getPublisherById(@PathVariable("id") long id) {
    Publisher publisher = publisherRepository.findById(id)
        .orElseThrow(() -> new ResourceNotFoundException("Not found Publisher with id = " + id));

    return new ResponseEntity<>(publisher, HttpStatus.OK);
  }

  @PostMapping("/publishers")
  public ResponseEntity<Publisher> createPublisher(@RequestBody Publisher publisher) {
    Publisher _publisher = publisherRepository.save(new Publisher(publisher.getName(), publisher.getEmail(), publisher.getPassword(),publisher.getContact(),publisher.getDescription(),publisher.getCountry()));
    return new ResponseEntity<>(_publisher, HttpStatus.CREATED);
  }

  @PutMapping("/publishers/{id}")
  public ResponseEntity<Publisher> updatePublisher(@PathVariable("id") long id, @RequestBody Publisher publisher) {
    Publisher _publisher = publisherRepository.findById(id)
        .orElseThrow(() -> new ResourceNotFoundException("Not found Publisher with id = " + id));

    _publisher.setName(publisher.getName());
    _publisher.setEmail(publisher.getEmail());
    _publisher.setPassword(publisher.getPassword());
    _publisher.setContact(publisher.getContact());
    _publisher.setCountry(publisher.getCountry());
    _publisher.setDescription(publisher.getDescription());
   
    
    
    return new ResponseEntity<>(publisherRepository.save(_publisher), HttpStatus.OK);
  }

  @DeleteMapping("/publishers/{id}")
  public ResponseEntity<HttpStatus> deletePublisher(@PathVariable("id") long id) {
    publisherRepository.deleteById(id);
    
    return new ResponseEntity<>(HttpStatus.NO_CONTENT);
  }

  @DeleteMapping("/publishers")
  public ResponseEntity<HttpStatus> deleteAllPublishers() {
    publisherRepository.deleteAll();
    
    return new ResponseEntity<>(HttpStatus.NO_CONTENT);
  }


}
