DROP DATABASE IF EXISTS craigslist_db;

CREATE DATABASE craigslist_db;

\c craigslist_db


CREATE TABLE regions (
  id SERIAL PRIMARY KEY,
  name VARCHAR(50) NOT NULL UNIQUE
);

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(50) NOT NULL UNIQUE,
  preferred_region_id INT,
  FOREIGN KEY (preferred_region_id) REFERENCES regions(id)
);

CREATE TABLE posts (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  text TEXT NOT NULL,
  user_id INT NOT NULL,
  location VARCHAR(255) NOT NULL,
  region_id INT NOT NULL,
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (region_id) REFERENCES regions(id)
);

CREATE TABLE categories (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL UNIQUE
);

CREATE TABLE post_category (
  post_id INT NOT NULL,
  category_id INT NOT NULL,
  PRIMARY KEY (post_id, category_id),
  FOREIGN KEY (post_id) REFERENCES posts(id),
  FOREIGN KEY (category_id) REFERENCES categories(id)
);

-- Insert regions
INSERT INTO regions (name) VALUES ('San Francisco');
INSERT INTO regions (name) VALUES ('Atlanta');
INSERT INTO regions (name) VALUES ('Seattle');

-- Insert users
INSERT INTO users (username, preferred_region_id) VALUES ('john_doe', 1);
INSERT INTO users (username, preferred_region_id) VALUES ('jane_smith', 2);

-- Insert categories
INSERT INTO categories (name) VALUES ('For Sale');
INSERT INTO categories (name) VALUES ('Housing');
INSERT INTO categories (name) VALUES ('Jobs');

-- Insert posts
INSERT INTO posts (title, text, user_id, location, region_id) VALUES ('Selling my bike', 'Great condition...', 1, 'San Francisco', 1);
INSERT INTO posts (title, text, user_id, location, region_id) VALUES ('Looking for a roommate', '2 bedroom apartment...', 2, 'Atlanta', 2);

-- Insert post_category relationship
INSERT INTO post_category (post_id, category_id) VALUES (1, 1);
INSERT INTO post_category (post_id, category_id) VALUES (2, 2);
