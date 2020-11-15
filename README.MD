# PokerStars Technical Test

This is my repo for PokerStars' Technical Test. See instructions on [their Git](https://github.com/thestarsgroup/front-end-tech-test).

This is a Selenium WebDriver framework in JavaScript, based on [my fork](https://github.com/tjl694/selenium-cucumber-js) of [selenium-cucumber-js](https://github.com/john-doherty/selenium-cucumber-js).

### Installation

This requires [Node.js](https://nodejs.org/) to run.
1. Clone the repo
2. ```cd``` into the folder you just cloned into
3. run ```npm install```

### Running the framework
```sh
npm run test
```
### Reporting
Once ```npm run test``` has finished, a HTML report will be available in the ```reports``` folder.

### Understanding the framework
There are 3 main folders
- features - home of the gherkin/cucmber steps
- step-definitions - home of the gherkin step definitions and functions
- page-objects - home of the defined elements for pages and any other functions



### Todo
- Implement automatic retry if Scenario fails (to a limited number of retries)

License
----
MIT