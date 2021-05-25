import axios from 'axios';
import { setMovies, setUser } from '../actions/actions';

export const postLogin = (username, password) => {
  try {
    return async (dispatch, getState) => {
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
    };
  } catch (err) {
    console.log(err);
  }
};

export const putUpdateProfile = (urlString, formData) => {
  try {
    async (dispatch, getState) => {
      const response = await axios.put(urlString, formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      localStorage.setItem('user', response.data.Username);
      dispatch(setUser(response.data));
      window.open(`/users/${response.data.Username}`, '_self');
    };
  } catch (err) {
    console.log(err);
  }
};

export const deleteUser = (urlString) => {
  try {
    return async (dispatch, getState) => {
      const response = await axios.delete(urlString, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      console.log('RESPONSE', response);
    };
  } catch (err) {
    console.log(err);
  }
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
      console.log('!!User before dispatch: ', getState().user);
      dispatch(setUser(response.data));
      console.log('!!User after dispatch: ', getState().user);
    };
  } catch (err) {
    console.log(err);
  }
};

export const editUserLists = (movieID, list, requestType) => {
  console.log('MADE IT TO EDITUSERLISTS');
  let accessToken = localStorage.getItem('token');
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
        const response = await axios.delete(
          `https://jennysflix.herokuapp.com/users/${user}/movies/${list}/${movieID}`,
          {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
          }
        );
        dispatch(setUser(response.data));
        alert(message);
      };
    } catch (err) {
      console.log('Something went wrong with removing movie');
    }
  }
};
