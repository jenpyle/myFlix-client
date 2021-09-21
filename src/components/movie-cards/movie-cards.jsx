import React from 'react'; //useState is a react hook
import { Link } from 'react-router-dom';
import { Card, Button } from 'react-bootstrap';

export function MovieCards(props) {
	const { movieData } = props;

	return (
		<Card>
			<Card.Img variant="top" src={movieData.ImagePath} />
			<Card.Body>
				<Card.Title>{movieData.Title}</Card.Title>
				<Card.Text>{movieData.Description}</Card.Text>
				<Card.Subtitle>{movieData.Genre.Name}</Card.Subtitle>
				<Link to={`/movies/${movieData._id}`}>
					<Button variant="link">Open</Button>
				</Link>
			</Card.Body>
		</Card>
	);
}
