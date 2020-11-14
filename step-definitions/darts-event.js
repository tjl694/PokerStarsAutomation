const { assert, expect } = require("chai");
const { When } = require("cucumber");
const { WebElement } = require("selenium-webdriver");
const dartsEventPage = require("../page-objects/darts-event.page");

module.exports = function () {

    this.Given(/^I select the "([^"]*)" event$/, async function (eventName) {
        return selectSpecificEvent(eventName);
    });

    this.When(/^I select an event$/, async function () {
        return selectFirstEvent();
    });

    this.When(/^I select "([^"]*)" from the event outcomes$/, async function (outcomeToSelect) {
        await selectSpecificOutcome(outcomeToSelect);
        return driver.wait(until.elementLocated(dartsEventPage.elements.selectedOutcomeName));
    });

    this.When(/^I remove the outcome from my bet slip by selecting "([^"]*)"$/, async function (wayToRemove){
        if ( wayToRemove === "Bet Slip Bin Icon" ) {
            return (await driver.findElement(dartsEventPage.elements.betSlipRemoveIcon)).click();
        } else if ( wayToRemove === "Selecting the outcome from the page again" ) {
            return (await driver.findElement(dartsEventPage.elements.selectedOutcomeName)).click();
        } else {
            return false;
        }
    });

    this.Given(/^my bet slip is empty$/, async function () {
        const slipCount = await (await driver.findElement(dartsEventPage.elements.betSlipCount)).getText();
        expect(slipCount).to.equal("(0)");
    });

    this.Then(/^the outcome is no longer on my bet slip$/, async function () {
        const slipCount = await (await driver.findElement(dartsEventPage.elements.betSlipCount)).getText();
        expect(slipCount).to.equal("(0)");
    });

    this.Then(/^my bet on "([^"]*)" is added to my bet slip$/, async function (outcome) {
        let expectedResult = {};
        expectedResult['outcomeName'] = outcome;
        expectedResult['eventName'] = await (await driver.findElement(dartsEventPage.elements.activeOutright)).getText();
        expectedResult['outcomeOdds'] = await (await driver.findElement(dartsEventPage.elements.selectedOutcomeOdds)).getText();

        let actualResult = {};
        actualResult['outcomeName'] = await (await driver.findElement(dartsEventPage.elements.betSlipOutcomeName)).getText();
        actualResult['eventName'] = await (await driver.findElement(dartsEventPage.elements.betSlipOutcomeEvent)).getText();
        actualResult['outcomeOdds'] = await (await driver.findElement(dartsEventPage.elements.betSlipOutcomeOdds)).getText();
        
        expect(actualResult).to.eql(expectedResult);
    });

        const selectSpecificOutcome = async function (outcomeToSelect) {
        return (await helpers.getElementsContainingText('.eventSelection--title', outcomeToSelect))[0].click(); 
    };

    const waitForEventsToShow = async function () {
        await driver.wait(until.elementLocated(dartsEventPage.elements.outrightsTab));
        if ((await driver.findElements(dartsEventPage.elements.outrightsTabActive)).length === 0) {
            await driver.findElement(dartsEventPage.elements.outrightsTab).click();
            await driver.wait(until.elementLocated(dartsEventPage.elements.events));
        }
        return;
    }

    const selectSpecificEvent = async function (eventName) {
        await waitForEventsToShow();
        const elements = await helpers.getElementsContainingText('a.outrights__link', eventName);
        return elements[0].click(); 
    };

    const selectFirstEvent = async function() {
        await waitForEventsToShow();
        return (await driver.findElements(dartsEventPage.elements.events))[0].click();
    }

    
};
