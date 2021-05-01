import React, { useState } from 'react'; //useState is a react hook

import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Container, Card, Row, Col, Button, Form } from 'react-bootstrap';
import axios from 'axios';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import './movie-cards.scss';

export class MovieCards extends React.Component {
  //prettier-ignore
  render() {
    console.log("In movie-card");
    // const { movieData, onLogoutClick, setSelectedMovie } = this.props;
    const { movieData, onLogoutClick, onMovieClick } = this.props;
    
    console.log("this.props in movie-card", this.props);
    // return <div className="movie-card" onClick={() => { onMovieClick(movieData); }}>{movieData.Title}</div>;
    return (
      <Container>
        
      <Card>
        <Card.Img variant="top" src={movieData.ImagePath}/>
        <Card.Body>
          <Card.Title>{movieData.Title}</Card.Title>
          <Card.Text>{movieData.Description}</Card.Text>
          <Card.Subtitle>{movieData.Genre.Name}</Card.Subtitle>
          <Link to={`/movies/${movieData._id}`}>
            <Button variant="link">Open</Button>
          </Link>
        </Card.Body>
      </Card>
      </Container>
      
    );
  }
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
