const { By } = require("selenium-webdriver");

module.exports = {
    
    elements: {
        sportsAToZMenuBtn: By.css('#sportsList #showExtendedMenu'),
        sportsAToZMenu: By.id('extendedMenu'),
        aToZMenuSportItem: By.css('.extendedMenu__item'),
        headerSportsActive: By.css('#site-header a.sports-vertical.active'),
        pageContent: By.css('#content'),
    } 

};
