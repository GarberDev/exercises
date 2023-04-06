DROP DATABASE IF EXISTS soccer_league;

CREATE DATABASE soccer_league;

\c soccer_league


CREATE TABLE teams (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL UNIQUE
);

CREATE TABLE players (
  id SERIAL PRIMARY KEY,
  first_name VARCHAR(50) NOT NULL,
  last_name VARCHAR(50) NOT NULL,
  team_id INT NOT NULL,
  FOREIGN KEY (team_id) REFERENCES teams(id)
);

CREATE TABLE referees (
  id SERIAL PRIMARY KEY,
  first_name VARCHAR(50) NOT NULL,
  last_name VARCHAR(50) NOT NULL
);

CREATE TABLE matches (
  id SERIAL PRIMARY KEY,
  home_team_id INT NOT NULL,
  away_team_id INT NOT NULL,
  season_id INT NOT NULL,
  FOREIGN KEY (home_team_id) REFERENCES teams(id),
  FOREIGN KEY (away_team_id) REFERENCES teams(id),
  FOREIGN KEY (season_id) REFERENCES seasons(id)
);

CREATE TABLE goals (
  id SERIAL PRIMARY KEY,
  player_id INT NOT NULL,
  match_id INT NOT NULL,
  goal_timestamp TIMESTAMP NOT NULL,
  FOREIGN KEY (player_id) REFERENCES players(id),
  FOREIGN KEY (match_id) REFERENCES matches(id)
);

CREATE TABLE seasons (
  id SERIAL PRIMARY KEY,
  start_date DATE NOT NULL,
  end_date DATE NOT NULL
);

CREATE TABLE match_referee (
  match_id INT NOT NULL,
  referee_id INT NOT NULL,
  PRIMARY KEY (match_id, referee_id),
  FOREIGN KEY (match_id) REFERENCES matches(id),
  FOREIGN KEY (referee_id) REFERENCES referees(id)
);


-- Insert teams
INSERT INTO teams (name) VALUES ('Team A');
INSERT INTO teams (name) VALUES ('Team B');

-- Insert players
INSERT INTO players (first_name, last_name, team_id) VALUES ('John', 'Doe', 1);
INSERT INTO players (first_name, last_name, team_id) VALUES ('Jane', 'Smith', 2);

-- Insert referees
INSERT INTO referees (first_name, last_name) VALUES ('Mike', 'Johnson');
INSERT INTO referees (first_name, last_name) VALUES ('Sarah', 'Williams');

-- Insert seasons
INSERT INTO seasons (start_date, end_date) VALUES ('2022-01-01', '2022-12-31');

-- Insert matches
INSERT INTO matches (home_team_id, away_team_id, season_id) VALUES (1, 2, 1);

-- Insert goals
INSERT INTO goals (player_id, match_id, goal_timestamp) VALUES (1, 1, '2022-01-01 15:30:00');

-- Insert match_referee relationship
INSERT INTO match_referee (match_id, referee_id) VALUES (1, 1);
INSERT INTO match_referee (match_id, referee_id) VALUES (1, 2);


