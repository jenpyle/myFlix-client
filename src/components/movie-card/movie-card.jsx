import React from 'react';

export class MovieCard extends React.Component {
  //prettier-ignore
  render() {
    const { movieData, onMovieClick } = this.props;
    return <div className="movie-card" onClick={() => { onMovieClick(movieData); }}>{movieData.Title}</div>;
  }
}
