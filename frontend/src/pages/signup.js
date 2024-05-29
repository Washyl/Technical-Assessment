import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import { Container, Form, Button, Alert } from 'react-bootstrap';

const SignUp = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:3000/api/signup', { username, password });
      localStorage.setItem('token', res.data.token);
      router.push('/todolist');
    } catch (error) {
      console.error(error);
      setError('Sign Up Failed');
    }
  };

  return (
    <Container>
      <h1>Sign Up</h1>
      {error && <Alert variant="danger">{error}</Alert>}
      <Form onSubmit={handleSignUp}>
        <Form.Group controlId="formUsername">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group controlId="formPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </Form.Group>

        <Button variant="primary" type="submit" className="w-100">
          Sign Up
        </Button>
      </Form>
    </Container>
  );
};

export default SignUp;
