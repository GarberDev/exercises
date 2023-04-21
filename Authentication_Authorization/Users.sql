-- Create users table
CREATE TABLE users (
    username VARCHAR(20) PRIMARY KEY,
    password TEXT NOT NULL,
    email VARCHAR(50) UNIQUE NOT NULL,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL
);



-- create feedback table
CREATE TABLE feedback (
    id SERIAL PRIMARY KEY,
    title VARCHAR(100) NOT NULL,
    content TEXT NOT NULL,
    username VARCHAR(20) NOT NULL,
    FOREIGN KEY (username) REFERENCES users (username)
);
