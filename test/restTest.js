const assert = require("assert")
const { Builder, By, Key, until } = require('selenium-webdriver')

const CPR = '0113973313'
const ACC1 = "02429583"
const ACC2 = "02429524"
const transAmount = 500

describe("Tests", function () {
    describe("Successful tests", function () {
        it("Should fetch the accounts of CPR: " + CPR, async function () {
            let driver = await new Builder().forBrowser('firefox').build();
            try {
                await driver.get('http://localhost:3001');

                await driver.findElement(By.name('cpr')).sendKeys(CPR, Key.RETURN);

                await driver.sleep(500)

                let accNum1 = await driver.findElement(By.id(ACC1)).getText()
                let accNum2 = await driver.findElement(By.id(ACC2)).getText()

                assert.equal(accNum1, ACC1)
                assert.equal(accNum2, ACC2)
            } finally {
                await driver.quit();
            }
        })

        it("Should transfer " + transAmount + " from ACC1 to ACC2", async function () {

            let driver = await new Builder().forBrowser('firefox').build();
            try {
                const transId = "trans-" + ACC1
                const balId1 = "bal-" + ACC1
                const balId2 = "bal-" + ACC2

                await driver.get('http://localhost:3001');

                await driver.findElement(By.name('cpr')).sendKeys(CPR, Key.RETURN);

                await driver.sleep(500)

                let preBalance1 = await convertBalance(balId1, driver)
                let preBalance2 = await convertBalance(balId2, driver)

                // await driver.wait(until.elementIsVisible(By.id(transId)))
                let transferButton = await driver.findElement(By.id(transId))
                await transferButton.click()

                await driver.findElement(By.name("number")).sendKeys(ACC2)

                let amountField = await driver.findElement(By.name("amount"))
                await amountField.clear()
                await amountField.sendKeys(transAmount, Key.RETURN)

                await driver.sleep(500)

                let postBalance1 = await convertBalance(balId1, driver)
                let postBalance2 = await convertBalance(balId2, driver)

                assert.equal(postBalance1, preBalance1 - transAmount)
                assert.equal(postBalance2, preBalance2 + transAmount)
            } finally {
                await driver.quit();
            }
        })
    })

    describe("Negative tests", function () {
        it("Should fail trying to fetch an unknown CPR-number", async function () {
            let driver = await new Builder().forBrowser('firefox').build();
            try {
                await driver.get('http://localhost:3001');

                const failInput = "FAIL INPUT"
                await driver.findElement(By.name('cpr')).sendKeys(failInput, Key.RETURN);
                let errorMessage = await driver.findElement(By.id("errorFetch")).getText()

                assert.equal(errorMessage, "Could not find any accounts on CPR: " + failInput)

            } finally {
                await driver.quit();
            }
        })

        it("Should fail trying to transfer to an unknown account", async function () {
            let driver = await new Builder().forBrowser('firefox').build();
            try {
                const transId = "trans-" + ACC1

                await driver.get('http://localhost:3001');

                await driver.findElement(By.name('cpr')).sendKeys(CPR, Key.RETURN);

                await driver.sleep(500)

                let transferButton = await driver.findElement(By.id(transId))
                await transferButton.click()

                await driver.findElement(By.name("number")).sendKeys("FailedXD")

                let amountField = await driver.findElement(By.name("amount"))
                await amountField.clear()
                await amountField.sendKeys(transAmount, Key.RETURN)

                await driver.sleep(500)

                let failMessage = await driver.findElement(By.css("h5")).getText()

                assert.equal(failMessage, "Transfer Failed - Message: Couldn't find target account!")

            } finally {
                await driver.quit();
            }
        })
    })
})

async function convertBalance(balId, driver) {
    let balance = await driver.findElement(By.id(balId)).getText()
    balance = balance.split(" ")[0].replace(".", "").replace(",", ".")
    return parseFloat(balance)
}