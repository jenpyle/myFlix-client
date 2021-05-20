import React from 'react';
import ReactDOM from 'react-dom';
import { Container } from 'react-bootstrap';
import MainView from './components/main-view/main-view';
import { createStore, applyMiddleware } from 'redux'; //You create the store in the top-most file of your application to pass it to all the other views and components:
import { Provider } from 'react-redux'; //these two lines <- and ^ import the connect() function and React Redux.. provider makes the store accessible throughout your app
//Provider makes the store available to all the components
import moviesApp from './reducers/reducers';
import { composeWithDevTools } from 'redux-devtools-extension'
import { getMoviesFromApi, getOneUser, editUserLists } from './api/api';

import { devToolsEnhancer } from 'redux-devtools-extension';
import thunk from "redux-thunk";


// Import statement to indicate that you need to bundle `./index.scss`
import './index.scss';
/*After importing your MainView and “index.scss” file, you can create the store using createStore and wrap
your entire app in a provider that comes from React Redux. So our store is accessible from my entire app*/
const composedEnhancer = composeWithDevTools(applyMiddleware(thunk))
const store = createStore(moviesApp, composedEnhancer);

// const store = createStore(moviesApp, applyMiddleware(thunk));
// store.dispatch(getMoviesFromApi);
// Main component (will eventually use all the others)
class MyFlixApplication extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Container>
          <MainView />
        </Container>
      </Provider>
    );
  }
}
//wrapping the Provider around MainView component to connect it to the store
// Finds the root of your app
const container = document.getElementsByClassName('app-container')[0];

// Tells React to render your app in the root DOM element
ReactDOM.render(React.createElement(MyFlixApplication), container);
