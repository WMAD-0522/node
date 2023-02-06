`bcrypt` is a password hashing function designed to be computationally expensive and slow, making it difficult for attackers to crack passwords by brute force. It uses a salt value, which is a random data added to the password before hashing, to make it harder for attackers to use precomputed rainbow tables for the hash values.

bcrypt is considered to be a secure way to store passwords because it is designed to be computationally infeasible to crack the hashes by brute force. When a user creates an account or changes their password, you would hash the password using bcrypt and store the hash in the database. To check if a password is correct, you would hash the entered password and compare it to the stored hash.

Here is an example of how you can use bcrypt in JavaScript:

```js
const bcrypt = require('bcrypt');

const password = 'password_to_hash';
bcrypt.genSalt(10, (error, salt) => {
  bcrypt.hash(password, salt, (error, hash) => {
    console.log('Hashed Password:', hash);
  });
});

const hashedPassword = 'hashed_password_from_database';
const enteredPassword = 'password_to_check';
bcrypt.compare(enteredPassword, hashedPassword, (error, result) => {
  if (result) {
    console.log('Password is correct');
  } else {
    console.log('Password is incorrect');
  }
});
```