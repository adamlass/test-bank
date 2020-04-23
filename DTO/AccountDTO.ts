import Movement from "../class/Movement";
import MovementDTO from "./MovementDTO";

export default interface AccountDTO {
    balance: number
    number: String
    movements: MovementDTO[]
}