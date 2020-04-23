import IAccount from "./IAccount";
import Movement from "../class/Movement";

export default interface ICustomer {
    transfer(amount: number, account: IAccount, target: ICustomer): void
    cpr: String
    name: String
    accounts: IAccount[]
    getAccountMovements(number: String): Movement[] | null
    
}

