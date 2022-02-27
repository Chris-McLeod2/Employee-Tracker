INSERT INTO department (name)
VALUES 
("Sales"),
("Engineering"),
("Legal");


INSERT INTO role (title, salary, department_id)
VALUES
("Sales Manager", 10000, 1),
("Sales Worker", 8000, 1),
("Engineering Manager", 10000, 2),
("Engineer", 8000, 2),
("Legal Manager", 10000, 3),
("Legal Worker", 8000, 3);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
    ('Jake', 'Paul', 1, Null),
    ('Kanye', 'West', 2, 1), 
    ('Bob', 'Builder', 3, Null),
    ('Tyron', 'Woodley', 4, 3),
    ('Tom', 'Cruise', 5, Null),
    ('Da', 'Baby', 6, 5);
  