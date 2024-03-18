import React from 'react';
import axios from 'axios';

class Content extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      contents: []
    };
  }

  componentDidMount() {
    axios.get('http://localhost:8084/api/publishers/1/contents')
      .then(response => {
        this.setState({ contents: response.data });
      })
      .catch(error => {
        console.log(error);
      });
  }

  render() {
    return (
      <div>
        {this.state.contents.map(content => (
          <div key={content.id}>
            <h3>{content.title}</h3>
            <p>{content.content}</p>
            <p>{content.description}</p>
          </div>
        ))}
      </div>
    );
  }
}

export default Content;
