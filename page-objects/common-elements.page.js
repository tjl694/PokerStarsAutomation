const { By } = require("selenium-webdriver");
const { Driver } = require("selenium-webdriver/chrome");



module.exports = {

    url: 'https://www.pokerstarssports.uk',

    elements: {
        sportsAToZMenuBtn: By.css('#sportsList #showExtendedMenu'),
        sportsAToZMenu: By.id('extendedMenu'),
        aToZMenuSportItem: By.css('.extendedMenu__item')
    } 

    
};
