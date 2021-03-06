const { v4: uuidv4 } = require('uuid');
const fs = require('fs');

class Contenedor{
    constructor(filename){
        this.filename = `./${filename}.json`;
    }

    async readFile(){
        const data = await fs.promises.readFile(this.filename,'utf-8');
        if(data.length > 0)
        {
            return JSON.parse(data);
        }

        return [];
    }

    async writeFile(obj){
        return await fs.promises.writeFile(this.filename,JSON.stringify(obj,null,'\t'));
    }
    
    fileExists(){
        return fs.existsSync(this.filename);
    }

    async save(obj){
        obj.id = uuidv4();
        const data = await this.getAll();
        data.push(obj);
        this.writeFile(data);
        return await obj.id;
    }

    async getById(id){
        const data =  await this.readFile();
        return await data.filter(x=> x.id === id);
    }

    
    async getAll(){
        let data = [];
        if(this.fileExists()){
            data = await this.readFile();
        }
        return data;
    }

    async deleteById(id){
        const data = await this.getAll();
        data.splice(data.findIndex(x=> x.id === id),1);
        this.writeFile(data);
    }

    async deleteAll(){
        await this.writeFile([]);
    }
}

const cont = new Contenedor('file');

//DATA TEST
const data = {
    nombre: 'pedro',
    apellido: 'gonzales',
    edad: 32
}

// cont.readFile().then(res => console.log(res));
// cont.writeFile(data).then(res=> console.log(res));

//TEST SAVE
// console.log(cont.save(data));
// cont.save(data).then(res=> console.log(res))

//TEST GETBYID
// cont.getById('37f015e7-16c7-441f-9698-0b7940fcc8b0').then((data) => console.log(data));
// console.log(cont.getById('cfd99073-2d55-44cd-addb-93fb69b1714c'));

//TEST GETALL
// cont.getAll().then((data) => console.log(data));
// console.log(cont.getAll());

//TEST DELETEBYID
// console.log(cont.deleteById('da98876b-5d4c-4d0f-b172-c34f851a0f3a'));
// cont.deleteById('37f015e7-16c7-441f-9698-0b7940fcc8b0')

//TEST DELETEALL
cont.deleteAll();