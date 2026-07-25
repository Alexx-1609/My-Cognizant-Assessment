package com.cognizant;

import org.junit.jupiter.api.AfterEach;
import static org.junit.jupiter.api.Assertions.assertEquals;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

public class CalculatorAAATest {

    private Calculator calculator;

    @BeforeEach
    void setUp() {
        System.out.println("Setting up...");
        calculator = new Calculator();
    }

    @AfterEach
    void tearDown() {
        System.out.println("Cleaning up...");
    }

    @Test
    void testAdditionAAA() {

        // Arrange
        int a = 20;
        int b = 30;

        // Act
        int result = calculator.add(a, b);

        // Assert
        assertEquals(50, result);
    }

    @Test
    void testSubtractionAAA() {

        // Arrange
        int a = 30;
        int b = 10;

        // Act
        int result = calculator.subtract(a, b);

        // Assert
        assertEquals(20, result);
    }

    @Test
    void testMultiplicationAAA() {

        // Arrange
        int a = 5;
        int b = 6;

        // Act
        int result = calculator.multiply(a, b);

        // Assert
        assertEquals(30, result);
    }

    @Test
    void testDivisionAAA() {

        // Arrange
        int a = 20;
        int b = 5;

        // Act
        int result = calculator.divide(a, b);

        // Assert
        assertEquals(4, result);
    }
}