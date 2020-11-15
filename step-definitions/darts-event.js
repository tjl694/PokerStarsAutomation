const config = require("../config.json");
const { assert, expect } = require("chai");
const dartsEventPage = require("../page-objects/darts-event.page");

module.exports = function () {

    this.Given(/^I select the "([^"]*)" event$/, async function (eventName) {
        return selectSpecificEvent(eventName);
    });
    
    this.Given(/^my bet slip is empty$/, async function () {
        const slipCount = await driver.findElement(dartsEventPage.elements.betSlipCount);
        const noBets = await driver.findElements(dartsEventPage.elements.betSlipNoBets);
        expect(noBets.length).to.be.gt(0);
        expect(await slipCount.getText()).to.equal("(0)");
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
        } else {
            assert.fail(wayToRemove +' not defined in test');
        }
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

    this.Then(/^I can see data on page shows data from API request$/, async function () {
        expect(await checkApiEvent()).to.be.true;
    });

    const checkApiEvent = async function () {
        const urlArr = (await driver.getCurrentUrl()).split('/');
        const sportIndex = -3;
        const eventIdIndex = -1;
        const sport = urlArr[urlArr.length + sportIndex].toUpperCase();
        const eventId = Number(urlArr[urlArr.length + eventIdIndex]);
        const eventName = await (await driver.findElement(dartsEventPage.elements.activeOutright)).getText();
        const apiUrl = config.baseSportsApiUrl + "getRegionalOutrights?sport=" + sport;

        const response = await dartsEventPage.eventGetApiRequest(apiUrl);

        for (const object of response) {
            for (const event of object.event) {
                if (event.id === eventId && event.name === eventName){
                    return true;
                }
            }
        }
        return ('Current event not found');
    };

    const selectSpecificOutcome = async function (outcomeToSelect) {
        if ((await driver.findElements(dartsEventPage.elements.viewMoreOutcomes)).length > 0){
            await (await driver.findElement(dartsEventPage.elements.viewMoreOutcomes)).click();
        }
        await (await helpers.getElementsContainingText('.eventSelection--title', outcomeToSelect))[0].click(); 
        return driver.wait(until.elementLocated(dartsEventPage.elements.selectedOutcomeName));
    };

    const waitForEventsToShow = async function () {
        await driver.wait(until.elementLocated(dartsEventPage.elements.outrightsTab));
        if ((await driver.findElements(dartsEventPage.elements.outrightsTabActive)).length === 0) {
            await driver.findElement(dartsEventPage.elements.outrightsTab).click();
        }
        return driver.wait(until.elementLocated(dartsEventPage.elements.events));
    };

    const selectSpecificEvent = async function (eventName) {
        await waitForEventsToShow();
        const elements = await helpers.getElementsContainingText('a.outrights__link', eventName);
        return elements[0].click(); 
    };

    const selectFirstEvent = async function() {
        await waitForEventsToShow();
        return (await driver.findElements(dartsEventPage.elements.events))[0].click();
    };
};
