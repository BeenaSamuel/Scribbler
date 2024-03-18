import React, { Component } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import Col from 'react-bootstrap/Col';
import { Client, Account, ID } from 'appwrite';


import Row from 'react-bootstrap/Row';

const client = new Client()
    .setEndpoint('https://cloud.appwrite.io/v1') // Your API Endpoint
    .setProject('internshipProject');               // Your project ID
const account = new Account(client);

class SignIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      error: '',
    };
  }

  handleUsernameChange = (event) => {
    this.setState({ username: event.target.value });
  };

  handlePasswordChange = (event) => {
    this.setState({ password: event.target.value });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const { username, password } = this.state;
    console.log(username,password);
    const promise = account.createEmailSession(username,password);

promise.then( (response) => {
  this.props.onSignIn();
  
}, function (error) {
    console.log(error);
    console.log('User does not exist!');
    alert(error)
    this.setState({ error: error }); // Failure
});
    // axios
    //   .get(`http://localhost:8081/api/publishers?name=${username}&password=${password}`)
    //   .then((response) => {
    //     const data = response.data;
    //     if (data.length) {
    //       console.log('User exists!');
          
    //       this.props.onSignIn();
    //     } else {
    //       console.log('User does not exist!');
    //       this.setState({ error: 'Invalid username or password' });
    //     }
    //   })
    //   .catch((error) => {
    //     console.error('Error fetching user data:', error);
    //     this.setState({ error: 'Error signing in. Please try again later.' });
    //   });
  };

  handleSignOut = () => {
    // Set the isSignedIn state to false in the parent component
    this.props.onSignOut();
  };

  render() {
    // If the user is signed in, render a sign-out button
    if (this.props.isSignedIn) {
      return (
        <div className="App">
          <h1>Sign Out</h1>
          <Button variant="primary" onClick={this.handleSignOut}>
            Sign Out
          </Button>
        </div>
      );
    }

    // Otherwise, render the sign-in form
    return (
      <div className="App">
        <h1>Sign In</h1>
        <div className='login' style={{margin: '50px'}}>
        <Form onSubmit={this.handleSubmit}>
           
        <Form.Group as={Row} className="mb-3" >
        <Form.Label column sm="2">
          Name
        </Form.Label>
        <Col sm="10">
        <Form.Control type="text" placeholder="Enter your name"   value={this.state.username} onChange={this.handleUsernameChange}/>
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

          <Button variant="primary" type="submit">
            Sign In
          </Button>

          {this.state.error && <div className="mt-3 text-danger">{this.state.error}</div>}
        </Form>
      </div>
      </div>
    );
  }
}

export default SignIn;
