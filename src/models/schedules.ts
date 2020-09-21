import { start } from "repl"

import Intervals from './intervals'

export interface Schedules {
    day: Date,
    intervals: Intervals[]
}