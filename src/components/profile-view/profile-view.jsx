import React, { useState } from 'react'; //useState is a react hook

import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Container, Card, Row, Col, Button, Form } from 'react-bootstrap';
import axios from 'axios';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

export function ProfileView(props) {
  console.log('inside of profile view');
  const movies = useSelector((state) => state.movies);
  const userData = useSelector((state) => state.user);
  console.log(userData, '!!userData')
  const { onBackClick } = props; //obj destructuring

  const favMovies = movies.filter((movie) => userData.FavoriteMovies.includes(movie._id));
  const toWatch = movies.filter((movie) => userData.ToWatch.includes(movie._id));

  return (
    <Container>
      <Row className="user-view">
        <Col>
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

              <Button
                variant="info"
                onClick={() => {
                  props.setRequestType('put');
                }}
              >
                Edit Profile Info
              </Button>
              <Button
                variant="secondary"
                onClick={() => {
                  onBackClick();
                }}
              >
                Back
              </Button>
            </div>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
