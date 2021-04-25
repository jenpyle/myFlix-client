import React from 'react';
import axios from 'axios';

import { RegistrationView } from '../registration-view/registration-view';
import { LoginView } from '../login-view/login-view'; //LoginView will need to get the user details from the MainView. If LoginView is not imported here, there would be no way of passing the user details to it
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
      user: null,
      newUser: null,
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

  /*When a movie is clicked, this function is invoked and updates the state of the `selectedMovie` *property to that movie*/
  setSelectedMovie(newSelectedMovie) {
    this.setState({
      selectedMovie: newSelectedMovie,
    });
  }
  /* When a user successfully logs in, this function updates the `user` property in state to that *particular user*/
  onLoggedIn(user) {
    console.log('-----------------------inside onLoggedIn');
    console.log('user = ', user);
    this.setState({
      user,
    });
  }

  onRegisterNewUser(newUser) {
    console.log('-----------------------inside OnRegistetrNewUser');
    console.log(' newUser = ', newUser);
    this.setState({
      newUser,
    });
  }

  onLoggedOut() {
    console.log('-----------------------inside onLoggedOut');
    this.setState({
      user: null,
      newUser: null,
    });
  }

  //prettier-ignore
  render() {
    const { movies, selectedMovie, user, newUser } = this.state;
    console.log("user , new user = ", user, ", ", newUser);

    if(newUser !== null && user === null) return <RegistrationView user={user} newUser={newUser} onLoggedIn={user => this.onLoggedIn(user) }/>;

    /* If there is no user, the LoginView is rendered. If there is a user logged in, the user details are *passed as a prop to the LoginView*/
    if(user === null) return <LoginView onRegisterNewUser={newUser => this.onRegisterNewUser(newUser)} onLoggedIn={user => this.onLoggedIn(user) } />;//A method, onLoggedIn, will be passed as a prop with the same name to LoginView
    //This method will update the user state of the MainView component and will be called when the user has successfully logged in... to change the user state to valid instead of null?

    if (movies.length === 0) return <div className="main-view" />;

    return (
      <div className="main-view">
        {/*If the state of `selectedMovie` is not null, that selected movie will be returned otherwise, all *movies will be returned*/}
        {selectedMovie
        ? <MovieView movieData={selectedMovie} onBackClick={(newSelectedMovie) => { this.setSelectedMovie(newSelectedMovie); }}/>
        : movies.map(movie => (
          <MovieCard key={movie._id} movieData={movie} onMovieClick={(movie) => { this.setSelectedMovie(movie) }}/>
        ))
      }
      <button type="button" onClick={this.onLoggedOut}>
        Log Out
      </button>
      </div>
    );
  }
}

export default MainView; /* without the default keyword, we'd have to use curly braces when importing MainView.. Can only do this once per file */
