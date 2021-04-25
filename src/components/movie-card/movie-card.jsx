import React from 'react';
import PropTypes from 'prop-types';

export class MovieCard extends React.Component {
  //prettier-ignore
  render() {
    const { movieData, onMovieClick } = this.props;
    return <div className="movie-card" onClick={() => { onMovieClick(movieData); }}>{movieData.Title}</div>;
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
