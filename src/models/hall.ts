import { PlanDate } from "./plandate";
import { Task } from "./task";

export interface Hall {
    _id?: string,
    userId: string,
    title: string,
    startTimeStamp: string,
    endTimeStamp: string,
    description: string,
    progress: number,
    dates: PlanDate[],
    tasks: Task[],
}