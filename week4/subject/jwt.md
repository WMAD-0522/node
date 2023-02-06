`JSON Web Tokens` (JWTs) are a compact and self-contained way of transmitting information between parties as a JSON object. They are often used for authentication and authorization purposes, allowing the user to carry a token that proves their identity and access rights.

A JWT consists of three parts: a header, a payload, and a signature. The header and payload are Base64 encoded JSON objects that contain information such as the token type (JWT) and the claims (e.g., user ID, expiration time, etc.). The signature is used to verify that the sender of the JWT is who it says it is and to ensure that the message wasn't changed along the way.

The recipient of the JWT can then use the information contained in the payload to grant or deny access to protected resources.

It's important to keep the secret key used for signing JWTs secure, as anyone with access to the secret key can generate a JWT that appears to be from your application. Additionally, make sure to validate the claims in the JWT, such as the expiration time and audience, to ensure that the token can't be used after it's no longer valid or for a different purpose.

```js
const jwt = require('jsonwebtoken');
const express = require('express');
const app = express();

const secret = 'your-secret-key';
const users = [
  { id: 1, username: 'john.doe', password: 'password1' },
  { id: 2, username: 'jane.doe', password: 'password2' },
];

app.post('/login', (req, res) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username);
  if (!user) {
    return res.status(401).json({ error: 'Incorrect username or password' });
  }
  if (user.password !== password) {
    return res.status(401).json({ error: 'Incorrect username or password' });
  }
  const token = jwt.sign({ userId: user.id }, secret, { expiresIn: '1h' });
  res.json({ token });
});

app.get('/protected', (req, res) => {
  const token = req.headers['x-access-token'];
  if (!token) {
    return res.status(401).json({ error: 'No token provided' });
  }
  jwt.verify(token, secret, (error, decoded) => {
    if (error) {
      return res.status(401).json({ error: 'Invalid token' });
    }
    res.json({ message: 'Protected resource' });
  });
});

app.listen(3000, () => console.log('Listening on port 3000'));
```

In this example, a /login endpoint is defined for logging in and a /protected endpoint is defined for accessing protected resources. The /login endpoint accepts a username and password in the request body, checks if the user exists in the users array and if the password matches, and returns a signed JWT in the response. The /protected endpoint requires a token in the x-access-token header and verifies the token before returning a protected resource.

This is just one example of how you can use JWTs for authentication. In a real-world application, you would likely store the user information in a database and perform more robust checks and error handling.