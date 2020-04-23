import IContract from "../interface/IContract"
import IBank from "../interface/IBank"
import ICustomer from "../interface/ICustomer"
import IAccount from "../interface/IAccount"
import AccountDTO from "../DTO/AccountDTO"
import MovementDTO from "../DTO/MovementDTO"

export default class Contract implements IContract {

    constructor(private bank: IBank) { }

    getAccountsOnCPR(cpr: String): AccountDTO[] {
        const customer: ICustomer | null = this.bank.getCustomer(cpr)
        if (customer) {
            const accs = this.bank.getAccounts(customer)
            return accs.map(acc => {
                const { balance, number, movements } = acc

                const movs: MovementDTO[] = movements.map(mov => {
                    return {
                        accountNumber: mov.target.number,
                        amount: mov.amount,
                        time: mov.timestamp
                    }
                })

                return {
                    balance,
                    number,
                    movements: movs,
                }
            })

        } else {
            throw Error("Customer does not exist!")
        }
    }

    transfer(sourceNumber: String, targetNumber: String, amount: number): boolean {
        const sourceAccount: IAccount | null = this.bank.getAccount(sourceNumber)
        if (sourceAccount) {
            const targetAccount: IAccount | null = this.bank.getAccount(targetNumber)
            if (targetAccount) {
                sourceAccount.transfer(amount, targetAccount)
                return true
            } else {
                throw Error("Couldn't find target account!")
            }

        } else {
            throw Error("Couldn't find source account!")
        }
    }

}