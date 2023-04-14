DROP DATABASE IF EXISTS adopt_db;

CREATE DATABASE adopt_db;

\c adopt_db

CREATE TABLE IF NOT EXISTS Pet (
    id SERIAL PRIMARY KEY,
    name VARCHAR(30) NOT NULL,
    species VARCHAR(30) NOT NULL,
    photo_url VARCHAR(200),
    age INTEGER,
    notes VARCHAR(200),
    available BOOLEAN DEFAULT TRUE
);
