const assert = require("assert")
const { Builder, By, Key, until } = require('selenium-webdriver')

const CPR = '0113973313'
const ACC1 = "02429583"
const ACC2 = "02429524"

describe("Helllo", () => {
    it("test1", async () => {
        (async function example() {

            let driver = await new Builder().forBrowser('firefox').build();
            try {
                const transId = "trans-" + ACC1
                await driver.get('http://localhost:3001');
                await driver.findElement(By.name('cpr')).sendKeys(CPR, Key.RETURN);
                await driver.wait(until.visibilityOf(transId));
                await driver.findElement(By.id(transId)).submit()

            } finally {
                // await driver.quit();
            }
        })();

        assert.ok("ok")
    })
})