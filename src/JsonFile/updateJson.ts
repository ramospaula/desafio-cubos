import fs from 'fs';
 
    export default function saveJson(file: any, newJson: any){
        fs.writeFileSync(file, JSON.stringify(newJson));
    }