DROP DATABASE IF EXISTS choresDB;

CREATE DATABASE choresDB;

USE choresDB;

CREATE TABLE users (
    id INTEGER PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(30),
    email VARCHAR(30),
    password VARCHAR(75),
    reset_code VARCHAR(75),
    reset_hint VARCHAR(30)
);

CREATE TABLE kids  (
   id INTEGER PRIMARY KEY AUTO_INCREMENT,
    child_name VARCHAR(30) NOT NULL,
    avatar VARCHAR(75) NOT NULL,
    current_points INT NOT NULL,
    users_id INT NOT NULL,
    CONSTRAINT FK_kids FOREIGN KEY(users_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE rewards  (
   id INTEGER PRIMARY KEY AUTO_INCREMENT,
    rewards_name VARCHAR(30) NOT NULL,
    rewards_description VARCHAR(60) NOT NULL,
    redemption_value INT NOT NULL,
    users_id INT NOT NULL,
    CONSTRAINT FK_rewards FOREIGN KEY(users_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE redemptions  (
   id INTEGER PRIMARY KEY AUTO_INCREMENT,
    rewards_redeemed VARCHAR(30) NOT NULL,
    date_redeemed DATE NOT NULL,
    kids_id INT NOT NULL,
);


CREATE TABLE tasks (
    id INTEGER PRIMARY KEY AUTO_INCREMENT,
    task_name VARCHAR(30) NOT NULL,
    task_points INTEGER NOT NULL,
    kids_id INT NOT NULL,
    CONSTRAINT FK_tasks FOREIGN KEY(kids_id) REFERENCES kids(id) ON DELETE CASCADE
);



