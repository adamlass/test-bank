import AccountDTO from "../DTO/AccountDTO";

export default interface IContract {
    getAccountsOnCPR(cpr: String): AccountDTO[] | null
    transfer(sourceNumber: String, targetNumber: String, amount: number): boolean
}