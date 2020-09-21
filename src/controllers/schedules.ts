import { Request, Response } from 'express';
import { badRequest } from '../services/util/message';
import  Schedules  from '../models/schedules';
import getJson from '../JsonFile/getJson';
import saveJson from '../JsonFile/saveJson';

const nameFileRules = './example.json';

const nameFile = 'schedules.json';

class SchedulesController {
    
    async insertDate(request: Request, response: Response) {
    
        try{
        const listRules = getJson(nameFileRules);

        const newArray=[];

        console.log("LISTA EXAMPLE: " + JSON.stringify(listRules));


        let schedules: Schedules[];
 

        const schedule = {
            day: Date,
            intervals: {
                start: Date,
                end: Date
            }
        } 

        const obj = Object;
        const arry =  Array<Object>();

        for(var l in listRules){
            console.log("tamanho intervalo: " + listRules[l].intervals.length)
            if(!listRules[l].day){
                console.log("dia: " + listRules[l].day);
                return badRequest(response, "dia indisponivel");
            }else {
                schedule.day = listRules[l].day; 
            }
            for(var i = 0; i < listRules[l].intervals.length; i++){
                if(!listRules[l].intervals){
                    console.log("horário: " + listRules[l].intervals[i])
                    return badRequest(response, "horário indisponivel");
                }else {
                    console.log("dentro for: " + listRules[l].intervals.length)
                    schedule.intervals = listRules[l].intervals[i];
                    newArray.push(listRules[l].intervals[i]);
                    console.log(schedule.intervals);
                }
            }     
            saveJson(nameFile, schedule);
        }

        const arr = newArray;

        
        return response.json(schedule);
    }catch(error){
        badRequest(response, "erro listar horário: " + error.message)
    }
}

}

export default SchedulesController;




