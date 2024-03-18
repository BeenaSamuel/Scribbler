package com.publish.contentpublishonetomany.model;

import javax.persistence.*;

@Entity
public class Publisher {
@Id
  @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "tutorial_generator")
  private long id;

  @Column(name = "name")
  private String name;

  @Column(name = "email")
  private String email;
  
  @Column(name = "password")
  private String password;

  
  @Column(name = "contact")
  private long contact;
  
  @Column(name = "country")
  private String country;
  
  @Column(name = "description")
  private String description;
  

  public Publisher() {

  }
  
  public Publisher(String name, String email,String password, long contact, String country, String description) {
		super();
		this.name = name;
		this.email = email;
		this.password = password;
		this.contact = contact;
		this.country = country;
		this.description = description;
	}


  
  public String getPassword() {
	return password;
}

public void setPassword(String password) {
	this.password = password;
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


public long getContact() {
	return contact;
}


public void setContact(long contact) {
	this.contact = contact;
}


public String getCountry() {
	return country;
}


public void setCountry(String country) {
	this.country = country;
}


public String getDescription() {
	return description;
}


public void setDescription(String description) {
	this.description = description;
}


public void setId(long id) {
	this.id = id;
}




public long getId() {
    return id;
  }

@Override
public String toString() {
	return "Publisher [id=" + id + ", name=" + name + ", email=" + email + ", password="+password+" contact=" + contact + ", country="
			+ country + ", description=" + description + "]";
}

  

  

}
