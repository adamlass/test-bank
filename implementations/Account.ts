import IBank from "../interface/IBank"
import ICustomer from "../interface/ICustomer"
import IAccount from "../interface/IAccount"
import Movement from "../class/Movement"

export default class Account implements IAccount {
    private _balance: number
    private _movements: Movement[]


    constructor(private _bank: IBank,
        private _customer: ICustomer,
        private _number: String,
        balance?: number
    ) {
        this._movements = []
        if (balance) {
            this._balance = balance
        } else {
            this._balance = 0
        }
    }

    get bank(): IBank {
        return this._bank
    }

    get customer(): ICustomer {
        return this._customer
    }

    get number(): String {
        return this._number
    }

    get balance(): number {
        return this._balance
    }

    get movements(): Movement[] {
        return this._movements
    }

    addMovement(source: IAccount, target: IAccount, amount: number): void {
        this._movements.push(new Movement(source, target, amount, new Date()))
    }

    updateBalance(amount: number): void {
        this._balance += amount
    }

    transfer(amount: number, target: IAccount): void {
        this.updateBalance(-amount)
        target.updateBalance(amount)
        this.addMovement(this, target, -amount)
        target.addMovement(target, this, amount)
    }

    transferWithNumber(amount: number, targetNumber: String): void {
        let target: IAccount | null = this._bank.getAccount(targetNumber)
        if (target) {
            this.transfer(amount, target)
        }
    }

}