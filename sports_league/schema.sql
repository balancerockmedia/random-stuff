CREATE DATABASE sports_league;

USE sports_league;

CREATE TABLE league (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL
);

CREATE TABLE team (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    league_id INT NOT NULL,
    name VARCHAR(255) NOT NULL
);

CREATE TABLE game (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    date_played TIMESTAMP NOT NULL,
    team_id1 INT NOT NULL,
    team_id2 INT NOT NULL,
    location VARCHAR(255) NOT NULL,
    team_1_score INT NULL,
    team_2_score INT NULL
);

CREATE TABLE player (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    team_id INT NOT NULL,
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NULL,
    town VARCHAR(255) NULL,
    dob DATE NOT NULL
);

/* ---- Insert data ---- */

INSERT INTO league 
    (name) 
VALUES 
    ('Soccer League'),
    ('Baseball League');
    
INSERT INTO team 
    (league_id, name) 
VALUES 
    (1, 'Red Team'),
    (1, 'Blue Team'),
    (2, 'Green Team'),
    (2, 'Orange Team'),
    (2, 'Purple Team'),
    (2, 'Yellow Team');    

INSERT INTO game 
    (date_played, team_id1, team_id2, location) 
VALUES 
    ('2009-04-12', 1, 2, 'Boston'),
    ('2010-01-19', 1, 3, 'Needham'),
    ('2010-08-01', 3, 5, 'Westminster'),
    ('2010-12-14', 3, 4, 'Waltham');

INSERT INTO player 
    (team_id, first_name, last_name, email, town, dob) 
VALUES 
    (1, 'Bob', 'Smith', 'bob@test.com', 'Waltham', '1980-10-14'),
    (4, 'Joe', 'Johnson', 'joe@test.com', 'Newton', '1970-12-14'),
    (1, 'Sally', 'Sue', 'sally@test.com', 'Boston', '1966-07-14'),
    (2, 'George', 'Jettson', 'george@test.com', 'Princeton', '2001-03-14'),
    (3, 'Mike', 'Conners', 'mike@test.com', 'Fitchburg', '2000-02-04'),
    (3, 'Will', 'Smith', 'will@test.com', 'Acton', '1999-03-16');
    
    
/* SELECT questions

/* 1. How many teams are in each league */

SELECT league.name, COUNT(team.id) AS num_teams
FROM
    league
        LEFT OUTER JOIN team
            ON team.league_id = league.id
GROUP BY league.name;

/* 2. List the players on the Red Team */

SELECT player.first_name, player.last_name, team.name
FROM
    team
        INNER JOIN player
            ON player.team_id = team.id
WHERE team.name = 'Red Team';

/* 3. Create a game */

INSERT INTO game 
    (date_played, team_1_score, team_2_score, location)
VALUES
    ('2010-08-12', 1, 2, 'Boston');
    
/* 4. What is the average age of players in each league */

SELECT AVG(YEAR(NOW()) - YEAR(player.dob)) AS age FROM player;

/* 5. Show all players that are between 6 and 10 years old */

SELECT CONCAT(player.first_name, ' ', player.last_name) AS player_name, (YEAR(NOW()) - YEAR(player.dob)) AS age FROM player WHERE (YEAR(NOW()) - YEAR(player.dob)) BETWEEN 6 AND 10;

/* 6. Show all the teams that the Blue Team has played against and include the date for each */

/* showing ids */
SELECT team_id1, team_id2, date_played
FROM game
WHERE (team_id1 = 2 OR team_id2 = 2);

/* showing names */
SELECT t1.name, t2.name, date_played
FROM 
    game
        INNER JOIN team AS t1
            ON t1.id = game.team_id1
        INNER JOIN team AS t2
            ON t2.id = game.team_id2
WHERE (team_id1 = 2 OR team_id2 = 2);

/* 7. Show all of the player names in the Soccer League */

SELECT league.name, CONCAT(player.first_name, ' ', player.last_name) AS player_name
FROM
    league
        INNER JOIN team
            ON team.league_id = league.id
        INNER JOIN player
            ON player.team_id = team.id
WHERE league.name = 'Soccer League'

/* 8. Write a query to determine in which league more games were played in */

SELECT league.name, ROUND(COUNT(game.id) / 2) as num_games
FROM
    league
        LEFT OUTER JOIN team
            ON team.league_id = league.id
        LEFT OUTER JOIN game
            ON game.team_id1 = team.id OR game.team_id2 = team.id
GROUP BY league.id
            
/* 9. Show all the games that the Red and Blue teams played against each other (display the two player names, two team names, date, and location for each game) */

SELECT 
    CONCAT(p1.first_name, ' (', t1.name, ')') AS team_one,
    CONCAT(p2.first_name, ' (', t2.name, ')') AS team_two,
    DATE(game.date_played) AS date_played,
    game.location
FROM
    game
        INNER JOIN team AS t1
            ON t1.id = game.team_id1
        INNER JOIN team AS t2
            ON t2.id = game.team_id2
        INNER JOIN player AS p1
            ON p1.team_id = t1.id
        INNER JOIN player AS p2
            ON p2.team_id = t2.id
WHERE 
    (p1.first_name = 'Bob' OR p2.first_name = 'Bob') OR (p1.first_name = 'George' OR p2.first_name = 'George')
GROUP BY game.id
