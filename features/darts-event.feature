@PokerStarsTechTest

Feature: Testing the PokerStars site for the technical test
  
  Background: Navigate to Darts
    Given I am on the PokerStars Sports home page
      And I open the A-Z Sports menu
      And I select "Darts"
      And the "Darts" page is loaded
        

  # @Scenario1
  # Scenario: Navigate to a Darts event
  #   When I select an event
  # #   Then I can see a GET request was made

  @Scenario2
  Scenario Outline: Adding an outcome to the bet slip for Darts
    Given I select the <Event> event
    When I select <Winner> from the event outcomes
    Then my bet on <Winner> is added to my bet slip

    Examples:
      | Event                       | Winner       |
      | "PDC World Championship 2021 - Winner" | "Glen Durrant" |

  @Scenario2
  Scenario Outline: Test the bet slip for Darts
    Given I select the <Event> event
      And my bet slip is empty
      And I select <Winner> from the event outcomes
      And my bet on <Winner> is added to my bet slip
    When I remove the outcome from my bet slip by selecting <WayToRemove>
    Then the outcome is no longer on my bet slip

    Examples:
      | Event                         | Winner         | WayToRemove         |
      | "PDC World Championship 2021 - Winner" | "Glen Durrant" | "Bet Slip Bin Icon" |
      | "PDC World Championship 2021 - Winner" | "Glen Durrant" | "Selecting the outcome from the page again"            |