import React, { useState } from 'react'; //useState is a react hook
import { render } from 'react-dom';
import { Container, Card, Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { propTypes } from 'react-bootstrap/esm/Image';

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
