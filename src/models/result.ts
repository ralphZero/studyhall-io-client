import { Hall } from "./hall";

export interface HallResult {
    success: boolean,
    result: Hall[],
    message?: string
}