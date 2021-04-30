import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import './movie-card.scss';

export class MovieCard extends React.Component {
  //prettier-ignore
  render() {
    console.log("In movie-card");
    const { movieData, onMovieClick } = this.props;
    // return <div className="movie-card" onClick={() => { onMovieClick(movieData); }}>{movieData.Title}</div>;
    return (
      <Card>
        <Card.Img variant="top" onClick={() => onMovieClick(movieData)} src={movieData.ImagePath}/>
        <Card.Body>
          <Card.Title>{movieData.Title}</Card.Title>
          <Card.Text>{movieData.Description}</Card.Text>
          <Card.Subtitle>{movieData.Genre.Name}</Card.Subtitle>
          <Button onClick={() => onMovieClick(movieData)} variant="info">Open</Button>
        </Card.Body>
      </Card>
    );
  }
}
// These values help specify how MovieCard's props should look
MovieCard.propTypes = {
  /*props object must contain a movie obj and onMovieClick */
  movieData: PropTypes.shape({
    /*shape means its an object */
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
  onMovieClick: PropTypes.func.isRequired /* onMovieClick must be a function*/,
};
