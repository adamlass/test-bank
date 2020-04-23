import IAccount from "../interface/IAccount"
import IBank from "../interface/IBank"
import ICustomer from "../interface/ICustomer"
import Customer from "./Customer"

export default class Bank implements IBank {
    private _accounts: Map<String, IAccount>
    private _customers: Map<String, ICustomer>

    constructor(
        private _cvr: String,
        private _name: String,
    ) {
        this._accounts = new Map<String, IAccount>()
        this._customers = new Map<String, ICustomer>()
    }

    get cvr(): String {
        return this._cvr
    }

    get name(): String {
        return this._name
    }

    getAccounts(customer: Customer): IAccount[] {
        return customer.accounts
    }

    getAccount(number: String): IAccount | null {
        const acc: IAccount | undefined = this._accounts.get(number)
        return acc ? acc : null
    }
    registerAccount(account: IAccount): void {
        this._accounts.set(account.number, account)
    }
    getCustomer(number: String): ICustomer | null{
        const cust: ICustomer | undefined = this._customers.get(number)
        return cust ? cust : null
    }
    registerCustomer(customer: ICustomer): void {
        this._customers.set(customer.cpr, customer)
    }
}