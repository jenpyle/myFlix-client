import { string } from 'prop-types';

//Declare Action types
export const SET_MOVIES = 'SET_MOVIES'; //The reason for exporting functions is convenience: you’ll be able to call them from wherever you want to perform said actions.
export const SET_FILTER = 'SET_FILTER';
export const GET_USERS = 'GET_USERS';
export const SET_USER = 'SET_USER';
// Action creators
//pure js function that returns the action itself, the action has a type and data and the data is what is going to update the state
export function setMovies(value) {
  //value is the data
  console.log('SET_MOVIES action reached');
  return {
    type: SET_MOVIES,
    value,
  }; //return initializes the movies list with movies
}

export function getUsers(value) {
  //value is the data
  console.log('GET_USERS action reached');
  return {
    type: GET_USERS,
    value,
  };
}

export function setUser(value) {
  //value is the data
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
  }; //sets the filter to filter your movies list.
}
