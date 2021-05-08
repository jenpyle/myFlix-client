import React, { useState } from 'react'; //useState is a react hook

import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Container, Card, Row, Col, Button, Form } from 'react-bootstrap';
import axios from 'axios';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import './movie-cards.scss';

export function MovieCards(props) {
  // const { movieData } = this.props;
  return (
      <Card>
        <Card.Img variant="top" src={props.movieData.ImagePath} />
        <Card.Body>
          <Card.Title>{props.movieData.Title}</Card.Title>
          <Card.Text>{props.movieData.Description}</Card.Text>
          <Card.Subtitle>{props.movieData.Genre.Name}</Card.Subtitle>
          <Link to={`/movies/${props.movieData._id}`}>
            <Button variant="link">Open</Button>
          </Link>
        </Card.Body>
      </Card>
  );
}
// These values help specify how MovieCard's props should look
MovieCards.propTypes = {
  /*props object must contain a movie obj and onMovieClick */
  movieData: PropTypes.shape({
    /*shape means its an object */
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    ImagePath: PropTypes.string.isRequired,
    // Genre: PropTypes.shape({
    //   Name: PropTypes.string.isRequired,
    //   Description: PropTypes.string.isRequired,
    // }),
    // Director: PropTypes.shape({
    //   Name: PropTypes.string.isRequired,
    //   Bio: PropTypes.string.isRequired,
    // }),
  }).isRequired,
  /* onMovieClick: PropTypes.func.isRequired onMovieClick must be a function*/
};

// import React, { useState } from 'react'; //useState is a react hook

// import PropTypes from 'prop-types';
// import { Link } from 'react-router-dom';
// import { Container, Card, Row, Col, Button, Form } from 'react-bootstrap';
// import axios from 'axios';
// import { BrowserRouter as Router, Route } from 'react-router-dom';

// import './movie-cards.scss';

// export class MovieCards extends React.Component {
//   //prettier-ignore
//   render() {
//     const { movieData } = this.props;
//     return (
//       <Container fluid className="movie-cards">

//       <Card>
//         <Card.Img variant="top" src={movieData.ImagePath}/>
//         <Card.Body>
//           <Card.Title>{movieData.Title}</Card.Title>
//           <Card.Text>{movieData.Description}</Card.Text>
//           <Card.Subtitle>{movieData.Genre.Name}</Card.Subtitle>
//           <Link to={`/movies/${movieData._id}`}>
//             <Button variant="link">Open</Button>
//           </Link>
//         </Card.Body>
//       </Card>
//       </Container>

//     );
//   }
// }
// // These values help specify how MovieCard's props should look
// MovieCards.propTypes = {
//   /*props object must contain a movie obj and onMovieClick */
//   movieData: PropTypes.shape({
//     /*shape means its an object */
//     Title: PropTypes.string.isRequired,
//     Description: PropTypes.string.isRequired,
//     ImagePath: PropTypes.string.isRequired,
//     // Genre: PropTypes.shape({
//     //   Name: PropTypes.string.isRequired,
//     //   Description: PropTypes.string.isRequired,
//     // }),
//     // Director: PropTypes.shape({
//     //   Name: PropTypes.string.isRequired,
//     //   Bio: PropTypes.string.isRequired,
//     // }),
//   }).isRequired,
//   /* onMovieClick: PropTypes.func.isRequired onMovieClick must be a function*/
// };
