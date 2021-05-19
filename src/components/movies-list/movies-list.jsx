import React from 'react';
import { connect } from 'react-redux';
import { Row, Col } from 'react-bootstrap';
import { MovieCards } from '../movie-cards/movie-cards';
import VisibilityFilterInput from '../visibility-filter-input/visibility-filter-input';

const mapStateToProps = (state) => {
  const { visibilityFilter } = state;
  return { visibilityFilter };
};

function MoviesList(props) {
  const { movies, visibilityFilter } = props;
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
}

export default connect(mapStateToProps, null)(MoviesList);
