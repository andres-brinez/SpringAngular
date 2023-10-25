export class Usuario {
    // Se crean las propiedades de la clase Usuario que son las mismas que se encuentran en el backend y su contructor
    // La clase representa un modelo de datos que se recibe del backend
    id: number;
    username: string;
    password: string;
    nombre: string;
    apellido: string;
    email: string;
    roles: string[] = []; // Se crea un array de string para los roles

    // Constructor de la clase
    // ? indica que el parametro es opcional
    constructor(id?:number, username?: string, password?: string, nombre?: string, apellido?: string, email?: string) {
        // Si no se envia recibe un valor, se asigna un valor por defecto
        this.id = id || 0;
        this.username = username || '';
        this.password = password || '';
        this.nombre = nombre || '';
        this.apellido = apellido || '';
        this.email = email || '';
        
    }
   



}
