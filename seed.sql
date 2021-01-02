USE companyStructure_DB;



INSERT INTO department (name)
VALUES ("Sales");

INSERT INTO department (name)
VALUES ("Accounting");

INSERT INTO department (name)
VALUES ("Development");

INSERT INTO department (name)
VALUES ("Human Resources");



INSERT INTO role (title, salary, department_id)
VALUES ("Sales Manager", "80000", 1);

INSERT INTO role (title, salary, department_id)
VALUES ("Account Executive", "70000", 1);

INSERT INTO role (title, salary, department_id)
VALUES ("Business Development", "60000", 1);

INSERT INTO role (title, salary, department_id)
VALUES ("Accountant", "65000", 2);

INSERT INTO role (title, salary, department_id)
VALUES ("Accounting Manager", "100000", 2);

INSERT INTO role (title, salary, department_id)
VALUES ("Lead Developer", "90000", 3);

INSERT INTO role (title, salary, department_id)
VALUES ("Developer", "70000", 3);

INSERT INTO role (title, salary, department_id)
VALUES ("HR Manager", "85000", 4);

INSERT INTO role (title, salary, department_id)
VALUES ("HR Coordinator", "60000", 4);

-- Manager Data

INSERT INTO manager (manager_first, manager_last)
VALUES ("Michael", "Scott");

INSERT INTO manager (manager_first, manager_last)
VALUES ("Oscar", "Martinez");

INSERT INTO manager (manager_first, manager_last)
VALUES ("Nick", "Guy");

INSERT INTO manager (manager_first, manager_last)
VALUES ("Toby", "Flenderson");



-- Employee Data

INSERT INTO employee (first_name, last_name, role_id)
VALUES ("Michael", "Scott", 1);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Andy", "Bernard", 2, 1);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Dwight", "Shrute", 2, 1);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Jim", "Halpert", 2, 1);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Stanley", "Hudson", 3, 1);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Angela", "Martin", 4, 2);

INSERT INTO employee (first_name, last_name, role_id)
VALUES ("Oscar", "Martinez", 5);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Kevin", "Malone", 4, 2);

INSERT INTO employee (first_name, last_name, role_id)
VALUES ("Nick", "Guy", 6);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Sadiq", "Sabre", 7, 3);

INSERT INTO employee (first_name, last_name, role_id)
VALUES ("Toby", "Flenderson", 8);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Holly", "Flax", 9, 4);