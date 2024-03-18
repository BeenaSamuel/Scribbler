import React, { Component } from 'react';
import { Image } from 'primereact/image';
import Ratingstar from './rating';

class Feedback extends React.Component {
    constructor(props) {
      super(props);
      const rating=5;
      
    }
    render() {
        
      return (
        
        <div className="App"  >
        <h1>Feedback</h1>
        <div class="ui star rating" data-rating="3"></div>
        <Ratingstar/>
        
      </div>
      );
      
    }
  }
  
  export default Feedback;