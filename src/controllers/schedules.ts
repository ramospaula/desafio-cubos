import { Rules } from './../models/rules';
import { Request, Response } from 'express';
import { badRequest } from '../services/util/message';
import Schedules from '../models/schedules';
import getJson from '../JsonFile/getJson';
import updateJson from '../JsonFile/updateJson';
import { isBefore, format, eachDayOfInterval, isEqual, parse, isValid } from 'date-fns';

import pt from 'date-fns/locale/pt-BR';

const rules = './rules.json';

const nameFile = 'schedules.json';

class SchedulesController {

    async insertDate(request: Request, response: Response) {

        try {
            const listRules = getJson(rules);

            const query = request.query;

            if (!query.start || !query.end) {
                return badRequest(response, "está faltando valores para a consultar");
            }

            const queryStart = query.start as string;
            const queryEnd = query.end as string;

            const startDate = new Date(queryStart);
            const endDate = new Date(queryEnd);

            if (!isValid(startDate) || !isValid(endDate)){
                return badRequest(response, "A data não é valida");
            }

            if (!isBefore(startDate, endDate)) {
                return badRequest(response, "o atendimento está com data passada");
            }

            let eachDayofQuery = eachDayOfInterval({ start: startDate, end: endDate });

            let arraySchedules: Array<Schedules>;

            arraySchedules = [];

            eachDayofQuery.map((dayOfQuery: any) => {

                let schedulesOfDay: Schedules = {
                    day: format(dayOfQuery, 'dd-MM-yyyy', { locale: pt}),
                    intervals: []
                }

                listRules.map((rule: any) => {

                    if (rule.ruleType == Rules.Weekly) {
                        
                        rule.weekDay.map((dayWeek: number) => {
                            
                            if (dayOfQuery.getDay() == dayWeek) {
                                rule.intervals.map((intervals: any) => {
                                    schedulesOfDay.intervals.push({start: intervals.start, end: intervals.end});
                                });
                                
                            }

                        });
                    }
                    if (rule.ruleType == Rules.Specific_Day) {

                        let dateParse = parse(rule.day, 'MM/dd/yyyy', new Date());

                        if (isEqual(dateParse, dayOfQuery)) {
                            rule.intervals.map((intervals: any) => {
                                schedulesOfDay.intervals.push({start: intervals.start, end: intervals.end});
                            });
                        }
                    }
                    
                });

                arraySchedules.push(schedulesOfDay);

            });

            arraySchedules.map((eachDay: any) => {
                        
                listRules.map((rule: any) => {

                    if(rule.ruleType == Rules.Daily){
                        rule.intervals.map((intervals: any) => {
                            eachDay.intervals.push({start: intervals.start, end: intervals.end});
                        });
                    }

                });
                
            });

            updateJson(nameFile, arraySchedules);


            response.json(arraySchedules);

        } catch (error) {
            return badRequest(response, "algo de errado ocorreu na lista de horários: " + error.message);
        }

    }

}

export default SchedulesController