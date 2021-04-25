import React, { useState } from "react";
import { Container, Row, Form, Button, Alert } from "react-bootstrap";
import { login } from "../../api";

function Login({ onLoginSuccessful }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [hasError, setHasError] = useState(false);

  const onEmailChange = (event) => setEmail(event.target.value);
  const onPasswordChange = (event) => setPassword(event.target.value);

  const onSubmit = async (event) => {
    event.preventDefault();
    setHasError(false);
    const loginResult = await login({ email, password });
    if (!loginResult) setHasError(true);
    else {
      const { name, token } = loginResult;
      // Save user IDs on local storage
      localStorage.setItem("name", name);
      localStorage.setItem("token", token);
      onLoginSuccessful();
    }
  };

  return (
    <Container>
      <Row className="mt-5">
        <h1>Login</h1>
      </Row>
      <Row>
        <Form className="w-100">
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              onChange={onEmailChange}
              value={email}
            />
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              onChange={onPasswordChange}
              value={password}
            />
          </Form.Group>
          {hasError && (
            <Alert variant={"danger"}>
              The email address and password you entered don't match any
              account. Please try again.
            </Alert>
          )}
          <Button variant="primary" type="submit" onClick={onSubmit}>
            Submit
          </Button>
        </Form>
      </Row>
    </Container>
  );
}

export default Login;
