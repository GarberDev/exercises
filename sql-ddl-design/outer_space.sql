-- from the terminal run:
-- psql < outer_space.sql

DROP DATABASE IF EXISTS outer_space;

CREATE DATABASE outer_space;

\c outer_space


-- Create the star_galaxy table
CREATE TABLE star_galaxy
(
  id SERIAL PRIMARY KEY,
  star_name TEXT NOT NULL,
  galaxy_name TEXT NOT NULL
);

-- Create the planets table
CREATE TABLE planets
(
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  orbital_period_in_years FLOAT NOT NULL,
  star_id INT NOT NULL,
  FOREIGN KEY (star_id) REFERENCES star_galaxy(id)
);

-- Create the planet_moons table
CREATE TABLE planet_moons
(
  id SERIAL PRIMARY KEY,
  planet_id INT NOT NULL,
  moon_name TEXT NOT NULL,
  FOREIGN KEY (planet_id) REFERENCES planets(id)
);

-- Insert data into the star_galaxy table
INSERT INTO star_galaxy (star_name, galaxy_name)
VALUES
  ('The Sun', 'Milky Way'),
  ('Proxima Centauri', 'Milky Way'),
  ('Gliese 876', 'Milky Way');

-- Insert data into the planets table
INSERT INTO planets
  (name, orbital_period_in_years, star_id)
VALUES
  ('Earth', 1.00, 1),
  ('Mars', 1.88, 1),
  ('Venus', 0.62, 1),
  ('Neptune', 164.8, 1),
  ('Proxima Centauri b', 0.03, 2),
  ('Gliese 876 b', 0.23, 3);

-- Insert data into the planet_moons table
INSERT INTO planet_moons (planet_id, moon_name)
VALUES
  (1, 'The Moon'),
  (2, 'Phobos'),
  (2, 'Deimos'),
  (4, 'Naiad'),
  (4, 'Thalassa'),
  (4, 'Despina'),
  (4, 'Galatea'),
  (4, 'Larissa'),
  (4, 'S/2004 N 1'),
  (4, 'Proteus'),
  (4, 'Triton'),
  (4, 'Nereid'),
  (4, 'Halimede'),
  (4, 'Sao'),
  (4, 'Laomedeia'),
  (4, 'Psamathe'),
  (4, 'Neso');