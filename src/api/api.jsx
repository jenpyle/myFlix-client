import axios from 'axios';
import { setMovies, getUsers, setUser } from '../actions/actions';
import { useDispatch, useSelector } from 'react-redux';

export const getMoviesFromApi = async (token) => {
  try {
    const response = await axios.get('https://jennysflix.herokuapp.com/movies', {
      headers: { Authorization: `Bearer ${token}` },
    });
    useDispatch(setMovies(response.data));
  } catch (err) {
    console.log(err);
  }
};

export const getOneUser = async (token, username) => {
  try {
    const response = await axios.get(`https://jennysflix.herokuapp.com/users/${username}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    console.log('In getOneUser= ', response.data);
    userDispatch(setUser(response.data));
  } catch (err) {
    console.log('error in get users axios request: ', err);
  }
};

export const getUsersFromApi = async (token) => {
  try {
    const response = await axios.get('https://jennysflix.herokuapp.com/users', {
      headers: { Authorization: `Bearer ${token}` },
    });
    console.log('nothing to respond');
  } catch (err) {
    console.log('error in get users axios request: ', err);
  }
};

export const editUserLists = async (movieID, list, requestType) => {
  let accessToken = localStorage.getItem('token');
  let user = localStorage.getItem('user');

  if (requestType === 'post') {
    let message = 'Movie successfully added to Favorites List.';
    if (list === 'towatch') {
      message = 'Movie successfully added in To Watch List.';
    }
    try {
      axios.post(
        `https://jennysflix.herokuapp.com/users/${user}/movies/${list}/${movieID}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      alert(message);
      getUsers(accessToken);
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
      await axios.delete(`https://jennysflix.herokuapp.com/users/${user}/movies/${list}/${movieID}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      alert(message);
      this.getUsers(accessToken);
    } catch (err) {
      console.log('Something went wrong with removing movie');
    }
  }
};
