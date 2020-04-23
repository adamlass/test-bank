import IBank from "./IBank";
import ICustomer from "./ICustomer";
import Movement from "../class/Movement";

export default interface IAccount {
    bank: IBank
    customer: ICustomer
    number: String
    balance: number
    addMovement(source: IAccount, target:IAccount, amount: number): void
    updateBalance(amount: number): void
    movements: Movement[]
    transfer(amount: number, target: IAccount): void
    transferWithNumber(amount: number, targetNumber: String): void
}