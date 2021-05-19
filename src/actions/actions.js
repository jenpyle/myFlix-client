//Declare Action types
export const SET_MOVIES = 'SET_MOVIES';
export const SET_FILTER = 'SET_FILTER';
export const SET_USER = 'SET_USER';
export const SET_REQUEST = 'SET_REQUEST';

// Action creators
export function setMovies(value) {
  console.log('SET_MOVIES action reached');
  return {
    type: SET_MOVIES,
    value,
  };
}

export function setUser(value) {
  console.log('SET_USER action reached');
  return {
    type: SET_USER,
    value,
  };
}

export function setFilter(value) {
  console.log('SET_FILTER action reached');
  return {
    type: SET_FILTER,
    value,
  };
}

export function setRequest(value) {
  console.log('SET_REQUEST action reached');
  return {
    type: SET_REQUEST,
    value,
  };
}
