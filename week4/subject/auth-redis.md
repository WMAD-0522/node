### Install Redis

`macOS`:

Install Homebrew by running the following command in your terminal:

```bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install.sh)"
```

Use Homebrew to install Redis by running the following command:

```bash
brew install redis
```

Start Redis by running the following command:

```bash
redis-server
```
`Windows`:

- Download the latest Redis Windows release from the official Redis website.
- Extract the downloaded ZIP file to a location of your choice.
- Open a Command Prompt window and navigate to the location where you extracted the ZIP file.
- Run the following command to start Redis:

```bash
redis-server.exe
```

### What is Redis?

Redis (Remote Dictionary Server) is an open-source, in-memory data structure store that can be used as a database, cache, and message broker. It supports a wide range of data structures such as strings, hashes, lists, sets, sorted sets, bit arrays, and hyperloglogs.

Redis is known for its high performance, flexibility, and scalability. It can handle millions of operations per second and is often used for real-time web applications, gaming, leaderboards, real-time analytics, and more. It can be used as a standalone database or as part of a larger data architecture.

Redis also provides persistence options to save the in-memory data to disk, allowing data to survive system restarts or crashes. It supports master-slave replication, enabling data to be easily shared across multiple servers. Redis is written in C and supports a wide range of programming languages, making it easy to integrate with existing applications.

### What is redis-cli commands, and how to use it?

`PING`: Check if the server is alive and responsive.
`SET` key value: Set the value of a key.
`GET` key: Retrieve the value of a key.
`DEL` key: Delete a key.
`EXISTS` key: Determine if a key exists.
`KEYS` pattern: Find all keys matching a pattern.
`EXPIRE` key seconds: Set a time to live for a key.
`FLUSHALL`: Delete all keys in the current database.
`TTL` key: Retrieve the remaining time to live of a key.
`INCR` key: Increment the value of a key.
`DECR` key: Decrement the value of a key.
`LPUSH` key value: Add a value to the beginning of a list.
`LRANGE` key start stop: Retrieve a range of elements from a list.
`SADD` key value: Add a member to a set.
`SMEMBERS` key: Retrieve all members of a set.

### Authentication and Authorization with Redis

- Express server is set up as the backend of the project.
- MongoDB is used to store user data.
- JWT is used for authentication and authorization. When a user logs in, a JWT token is generated and sent to the client.
- The client then sends the JWT token with each subsequent request to access protected routes.
- On the server-side, Redis is used to cache the JWT tokens for a faster response time and to reduce the load on MongoDB.
- When a user logs out or the JWT token expires, the token is removed from Redis cache.