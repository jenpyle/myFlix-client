import React, { useState } from 'react'; //useState is a react hook

import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Container, Card, Row, Col, Button, Form } from 'react-bootstrap';
import axios from 'axios';
import { BrowserRouter as Router, Route } from 'react-router-dom';

export function DirectorView(props) {
  // render() {
  return (
    <Container>
      <Button
        variant="secondary"
        onClick={() => {
          props.onBackClick();
        }}
      >
        Back
      </Button>
      <Card>
        <Card.Header className="director-title">{props.directorData.Name}</Card.Header>
        <Card.Body>
          <Card.Title>Bio: </Card.Title>
          <span className="value">{props.directorData.Bio}</span>

          <Card.Title>Birthday: </Card.Title>
          <span className="value">{props.directorData.Birth}</span>
        </Card.Body>
      </Card>
    </Container>
  );
  // };
}
