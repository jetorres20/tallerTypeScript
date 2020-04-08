export class Student {
    nombre: string;
    codigo: number;
    cedula: number;
    edad: string;
    direccion: string;
    telefono: number;

    constructor(nombre: string,codigo: number,cedula: number,edad: string, direccion: string,telefono: number)
    {
        this.nombre = nombre;
        this.codigo= codigo;
        this.cedula= cedula;
        this.edad = edad;
        this.direccion = direccion;
        this.telefono = telefono;
    }
  }