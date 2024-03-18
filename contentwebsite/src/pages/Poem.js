import React, { Component } from 'react';

class Poem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: props.poems,
    };
  }

  render() {
    const { list } = this.state;
    return (
      <div>
        
        <h1>List Display</h1>
        <ul>
          {list.map((item, index) => (
            <li key={index}>{list}</li>
          ))}
        </ul>
      </div>
    );
  }
}

export default Poem;
