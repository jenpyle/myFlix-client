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
      dispatch(getMoviesFromApi());
    };
  } catch (err) {
    ///////////////////////////alert is not showing up
    alert('Incorrect username or password. If you are a new user please register.');
    console.log(err);
  }
};

export const putUpdateProfile = (urlString, formData) => {
  console.log('FORM DATA', formData);
  console.log('typeof urlString=', typeof urlString, urlString);
  console.log('urlString=', urlString);
  // const headers = {
  //   headers: {
  //     Authorization: `Bearer ${localStorage.getItem('token')}`,
  //   },
  // };
  try {
    return async (dispatch, getState) => {
      // const response = await axios.put(urlString, formData, headers);
      const response = await axios.put(
        'https://jennysflix.herokuapp.com/users/jenny12345',
        { Username: 'jenny123456', Email: 'jenny@gmail.com', Birthday: '10/31/1996' },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      localStorage.setItem('user', response.data.Username);
      dispatch(setUser(response.data));
      dispatch(setProfileReq(''));
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
      alert(response.data);
      window.open(`/login`, '_self');
      localStorage.removeItem('token');
      localStorage.removeItem('user');
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
      dispatch(setUser(response.data));
    };
  } catch (err) {
    console.log(err);
  }
};

export const editUserLists = (movieID, list, requestType) => {
  console.log('MADE IT TO EDITUSERLISTS', requestType);
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

export const postRegistration = (formData) => {
  console.log('FORM DATA111=', formData);
  try {
    return async (dispatch, getState) => {
      const response = await axios.post('https://jennysflix.herokuapp.com/users', formData);
      window.open('/login', '_self');
    };
  } catch (err) {
    alert(err.response.data);
    console.log('Something went wrong with user registration! check that fields are valid');
  }
};
