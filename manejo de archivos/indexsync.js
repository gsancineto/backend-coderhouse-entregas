const { v4: uuidv4 } = require('uuid');
const fs = require('fs');

class Contenedor{
    constructor(filename){
        this.filename = `./${filename}.json`;
    }

    readFile(){
        let data = fs.readFileSync(this.filename,'utf-8');
        if(data.length > 0)
        {
            return JSON.parse(data);
        }

        return [];
    }

    writeFile(obj){
        return fs.writeFileSync(this.filename,JSON.stringify(obj,null,'\t'));
    }
    
    fileExists(){
        return fs.existsSync(this.filename);
    }

    //TODO: falta arreglar que esto lea los datos anteriores y forme un nuevo json sino rompe
    save(obj){
        obj.id = uuidv4();
        const data = this.getAll();
        data.push(obj);
        this.writeFile(data);
        return obj.id;
    }

    //TODO: falta filtrar por id
    getById(id){
        const data =  this.readFile();
        return data.filter(x=> x.id === id);
    }

    
    getAll(){
        let data = [];
        if(this.fileExists()){
            data = this.readFile();
        }
        return data;
    }

    deleteById(id){
        const data = this.getAll();
        data.splice(data.findIndex(x=> x.id === id),1);
        this.writeFile(data);
    }

    deleteAll(){
        this.writeFile([]);
    }
}

const cont = new Contenedor('filesync');

//DATA TEST
const data = {
    nombre: 'juan',
    apellido: 'perez',
    edad: 25
}
//TEST SAVE
// console.log(cont.save(data));

//TEST GETBYID
// cont.getById('3b5915e6-5c9a-4c3b-a19e-466353c51bd5').then((data) => console.log(data));
// console.log(cont.getById('cfd99073-2d55-44cd-addb-93fb69b1714c'));

//TEST GETALL
// cont.getAll().then((data) => console.log(data));
// console.log(cont.getAll());

//TEST DELETEBYID
// console.log(cont.deleteById('da98876b-5d4c-4d0f-b172-c34f851a0f3a'));

//TEST DELETEALL
cont.deleteAll();