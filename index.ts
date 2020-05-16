import cors from "cors"
import express from 'express'
import bodyParser from 'body-parser'
import IAccount from "./interface/IAccount"
import IBank from './interface/IBank';
import Customer from './implementations/Customer';
import ICustomer from './interface/ICustomer';
import Account from './implementations/Account';
import Bank from './implementations/Bank';
import IContract from './interface/IContract';
import Contract from './implementations/Contract';

const app = express()

app.use(cors())

app.use(bodyParser.json());

const bank: IBank = new Bank("0694201337", "The Picky Bank")
const accs1: IAccount[] = []
const accs2: IAccount[] = []
const cust1: ICustomer = new Customer("0113973313", "Adam Lass", bank, accs1)
const cust2: ICustomer = new Customer("0123973313", "Per Nielsen", bank, accs2)
bank.registerCustomer(cust1)
bank.registerCustomer(cust2)

const acc1: IAccount = new Account(bank, cust1, "02429583")
const acc2: IAccount = new Account(bank, cust1, "02429524")
bank.registerAccount(acc1)
bank.registerAccount(acc2)
accs1.push(acc1)
accs1.push(acc2)

const acc3: IAccount = new Account(bank, cust2, "02529583")
const acc4: IAccount = new Account(bank, cust2, "02429523")
bank.registerAccount(acc3)
bank.registerAccount(acc4)
accs2.push(acc3)
accs2.push(acc4)

acc1.transfer(24, acc4)
acc1.transfer(14, acc3)
acc1.transfer(525, acc3)
acc1.transfer(152, acc4)
acc2.transfer(13, acc3)
acc2.transfer(13.3, acc3)
acc2.transfer(2.3, acc3)
acc2.transfer(13.3, acc4)
acc3.transfer(2, acc1)
acc3.transfer(21.5, acc2)
acc3.transfer(5, acc1)
acc4.transfer(24, acc1)
acc4.transfer(22.5, acc2)
acc4.transfer(5.4, acc1)

const contract: IContract = new Contract(bank)

function handleError(e: any, res: any) {
    const status: number = e.status || 500
    const message: String = e.message || "Something went wrong!"

    let responseError = {
        status,
        message,
        stack: e.stack
    }

    res.status(status)
    res.send(responseError)
}

const transfer = (req: any, res: any) => {
    try {
        let { sourceNumber, targetNumber, amount } = req.body
        amount = parseFloat(amount)

        const status = contract.transfer(sourceNumber, targetNumber, amount)

        res.send(status)


    } catch (e) {
        handleError(e, res)
    }
}

const account = (req: any, res: any) => {
    try {
        const { cpr } = req.params
        const result = contract.getAccountsOnCPR(cpr)
        res.send(result)
    } catch (e) {
        handleError(e, res)
    }
}



app.post('/transfer', transfer)
app.get('/account/:cpr', account)

app.listen(3000, () => console.log("App is online"))
