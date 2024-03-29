const config = require("../config.json");
const seleniumConfig = require("../selenium-cucumber-js.json");
const { expect, assert } = require("chai");
const commonElementsPage = require("../page-objects/common-elements.page");

module.exports = function () {

    this.Given(/^I am on the PokerStars Sports home page$/, async function () {
        await helpers.loadPage(config.baseSportsUrl);
        await waitForPageToFinishLoading();
        expect(await driver.getTitle()).to.contain("PokerStars Sports");
    });

    this.Given(/^I open the A-Z Sports menu$/, async function () {
        return openSportsAToZMenu();
    });

    this.Given(/^I select "([^"]*)"$/, async function (sport) {
        return selectAToZSport(sport);
    });

    this.Given(/^the "([^"]*)" page is loaded$/, async function (sport) {
        expect(await driver.wait(until.urlContains(sport.toLowerCase()))).to.be.true;
    });

    const waitForPageToFinishLoading = async function() {
        const placeholderEls = await driver.findElements(commonElementsPage.elements.placeholderEl);
        if (placeholderEls.length > 0){
            await driver.wait(until.stalenessOf(placeholderEls[0]));
        }
        return driver.wait(until.elementLocated(commonElementsPage.elements.pageContent),seleniumConfig.timeout);
    };

    const openSportsAToZMenu = async function() {
        await driver.wait(until.elementLocated(commonElementsPage.elements.sportsAToZMenuBtn));
        await driver.wait(until.elementIsEnabled(await driver.findElement(commonElementsPage.elements.sportsAToZMenuBtn)));
        if (await driver.findElements(commonElementsPage.elements.sportsAToZMenu).length > 1){ //Checking to see if Sport A-to-Z Menu is already open
            return;
        } else {
            await driver.findElement(commonElementsPage.elements.sportsAToZMenuBtn).click();
            return driver.wait(until.elementLocated(commonElementsPage.elements.sportsAToZMenu));
        }
    };

    const selectAToZSport = async function (sport) {
        const sportsEls = await driver.findElements(commonElementsPage.elements.aToZMenuSportItem);
        for (const sportEl of sportsEls){
            if (await sportEl.getText() === sport){
                await sportEl.click();
                return driver.wait(until.elementIsNotVisible(sportEl));
            }
        }
        return assert.fail(`${sport} not found in list`);
    };
};

