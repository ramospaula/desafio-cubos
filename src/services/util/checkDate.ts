import { format } from 'date-fns';
import pt from 'date-fns/locale/pt-BR';

export default function checkDate(data: any){

    try{

        let dataTranform = new Date(data.day);
    
        if(dataTranform.toString() == 'Invalid Date'){
             return 0;
        }

        const formatedDate = format(dataTranform, 'dd-MM-yyyy', { locale: pt});

        return formatedDate;

    }catch(error){

        console.log("um erro ocorreu: " + error) 
    }



}