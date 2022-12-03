import { useState } from 'react';
import { useRouter } from 'next/router';
import { authenticateUser } from '../lib/authenticate';

import { Card, Form, Button, Alert } from 'react-bootstrap';

export default function Login(props) {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [warning, setWarning] = useState('');

  const router = useRouter();

  async function handleSubmit(e) {
    e.preventDefault();
    console.log('Form Submitted');

    try {
      await authenticateUser(userName, password);
      router.push('/favorites');
    } catch (err) {
      //console.log(err.message)
      setWarning(err.message);
    }
  }

  return (
    <>
      <Card bg='light'>
        <Card.Body>
          <h2>Login</h2>Enter your login information below:
        </Card.Body>
      </Card>
      <br />
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>User:</Form.Label>
          <Form.Control
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            type='text'
            id='userName'
            name='userName'
          />
        </Form.Group>
        <br />
        <Form.Group>
          <Form.Label>Password:</Form.Label>
          <Form.Control
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type='password'
            id='password'
            name='password'
          />
        </Form.Group>
        <br />
        <Button variant='outline-info' className='pull-right' type='submit'>
          Login
        </Button>
        <br />
        <br />
        {warning && <Alert variant='danger'>{warning}</Alert>}
      </Form>
    </>
  );
}
