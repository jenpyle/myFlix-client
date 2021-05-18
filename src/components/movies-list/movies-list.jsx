import React from 'react';
import { Row, Col } from 'react-bootstrap';
import { useSelector } from 'react-redux';

import VisibilityFilterInput from '../visibility-filter-input/visibility-filter-input'; //importing compenent

import { MovieCards } from '../movie-cards/movie-cards';

const MoviesList = () => {
  // grabbing state slices: visibilityFilter and movies
  const visibilityFilter = useSelector((state) => state.visibilityFilter);
  const movies = useSelector((state) => state.movies);

  let filteredMovies = movies;

  if (visibilityFilter !== '') {
    filteredMovies = movies.filter((m) => m.Title.toLowerCase().includes(visibilityFilter.toLowerCase()));
  }

  if (!movies) return <div className="main-view" />;

  return (
    <Row>
      <Col md={12} style={{ margin: '1em' }}>
        <VisibilityFilterInput visibilityFilter={visibilityFilter} />
      </Col>

      {filteredMovies.map((m) => (
        <Col className="movie-card" md={3} key={m._id}>
          <MovieCards movieData={m} />
        </Col>
      ))}
    </Row>
  );
};

export default MoviesList;
