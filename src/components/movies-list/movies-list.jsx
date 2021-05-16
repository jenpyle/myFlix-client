import React from 'react';
import { Container, Card, Row, Col, Button, Form } from 'react-bootstrap';
import { connect } from 'react-redux';

import VisibilityFilterInput from '../visibility-filter-input/visibility-filter-input'; //importing compenent

import { MovieCards } from '../movie-cards/movie-cards';

// #7if defined—will allow the component (the one you want to connect)
// to subscribe to store updates. Any time the store is updated, this function will be called.
// so instead of component accessing state directly, it accesses state passed to props by the store
const mapStateToProps = (state) => {
  const { visibilityFilter } = state;
  return { visibilityFilter }; //extracted visibilityFilter into a prop
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
/*mapStateToProps, is a function that converts or transforms the store into props that the MoviesList component will
 use. Remember that the store contains your application’s state, which is why this function is called mapStateToProps. */
