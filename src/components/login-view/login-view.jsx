import React, { useState } from 'react';
import { Container, Button, Form, Spinner } from 'react-bootstrap';
import { setLoading } from '../../actions/actions';

import { Link } from 'react-router-dom';

import './login-view.scss';
import { postLogin } from '../../api/api';
import { useDispatch, useSelector } from 'react-redux';

export function LoginView() {
	const dispatch = useDispatch();
	const [username, setUsername] = useState(''); // assigns an empty string to the username variable—and assigns to the setUsername variable a method to update the username variable
	const [password, setPassword] = useState('');
	const loading = useSelector((state) => state.loading);

	const handleSubmit = (e) => {
		e.preventDefault();
		dispatch(setLoading(true));
		dispatch(postLogin(username, password));
	};

	return (
		<Container className="login-container">
			<h4 className="login-subtitle">Login or create an account</h4>
			<Form>
				<Form.Group controlId="formUsername">
					<Form.Label>Username:</Form.Label>
					<Form.Control type="text" autoComplete="username" onChange={(e) => setUsername(e.target.value)} />
				</Form.Group>
				<Form.Group controlId="formPassword">
					<Form.Label>Password:</Form.Label>
					<Form.Control type="password" autoComplete="password" onChange={(e) => setPassword(e.target.value)} />
				</Form.Group>
				{loading ? <Spinner animation="border" /> : null}
				<Button variant="info" type="submit" onClick={handleSubmit}>
					Submit
				</Button>
				<Link to={`/users`}>
					<Button variant="link">Register New User</Button>
				</Link>
			</Form>
		</Container>
	);
}
