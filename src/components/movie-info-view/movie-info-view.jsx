import React, { useState } from 'react'; //useState is a react hook

import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Container, Card, Row, Col, Button, Form } from 'react-bootstrap';
import axios from 'axios';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import './movie-info-view.scss';
//everything in the file is accessible to these functional components
//import and export is an ES6 thing
export function MovieInfoView(props) {
  //when exporting don't use arrow syntax
  const { movieData, onBackClick, userData } = props;

  const addAndRemoveButtons = (props) => {
    //valid functional component
    let btnColor1 = 'info';
    let btnColor2 = 'info';
    let text1 = 'Add to Favorite Movies';
    let text2 = 'Add to Watch List';
    let requestType1 = 'post';
    let requestType2 = 'post';

    if (props.userData.FavoriteMovies.includes(props.movieData._id)) {
      btnColor1 = 'danger';
      text1 = 'Remove from Favorites';
      requestType1 = 'delete';
    }

    if (props.userData.ToWatch.includes(props.movieData._id)) {
      btnColor2 = 'danger';
      text2 = 'Remove from To Watch';
      requestType2 = 'delete';
    }
    return (
      <React.Fragment>
        <Button
          variant={btnColor1}
          onClick={() => props.editUserLists(props.movieData._id, 'favoritemovies', requestType1)}
        >
          {text1}
        </Button>

        <Button variant={btnColor2} onClick={() => props.editUserLists(props.movieData._id, 'towatch', requestType2)}>
          {text2}
        </Button>
      </React.Fragment>
    );
  };

  return (
    <Container>
      <Row className="movie-view">
        <Col className="movie-poster" md={5}>
          {addAndRemoveButtons(props)}
          <img src={props.movieData.ImagePath} />
        </Col>
        <Col md={7}>
          <Button
            variant="secondary"
            onClick={() => {
              onBackClick();
            }}
          >
            Back
          </Button>
          <Card>
            <div className="movie-data">
              <Card.Header>{props.movieData.Title}</Card.Header>

              <Card.Body className="movie-description">
                <Card.Text>Description: </Card.Text>
                <div className="value">{props.movieData.Description}</div>

                <Card.Text>
                  Year: <span className="value">{props.movieData.Year}</span>
                </Card.Text>

                <Card.Text>
                  Rated: <span className="value">{props.movieData.Rated}</span>
                </Card.Text>

                <Card.Text>
                  Released: <span className="value">{props.movieData.Released}</span>
                </Card.Text>

                <Card.Text>
                  Runtime: <span className="value">{props.movieData.Runtime}</span>
                </Card.Text>

                <Card.Title>Actors: </Card.Title>
                <span className="value">{props.movieData.Actors}</span>
              </Card.Body>
              <div className="director-genre-btn">
                <span>
                  {props.movieData.Director.Name ? (
                    <Link to={`/directors/${props.movieData.Director.Name}`}>
                      <Button variant="link">{props.movieData.Director.Name}</Button>
                    </Link>
                  ) : null}
                  <Link to={`/genres/${props.movieData.Genre.Name}`}>
                    <Button variant="link">{props.movieData.Genre.Name}</Button>
                  </Link>
                </span>
              </div>
            </div>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
