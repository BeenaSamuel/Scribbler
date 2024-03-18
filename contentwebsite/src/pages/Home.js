import React, { Component } from 'react';
import { Image } from 'primereact/image';

import Carouselcomp from '../carousel';
import FeaturedPosts from '../FeaturedPosts';

class Home extends React.Component {
    constructor() {
      super();
      
      
    }
    render() {
        
      return (
        
        <div className="App"  >
        <Carouselcomp/>
        <FeaturedPosts/>
        
        
      </div>
      );
      
    }
  }
  
  export default Home;