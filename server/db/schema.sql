DROP DATABASE IF EXISTS choresDB;

CREATE DATABASE choresDB;

USE choresDB;

CREATE TABLE users (
    id INTEGER PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(30),
    email VARCHAR(30),
    password VARCHAR(75),
    role VARCHAR(30)
);

CREATE TABLE kids  (
   id INTEGER PRIMARY KEY AUTO_INCREMENT,
    child_name VARCHAR(30) NOT NULL,
    avatar VARCHAR(75) NOT NULL,
    current_points INT NOT NULL,
    users_id INT NOT NULL,
    CONSTRAINT FK_kids FOREIGN KEY(users_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE tasks (
    id INTEGER PRIMARY KEY AUTO_INCREMENT,
    task_name VARCHAR(30) NOT NULL,
    task_points INTEGER NOT NULL,
    kids_id INT NOT NULL,
    CONSTRAINT FK_tasks FOREIGN KEY(kids_id) REFERENCES kids(id) ON DELETE CASCADE
);



