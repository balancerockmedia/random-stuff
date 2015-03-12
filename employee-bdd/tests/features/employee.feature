Feature: employee
  Scenario: create an employee and change their title
    Given an employee with the name of "Dan" and a title of "associate"
    Then their name should be "Dan"
    And their title should be "associate"
    When I can change their title to "senior associate"
    Then their new title should be "senior associate"