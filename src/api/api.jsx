import axios from 'axios';
import { setMovies, getUsers, setUser } from '../actions/actions';

export const getMoviesFromApi = () => {
  // try {
  //   const response = await axios.get('https://jennysflix.herokuapp.com/movies', {
  //     headers: { Authorization: `Bearer ${token}` },
  //   });
  //   dispatch(setMovies(response.data));
  // } catch (err) {
  //   console.log(err);
  // }
  return async (dispatch, getState) => {
    const response = await axios.get('https://jennysflix.herokuapp.com/movies', {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    });
    console.log('!!Movies before dispatch: ', getState().movies.length)

    dispatch(setMovies(response.data));

    console.log('!!Movies after dispatch: ', getState().movies.length)

  }
};

export const getOneUser = () => {
  // try {
  //   const response = await axios.get(`https://jennysflix.herokuapp.com/users/${username}`, {
  //     headers: { Authorization: `Bearer ${token}` },
  //   });
  //   console.log('In getOneUser= ', response.data);
  //   userDispatch(setUser(response.data));
  // } catch (err) {
  //   console.log('error in get users axios request: ', err);
  // }
  console.log('!!!aaa')
  return async (dispatch, getState) => {
    const response = await axios.get(`https://jennysflix.herokuapp.com/users/${localStorage.getItem('user')}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    });
    console.log('!!User before dispatch: ', getState().user)
    dispatch(setUser(response.data));
    console.log('!!User after dispatch: ', getState().user)
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
