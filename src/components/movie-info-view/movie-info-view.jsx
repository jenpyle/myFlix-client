import React, { useState } from 'react'; //useState is a react hook

import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Container, Card, Row, Col, Button, Form } from 'react-bootstrap';
import axios from 'axios';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import './movie-info-view.scss';

export class MovieInfoView extends React.Component {
  editUserLists(movieID, list, requestType) {
    let accessToken = localStorage.getItem('token');
    let user = localStorage.getItem('user');

    if (requestType === 'post') {
      let message = 'Movie successfully added to Favorites List.';
      if (list === 'towatch') {
        message = 'Movie successfully added in To Watch List.';
      }
      axios
        .post(
          `https://jennysflix.herokuapp.com/users/${user}/movies/${list}/${movieID}`,
          {},
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        )
        .then(() => {
          alert(message);
          this.props.getUpdatedUsers(accessToken);
        })
        .catch((e) => {
          console.log('Something went wrong with adding movie');
        });
    }
    if (requestType === 'delete') {
      let message = 'Movie successfully deleted from Favorites List.';
      if (list === 'towatch') {
        message = 'Movie successfully deleted from To Watch List.';
      }
      axios
        .delete(`https://jennysflix.herokuapp.com/users/${user}/movies/${list}/${movieID}`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        })
        .then(() => {
          alert(message);
          this.props.getUpdatedUsers(accessToken);
        })
        .catch((e) => {
          console.log('Something went wrong with removing movie');
        });
    }
  }

  addAndRemoveButtons(movieData, userData) {
    console.log('USER DATA favorites', userData.FavoriteMovies);
    console.log('USER DATA toWatch', userData.ToWatch);
    console.log('movie DATA ', movieData._id);
    console.log('userData.ToWatch.includes(movieData._id)', userData.ToWatch.includes(movieData._id));

    let btnColor1 = 'info';
    let btnColor2 = 'info';
    let text1 = 'Add to Favorite Movies';
    let text2 = 'Add to Watch List';
    let requestType1 = 'post';
    let requestType2 = 'post';

    if (userData.FavoriteMovies.includes(movieData._id)) {
      btnColor1 = 'danger';
      text1 = 'Remove from Favorites';
      requestType1 = 'delete';
    }

    if (userData.ToWatch.includes(movieData._id)) {
      btnColor2 = 'danger';
      text2 = 'Remove from To Watch';
      requestType2 = 'delete';
    }
    return (
      <React.Fragment>
        <Button variant={btnColor1} onClick={() => this.editUserLists(movieData._id, 'favoritemovies', requestType1)}>
          {text1}
        </Button>

        <Button variant={btnColor2} onClick={() => this.editUserLists(movieData._id, 'towatch', requestType2)}>
          {text2}
        </Button>
      </React.Fragment>
    );
  }

  render() {
    //The prop represents the movie object, which will be passed in MainView once you import and use the new component there.
    const { movieData, onBackClick, userData } = this.props;

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
            {this.addAndRemoveButtons(movieData, userData)}
            {/* <Button variant="info" onClick={() => this.addToList(movieData._id, 'favoritemovies')}>
              Add to Favorite Movies
            </Button>

            <Button variant="info" onClick={() => this.addToList(movieData._id, 'towatch')}>
              Add in To Watch List
            </Button> */}
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
