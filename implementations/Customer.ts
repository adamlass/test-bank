import IBank from "../interface/IBank"
import IAccount from "../interface/IAccount"
import ICustomer from "../interface/ICustomer"
import Movement from "../class/Movement"


export default class Customer implements ICustomer {
    constructor(private _cpr: String,
        private _name: String,
        private _bank: IBank,
        private _accounts: IAccount[]
    ) { }

    get cpr(): String {
        return this._cpr
    }

    get name(): String {
        return this._name
    }

    get bank(): IBank {
        return this._bank
    }

    get accounts(): IAccount[] {
        return this._accounts
    }

    transfer(amount: number, account: IAccount, target: ICustomer): void {
        account.transfer(amount, target.accounts[0])
    }

    getAccountMovements(number: String): Movement[] | null {
        this._accounts.forEach((a) => {
            if (a.number === number) {
                return a.movements
            }
        })
        return null
    }
}