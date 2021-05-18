import React, { useState, useEffect } from 'react'; //useState is a react hook
import { Link } from 'react-router-dom';
import { Row, Col, Button } from 'react-bootstrap';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { setUser, setMovies } from '../../actions/actions';
import MoviesList from '../movies-list/movies-list';
import { getMoviesFromApi, getUsersFromApi, getOneUser, editUserLists } from '../../api/api';

import { RegistrationView } from '../registration-view/registration-view';
import { LoginView } from '../login-view/login-view';
import { MovieInfoView } from '../movie-info-view/movie-info-view';
import { DirectorView } from '../director-view/director-view';
import { GenreView } from '../genre-view/genre-view';
import { ProfileView } from '../profile-view/profile-view';
import { UpdateProfile } from '../update-profile/update-profile';

import './main-view.scss';

const MainView = () => {
  const dispatch = useDispatch();

  const [isFav, setIsFav] = useState(false);
  const [isWatch, setIsWatch] = useState(false);
  const [requestType, setRequestType] = useState(false);

  const movies = useSelector((state) => state.movies);
  const users = useSelector((state) => state.users);
  const user = useSelector((state) => state.user);

  const onLoggedIn = (authData) => {
    console.log('IN onloggedin');
    localStorage.setItem('token', authData.token);
    localStorage.setItem('user', authData.user.Username);
    getMoviesFromApi(authData.token);
    // getOneUser(authData.token);
    // getUsersFromApi(authData.token);
    dispatch(setUser(authData.user));
    console.log('HERE=', authData.user);

    window.open(`/movies`, '_self');
  };

  const onLoggedOut = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    setRequestType(null);
    window.open(`/login`, '_self');
  };

  useEffect(() => {
    console.log('USER=', user.Username);
    let accessToken = localStorage.getItem('token');
    if (accessToken !== null) {
      dispatch(setMovies(getMoviesFromApi(accessToken)));
      // getUsersFromApi(accessToken);
    }
  }, []);

  return (
    <Router>
      <Row className="profile-logout-btns-desktop">
        <Col md="6">
          <h1 className="title">MyFlix</h1>
        </Col>
        {user.Username ? (
          <Col md="2">
            <Link to={`/movies`}>
              <Button variant="info">Home</Button>
            </Link>
          </Col>
        ) : null}
        {user.Username ? (
          <Col md="2">
            <Link to={`/users/${localStorage.getItem('user')}`}>
              <Button variant="info" onClick={() => setRequestType(undefined)}>
                Profile
              </Button>
            </Link>
          </Col>
        ) : null}
        {user.Username ? (
          <Col md="2">
            <Link to={`/login`}>
              <Button variant="secondary" type="button" onClick={() => onLoggedOut()}>
                Log Out
              </Button>
            </Link>
          </Col>
        ) : null}
      </Row>

      <Row className="profile-logout-btns-mobile" style={{ display: 'none' }}>
        {user.Username ? (
          <Col>
            <Link to={`/movies`}>
              <Button variant="info">Home</Button>
            </Link>
            <Link to={`/users/${localStorage.getItem('user')}`}>
              <Button variant="info" onClick={() => setRequestType(undefined)}>
                Profile
              </Button>
            </Link>
            <Link to={`/login`}>
              <Button variant="secondary" type="button" onClick={() => onLoggedOut()}>
                Log Out
              </Button>
            </Link>
          </Col>
        ) : null}
        <Col>
          <h1 className="title">MyFlix</h1>
        </Col>
      </Row>

      <Route
        exact
        path="/"
        render={() => {
          if (user.Username) return <Redirect to="/movies" />;
          return <Redirect to="/login" />;
        }}
      />

      <Route
        exact
        path="/login"
        render={() => {
          if (user.Username) return <Redirect to="/movies" />;
          return <LoginView onBackClick={() => history.goBack()} onLoggedIn={(user) => onLoggedIn(user)} />;
        }}
      />

      <Row className="main-view justify-content-md-center movie-cards">
        <Route
          exact
          path="/movies"
          render={() => {
            if (!user.Username) <Redirect to="/login" />;
            if (movies.length === 0) return <div className="main-view" />;
            return <MoviesList movies={movies} />;
          }}
        />

        <Route
          exact
          path="/users"
          render={({ history }) => {
            if (user.Username) return <Redirect to="/movies" />;
            return <RegistrationView onBackClick={() => history.goBack()} />;
          }}
        />

        <Route
          path="/users/:username"
          render={({ history }) => {
            if (user.Username || movies.length === 0) return <div className="main-view" />;
            if (!user.Username) <Redirect to="/login" />;
            if (requestType === 'put') {
              return (
                <UpdateProfile
                  userData={user}
                  getOneUser={(token) => getOneUser(token)}
                  setRequestType={(type) => setRequestType(type)}
                />
              );
            }
            if (requestType === undefined) {
              return (
                <ProfileView
                  userData={user}
                  onBackClick={() => history.goBack()}
                  setRequestType={(type) => setRequestType(type)}
                  movies={movies}
                />
              );
            }
          }}
        />

        <Route
          path="/movies/:movieId"
          render={({ match, history }) => {
            if (!user.Username) <Redirect to="/login" />;
            if (movies.length === 0) return <div className="main-view" />;
            return (
              <MovieInfoView
                editUserLists={(movieID, list, requestType) => editUserLists(movieID, list, requestType)}
                userData={users.find((u) => u.Username === localStorage.getItem('user'))}
                movieData={movies.find((movie) => movie._id === match.params.movieId)}
                onBackClick={() => history.goBack()}
              />
            );
          }}
        />
        <Route
          path="/directors/:name"
          render={({ match, history }) => {
            if (!user.Username) {
              return <LoginView onLoggedIn={(user) => onLoggedIn(user)} />;
            }
            if (movies.length === 0) return <div className="main-view" />;
            return (
              <DirectorView
                directorData={movies.find((movie) => movie.Director.Name === match.params.name).Director}
                onBackClick={() => history.goBack()}
              />
            );
          }}
        />
        <Route
          path="/genres/:name"
          render={({ match, history }) => {
            if (!user.Username) {
              return <LoginView onLoggedIn={(user) => onLoggedIn(user)} />;
            }
            if (movies.length === 0) return <div className="main-view" />;
            return (
              <GenreView
                genreData={movies.find((movie) => movie.Genre.Name === match.params.name).Genre}
                onBackClick={() => history.goBack()}
              />
            );
          }}
        />
      </Row>
    </Router>
  );
};

export default MainView;
