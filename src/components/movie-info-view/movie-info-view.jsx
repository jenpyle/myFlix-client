import React, { useState } from 'react'; //useState is a react hook

import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Container, Card, Row, Col, Button, Form } from 'react-bootstrap';
import axios from 'axios';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import './movie-info-view.scss';

export class MovieInfoView extends React.Component {
  addToFav(movieID) {
    let accessToken = localStorage.getItem('token');
    let user = localStorage.getItem('user');
    console.log(accessToken);
    axios
      .post(
        `https://jennysflix.herokuapp.com/users/${user}/movies/favoritemovies/${movieID}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      .then((response) => {
        const data = response.data;
        console.log('...............updated profile data', data);
        alert('Movie successfully added to Favorites List.');
        // props.setRequestType(null);
      })
      .catch((e) => {
        console.log('Something went wrong with adding movie');
      });
  }

  render() {
    //The prop represents the movie object, which will be passed in MainView once you import and use the new component there.
    const { movieData, onBackClick } = this.props;
    console.log('----------MOVIEDATA= ', movieData);
    console.log('----------this.props= ', this.props);
    // The component will render whatever properties in the movie object are passed as a prop.
    return (
      <Container>
        <Row className="movie-view">
          <Col className="movie-poster" md={5}>
            <Button
              variant="info"
              onClick={() => {
                onBackClick();
              }}
            >
              Back
            </Button>
            <img src={movieData.ImagePath} />

            <Button variant="link" onClick={() => this.addToFav(movieData._id)}>
              Add to Favorite Movies
            </Button>

            <Link to={`/genres/${movieData.Genre.Name}`}>
              <Button variant="link">Add To Watch List </Button>
            </Link>
          </Col>
          <Col md={7}>
            <Card style={{ width: '38rem' }}>
              <div className="movie-data">
                <Card.Header>{movieData.Title}</Card.Header>

                <Card.Body className="movie-description">
                  <Card.Text>Description: </Card.Text>
                  <div className="value">{movieData.Description}</div>

                  <Card.Text>
                    Year: <span className="value">{movieData.Year}</span>
                  </Card.Text>

                  <Card.Text>
                    Rated: <span className="value">{movieData.Rated}</span>
                  </Card.Text>

                  <Card.Text>
                    Released: <span className="value">{movieData.Released}</span>
                  </Card.Text>

                  <Card.Text>
                    Runtime: <span className="value">{movieData.Runtime}</span>
                  </Card.Text>

                  <Card.Title>Actors: </Card.Title>
                  <span className="value">{movieData.Actors}</span>
                </Card.Body>
                <div className="director-genre-btn">
                  <span>
                    <Link to={`/directors/${movieData.Director.Name}`}>
                      <Button variant="link">{movieData.Director.Name}</Button>
                    </Link>

                    <Link to={`/genres/${movieData.Genre.Name}`}>
                      <Button variant="link">{movieData.Genre.Name}</Button>
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
}

MovieInfoView.propType = {
  movieData: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    ImagePath: PropTypes.string.isRequired,
    Genre: PropTypes.shape({
      Name: PropTypes.string.isRequired,
      Description: PropTypes.string.isRequired,
    }),
    Director: PropTypes.shape({
      Name: PropTypes.string.isRequired,
      Bio: PropTypes.string.isRequired,
    }),
  }).isRequired,
  // onBackClick: PropTypes.func.isRequired,
};
