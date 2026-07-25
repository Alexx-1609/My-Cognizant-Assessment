-- Exercise 3 : Stored Procedures

USE U;

-- Scenario 1

DELIMITER $$

CREATE PROCEDURE ProcessMonthlyInterest()
BEGIN
    UPDATE Accounts
    SET Balance = Balance * 1.01
    WHERE AccountType = 'Savings';

    SELECT 'Monthly Interest Applied Successfully' AS Message;
END $$

DELIMITER ;

CALL ProcessMonthlyInterest();

SELECT * FROM Accounts;


-- Scenario 2

DELIMITER $$

CREATE PROCEDURE UpdateEmployeeBonus
(
    IN p_Department VARCHAR(50),
    IN p_Bonus DECIMAL(5,2)
)
BEGIN

    UPDATE Employees
    SET Salary = Salary + (Salary * p_Bonus / 100)
    WHERE Department = p_Department;

    SELECT 'Employee Bonus Updated Successfully' AS Message;

END $$

DELIMITER ;

CALL UpdateEmployeeBonus('IT',10);

SELECT * FROM Employees;


-- Scenario 3

DELIMITER $$

CREATE PROCEDURE TransferFunds
(
    IN p_FromAccount INT,
    IN p_ToAccount INT,
    IN p_Amount DECIMAL(10,2)
)
BEGIN

    DECLARE v_Balance DECIMAL(10,2);

    SELECT Balance
    INTO v_Balance
    FROM Accounts
    WHERE AccountID = p_FromAccount;

    IF v_Balance >= p_Amount THEN

        UPDATE Accounts
        SET Balance = Balance - p_Amount
        WHERE AccountID = p_FromAccount;

        UPDATE Accounts
        SET Balance = Balance + p_Amount
        WHERE AccountID = p_ToAccount;

        SELECT 'Fund Transfer Successful' AS Message;

    ELSE

        SELECT 'Insufficient Balance' AS Message;

    END IF;

END $$

DELIMITER ;

CALL TransferFunds(1,2,500);

SELECT * FROM Accounts;