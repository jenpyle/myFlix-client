import React, { useState } from 'react'; //useState is a react hook

import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Container, Card, Row, Col, Button, Form } from 'react-bootstrap';
import axios from 'axios';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';

export function ProfileView(props) {
  console.log('inside of profile view');
  console.log('props.userData inside of profile-view= ', props.userData);
  return (
    <Container>
      <Button
        variant="info"
        onClick={() => {
          props.onBackClick();
        }}
      >
        Back
      </Button>
      {/* <Button
        variant="info"
        onClick={() => {
          props.onBackClick();
        }}
      >
        Edit Profile Info
      </Button> */}
      <Link to={`/users/${props.userData.Username}`}>
        <Button variant="link" onClick={() => props.setRequestType('put')}>
          Edit Profile Info
        </Button>
      </Link>
      <Row className="user-view">
        <Col md={7}>
          <Card>
            <div className="user-view-title">
              <Card.Header>Profile Information</Card.Header>

              <Card.Body className="username">
                <Card.Title>Username: </Card.Title>
                <Card.Text>{props.userData.Username}</Card.Text>

                <Card.Title>Password: </Card.Title>
                <span className="value">{props.userData.Password}</span>

                <Card.Title>Email: </Card.Title>
                <span className="value">{props.userData.Email}</span>

                <Card.Title>Birthday: </Card.Title>
                <span className="value">{props.userData.Birthday}</span>

                <Card.Title>Favorite Movies: </Card.Title>
                <span className="value">{props.userData.FavoriteMovies}</span>

                <Card.Title>To Watch: </Card.Title>
                <span className="value">{props.userData.ToWatch}</span>
              </Card.Body>
            </div>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
