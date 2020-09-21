import { Rules } from './../models/rules';
import { Request, Response, json } from 'express';
import { badRequest } from '../services/util/message';
import attendanceRules from '../models/attendanceRules';
import saveJson from '../JsonFile/saveJson';
import getJson from '../JsonFile/getJson';
import checkDate from '../services/util/checkDate';


const nameFile = './example.json';



class AttendanceRules { 
    async saveRule(request: Request, response: Response) {
    
        try{
        const data = request.body;

        

        if(!data){
            return badRequest(response, "regra indefinida");
        }

        if(!data.id){
            return badRequest(response, "insira um id")
        }
        
        if(!data.ruleType) {
            return badRequest(response, "insira uma regra");
        }

        if(checkDate(data) == 0) {
            badRequest(response, "A data de está no formato MM/dd/yyyy para ser formatado para dd/MM/yyyy");
        }else{
            data.day = checkDate(data);
        }

        if(!data.day && data.ruleType == Rules.Specific_Day){
            return badRequest(response, "Insira uma data");
        }

        if(!data.weekDay && data.ruleType == Rules.Weekly){
            return badRequest(response, "necessário definir o dia da semana");
        }
 
        if(!data.intervals){
            return badRequest(response, "necessário definir os intervalos");
        }
        data as attendanceRules;

        saveJson(nameFile, data);

        return response.json(data);
    }catch(error){
        return badRequest(response, "error: " + error.message);
    }
    }

    async getListRule(request: Request, response: Response){
        try{
   
        const list = getJson(nameFile);

        response.send(list);

        } catch {
            return badRequest(response, "algo de errado com a lista");
        }
    }

    async deleteRule(request: Request, response: Response){
        try{
        const id = Number(request.params.id);

        const list = getJson(nameFile);
    
        for(var l in list){
            if(id === Number(list[l].id)){ 
                list.splice(l, 1);
                console.log("id da lista: " + list[l].ruleType);
            }
        }

        return response.json([id]); 
        } catch (error){
            return badRequest(response, "não foi possível deletar: " + error.message);
        }
    }

}

export default AttendanceRules;

