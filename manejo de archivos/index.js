const { v4: uuidv4 } = require('uuid');
const fs = require('fs');

class Contenedor{
    constructor(filename){
        this.filename = `./${filename}.json`;
    }

    async readFile(){
        const data = await fs.promises.readFile(this.filename,'utf-8');
        return JSON.parse(data);
    }

    //TODO: falta arreglar que esto lea los datos anteriores y forme un nuevo json sino rompe
    async writeFile(obj){
        return await fs.promises.appendFile(this.filename,`${JSON.stringify(obj)},\n`,(err) => {if (err) console.log(err)});
    }

    save(obj){
        obj.id = uuidv4();
        this.writeFile(obj);
        return obj.id;
    }

    //TODO: falta filtrar por id
    async getById(id){
        fs.access(this.filename,async (err) =>{
            if(err){
                console.log(err);
                return null;
            }
        });
        const data = await this.readFile()
        .then((obj) =>{
            return obj
        });
        return data;
    }

    
    async getAll(){
        fs.access(this.filename,async (err) =>{
            if(err){
                console.log(err);
                return null;
            }
        });
        const data = await this.readFile()
        .then((obj) =>{
            return obj
        });
        return data;
    }

    //TODO: falta todo
    deleteById(id){
        //elimina el obj del archivo con el id
    }

    async deleteAll(){
        fs.access(this.filename,async (err) =>{
            if(err){
                console.log(err);
                return null;
            }
        });

        return await fs.promises.writeFile(this.filename,'',(err) => {if (err) console.log(err)});
    }
}

const cont = new Contenedor('file');

//DATA TEST
// const data = {
//     nombre: 'pedro',
//     apellido: 'gonzalez',
//     edad: 45
// }
//TEST SAVE
// console.log(cont.save(data));

//TEST GETBYID
// cont.getById('3b5915e6-5c9a-4c3b-a19e-466353c51bd5').then((data) => console.log(data));

//TEST GETALL
// cont.getAll().then((data) => console.log(data));

//TEST DELETEALL
// cont.deleteAll();