import { string } from 'prop-types';

//Declare Action types
export const SET_MOVIES = 'SET_MOVIES'; //The reason for exporting functions is convenience: you’ll be able to call them from wherever you want to perform said actions.
export const SET_FILTER = 'SET_FILTER';
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

export function setFilter(value) {
  console.log('SET_FILTER action reached');
  return {
    type: SET_FILTER,
    value,
  }; //sets the filter to filter your movies list.
}
