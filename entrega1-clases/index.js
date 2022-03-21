class Usuario{
    constructor(nombre, apellido){
        this.nombre = nombre;
        this.apellido = apellido;
        this.libros = [];
        this.mascotas = [];
    }

    getFullName(){
        return `${this.nombre} ${this.apellido}`;
    }

    addMascota(mascota){
        this.mascotas.push(mascota);
    }

    countMascotas(){
        return this.mascotas.length;
    }

    addBook(nombre, autor){
        this.libros.push({nombre:nombre, autor:autor});
    }

    getBookNames(){
        let libros = [];
        this.libros.forEach(libro => libros.push(libro.nombre));
        return libros;
    }
}

const user = new Usuario('juan', 'perez');

//getFullName
console.log(`Resultado getFullName: ${user.getFullName()}`);

//addMascota
user.addMascota('gato');
user.addMascota('perro');

//addBook
user.addBook('it','stephen king');
user.addBook('rabia','sergio bizzio')

//Resultado de addMascota y addBook
console.log(user);

//countMascotas
console.log(user.countMascotas());

//getBookNames
console.log(user.getBookNames());