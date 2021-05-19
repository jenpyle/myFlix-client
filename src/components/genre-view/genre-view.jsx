import React from 'react';
import { Container, Card, Button } from 'react-bootstrap';

export function GenreView(props) {
  const { genreData, onBackClick } = props;
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
        <Card.Header className="genre-title">{genreData.Name}</Card.Header>
        <Card.Body>
          <Card.Text className="genre-description">{genreData.Description}</Card.Text>
        </Card.Body>
      </Card>
    </Container>
  );
}
