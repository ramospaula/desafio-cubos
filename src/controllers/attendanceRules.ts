import { Rules } from './../models/rules';
import { Request, Response, json } from 'express';
import { badRequest } from '../services/util/message';
import attendanceRules from '../models/attendanceRules';
import saveJson from '../JsonFile/saveJson';
import getJson from '../JsonFile/getJson';
import updateJson from '../JsonFile/updateJson';
import { valideWeek } from '../services/util/checkWeek';
import { format, isAfter, isValid } from 'date-fns';
import pt from 'date-fns/locale/pt-BR';


const nameFile = './rules.json';



class AttendanceRules {
    async saveRule(request: Request, response: Response) {

        try {
            
            const getSize = getJson(nameFile);
            let key = "id";
            let valueKey = getSize.length + 1;

            const data = request.body;

            if (!data) {
                return badRequest(response, "regra indefinida");
            }

            data[key] = valueKey;

            if (!data.ruleType) {
                return badRequest(response, "insira uma regra");
            }

            if (data.ruleType != Rules.Weekly && data.ruleType != Rules.Daily && data.ruleType != Rules.Specific_Day) {
                return badRequest(response, "essa regra não existe");
            }

            if(data.ruleType == Rules.Specific_Day) {
                if(!data.day){
                    return badRequest(response, "Insira uma data");
                }else {
                    if (!isValid(new Date(data.day))) {
                        return badRequest(response, "A data deve está no formato MM/dd/yyyy");
                    }
                    if(!isAfter(new Date(data.day), new Date())){
                        console.log(isAfter(data.day, new Date()))
                        return badRequest(response, "A data não deve ser uma data passada da data atual")
                    } else {
                        let date = new Date(data.day);
                        data.day = format(date, 'dd-MM-yyyy', { locale: pt});
                    }
                }
            }

            if(data.ruleType == Rules.Weekly){
                if (!data.weekDay) {
                    return badRequest(response, "necessário definir o dia da semana");
                }else {
                    if(!valideWeek(data)){
                        return badRequest(response, "o dia da semana inserido não é valido");
                    }
                }
            }

            if (!data.intervals) {
                return badRequest(response, "necessário definir os intervalos");
            }


            saveJson(nameFile, data);

            return response.json(data);

        } catch (error) {
            return badRequest(response, "error: " + error.message);
        }

    }

    async getListRule(request: Request, response: Response) {
        try {

           const listRules = getJson(nameFile); 

            response.send(listRules);

        } catch (error){
            return badRequest(response, "algo de errado com a lista: " + error.message);
        }
    }

    async deleteRule(request: Request, response: Response) {
        try {
            const id = Number(request.params.id);

            const list = getJson(nameFile);
            let indexRule: any;

            let ruleDelete = list.filter((rule: any, index: number) => {
                indexRule = index; 
                return Number(rule.id) == id;
              });

            if(!ruleDelete.length) {
                return badRequest(response, "não existe nenhuma regra com esse id");
            }
                list.splice(indexRule, 1);
                updateJson(nameFile, list);

            return response.json("regra deletada com sucesso");
        } catch (error) {
            return badRequest(response, "não foi possível deletar: " + error.message);
        }
    }

}

export default AttendanceRules;

