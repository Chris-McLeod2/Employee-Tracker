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
    ('Tyron', 'Woodley', 4, 2),
    ('Bob', 'Builder', 3, Null),
    ('Da', 'Baby', 6, 5),
    ('Jake', 'Paul', 1, Null),
    ('Tom', 'Cruise', 5, Null),
    ('Johnathan', 'Wiley', 6, 5),
    ('Kanye', 'West', 2, 4); 