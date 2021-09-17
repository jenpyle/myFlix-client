import React, { useState, useEffect } from 'react'; //useState is a react hook
import { Link } from 'react-router-dom';
import { Row, Col, Button } from 'react-bootstrap';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setUser, setProfileReq } from '../../actions/actions';

import { DirectorView } from '../director-view/director-view';
import { editUserLists, getMoviesFromApi, getOneUser } from '../../api/api';
import { GenreView } from '../genre-view/genre-view';
import { LoginView } from '../login-view/login-view';
import { MovieInfoView } from '../movie-info-view/movie-info-view';
import MoviesList from '../movies-list/movies-list';
import { ProfileView } from '../profile-view/profile-view';
import { RegistrationView } from '../registration-view/registration-view';
import { UpdateProfile } from '../update-profile/update-profile';
import './main-view.scss';

const MainView = () => {
	const dispatch = useDispatch();
	const [requestType, setRequestType] = useState(false);
	const movies = useSelector((state) => state.movies);
	const user = useSelector((state) => state.user);
	const profileRequest = useSelector((state) => state.profileRequest);

	const onLoggedOut = () => {
		localStorage.removeItem('token');
		localStorage.removeItem('user');
		dispatch(setUser(null));
		window.open(`/login`, '_self');
	};

	useEffect(() => {
		let accessToken = localStorage.getItem('token');
		if (accessToken !== null) {
			dispatch(getMoviesFromApi());
			dispatch(getOneUser());
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
							<Button variant="info" onClick={() => dispatch(setProfileReq('get'))}>
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
							<Button variant="info" onClick={() => dispatch(setProfileReq('get'))}>
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
					return <LoginView />;
				}}
			/>

			<Row className="main-view justify-content-md-center movie-cards">
				<Route
					exact
					path="/movies"
					render={() => {
						if (!user.Username) <Redirect to="/login" />;
						if (movies.length === 0) return <div className="main-view" />;
						return <MoviesList />;
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
						if (
							movies.length === 0 ||
							(user && // 👈 null and undefined check
								Object.keys(user).length === 0 &&
								user.constructor === Object)
						)
							return <div className="main-view">Nothing yet</div>;
						if (profileRequest === 'put') {
							return <UpdateProfile setRequestType={(type) => setRequestType(type)} onLoggedOut={() => onLoggedOut()} />;
						}
						if (profileRequest === '' || profileRequest === 'get') {
							return <ProfileView onBackClick={() => history.goBack()} setRequestType={(type) => setRequestType(type)} />;
						}
					}}
				/>

				<Route
					path="/movies/:movieId"
					render={({ match, history }) => {
						if (!user.Username) <Redirect to="/login" />;
						if (movies.length === 0) return <div className="main-view" />;
						return <MovieInfoView movieId={match.params.movieId} editUserLists={(movieID, list, requestType) => editUserLists(movieID, list, requestType)} onBackClick={() => history.goBack()} />;
					}}
				/>
				<Route
					path="/directors/:name"
					render={({ match, history }) => {
						if (!user.Username) {
							return <LoginView />;
						}
						if (movies.length === 0) return <div className="main-view" />;
						return <DirectorView directorData={movies.find((movie) => movie.Director.Name === match.params.name).Director} onBackClick={() => history.goBack()} />;
					}}
				/>
				<Route
					path="/genres/:name"
					render={({ match, history }) => {
						if (!user.Username) {
							return <LoginView />;
						}
						if (movies.length === 0) return <div className="main-view" />;
						return <GenreView genreData={movies.find((movie) => movie.Genre.Name === match.params.name).Genre} onBackClick={() => history.goBack()} />;
					}}
				/>
			</Row>
		</Router>
	);
};

export default MainView;
