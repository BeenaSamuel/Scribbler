import React, { Component } from 'react';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import axios from 'axios';


class DeleteContent extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        title: '',
        contentId: null,
        successMessage: ''
       }
 
      
    }
    handleTitleChange = (event) => {
        this.setState({ title: event.target.value });
      }

      handleSubmit = (event) => {
        event.preventDefault();

        // make a GET request to retrieve the ID of the content with the specified title
        const { title } = this.state;

    // Send a DELETE request to the API endpoint to delete the content by its title
    axios.delete(`http://localhost:8084/api/publishers/53/contents?title=${title}`)

            .then(response => {
                const contentId = response.data.id;
                this.setState({ contentId });

                // make a DELETE request to delete the content using the retrieved ID
                axios.delete('http://localhost:8084/api/contents/' + contentId)
                    .then(response => {
                        this.setState({ successMessage: 'Deleted content successfully' });
                    })
                    .catch(error => {
                        console.error('Error deleting content:', error);
                        this.setState({ successMessage: 'Successfully deleted:' });
                    });
            })
            .catch(error => {
                console.error('Error retrieving content ID:', error);
                this.setState({ successMessage: 'Error retrieving content ID:' });
            });
    }
    render() {
        
      return (
        
        <div className="App"  >
        <h1>Feedback</h1>
        <Form onSubmit={this.handleSubmit}>
        <Form.Group as={Row} className="mb-3" >
        <Form.Label column sm="2">
          Title
        </Form.Label>
        <Col sm="10">
        <Form.Control type="text" placeholder="Enter your title of content to be deleted"   value={this.state.title} onChange={this.handleTitleChange}/>
        </Col>
      </Form.Group>
        
      <Button type="submit" className="m-3">Submit form</Button>
      

          </Form>
          {this.state.successMessage && <div>{this.state.successMessage}</div>}

          
        
      </div>
      );
      
    }
  }
  
  export default DeleteContent;