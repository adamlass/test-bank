import ICustomer from "./ICustomer";
import IAccount from "./IAccount";

export default interface IBank {
    name: String
    getAccounts(customer: ICustomer): IAccount[]
    getAccount(number: String): IAccount | null
    registerAccount(account: IAccount): void
    getCustomer(number: String): ICustomer | null
    registerCustomer(customer: ICustomer): void
}