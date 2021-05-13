import { combineReducers } from 'redux';

import { SET_FILTER, SET_MOVIES } from '../actions/actions';

//each reducer takes a state and an action
//each reducer only cares about what it’s responsible for. When concerned by the action, reducers simply return a new value.
function visibilityFilter(state = '', action) {
  switch (
    action.type /*Every time an action is dispatched, this reducer will be called, and it’s responsible for addressing the action or not, hence the switch-case syntax. This syntax states that if the given action is unrelated to the reducer, then it should return whatever state it’s been given. */
  ) {
    case SET_FILTER:
      console.log('SET_FILTER reducer reached');
      return action.value;
    default:
      return state; //return the existing state if no changes
  }
}

function movies(state = [], action) {
  switch (action.type) {
    case SET_MOVIES:
      console.log('SET_MOVIES reducer reached');
      return action.value;
    default:
      return state;
  }
}
//Combined Reducer
//This groups all the reducers together and only passes them the state they’re concerned with: the filter for the first reducer and the movies for the second one
//both reducers pass the previous state and an action, and based on that it decided what the next state is going to look like
// function moviesApp(state = {}, action) {
//   return {
//     visibilityFilter: visibilityFilter(state.visibilityFilter, action),
//     movies: movies(state.movies, action)
//   }
// }
const moviesApp = combineReducers({
  visibilityFilter,
  movies,
});

export default moviesApp;
/*All you have to do is add an action and export it (in the “src/actions/actions.js” file); 
then add the corresponding reducer; 
and then “register” it in the moviesApp combined reducer (in the “src/reducers/reducers.js” file). */
