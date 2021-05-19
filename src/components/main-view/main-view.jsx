import React from 'react';
import { Link } from 'react-router-dom';
import { Row, Col, Button } from 'react-bootstrap';
import axios from 'axios';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { setMovies, setUser, setRequest } from '../../actions/actions';

import MoviesList from '../movies-list/movies-list';
import { RegistrationView } from '../registration-view/registration-view';
import { LoginView } from '../login-view/login-view';
import { MovieInfoView } from '../movie-info-view/movie-info-view';
import { DirectorView } from '../director-view/director-view';
import { GenreView } from '../genre-view/genre-view';
import { ProfileView } from '../profile-view/profile-view';
import { UpdateProfile } from '../update-profile/update-profile';
import './main-view.scss';

class MainView extends React.Component {
  componentDidMount() {
    let accessToken = localStorage.getItem('token');
    if (accessToken !== null) {
      this.getOneUser(accessToken);
      this.getMovies(accessToken);
    }
  }

  onLoggedIn(authData) {
    localStorage.setItem('token', authData.token);
    localStorage.setItem('user', authData.user.Username);
    this.props.setUser(authData.user);
    this.props.setRequest('get');
    this.getMovies(authData.token);
    window.open(`/movies`, '_self');
  }

  onLoggedOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.props.setUser(null);
    this.props.setRequest('');
    window.open(`/login`, '_self');
  }

  getMovies(token) {
    axios
      .get('https://jennysflix.herokuapp.com/movies', {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        this.props.setMovies(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  getOneUser(token) {
    axios
      .get(`https://jennysflix.herokuapp.com/users/${localStorage.getItem('user')}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        this.props.setUser(response.data);
      })
      .catch(function (error) {
        console.log('error in get users axios request: ', error);
      });
  }

  editUserLists(movieID, list, requestString) {
    let accessToken = localStorage.getItem('token');
    let URLString = `https://jennysflix.herokuapp.com/users/${this.props.user.Username}/movies/${list}/${movieID}`;
    const headers = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    };

    if (requestString === 'post') {
      this.props.setRequest('post');

      axios
        .post(
          URLString,
          {},

          headers
        )
        .then(() => {
          this.getOneUser(accessToken);
          this.props.setRequest('');
        })
        .catch((e) => {
          console.log('Something went wrong with adding movie');
        });
    }

    if (requestString === 'delete') {
      this.props.setRequest('delete');

      axios
        .delete(URLString, headers)
        .then(() => {
          this.getOneUser(accessToken);
          this.props.setRequest('');
        })
        .catch((e) => {
          console.log('Something went wrong with removing movie');
        });
    }
  }

  render() {
    let { movies, user, requestType } = this.props;
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
                <Button variant="info" onClick={() => this.props.setRequest('get')}>
                  Profile
                </Button>
              </Link>
            </Col>
          ) : null}
          {user.Username ? (
            <Col md="2">
              <Link to={`/login`}>
                <Button variant="secondary" type="button" onClick={() => this.onLoggedOut()}>
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
                <Button variant="info" onClick={() => this.props.setRequest('get')}>
                  Profile
                </Button>
              </Link>
              <Link to={`/login`}>
                <Button variant="secondary" type="button" onClick={() => this.onLoggedOut()}>
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
            if (!user.Username) return <Redirect to="/login" />;
            if (user.Username) return <Redirect to="/movies" />;
          }}
        />

        <Route
          exact
          path="/login"
          render={() => {
            if (user.Username) return <Redirect to="/movies" />;
            return <LoginView onBackClick={() => history.goBack()} onLoggedIn={(user) => this.onLoggedIn(user)} />;
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
              if (movies.length === 0) return <div className="main-view" />;
              if (!user.Username || localStorage.getItem('user') === null) <Redirect to="/login" />;
              if (requestType === 'put') {
                return (
                  <UpdateProfile
                    userData={user}
                    getOneUser={(token) => this.getOneUser(token)}
                    setRequestType={(type) => this.props.setRequest(type)}
                  />
                );
              }
              if (requestType === '' || requestType === 'get') {
                return (
                  <ProfileView
                    userData={user}
                    onBackClick={() => history.goBack()}
                    setRequestType={(type) => this.props.setRequest(type)}
                    movies={movies}
                  />
                );
              }
            }}
          />

          <Route
            path="/movies/:movieId"
            render={({ match, history }) => {
              if (user.length === 0 || user === null) <Redirect to="/login" />;
              if (movies.length === 0) return <div className="main-view" />;
              return (
                <MovieInfoView
                  editUserLists={(movieID, list, requestString) => this.editUserLists(movieID, list, requestString)}
                  userData={user}
                  movieData={movies.find((movie) => movie._id === match.params.movieId)}
                  onBackClick={() => history.goBack()}
                />
              );
            }}
          />
          <Route
            path="/directors/:name"
            render={({ match, history }) => {
              if (!user) {
                return <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />;
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
                return <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />;
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
  }
}

let mapStateToProps = (state) => {
  return { movies: state.movies, user: state.user, requestType: state.requestType };
};

export default connect(mapStateToProps, { setMovies, setUser, setRequest })(MainView);
