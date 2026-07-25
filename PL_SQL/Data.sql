create database U;
use U;

CREATE TABLE Customers (
    CustomerID INT PRIMARY KEY,
    Name VARCHAR(100),
    DOB DATE,
    Balance DECIMAL(12,2),
    LastModified DATETIME
);

CREATE TABLE Accounts (
    AccountID INT PRIMARY KEY,
    CustomerID INT,
    AccountType VARCHAR(20),
    Balance DECIMAL(12,2),
    LastModified DATETIME,
    FOREIGN KEY (CustomerID) REFERENCES Customers(CustomerID)
);

CREATE TABLE Transactions (
    TransactionID INT PRIMARY KEY,
    AccountID INT,
    TransactionDate DATETIME,
    Amount DECIMAL(12,2),
    TransactionType VARCHAR(10),
    FOREIGN KEY (AccountID) REFERENCES Accounts(AccountID)
);

CREATE TABLE Loans (
    LoanID INT PRIMARY KEY,
    CustomerID INT,
    LoanAmount DECIMAL(12,2),
    InterestRate DECIMAL(5,2),
    StartDate DATE,
    EndDate DATE,
    FOREIGN KEY (CustomerID) REFERENCES Customers(CustomerID)
);

CREATE TABLE Employees (
    EmployeeID INT PRIMARY KEY,
    Name VARCHAR(100),
    Position VARCHAR(50),
    Salary DECIMAL(12,2),
    Department VARCHAR(50),
    HireDate DATE
);


INSERT INTO Customers VALUES
(1,'John Doe','1985-05-15',1000,NOW()),
(2,'Jane Smith','1990-07-20',1500,NOW());

INSERT INTO Accounts VALUES
(1,1,'Savings',1000,NOW()),
(2,2,'Checking',1500,NOW());

INSERT INTO Transactions VALUES
(1,1,NOW(),200,'Deposit'),
(2,2,NOW(),300,'Withdrawal');

INSERT INTO Loans VALUES
(1,1,5000,5,CURDATE(),DATE_ADD(CURDATE(),INTERVAL 60 MONTH));

INSERT INTO Employees VALUES
(1,'Alice Johnson','Manager',70000,'HR','2015-06-15'),
(2,'Bob Brown','Developer',60000,'IT','2017-03-20');

SELECT * FROM Customers;
SELECT * FROM Accounts;
SELECT * FROM Transactions;
SELECT * FROM Loans;
SELECT * FROM Employees;