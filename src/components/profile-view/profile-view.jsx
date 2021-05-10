import React, { useState } from 'react'; //useState is a react hook

import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Container, Card, Row, Col, Button, Form } from 'react-bootstrap';
import axios from 'axios';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';

export function ProfileView(props) {
  console.log('inside of profile view');
  console.log('props.userData inside of profile-view= ', props.userData);
  const { userData, movies } = props; //obj destructuring

  const favMovies = movies.filter((movie) => userData.FavoriteMovies.includes(movie._id));
  const toWatch = movies.filter((movie) => userData.ToWatch.includes(movie._id));

  return (
    <Container>
      <Row className="user-view">
        <Col md={7}>
          {/* <Button
            variant="info"
            onClick={() => {
              props.onBackClick();
            }}
          >
            Back
          </Button> */}
          <Link to={`/`}>
            <Button variant="info">Back</Button>
          </Link>
          <Card>
            <div className="user-view-info">
              <Card.Header>Profile Information</Card.Header>

              <Card.Body className="username">
                <Card.Title>Username: </Card.Title>
                <Card.Text>{userData.Username}</Card.Text>

                <Card.Title>Email: </Card.Title>
                <span className="value">{userData.Email}</span>

                <Card.Title>Birthday: </Card.Title>
                <span className="value">{userData.Birthday.substr(0, 10)}</span>

                <Card.Title>Favorite Movies: </Card.Title>
                <span className="value">
                  {favMovies.map((m) => (
                    <Link key={m._id} to={`/movies/${m._id}`}>
                      <div>
                        <Button variant="link">{m.Title}</Button>
                      </div>
                    </Link>
                  ))}
                </span>

                <Card.Title>To Watch: </Card.Title>
                <span className="value">
                  {toWatch.map((m) => (
                    <Link key={m._id} to={`/movies/${m._id}`}>
                      <div>
                        <Button variant="link">{m.Title}</Button>
                      </div>
                    </Link>
                  ))}
                </span>
              </Card.Body>
              <Link to={`/users/${userData.Username}`}>
                <Button variant="link" onClick={() => props.setRequestType('put')}>
                  Edit Profile Info
                </Button>
              </Link>
            </div>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
