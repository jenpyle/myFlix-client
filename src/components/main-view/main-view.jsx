import React, { useState } from 'react'; //useState is a react hook

import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Container, Card, Row, Col, Button, Form } from 'react-bootstrap';
import axios from 'axios';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';

import { RegistrationView } from '../registration-view/registration-view';
import { LoginView } from '../login-view/login-view'; //LoginView will need to get the user details from the MainView. If LoginView is not imported here, there would be no way of passing the user details to it
import { MovieCards } from '../movie-cards/movie-cards';
import { MovieInfoView } from '../movie-info-view/movie-info-view';
import { DirectorView } from '../director-view/director-view';
import { GenreView } from '../genre-view/genre-view';
import { ProfileView } from '../profile-view/profile-view';
import { UpdateProfile } from '../update-profile/update-profile';

import './main-view.scss';

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
      users: [],
      selectedMovie: null,
      user: null,
      newUser: null,
      requestType: null,
    };
    // this.onLoggedOut = this.onLoggedOut.bind(this);
  }

  componentDidMount() {
    //this happens every time the user loads the page
    //code executed right after component is added to the DOM
    let accessToken = localStorage.getItem('token');
    if (accessToken !== null) {
      //if the access token is present it means the user is already logged in
      this.setState({
        user: localStorage.getItem('user'), //
      });
      this.getMovies(accessToken); //only if the user is logged in you make the getMovies request
      this.getUsers(accessToken);
      console.log('this.state after componentDidMount()', this.state);
    }
  }

  /*When a movie is clicked, this function is invoked and updates the state of the `selectedMovie` *property to that movie*/
  setSelectedMovie(newSelectedMovie) {
    this.setState({
      selectedMovie: newSelectedMovie,
    });
    console.log('this.state after setSelectedMovie ', this.state);
  }
  /* When a user successfully logs in, this function updates the `user` property in state to that *particular user*/
  onLoggedIn(authData) {
    //This happens the moment the user logs in
    //This updates the state with the logged in authData
    console.log('-----------------------inside onLoggedIn MAIN-VIEW', '....authUser = ', authData);
    this.setState({
      user: authData.user.Username, //the user's username is stored in the user state
    });
    localStorage.setItem('token', authData.token); //store token and username in localStorage: a way to store data in client's browser. Next time the user opens their browser, localStorage will contain stored authentication information (token and username), and the user won’t be required to log in again
    localStorage.setItem('user', authData.user.Username);
    this.getMovies(authData.token);
    this.getUsers(authData.token);
  }

  onRegisterNewUser(newUser) {
    this.setState({
      newUser,
    });
    console.log('this.state after OnRegistetrNewUser=', this.state);
  }

  onLoggedOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.setState({
      user: null,
      newUser: null,
      requestType: null,
    });
    console.log('this.state after onLoggedOut=', this.state);
  }

  getMovies(token) {
    axios
      .get('https://jennysflix.herokuapp.com/movies', {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        //Assign the result to the state
        this.setState({
          movies: response.data,
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  getUsers(token) {
    axios
      .get('https://jennysflix.herokuapp.com/users', {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        //Assign the result to the state
        this.setState({
          users: response.data,
        });
        console.log('this.state after getUsers', this.state);
      })
      .catch(function (error) {
        console.log('error in get users axios request: ', error);
      });
  }

  setRequestType(type) {
    console.log('HERE IN SETREQUESTTYPE this.state BEFORE', this.state);
    console.log('-----------------------inside setRequestType type= ', type);
    this.setState({
      requestType: type,
    });
    console.log('-----------------------AFTER=', type, 'this.state=', this.state);
  }

  render() {
    const { movies, users, user, newUser, requestType } = this.state;

    console.log('user , new user = ', user, ', ', newUser);

    return (
      <Container fluid>
        {/*If the state of `selectedMovie` is not null, that selected movie will be returned otherwise, all *movies will be returned*/}

        <Router>
          <div className="header-container">
            <h1 className="title">MyFlix</h1>

            <div className="profile-logout-btns">
              <Link to={`/`}>
                <Button variant="secondary" type="button" onClick={() => this.onLoggedOut()}>
                  Log Out
                </Button>
              </Link>
              <Link to={`/users/${user}`}>
                <Button variant="link" onClick={() => this.setRequestType(null)}>
                  Profile
                </Button>
              </Link>
            </div>
          </div>
          <Row className="main-view justify-content-md-center">
            <Route
              exact
              path="/"
              render={() => {
                if (!user) {
                  return <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />; //onLoggedIn method will update the user state of the MainView component and will be called when the user has successfully logged in... to change the user state to valid instead of null?
                }
                if (movies.length === 0) return <div className="main-view" />;
                return movies.map((m) => (
                  <Col md={4} key={m._id}>
                    <MovieCards movieData={m} />
                  </Col>
                ));
              }}
            />

            <Route
              exact
              path="/users"
              render={({ history }) => {
                if (user) return <Redirect to="/" />;
                return (
                  <Col>
                    <RegistrationView onBackClick={() => history.goBack()} />
                  </Col>
                );
              }}
            />

            <Route
              path="/users/:username"
              render={({ match, history }) => {
                if (users.length === 0 || movies.length === 0) return <div className="main-view" />;
                if (!user) {
                  return <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />; //onLoggedIn method will update the user state of the MainView component and will be called when the user has successfully logged in... to change the user state to valid instead of null?
                }
                if (requestType === 'put') {
                  return (
                    <UpdateProfile
                      userData={users.find((u) => u.Username === match.params.username)}
                      setRequestType={(type) => this.setRequestType(type)}
                    />
                  ); //onLoggedIn method will update the user state of the MainView component and will be called when the user has successfully logged in... to change the user state to valid instead of null?
                }
                if (requestType === null) {
                  return (
                    <Col md={10}>
                      <ProfileView
                        userData={users.find((u) => u.Username === match.params.username)}
                        onBackClick={() => history.goBack()}
                        setRequestType={(type) => this.setRequestType(type)}
                      />
                    </Col>
                  );
                }
              }}
            />

            <Route
              path="/movies/:movieId"
              render={({ match, history }) => {
                if (!user) {
                  return <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />; //onLoggedIn method will update the user state of the MainView component and will be called when the user has successfully logged in... to change the user state to valid instead of null?
                }
                if (movies.length === 0) return <div className="main-view" />;
                return (
                  <Col md={8}>
                    <MovieInfoView
                      movieData={movies.find((movie) => movie._id === match.params.movieId)}
                      onBackClick={() => history.goBack()}
                    />
                  </Col>
                );
              }}
            />
            <Route
              path="/directors/:name"
              render={({ match, history }) => {
                if (!user) {
                  return <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />; //onLoggedIn method will update the user state of the MainView component and will be called when the user has successfully logged in... to change the user state to valid instead of null?
                }
                if (movies.length === 0) return <div className="main-view" />;
                return (
                  <Col md={8}>
                    <DirectorView
                      directorData={movies.find((movie) => movie.Director.Name === match.params.name).Director}
                      onBackClick={() => history.goBack()}
                    />
                  </Col>
                );
              }}
            />
            <Route
              path="/genres/:name"
              render={({ match, history }) => {
                if (!user) {
                  return <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />; //onLoggedIn method will update the user state of the MainView component and will be called when the user has successfully logged in... to change the user state to valid instead of null?
                }
                if (movies.length === 0) return <div className="main-view" />; //make sure movies are available before rendering anything.
                return (
                  <Col md={8}>
                    <GenreView
                      genreData={movies.find((movie) => movie.Genre.Name === match.params.name).Genre}
                      onBackClick={() => history.goBack()}
                    />
                  </Col>
                );
              }}
            />
          </Row>
        </Router>
      </Container>
    );
  }
}

export default MainView; /* without the default keyword, we'd have to use curly braces when importing MainView.. Can only do this once per file */
