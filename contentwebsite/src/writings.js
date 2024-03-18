import React, { Component } from 'react';
import Poem from './pages/Poem';
class Writings extends Component {
    constructor(props) {
      super(props);
      this.state = {
        poems: ['Poem1', 'Poem 2', 'Poem 3', 'poem 4']
      };
    }
  
    render() {
      return (
        <div>
          <h1>List of Items</h1>
          <Poem poems={this.state.poems} />
        </div>
      );
    }
  }
  export default Writings;