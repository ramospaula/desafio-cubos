import Intervals from "./intervals";

export default interface AttendanceRules {
    id:string,
    ruleType: string,
    day: Date,
    weekDay: number,
    intervals: Intervals[]
}