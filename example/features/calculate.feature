Feature: Example of running a cucumber test

  @Run
  Scenario: This tests our addition method
    Given I have a script called "calculate.js"
    When I call the "sum" method with values 5 and 4
    Then The result should be 9

  @Run
  Scenario: This tests our subtraction method
    Given I have a script called "calculate.js"
    When I call the "diff" method with values 5 and 4
    Then The result should be 1

  @Run
  Scenario: This tests our multiply method
    Given I have a script called "calculate.js"
    When I call the "times" method with values 5 and 4
    Then The result should be 20

  @Ignore
  Scenario: This tests our multiply method
    Given I have a script called "calculate.js"
    When I call the "times" method with values 5 and 5
    Then The result should be 25
