import React, { useState } from "react";

import axios from 'axios';

import {Form, Button, Alert} from "react-bootstrap";
// import Form from "react-bootstrap/Form";
// import Button from "react-bootstrap/Button";

import './auth.scss';

export default function Login({setLogin}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setLoading] = useState(false);

  const [error, setError] = useState(false)

  function validateForm() {
    return email.length > 0 && password.length > 0;
  }

  //handle submission
  function handleSubmit(event) {
    event.preventDefault();
    setLoading(true);

   axios.post('http://localhost:1337/auth/local', {
      identifier: email,
      password: password,
    }).then(response => {
      localStorage.setItem('token', `Bearer ${response.data.jwt}`);
      setLogin(true)
      setLoading(false); 
    }).catch(err => {
      if(err){
        setLoading(false);
        setError(true);
      }
    });
  }

  return (

    <>

      {error ? 
        <Alert variant="warning">
        Check your usename password and try again
      </Alert>  :
      <></>
      }

      <div className="login">
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" size="lg" controlId="username">
            <Form.Label>Username</Form.Label>
            <Form.Control
              autoFocus
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" size="lg" controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Button block size="lg" type="submit" disabled={!validateForm() || isLoading}>
            {isLoading ? 'Starting...' : 'Start'}
            </Button>
          </Form.Group>
        </Form>
      </div>

    </>
  );
}