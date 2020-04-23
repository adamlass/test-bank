import IAccount from "../interface/IAccount"


export default class Movement {

    private _source: IAccount
    private _target: IAccount
    private _amount: number
    private _timestamp: Date

    constructor(source: IAccount, target: IAccount, amount: number, timestamp: Date) {
        this._source = source
        this._target = target
        this._amount = amount
        this._timestamp = timestamp
    }

    get source(): IAccount {
        return this._source
    }

    get target(): IAccount {
        return this._target
    }

    get amount(): number {
        return this._amount
    }

    get timestamp(): Date{
        return this._timestamp
    }


}