import React from 'react';
import { Container, Card, Button } from 'react-bootstrap';

export function DirectorView(props) {
  const { directorData, onBackClick } = props;
  return (
    <Container>
      <Button
        variant="secondary"
        onClick={() => {
          onBackClick();
        }}
      >
        Back
      </Button>
      <Card>
        <Card.Header className="director-title">{directorData.Name}</Card.Header>
        <Card.Body>
          <Card.Title>Bio: </Card.Title>
          <span className="value">{directorData.Bio}</span>

          <Card.Title>Birthday: </Card.Title>
          <span className="value">{directorData.Birth}</span>
        </Card.Body>
      </Card>
    </Container>
  );
}
