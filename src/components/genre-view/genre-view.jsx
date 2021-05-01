import React, { useState } from 'react'; //useState is a react hook

import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Container, Card, Row, Col, Button, Form } from 'react-bootstrap';
import axios from 'axios';
import { BrowserRouter as Router, Route } from 'react-router-dom';

export function GenreView(props) {
  //all the views declared like this are function components
  return (
    <Container>
      <div>Genre view</div>
      <Button
        variant="info"
        onClick={() => {
          props.onBackClick();
        }}
      >
        Back
      </Button>

      <Card>
        <Card.Header className="genre-title">{props.genreData.Name}</Card.Header>
        <Card.Body>
          <Card.Text className="genre-description">{props.genreData.Description}</Card.Text>
        </Card.Body>
      </Card>
    </Container>
  );
}
