const { By } = require("selenium-webdriver");

module.exports = {
    
    elements: {
        sportsAToZMenuBtn: By.css('#sportsList #showExtendedMenu'),
        sportsAToZMenu: By.id('extendedMenu'),
        aToZMenuSportItem: By.css('.extendedMenu__item'),
        pageContent: By.css('#content'),
    } 

};
