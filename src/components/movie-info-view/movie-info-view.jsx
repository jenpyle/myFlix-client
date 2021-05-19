import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Card, Row, Col, Button } from 'react-bootstrap';
import './movie-info-view.scss';

export function MovieInfoView(props) {
  const { onBackClick, movieData, userData, editUserLists } = props;

  const addAndRemoveButtons = (props) => {
    let btnColor1 = 'info';
    let btnColor2 = 'info';
    let text1 = 'Add to Favorite Movies';
    let text2 = 'Add to Watch List';
    let requestString1 = 'post';
    let requestString2 = 'post';

    if (userData.FavoriteMovies.includes(movieData._id)) {
      btnColor1 = 'danger';
      text1 = 'Remove from Favorites';
      requestString1 = 'delete';
    }

    if (userData.ToWatch.includes(movieData._id)) {
      btnColor2 = 'danger';
      text2 = 'Remove from To Watch';
      requestString2 = 'delete';
    }
    return (
      <React.Fragment>
        <Button variant={btnColor1} onClick={() => editUserLists(movieData._id, 'favoritemovies', requestString1)}>
          {text1}
        </Button>

        <Button variant={btnColor2} onClick={() => editUserLists(movieData._id, 'towatch', requestString2)}>
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
          <img src={movieData.ImagePath} />
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
                  {movieData.Director.Name ? (
                    <Link to={`/directors/${movieData.Director.Name}`}>
                      <Button variant="link">{movieData.Director.Name}</Button>
                    </Link>
                  ) : null}
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
