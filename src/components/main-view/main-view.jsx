import React from 'react';
import axios from 'axios';

import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
/*essentially telling React to create a new MainView component using the generic React.Component template as its foundation */
export class MainView extends React.Component {
  /*the export keyword exposes the MainView component, and the rest of the line creates the MainView component, extends from React.Component */

  constructor() {
    /*where you initialize a state's values */
    super(); /*means call the constructor of the parent class(React.Component) ...  initializes your component’s state, and without it, you’ll get an error if you try to use this.state inside constructor()*/
    //prettier-ignore
    this.state = {
      /*represents the moment a component is created in the memory */
      movies: [],
      selectedMovie: null,
    };
  }

  componentDidMount() {
    axios
      .get('https://jennysflix.herokuapp.com/movies')
      .then((response) => {
        this.setState({
          movies: response.data,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  setSelectedMovie(newSelectedMovie) {
    this.setState({
      selectedMovie: newSelectedMovie,
    });
  }
  //prettier-ignore
  render() {
    const { movies, selectedMovie } = this.state;

    // if (selectedMovie) return <MovieView movieData={selectedMovie} />;

    if (movies.length === 0) return <div className="main-view" />;

    return (
      <div className="main-view">
        {/* {movies.map(movie => <MovieCard key={movie._id} movieData={movie} onMovieClick={(movie) => { this.setSelectedMovie(movie) }} />)} */}
        {selectedMovie
        ? <MovieView movieData={selectedMovie} onBackClick={(newSelectedMovie) => { this.setSelectedMovie(newSelectedMovie); }}/>
        : movies.map(movie => (
          <MovieCard key={movie._id} movieData={movie} onMovieClick={(movie) => { this.setSelectedMovie(movie) }}/>
        ))
      }
      </div>
    );
  }
}

export default MainView; /* without the default keyword, we'd have to use curly braces when importing MainView.. Can only do this once per file */
