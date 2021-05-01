import React, { useState } from 'react'; //useState is a react hook
import { render } from 'react-dom';
import { Container, Card, Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export function DirectorView(props) {
  // render() {
  return (
    <Container>
      <div>Jello!</div>

      <Button
        variant="info"
        onClick={() => {
          props.onBackClick();
        }}
      >
        Back
      </Button>
    </Container>
  );
  // };
}
