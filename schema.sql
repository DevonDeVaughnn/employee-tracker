DROP DATABASE IF EXISTS employee_DB;

CREATE DATABASE employee_DB;

USE employee_DB;

CREATE TABLE department (
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR (30) NOT NULL,
    PRIMARY KEY (id)

);

CREATE TABLE role (
    id INT NOT NULL AUTO_INCREMENT,
    title VARCHAR (30) NOT NULL,
    salary DECIMAL (10,4) NOT NULL,
    department_id INT NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (department_id) REFERENCES  department (id)
);

CREATE TABLE employee (
    id NOT NULL AUTO_INCREMENT,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INT NOT NULL,
    manager_id INT NOT NULL,
    PRIMARY KEY(id),
    FOREIGN KEY (role_id) REFERENCES role (id),
    FOREIGN KEY (manager_id) REFERENCES employee (id)
);

INSERT INTO department (name) VALUES("legal"),
INSERT INTO department (name) VALUES("managment"),
    
INSERT INTO role (title, salary, department_id) VALUES ("manager", 87.234,1), 
INSERT INTO role (title, salary, department_id) VALUES ("employee", 69.348,2),

INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("Will", "Williams",1,NULL),
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("Steve","Stevens",2,1),
