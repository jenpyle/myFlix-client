import { combineReducers } from 'redux';
import { SET_FILTER, SET_MOVIES, SET_USER, SET_PROFILE_REQ, SET_LOADING } from '../actions/actions';

function movies(state = [], action) {
	switch (action.type) {
		case SET_MOVIES:
			console.log('SET_MOVIES reducer reached', action);
			return action.value;
		default:
			return state;
	}
}

function profileRequest(state = '', action) {
	switch (action.type) {
		case SET_PROFILE_REQ:
			console.log('SET_PROFILE_REQ reducer reached', action);
			return action.value;
		default:
			return state;
	}
}

function user(state = {}, action) {
	switch (action.type) {
		case SET_USER:
			console.log('SET_USER reducer reached');
			return { ...state, ...action.value };
		default:
			return state;
	}
}

function visibilityFilter(state = '', action) {
	switch (action.type) {
		case SET_FILTER:
			console.log('SET_FILTER reducer reached');
			return action.value;
		default:
			return state;
	}
}

function loading(state = false, action) {
	switch (action.type) {
		case SET_LOADING:
			console.log('SET_LOADING reducer reached');
			return action.value;
		default:
			return state;
	}
}

const moviesApp = combineReducers({
	movies,
	profileRequest,
	user,
	visibilityFilter,
	loading,
});

export default moviesApp;
/*All you have to do is add an action and export it (in the “src/actions/actions.js” file);
then add the corresponding reducer;
and then “register” it in the moviesApp combined reducer (in the “src/reducers/reducers.js” file). */
