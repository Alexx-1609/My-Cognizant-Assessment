-- Exercise 1 : Control Structures

USE U;

-- Scenario 1

DELIMITER $$

CREATE PROCEDURE ApplySeniorCitizenDiscount()
BEGIN
    UPDATE Loans l
    JOIN Customers c
        ON l.CustomerID = c.CustomerID
    SET l.InterestRate = l.InterestRate - 1
    WHERE TIMESTAMPDIFF(YEAR, c.DOB, CURDATE()) > 60;

    SELECT 'Interest rate updated successfully.' AS Message;
END $$

DELIMITER ;

CALL ApplySeniorCitizenDiscount();

-- Scenario 2

ALTER TABLE Customers
ADD COLUMN IsVIP BOOLEAN DEFAULT FALSE;

DELIMITER $$

CREATE PROCEDURE PromoteVIPCustomers()
BEGIN
    UPDATE Customers
    SET IsVIP = TRUE
    WHERE Balance > 10000;

    SELECT 'VIP customers updated successfully.' AS Message;
END $$

DELIMITER ;

CALL PromoteVIPCustomers();

-- Scenario 3

SELECT
    c.Name,
    l.LoanID,
    l.EndDate
FROM Customers c
JOIN Loans l
ON c.CustomerID = l.CustomerID
WHERE l.EndDate BETWEEN CURDATE()
AND DATE_ADD(CURDATE(), INTERVAL 30 DAY);

SELECT * FROM Customers;
SELECT * FROM Loans;