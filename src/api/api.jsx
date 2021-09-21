import axios from 'axios';
import { setMovies, setUser, setLoading } from '../actions/actions';

export const postLogin = (username, password) => {
	return async (dispatch, getState) => {
		try {
			const response = await axios.post('https://jennysflix.herokuapp.com/login', {
				Username: username,
				Password: password,
			});
			localStorage.setItem('token', response.data.token);
			localStorage.setItem('user', response.data.user.Username);
			dispatch(
				setUser({
					Username: response.data.user.Username,
					Password: response.data.user.Password,
					Email: response.data.user.Email,
					Birthday: response.data.user.Birthday,
					FavoriteMovies: response.data.user.FavoriteMovies,
					ToWatch: response.data.user.ToWatch,
				})
			);
			dispatch(getMoviesFromApi());
			dispatch(setLoading(false));
		} catch (err) {
			alert('Incorrect username or password. If you are a new user please register.');
			dispatch(setLoading(false));
		}
	};
};

export const putUpdateProfile = (urlString, formData) => {
	return async (dispatch, getState) => {
		try {
			const response = await axios.put(urlString, formData, {
				headers: {
					Authorization: `Bearer ${localStorage.getItem('token')}`,
				},
			});
			localStorage.setItem('user', response.data.Username);
			dispatch(setUser(response.data));
			dispatch(setLoading(false));
			window.open(`/users/${response.data.Username}`, '_self');
		} catch (err) {
			alert('Username already exists');
			console.log(err);
			dispatch(setLoading(false));
		}
	};
};

export const deleteUser = (urlString) => {
	return async (dispatch, getState) => {
		try {
			const response = await axios.delete(urlString, {
				headers: {
					Authorization: `Bearer ${localStorage.getItem('token')}`,
				},
			});
			alert(response.data);
			window.open(`/login`, '_self');
			localStorage.removeItem('token');
			localStorage.removeItem('user');
		} catch (err) {
			alert('Something went wrong with deleting user');
		}
	};
};

export const getMoviesFromApi = () => {
	try {
		return async (dispatch, getState) => {
			const response = await axios.get('https://jennysflix.herokuapp.com/movies', {
				headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
			});
			dispatch(setMovies(response.data));
		};
	} catch (err) {
		console.log(err);
	}
};

export const getOneUser = () => {
	try {
		return async (dispatch, getState) => {
			const response = await axios.get(`https://jennysflix.herokuapp.com/users/${localStorage.getItem('user')}`, {
				headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
			});
			dispatch(setUser(response.data));
		};
	} catch (err) {
		console.log(err);
	}
};

export const editUserLists = (movieID, list, requestType) => {
	let user = localStorage.getItem('user');

	if (requestType === 'post') {
		let message = 'Movie successfully added to Favorites List.';
		if (list === 'towatch') {
			message = 'Movie successfully added in To Watch List.';
		}
		try {
			return async (dispatch, getState) => {
				const response = await axios.post(
					`https://jennysflix.herokuapp.com/users/${user}/movies/${list}/${movieID}`,
					{},
					{
						headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
					}
				);
				dispatch(setUser(response.data));
				alert(message);
			};
		} catch (err) {
			console.log('Something went wrong with adding movie');
		}
	}

	if (requestType === 'delete') {
		let message = 'Movie successfully deleted from Favorites List.';
		if (list === 'towatch') {
			message = 'Movie successfully deleted from To Watch List.';
		}
		try {
			return async (dispatch, getState) => {
				const response = await axios.delete(`https://jennysflix.herokuapp.com/users/${user}/movies/${list}/${movieID}`, {
					headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
				});
				dispatch(setUser(response.data));
				alert(message);
			};
		} catch (err) {
			console.log('Something went wrong with removing movie');
		}
	}
};

export const postRegistration = (formData) => {
	return async (dispatch, getState) => {
		try {
			const response = await axios.post('https://jennysflix.herokuapp.com/users', formData);
			window.open('/login', '_self');
		} catch (err) {
			if (err.response.status === 409) {
				alert(err.response.data);
				dispatch(setLoading(false));
			}
			if (err.response.status === 422) {
				alert(err.response.data.errors[0].msg);
				dispatch(setLoading(false));
			}
			console.log('check that fields are valid');
		}
	};
};
