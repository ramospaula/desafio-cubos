import Intervals from "./intervals";

export default interface AttendanceRules {
    ruleType: string,
    day: Date,
    weekDay: number,
    intervals: Intervals[]
}