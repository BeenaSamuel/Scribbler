import React, { Component } from 'react';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import { Link } from 'react-router-dom';


class Register extends React.Component {
    constructor() {
        super();
        this.state = {
          name: '',
          email: '',
          password: '',
         contact: '',
          country: '',
          description: '',
          successMessage: ''
        }
        
      }
      handleNameChange = (event) => {
        this.setState({ name: event.target.value });
      }
    
      handleEmailChange = (event) => {
        this.setState({ email: event.target.value });
      }

      handlePasswordChange = (event) => {
        this.setState({ password: event.target.value });
      }
    
    
      handleContactChange = (event) => {
        this.setState({ contact: event.target.value });
      }

      handleDescriptionChange = (event) => {
        this.setState({ description: event.target.value });
      }
    
      handleCountryChange = (event) => {
        this.setState({ country: event.target.value });
      }
    
      

      handleSubmit = (event) => {
        event.preventDefault();
        const { name,email,password,contact,country,description } = this.state;
        axios.post('http://localhost:8084/api/publishers', { name,email,password,contact,country,description })
          .then(response => {
            console.log('Form submitted successfully');
            this.setState({ successMessage: 'Form submitted successfully' });
          })
          .catch(error => {
            console.error('Error submitting form:', error);
            this.setState({ successMessage: 'Submission is unsuccessful' });
          });
      }
      
    render() {
        
      return (
        
        <div className="App"  >
        <h1>Register</h1>
    
        <Form.Group as={Row} className="mb-3" >
        <Form.Label column sm="2">
          Name
        </Form.Label>
        <Col sm="10">
        <Form.Control type="text" placeholder="Enter your full name"   value={this.state.name} onChange={this.handleNameChange}/>
        </Col>
      </Form.Group>
        

        <Form.Group as={Row} className="mb-3" >
        <Form.Label column sm="2">
          Email
        </Form.Label>
        <Col sm="10">
        <Form.Control type="email" placeholder="Enter email"  value={this.state.email}onChange={this.handleEmailChange}/>
        </Col>
      </Form.Group>

      <Form.Group as={Row} className="mb-3" >
        <Form.Label column sm="2">
          Password
        </Form.Label>
        <Col sm="10">
        <Form.Control type="password" placeholder="Enter strong password"  value={this.state.password}onChange={this.handlePasswordChange}/>
        </Col>
      </Form.Group>

      <Form.Group as={Row} className="mb-3" >
        <Form.Label column sm="2">
          Contact
        </Form.Label>
        <Col sm="10">
        <Form.Control type="number" placeholder="Enter 10 digit phone number"  value={this.state.contact}onChange={this.handleContactChange}/>
        </Col>
      </Form.Group>
     

      <Form.Group as={Row} className="mb-3" >
        <Form.Label column sm="2">
         Country
        </Form.Label>
        <Col sm="10">
        <Form.Select
              aria-label="Floating label select example"
              value={this.state.country}
              onChange={this.handleCountryChange}
            >
              <option>Select your country</option>
              <option value="India">India</option>
              <option value="Srilanka">Srilanka</option>
              <option value="America">America</option>
              <option value="Africa">Africa</option>
            </Form.Select>
        </Col>
      </Form.Group>
      <Form.Group as={Row} className="mb-3" >
        <Form.Label column sm="2">
         Description
        </Form.Label>
        <Col sm="10">
        <Form.Control
                as="textarea"
                rows={3}
                placeholder="Just a few lines about youself"
                value={this.state.description}
                onChange={this.handleDescriptionChange}/>
        </Col>
      </Form.Group>

      <Button type="submit" className="m-3 " onClick={this.handleSubmit}>Register</Button>
      <br></br>
      <Link to="/SignIn" className="btn btn-link">Already registered? Sign In</Link>
  

     
      {this.state.successMessage && <div>{this.state.successMessage}</div>}
       
        
      </div>
      );
      
    }
  }
  
  export default Register;