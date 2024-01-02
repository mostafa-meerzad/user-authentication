# Hashing passwords

Hashing a password is a process used to convert a plaintext password into a fixed-size string of characters, which is typically a hash value. The idea is to create a one-way function so that it's computationally infeasible to reverse the process and obtain the original password from the hash. This is crucial for storing passwords securely because even if the hashed values are compromised, attackers should find it extremely difficult to retrieve the actual passwords.

Adding a salt to the hashing process is a crucial step to enhance security. A salt is a random value that is unique for each password. When hashing, the salt is combined with the password before the hashing algorithm is applied. This means that even if two users have the same password, their hashed values will be different due to the unique salts. Salting helps protect against rainbow table attacks, where precomputed tables of hash values for common passwords are used to quickly find a match.

Now, considering bcrypt for hashing and salting:

Bcrypt is a widely used password hashing algorithm that incorporates both hashing and salting. Here's a brief overview of how bcrypt works:

1. **Salt Generation**: A random salt is generated for each password.

2. **Combining Salt and Password**: The salt is then combined with the plaintext password.

3. **Hashing with Work Factor**: Bcrypt uses a configurable "work factor" or cost parameter that determines how computationally expensive the hash function is. This is important for slowing down brute-force attacks. The combined salt and password are then hashed using this algorithm.

4. **Storing Hash and Salt**: The resulting hash and salt are stored together in the database. The salt is usually stored along with the hash.

5. **Verification**: When a user attempts to log in, the system retrieves the stored salt and hash from the database, combines the entered password with the stored salt, and hashes it using the same work factor. The resulting hash is then compared to the stored hash. If they match, the password is considered valid.

The use of bcrypt, with its adaptive work factor and built-in salt, makes it significantly more resistant to various attacks, including brute-force and rainbow table attacks. Its main goal is to be slow enough to thwart brute-force attacks but fast enough to not cause undue burden on legitimate login attempts.
