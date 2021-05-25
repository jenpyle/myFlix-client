import React from 'react';
import { Container, Card, Button } from 'react-bootstrap';

export function DirectorView(props) {
  console.log('HERE', props);
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
}
