# MyFlix-client
This repo contains the frontend of a single page application built with React. The complete stack of this full-stack application consists of **MongoDB**, **Express**, **React**, and **Node.js**. The [server-side](https://github.com/jenpyle/myFlix-server) is hosted on Heroku and processes API requests sent to the database. Documentation for the API is available [here](https://jennysflix.herokuapp.com/documentation.html). The app is hosted on Netlify at [https://myflix-jenpyle.netlify.app/login](https://myflix-jenpyle.netlify.app/login)

Redux is used to manage the application's state, and navigation between different views is implimented via client-side state routing. Client-side authentication and authorization is integrated with the backend logic using Axios, along with JWT-based authentication and basic HTTP authentication. The application also uses Bootstrap as a UI library for styling and responsiveness.

## Project description
**myFlix** is a movie app that allows users to sign up, log in, and view or filter through a list of movies. Users can add movies to their own 'Favorites' and 'To Watch' lists. Along with that, users can view and edit their profile information.

## How to get the project running
This project uses Parcel for building, and Bable for transpilation.

To build the project in the terminal run ```parcel src/index.html```

## Project dependencies (e.g., JavaScript version, ESLint rules)
javascript version: ???
```
  "dependencies": {
    "axios": "^0.21.1",
    "bootstrap": "^4.6.0",
    "parcel": "^2.0.0-beta.2",
    "prop-types": "^15.7.2",
    "react": "^17.0.2",
    "react-bootstrap": "^1.5.2",
    "react-dom": "^17.0.2",
    "react-redux": "^7.2.4",
    "react-router-dom": "^5.2.0",
    "redux": "^4.1.0",
    "redux-devtools-extension": "^2.13.9"
  },
  "devDependencies": {
    "@parcel/transformer-sass": "^2.0.0-beta.2"
  }
```
