##### Login w/ Redis

- Store user information, such as username and password hash, in a MongoDB database using Mongoose.

- When a user signs up or logs in, use bcrypt to hash their password and compare it to the hash stored in the database.

- If the user provides valid credentials, generate a JWT and send it back to the client. The client can then include the JWT in subsequent requests to access protected resources.

- On the server, use a library such as jsonwebtoken to verify the JWT and extract the user's information. This information can then be used to determine what actions the user is authorized to perform.

- To improve performance, you can use Redis to cache JWTs and avoid having to verify the JWT on every request.

Here's an example of how you could use Redis in this setup:

- After a user provides valid credentials and a JWT is generated, store the JWT in Redis, along with a key that is associated with the user's identity.

- On subsequent requests from the user, first check if the JWT is stored in Redis. If it is, return the user's information that is stored in the JWT, without having to verify the JWT again.

- If the JWT is not stored in Redis, use a library such as jsonwebtoken to verify the JWT and extract the user's information. Then, store the JWT in Redis for future use.

- To ensure that cached JWTs are not used indefinitely, set a time-to-live (TTL) on each cached JWT in Redis. When the TTL expires, the JWT will be automatically removed from the cache, and the next request from the user will require re-verification of the JWT.

By using Redis to cache JWTs, you can reduce the number of times you need to verify the JWT, which can improve the performance of your authentication system. However, it's important to keep in mind that this approach will not work for all use cases and you need to assess if it is appropriate for your specific requirements.

```js
const express = require('express');
const jwt = require('jsonwebtoken');
const redis = require('redis');
const client = redis.createClient();

const app = express();

const secret = 'secret_key';
const ttl = 60; // Time-to-live in seconds

// Middleware to check if the JWT is stored in Redis
const checkTokenInCache = (req, res, next) => {
  const token = req.headers['x-access-token'];

  client.get(token, (err, reply) => {
    if (reply) {
      req.user = JSON.parse(reply);
      return next();
    }

    next();
  });
};

// Route to handle login
app.post('/login', (req, res) => {
  // Get user credentials from the request body
  const { username, password } = req.body;

  // Validate the user's credentials
  if (username === 'user' && password === 'password') {
    // Generate a JWT
    const token = jwt.sign({ username }, secret, { expiresIn: '1h' });

    // Store the JWT in Redis
    client.set(token, JSON.stringify({ username }), 'EX', ttl, (err, reply) => {
      if (err) {
        return res.status(500).send({ error: 'Error storing JWT in cache' });
      }

      // Send the JWT to the client
      res.json({ token });
    });
  } else {
    res.status(401).send({ error: 'Invalid credentials' });
  }
});

// Route to handle accessing protected resources
app.get('/protected', checkTokenInCache, (req, res) => {
  // If the JWT is stored in Redis, it has been verified already
  if (req.user) {
    res.json({ message: `Hello, ${req.user.username}` });
  } else {
    // If the JWT is not stored in Redis, verify it and store it if it's valid
    const token = req.headers['x-access-token'];

    jwt.verify(token, secret, (err, decoded) => {
      if (err) {
        return res.status(401).send({ error: 'Invalid token' });
      }

      // Store the JWT in Redis
      client.set(token, JSON.stringify(decoded), 'EX', ttl, (err, reply) => {
        if (err) {
          return res.status(500).send({ error: 'Error storing JWT in cache' });
        }

        req.user = decoded;
        res.json({ message: `Hello, ${req.user.username}` });
      });
    });
  }
});

const port = 3000;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
```
