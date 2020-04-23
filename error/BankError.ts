export default class BankError extends Error {
    constructor(message: string="Unknown Error", public status: number = 500){
        super(message)
        this.name = "BankError"
        Object.setPrototypeOf(this, BankError.prototype);
    }
}