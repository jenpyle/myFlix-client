import React from 'react';
import Col from 'react-bootstrap/Col';
import { connect } from 'react-redux';

import { MovieCards } from '../movie-cards/movie-cards';

// #7if defined—will allow the component (the one you want to connect)
// to subscribe to store updates. Any time the store is updated, this function will be called.
// so instead of component accessing state directly, it accesses state passed to props by the store
const mapStateToProps = (state) => {
  const { visibilityFilter } = state;
  return { visibilityFilter }; //now a prop
};

function MoviesList(props) {
  const { movies, visibilityFilter } = props;
  let filteredMovies = movies;

  if (visibilityFilter !== '') {
    filteredMovies = movies.filter((m) => m.Title.toLowerCase().includes(visibilityFilter.toLowerCase()));
  }

  if (!movies) return <div className="main-view" />;

  return filteredMovies.map((m) => (
    <Col md={4} key={m._id}>
      <MovieCards movieData={m} />
    </Col>
  ));
}

export default connect(mapStateToProps, null)(MoviesList);
/*mapStateToProps, is a function that converts or transforms the store into props that the MoviesList component will
 use. Remember that the store contains your application’s state, which is why this function is called mapStateToProps. */
