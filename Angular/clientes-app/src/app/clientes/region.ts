export class Region {
    id?: number;
    nombre?: string;

    // ? significa que el atributo es opcional
    constructor(id?: number, nombre?: string) {
        this.id = id;
        this.nombre = nombre;
    }
}
