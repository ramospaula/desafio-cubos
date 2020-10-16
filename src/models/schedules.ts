import { start } from "repl"

import Intervals from './intervals'

export default interface Schedules {
    day: string,
    intervals: Intervals[]
}