@Shapes
Feature: Example tests for shapes script

  @Run
  Scenario: This tests our area calculation for a square
    Given I have a script called "shapes.js"
    When I call the "areaSquare" method with value 10
    Then The result should be 100

  @Run
  Scenario: This tests our area calculation for a square
    Given I have a script called "shapes.js"
    When I call the "areaRectangle" method with values 10 and 20
    Then The result should be 200

  @Run
  Scenario: This tests our area calculation for a square
    Given I have a script called "shapes.js"
    When I call the "pythagoras" method with values 3 and 4
    Then The result should be 5
