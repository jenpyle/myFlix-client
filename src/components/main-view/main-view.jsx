import React from 'react'; //useState is a react hook
import { Link } from 'react-router-dom';
import { Container, Card, Row, Col, Button, Form } from 'react-bootstrap';
import axios from 'axios';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';

import { connect } from 'react-redux';
//#0
import { setMovies } from '../../actions/actions';
//we haven't written this one yet
import MoviesList from '../movies-list/movies-list';
/* 
  #1 The rest of components import statements but without the MovieCard's 
  because it will be imported and used in the MoviesList component rather
  than in here. 
*/

import { RegistrationView } from '../registration-view/registration-view';
import { LoginView } from '../login-view/login-view'; //LoginView will need to get the user details from the MainView. If LoginView is not imported here, there would be no way of passing the user details to it
// import { MovieCards } from '../movie-cards/movie-cards';
import { MovieInfoView } from '../movie-info-view/movie-info-view';
import { DirectorView } from '../director-view/director-view';
import { GenreView } from '../genre-view/genre-view';
import { ProfileView } from '../profile-view/profile-view';
import { UpdateProfile } from '../update-profile/update-profile';

import './main-view.scss';

/*essentially telling React to create a new MainView component using the generic React.Component template as its foundation */
// export class MainView extends React.Component {
/*the export keyword exposes the MainView component, and the rest of the line creates the MainView component, extends from React.Component */
//REMOVE EXPORT KEYWORD
class MainView extends React.Component {
  constructor() {
    /*where you initialize a state's values */
    super(); /*means call the constructor of the parent class(React.Component) ...  initializes your component’s state, and without it, you’ll get an error if you try to use this.state inside constructor()*/

    this.state = {
      /*represents the moment a component is created in the memory */
      // movies: [],
      users: [],
      user: null,
      isFav: false,
      isWatch: false,
      requestType: undefined,
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
    console.log('Here2');
    window.open(`/movies`, '_self');
  }

  onLoggedOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.setState({
      user: null,

      requestType: null,
    });
    window.open(`/login`, '_self');
    console.log('this.state after onLoggedOut=', this.state);
  }

  getMovies(token) {
    axios
      .get('https://jennysflix.herokuapp.com/movies', {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        //Assign the result to the state
        // this.setState({
        //   movies: response.data,
        // });
        this.props.setMovies(
          response.data
        ); /*this.props.setMovies is NOT THE SAME as setMovies imported from the actions
        this.props.setMovies is passed to props thru connect() and its wrapped into the dispatch() function of the store(a way for the store to know that the action has been called).
        the regular setMovies is given as a prop to the MainView component bc its wrapped in the connect() function at the bottom*/
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

  // getOneUser(token) {
  //   axios
  //     .get(`https://jennysflix.herokuapp.com/users/${localStorage.getItem('user')}`, {
  //       headers: { Authorization: `Bearer ${token}` },
  //     })
  //     .then((response) => {
  //       //Assign the result to the state
  //       this.setState({
  //         user: response.data,
  //       });
  //       console.log('this.state after getUsers', this.state.user);
  //     })
  //     .catch(function (error) {
  //       console.log('error in get users axios request: ', error);
  //     });
  // }

  editUserLists(movieID, list, requestType) {
    let accessToken = localStorage.getItem('token');
    let user = localStorage.getItem('user');

    if (requestType === 'post') {
      let message = 'Movie successfully added to Favorites List.';
      if (list === 'towatch') {
        message = 'Movie successfully added in To Watch List.';
      }
      axios
        .post(
          `https://jennysflix.herokuapp.com/users/${user}/movies/${list}/${movieID}`,
          {},
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        )
        .then(() => {
          alert(message);
          this.getUsers(accessToken);
        })
        .catch((e) => {
          console.log('Something went wrong with adding movie');
        });
    }

    if (requestType === 'delete') {
      let message = 'Movie successfully deleted from Favorites List.';
      if (list === 'towatch') {
        message = 'Movie successfully deleted from To Watch List.';
      }
      axios
        .delete(`https://jennysflix.herokuapp.com/users/${user}/movies/${list}/${movieID}`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        })
        .then(() => {
          alert(message);
          this.getUsers(accessToken);
        })
        .catch((e) => {
          console.log('Something went wrong with removing movie');
        });
    }
  }

  setRequestType(type) {
    this.setState({
      requestType: type,
    });
  }

  render() {
    const { users, user, requestType } = this.state;
    // #5 movies is extracted from this.props rather than from the this.state
    let { movies } = this.props;

    console.log('user =', user);

    return (
      <Router>
        <Row className="profile-logout-btns-desktop">
          <Col md="6">
            <h1 className="title">MyFlix</h1>
          </Col>
          {user ? (
            <Col md="2">
              <Link to={`/movies`}>
                <Button variant="info">Home</Button>
              </Link>
            </Col>
          ) : null}
          {user ? (
            <Col md="2">
              <Link to={`/users/${localStorage.getItem('user')}`}>
                <Button variant="info" onClick={() => this.setRequestType(undefined)}>
                  Profile
                </Button>
              </Link>
            </Col>
          ) : null}
          {user ? (
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
          {user ? (
            <Col>
              <Link to={`/movies`}>
                <Button variant="info">Home</Button>
              </Link>
              <Link to={`/users/${localStorage.getItem('user')}`}>
                <Button variant="info" onClick={() => this.setRequestType(undefined)}>
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
            if (!user) return <Redirect to="/login" />;
            if (user) return <Redirect to="/movies" />;
          }}
        />

        <Route
          exact
          path="/login"
          render={() => {
            if (user) return <Redirect to="/movies" />;
            return <LoginView onBackClick={() => history.goBack()} onLoggedIn={(user) => this.onLoggedIn(user)} />;
          }}
        />

        <Row className="main-view justify-content-md-center movie-cards">
          <Route
            exact
            path="/movies"
            render={() => {
              if (!user) {
                return <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />; //onLoggedIn method will update the user state of the MainView component and will be called when the user has successfully logged in... to change the user state to valid instead of null?
              }
              if (movies.length === 0) return <div className="main-view" />;
              // #6
              return <MoviesList movies={movies} />;
            }}
          />

          <Route
            exact
            path="/users"
            render={({ history }) => {
              if (user) return <Redirect to="/movies" />;
              return <RegistrationView onBackClick={() => history.goBack()} />;
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
                    userData={users.find((u) => u.Username === localStorage.getItem('user'))}
                    setRequestType={(type) => this.setRequestType(type)}
                  />
                ); //onLoggedIn method will update the user state of the MainView component and will be called when the user has successfully logged in... to change the user state to valid instead of null?
              }
              if (requestType === undefined) {
                return (
                  <ProfileView
                    userData={users.find((u) => u.Username === localStorage.getItem('user'))}
                    onBackClick={() => history.goBack()}
                    setRequestType={(type) => this.setRequestType(type)}
                    movies={movies}
                  />
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
                <MovieInfoView
                  editUserLists={(movieID, list, requestType) => this.editUserLists(movieID, list, requestType)}
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
              if (!user) {
                return <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />; //onLoggedIn method will update the user state of the MainView component and will be called when the user has successfully logged in... to change the user state to valid instead of null?
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
              if (!user) {
                return <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />; //onLoggedIn method will update the user state of the MainView component and will be called when the user has successfully logged in... to change the user state to valid instead of null?
              }
              if (movies.length === 0) return <div className="main-view" />; //make sure movies are available before rendering anything.
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

// #7if defined—will allow the component (the one you want to connect)
// to subscribe to store updates. Any time the store is updated, this function will be called.
// so instead of component accessing state directly, it accesses state passed to props by the store
let mapStateToProps = (state) => {
  return { movies: state.movies };
};

// #8 HOVER over this 'connect' and you can see the actions bc its now connected to the store
export default connect(mapStateToProps, { setMovies })(MainView);
/*this.props.setMovies is NOT THE SAME as setMovies imported from the actions
        this.props.setMovies is passed to props thru connect() and its wrapped into the dispatch() function of the store(a way for the store to know that the action has been called).
        the regular setMovies is given as a prop to the MainView component bc its wrapped in the connect() function at the bottom*/
