DROP DATABASE IF EXISTS choresDB;

CREATE DATABASE choresDB;

ENGINE=InnoDB;

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

CREATE TABLE penalties  (
   id INTEGER PRIMARY KEY AUTO_INCREMENT,
    penalty_name VARCHAR(30) NOT NULL,
    penalty_description VARCHAR(60) NOT NULL,
    penalty_value INT NOT NULL,
    users_id INT NOT NULL,
    CONSTRAINT FK_rewards FOREIGN KEY(users_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE point_history  (
   id INTEGER PRIMARY KEY AUTO_INCREMENT,
   change_category VARCHAR(30) NOT NULL,
    change_details VARCHAR(30) NOT NULL,
    reward_delivered BOOLEAN NOT NULL,
    date_changed DATE NOT NULL,
    kids_id INT NOT NULL,
    CONSTRAINT FK_point_history FOREIGN KEY(kids_id) REFERENCES kids(id) ON DELETE CASCADE
);


CREATE TABLE tasks (
    id INTEGER PRIMARY KEY AUTO_INCREMENT,
    task_name VARCHAR(30) NOT NULL,
    task_points INTEGER NOT NULL,
    kids_id INT NOT NULL,
    CONSTRAINT FK_tasks FOREIGN KEY(kids_id) REFERENCES kids(id) ON DELETE CASCADE
);



