CREATE DATABASE cdia_jobs;

USE cdia_jobs;

CREATE TABLE category (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL
) ENGINE=InnoDB;

CREATE TABLE type (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL
) ENGINE=InnoDB;

CREATE TABLE location (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL
) ENGINE=InnoDB;

CREATE TABLE keyword (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL
) ENGINE=InnoDB;

CREATE TABLE job_keyword (
    job_id INT NOT NULL,
    keyword_id INT NOT NULL,
    PRIMARY KEY (job_id, keyword_id)
) ENGINE=InnoDB;

CREATE TABLE job (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    company VARCHAR(255) NOT NULL,
    company_logo VARCHAR(255) NULL,
    description TEXT NULL,
    category_id INT NOT NULL,
    type_id INT NOT NULL,
    location_id INT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (category_id) REFERENCES category(id) ON DELETE CASCADE,
    FOREIGN KEY (type_id) REFERENCES type(id) ON DELETE CASCADE,
    FOREIGN KEY (location_id) REFERENCES location(id) ON DELETE CASCADE
) ENGINE=InnoDB;

INSERT INTO category 
    (name) 
VALUES 
    ('Design'),
    ('Development');
    
INSERT INTO type 
    (name) 
VALUES 
    ('Full-time'),
    ('Contract'),
    ('Freelance'),
    ('Internship');
    
INSERT INTO location 
    (name) 
VALUES 
    ('Massachusetts'),
    ('Vermont'),
    ('New Hampshire');

INSERT INTO keyword 
    (name) 
VALUES 
    ('CSS'),
    ('HTML'),
    ('Photoshop'),
    ('PHP'),
    ('Mobile'),
    ('Responsive Design');
    
INSERT INTO job_keyword 
    (job_id, keyword_id) 
VALUES 
    (1, 3),
    (1, 6),
    (2, 1),
    (3, 1),
    (3, 2),
    (3, 4);

INSERT INTO job 
    (title, company, description, category_id, type_id, location_id) 
VALUES 
    ('Job 1', 'Company 1', 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', 1, 3, 1),
    ('Job 2', 'Company 2', 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', 2, 2, 2),
    ('Job 3', 'Company 3', 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', 2, 1, 3);
