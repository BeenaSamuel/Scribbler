import React, { Component } from 'react';
import Form from 'react-bootstrap/Form';
import TextEditor from '../Editor';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import { Client, Databases, ID , Account } from "appwrite";

const client = new Client();

const databases = new Databases(client);
const account = new Account(client);

client
    .setEndpoint('https://cloud.appwrite.io/v1') // Your API Endpoint
    .setProject('internshipProject') // Your project ID
;

class Publish extends React.Component {
  constructor() {
    super();
    this.state = {
      category: '',
      description: '',
      content: '',
      successMessage: ''
    }
  }

  handleCategoryChange = (event) => {
    this.setState({ category: event.target.value });
  }

  handleDescriptionChange = (event) => {
    this.setState({ description: event.target.value });
  }

  handleContentChange = (event) => {
    console.log('event' , event);
    this.setState({ content:event.target.value });
  }

  handleSubmit = async (event) => {
    event.preventDefault();
    const {category, description, content } = this.state;
    const accountInfo = await account.get();
   console.log(accountInfo);
   const userId = accountInfo.$id
    const promise = databases.createDocument('scribblerDb', 'scribbles', ID.unique(), {category,description,content , userId});

promise.then(function (response) {
    console.log(response); // Success
}, function (error) {
    console.log(error); // Failure
});
    // axios.post('http://localhost:8084/api/publishers/1/contents', { title, description, content })
    //   .then(response => {
    //     const content_id = response.data.id; // get the newly created content_id
    //     console.log('Form submitted successfully');
    //     this.setState({ successMessage: 'Form submitted successfully', canEdit: true, content_id });
    //   })
    //   .catch(error => {
    //     console.error('Error submitting form:', error);
    //     this.setState({ successMessage: 'Submission is unsuccessful' });
    //   });
  }
  
  handleEdit = (event) => {
    event.preventDefault();
    const {category, description, content, content_id } = this.state;
    axios.put(`http://localhost:8084/api/contents/${content_id}`, { category, description, content })
      .then(response => {
        console.log('Form edited successfully');
        this.setState({ successMessage: 'Form edited successfully' });
      })
      .catch(error => {
        console.error('Error editing form:', error);
        this.setState({ successMessage: 'Editing is unsuccessful' });
      });
  }
  
  render() {
    const { canEdit, successMessage, content_id } = this.state;
    return (
      <div className='App' >
        <h1>Publish</h1>
        <div className="publish">
          <Form onSubmit={canEdit ? this.handleEdit : this.handleSubmit}>
            <Form.Select
              aria-label="Floating label select example"
              value={this.state.category}
              onChange={this.handleCategoryChange}
            >
              <option>Select your category</option>
              <option value="poem">Poem</option>
              <option value="story">Story</option>
              <option value="articles">Articles</option>
              <option value="jokes">Jokes</option>
            </Form.Select>
            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
              <Form.Label>Enter description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={this.state.description}
                onChange={this.handleDescriptionChange}
              />
            </Form.Group>
            <Form.Group>
            <Form.Control
                as="textarea"
                rows={3}
                value={this.state.content}
                onChange={this.handleContentChange}
              />
            </Form.Group>
            <Button type="submit" className="m-3">{canEdit ? 'Save changes' : 'Submit form'}</Button>
            {canEdit && (
              <Button type="submit" className="m-3" onClick={() => this.setState({ canEdit: false })}>
                Cancel edit
              </Button>
            )}
          </Form>
          {successMessage && <div>{successMessage}</div>}
        </div>
      </div>
    );
  }
}  
export default Publish;

