CREATE DATABASE cdia_map;

USE cdia_map;

CREATE TABLE program (
	id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
	name VARCHAR(50) NOT NULL
) ENGINE=InnoDB;

CREATE TABLE status (
	id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
	name VARCHAR(50) NOT NULL
) ENGINE=InnoDB;

CREATE TABLE student (
	id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    
	first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    portfolio_link VARCHAR(255) NULL,
    
    company_name VARCHAR(50) NULL,
	company_link VARCHAR(255) NULL,
	
    city VARCHAR(255) NOT NULL,
    state VARCHAR(255) NOT NULL,
    country VARCHAR(255) NOT NULL,
	latitude VARCHAR(50) NOT NULL,
	longitude VARCHAR(50) NOT NULL,
    
	created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    
    program_id INT NOT NULL,
    status_id INT NOT NULL,
    
    FOREIGN KEY (program_id) REFERENCES program(id),
	FOREIGN KEY (status_id) REFERENCES status(id)
) ENGINE=InnoDB;

INSERT INTO program 
	(name) 
VALUES 
    ('Audio Production'),
	('Graphic Design'),
	('Web Development');
    
INSERT INTO status 
	(name) 
VALUES 
    ('student'),
	('alumni'),
	('instructor');
    
INSERT INTO student 
	(first_name, last_name, city, state, country, latitude, longitude, program_id, status_id) 
VALUES 
	('Daniel', 'Johnson', 'Westminster', 'MA', 'United States', '42.544768', '-71.910961', 1, 3);
