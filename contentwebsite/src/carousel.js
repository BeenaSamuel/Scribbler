import Carousel from 'react-bootstrap/Carousel';
import write2 from "./write2.jpg";
import write from "./write.jpg";
import splashpic from "./splashwrite.jpg";
import writebook from "./writebook.jpg";
import penpic from "./penpic.jpg";

function Carouselcomp() {
  return (
    <div className='carcss'>
    <Carousel fade>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={writebook}
          alt="First slide"
        />
        <Carousel.Caption>
          <h3>If a story is in you it has to come out</h3>
          
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={splashpic}
          alt="Second slide"
        />

        <Carousel.Caption>
          <h3>Organize thoughts, organize ideas , organize the world.</h3>
          
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={penpic}
          alt="Third slide"
        />

        <Carousel.Caption>
          <h3> A pen is mightier than sword</h3>
         
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel></div>
  );
}

export default Carouselcomp;