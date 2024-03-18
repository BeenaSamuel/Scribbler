package com.publish.contentpublishonetomany.model;

import javax.persistence.*;




import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
public class Comment {
@Id
  @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "comment_generator")
  private Long id;

  @Lob
  private String name;
  public String email;
  public String comment;
  public long likes;
  public long dislikes;
  



//  @ManyToOne(fetch = FetchType.EAGER, optional = false)
  @ManyToOne(fetch = FetchType.LAZY, optional = false)
  @JoinColumn(name = "content_id", nullable = false)
  @OnDelete(action = OnDeleteAction.CASCADE)
  @JsonIgnore
  private Content content;

  public Long getId() {
    return id;
  }

public String getName() {
	return name;
}

public void setName(String name) {
	this.name = name;
}

public String getEmail() {
	return email;
}

public void setEmail(String email) {
	this.email = email;
}

public String getComment() {
	return comment;
}

public void setComment(String comment) {
	this.comment = comment;
}

public long getLikes() {
	return likes;
}

public void setLikes(long likes) {
	this.likes = likes;
}

public long getDislikes() {
	return dislikes;
}

public void setDislikes(long dislikes) {
	this.dislikes = dislikes;
}

public Content getContent() {
	return content;
}

public void setContent(Content content) {
	this.content = content;
}

  
 

}
