/* ---- data structure for a basic blog (foreign keys) ---- */

CREATE DATABASE blog;

USE blog;

CREATE TABLE user (
	id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
	username VARCHAR(255) NOT NULL,
	password VARCHAR(40) NOT NULL,
	age VARCHAR(3) NULL,
	email VARCHAR(100) NULL
) ENGINE=InnoDB;

CREATE TABLE category (
	id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
	title VARCHAR(255) NOT NULL
) ENGINE=InnoDB;

CREATE TABLE post (
	id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
	user_id INT NOT NULL,
	category_id INT NULL,
	title VARCHAR(255) NOT NULL,
	body TEXT NULL,
	last_updated TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
	FOREIGN KEY (user_id) REFERENCES user(id) ON DELETE CASCADE,
	FOREIGN KEY (category_id) REFERENCES category(id) ON DELETE CASCADE
) ENGINE=InnoDB;
 
CREATE TABLE comment (
	id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
	user_id INT NOT NULL,
	post_id INT NOT NULL,
	title VARCHAR(255) NOT NULL,
	body TEXT NULL,
	last_updated TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
	FOREIGN KEY (user_id) REFERENCES user(id) ON DELETE CASCADE,
	FOREIGN KEY (post_id) REFERENCES post(id) ON DELETE CASCADE
) ENGINE=InnoDB;

/* ---- Insert data ---- */

INSERT INTO user 
	(username, password, age, email) 
VALUES 
	('User 1', 'password1', '18', 'user1@domain.com'),
	('User 2', 'password2', '56', 'user2@domain.com'),
	('User 3', 'password3', '27', 'user3@domain.com'),
	('User 4', 'password4', '22', 'user4@domain.com');
	
INSERT INTO category 
	(title) 
VALUES 
	('Category 1'),
	('Category 2'),
	('Category 3'),
	('Category 4');	

INSERT INTO post 
	(user_id, category_id, title, body) 
VALUES 
	(1, 1, 'Post 1', '1 Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'),
	(1, 1, 'Post 2', '2 Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'),
	(2, 1, 'Post 3', '3 Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor web development incididunt ut labore et dolore magna aliqua.'),
	(3, 2, 'Post 4', '4 Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor web incididunt ut labore et dolore magna aliqua.'),
	(2, null, 'Post 5', '5 Lorem ipsum dolor sit amet, consectetur motorcycle adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.');
	
INSERT INTO comment 
	(user_id, post_id, title, body) 
VALUES 
	(2, 3, 'Comment 1', 'Comment 1 Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'),
	(3, 5, 'Comment 2', 'Comment 2 Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'),
	(3, 1, 'Comment 3', 'Comment 3 Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'),
	(3, 3, 'Comment 4', 'Comment 4 Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'),
	(1, 5, 'Comment 5', 'Comment 5 Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.');
