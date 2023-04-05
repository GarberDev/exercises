-- write your queries here

-- one
SELECT * FROM owners o 
FULL OUTER JOIN vehicles v 
ON o.id=v.owner_id;

-- two
SELECT first_name, last_name, COUNT(owner_id) 
FROM owners o 
JOIN vehicles v 
on o.id=v.owner_id 
GROUP BY (first_name, last_name) 
ORDER BY first_name;


-- three
SELECT first_name, last_name, ROUND(AVG(price)) 
as average_price, COUNT(owner_id) 
FROM owners o 
JOIN vehicles v 
on o.id=v.owner_id 
GROUP BY (first_name, last_name) 
HAVING COUNT(owner_id) > 1 
AND ROUND(AVG(price)) > 10000 

--SQLZOO

--1
SELECT matchid, player
FROM goal
WHERE teamid = 'GER';

--2
SELECT id, stadium, team1, team2
FROM game
WHERE id = 1012;

--3
SELECT goal.player, goal.teamid, game.stadium, game.mdate
FROM game
JOIN goal
ON game.id = goal.matchid
WHERE goal.teamid = 'GER';


--4
SELECT game.team1, game.team2, goal.player
FROM game
JOIN goal
ON game.id = goal.matchid
WHERE goal.player LIKE 'Mario%';

--5
SELECT goal.player, goal.teamid, eteam.coach, goal.gtime
FROM goal
JOIN eteam
ON goal.teamid = eteam.id
WHERE goal.gtime <= 10;

--6
SELECT game.mdate, eteam.teamname
FROM game
JOIN eteam
ON game.team1 = eteam.id
WHERE eteam.coach = 'Fernando Santos';

--7
SELECT goal.player
FROM game
JOIN goal
ON game.id = goal.matchid
WHERE game.stadium = 'National Stadium, Warsaw';

--8
SELECT DISTINCT goal.player
FROM game
JOIN goal
ON game.id = goal.matchid
WHERE (game.team1 = 'GER' OR game.team2 = 'GER') AND goal.teamid != 'GER';

--9
SELECT eteam.teamname, COUNT(*) AS goals_scored
FROM eteam
JOIN goal
ON eteam.id = goal.teamid
GROUP BY eteam.teamname;

--10
SELECT game.stadium, COUNT(*) AS goals_scored
FROM game
JOIN goal
ON game.id = goal.matchid
GROUP BY game.stadium;

--11
SELECT game.id AS matchid, game.mdate AS date, COUNT(*) AS goals_scored
FROM game
JOIN goal
ON game.id = goal.matchid
WHERE game.team1 = 'POL' OR game.team2 = 'POL'
GROUP BY game.id, game.mdate;

--12
SELECT game.id AS matchid, game.mdate, COUNT(*) AS goals_scored
FROM game
JOIN goal
ON game.id = goal.matchid
WHERE goal.teamid = 'GER'
GROUP BY game.id, game.mdate;

--13
SELECT game.mdate, game.team1,
       SUM(CASE WHEN goal.teamid = game.team1 THEN 1 ELSE 0 END) AS score1,
       game.team2,
       SUM(CASE WHEN goal.teamid = game.team2 THEN 1 ELSE 0 END) AS score2
FROM game
LEFT JOIN goal ON game.id = goal.matchid
GROUP BY game.id, game.mdate, game.team1, game.team2
ORDER BY game.mdate, game.id, game.team1, game.team2;
