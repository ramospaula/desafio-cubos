import fs from 'fs';
 
    export default function saveJson(file: any, jsonForm: any){
        if(!fs.existsSync(file)){

            fs.writeFileSync(file, JSON.stringify(jsonForm));
            console.log("arquivo criado");
        
        }else{
        
            const readFile = fs.readFileSync(file, 'utf8');  
        
            let lista = (readFile.length) ? JSON.parse(readFile): [];

            if(lista instanceof Array) lista.push(jsonForm)
                else lista = [jsonForm];
            
            fs.writeFileSync(file, JSON.stringify(lista));

        }
} 

