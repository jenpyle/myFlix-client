import React from 'react';
import PropTypes from 'prop-types';
import { Container, Card, Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import './movie-info-view.scss';

export class MovieInfoView extends React.Component {
  render() {
    //The prop represents the movie object, which will be passed in MainView once you import and use the new component there.
    const { movieData, onBackClick } = this.props;
    // The component will render whatever properties in the movie object are passed as a prop.
    return (
      <Container>
        <Button
          variant="info"
          onClick={() => {
            onBackClick();
          }}
        >
          Back
        </Button>
        <Row className="movie-view">
          <Col className="move-poster">
            <img style={{ width: '22rem' }} src={movieData.ImagePath} />
          </Col>
          <Col md={5}>
            <Card>
              <div className="movie-title">
                <Card.Header>{movieData.Title}</Card.Header>

                <Card.Body className="movie-description">
                  <Card.Title>Description: </Card.Title>
                  <Card.Text>{movieData.Description}</Card.Text>

                  <Card.Title>Year: </Card.Title>
                  <span className="value">{movieData.Year}</span>

                  <Card.Title>Rated: </Card.Title>
                  <span className="value">{movieData.Rated}</span>

                  <Card.Title>Released: </Card.Title>
                  <span className="value">{movieData.Released}</span>

                  <Card.Title>Runtime: </Card.Title>
                  <span className="value">{movieData.Runtime}</span>

                  <Card.Title>Actors: </Card.Title>
                  <span className="value">{movieData.Actors}</span>
                </Card.Body>

                <Link to={`/directors/${movieData.Director.Name}`}>
                  <Button variant="link">Director</Button>
                </Link>

                <Link to={`/genres/${movieData.Genre.Name}`}>
                  <Button variant="link">Genre</Button>
                </Link>
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
