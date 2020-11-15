const { By } = require("selenium-webdriver");

module.exports = {
    elements: {
        outrightsTab: By.id('link__outrights'),
        outrightsTabActive: By.css('.active#link__outrights'),
        events: By.css('.outrights__link'),
        activeOutright: By.css('.active .outrights__link'),
        viewMoreOutcomes: By.css('[data-type="showMore-outright"]'),
        selectedOutcomeName: By.css('.selected .eventSelection--title'),
        selectedOutcomeOdds: By.css('.selected .eventSelection--price'),
        betSlipNoBets: By.css('#bets-singles p.noBets'),
        betSlipCount: By.css('.singleBetsCounter'),
        betSlipOutcomeName: By.css('.bet-selections .selectionname'),
        betSlipOutcomeEvent: By.css('.bet-selections a.selection__fixture'),
        betSlipOutcomeOdds: By.css('.bet-selections .stake-area__price--odds'),
        betSlipRemoveIcon: By.css('.bet-selections .remove')
    },

    eventGetApiRequest: async function (url) {
        return new Promise (function (resolve, reject) {
            var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
            var request = new XMLHttpRequest();
            request.open('GET', url, true);
            request.onload = function () {
                const successStatus = 200;
                if (request.status === successStatus) {
                    var response = JSON.parse(request.responseText);
                    return resolve(response);
                } else {
                    return reject ('Failed API request');
                }
            };
            request.send();
        });
    }
    
};
