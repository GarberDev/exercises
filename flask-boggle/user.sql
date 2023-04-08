DROP DATABASE IF EXISTS boggle;

CREATE DATABASE boggle;

\c boggle  

CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    image_url VARCHAR(200)
);                
