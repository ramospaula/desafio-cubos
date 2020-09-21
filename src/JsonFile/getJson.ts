import fs from 'fs';

export default function getJson(file: string){
    const readFile = fs.readFileSync(file, 'utf8');  
    //console.log("arquivo guardado: " + readFile);
    //let lista = JSON.parse(readFile);
    //console.log("lista: " + lista);

    let lista = (readFile.length) ? JSON.parse(readFile): [];

    return lista;
}