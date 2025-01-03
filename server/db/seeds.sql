INSERT INTO users (name, email, password, role, reset_code, reset_hint)
VALUES
('Walter', 'walter.skinner@hotmail.com', '1234password', 'Parent', 123456, "Count to 6"),
('Maria', 'Maria@hotmail.com', 'syndicate123', 'Babysitter', 123456, "Count to 6"),
;

INSERT INTO  kids (child_name, current_points, users_id)
 VALUES ('Fox',10000, 0, 2),
 ('Dana',2000, 0, 1),
 ('Jimmy',2000, 0, 2)
;

INSERT INTO  rewards (rewards_name,rewards_description, redemption_value, users_id)
 VALUES ('Amazon GC','$10 Amazon Gift Card',10000, 0, 2),
 ('Comic','Comic up to $5 value', 2000, 0, 1),
 ('Rainbow Unicorn','Toy up to $5 value',2000, 0, 2)
;

INSERT INTO  rewards (reward_redeemed date_redeemed, kids_id, delivered)
 VALUES (1,'Amazon GC',1, 10-18-2024,true),
 (2, 'Comic', 2, 10-18-2024,false),
 (3, 'Rainbow Unicorn',3, 10-18-2024,false)
;

INSERT INTO tasks (task_name, task_points,) 
VALUES ('Take out Trash',10, 1),
('Walk Dog',50, 2),
('Clean Bedroom',5, 3),
('Do the dishes',10, 3),
('Take out the Diaper Trash',125, 1),
('Take out Recycling',10, 2),
('Clean the Attic',30, 1)




  