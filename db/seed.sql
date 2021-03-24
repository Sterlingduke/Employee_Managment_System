USE employeeDB;


INSERT INTO employee (first_name, last_name,role_id,manager_id) values ('John', 'Doe', 1, null);
INSERT INTO employee (first_name, last_name,role_id,manager_id) values ('Mike', 'Chan', 2, 1);
INSERT INTO employee (first_name, last_name,role_id,manager_id) values ('Ashley', 'Rodriguez', 3, null);
INSERT INTO employee (first_name, last_name,role_id,manager_id) values ('Kevin', 'Tupik', 4, 3);
INSERT INTO employee (first_name, last_name,role_id,manager_id) values ('Kunal', 'Singh', 5, null);
INSERT INTO employee (first_name, last_name,role_id,manager_id) values ('Malia', 'Brown', 6, 5);
INSERT INTO employee (first_name, last_name,role_id,manager_id) values ('Sarah', 'Lourde', 7, null);
INSERT INTO employee (first_name, last_name,role_id,manager_id) values ('Tom', 'Allen', 8, 7);


INSERT INTO role (title, salary, department_id) values ('Sales Lead','100000',1);
INSERT INTO role (title, salary, department_id) values ('Salesperson','80000',1);
INSERT INTO role (title, salary, department_id) values ('Lead Engineer','150000',2);
INSERT INTO role (title, salary, department_id) values ('Software Engineer','120000',2);
INSERT INTO role (title, salary, department_id) values ('Account Manager','160000',3);
INSERT INTO role (title, salary, department_id) values ('Accountant','125000',3);
INSERT INTO role (title, salary, department_id) values ('Legal Team Lead','250000',4);
INSERT INTO role (titlçe, salary, department_id) values ('Lawyer','190000',4);

INSERT INTO department (department) values('Sales');
INSERT INTO department (department) values('Engineering');
INSERT INTO department (department) values('Finance');
INSERT INTO department (department) values('Legal');

INSERT INTO manager (id, manager) values(1, 'Joe Doe');
INSERT INTO manager (id, manager) values(3, 'Aarron Johnson');
INSERT INTO manager (id, manager) values(5, 'Bob Dole');
INSERT INTO manager (id, manager) values(7, 'Bill Johanson');
