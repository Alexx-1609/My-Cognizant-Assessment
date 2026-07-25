CREATE DATABASE studentdb;
use studentdb;

CREATE TABLE students(
    id INT PRIMARY KEY,
    name VARCHAR(50),
    marks DOUBLE
);

INSERT INTO students VALUES
(1,'Rahul',90),
(2,'Priya',85),
(3,'Aman',78);

