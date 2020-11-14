const { By } = require("selenium-webdriver");

module.exports = {

    url: 'https://www.pokerstarssports.uk',

    elements: {
        outrightsTab: By.id('link__outrights'),
        outrightsTabActive: By.css('.active#link__outrights'),
        events: By.css('.outrights__link'),
        activeOutright: By.css('.active .outrights__link'),
        viewMoreOutcomes: By.css('[data-type="showMore-outright"]'),
        eventOutcomeName: By.css('.eventSelection--title'),
        selectedOutcomeName: By.css('.selected .eventSelection--title'),
        selectedOutcomeOdds: By.css('.selected .eventSelection--price'),
        betSlipCount: By.css('.singleBetsCounter'),
        betSlipOutcomeName: By.css('.bet-selections .selectionname'),
        betSlipOutcomeEvent: By.css('.bet-selections a.selection__fixture'),
        betSlipOutcomeOdds: By.css('.bet-selections .stake-area__price--odds'),
        betSlipRemoveIcon: By.css('.bet-selections .remove')
    },

    
};
