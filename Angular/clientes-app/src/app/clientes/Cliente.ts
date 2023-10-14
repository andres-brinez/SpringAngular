export class Cliente {
   id: number;
   nombre: string;
   apellido: string;
   email: string;
   createAt: string;

   // Los parametros con ? indica que son opcionales
   constructor(id?: number, nombre?: string, apellido?: string, email?: string, createAt?: string) {
      // Si no se envia recibe un valor, se asigna un valor por defecto
      this.id = id || 0;
      this.nombre = nombre || '';
      this.apellido = apellido || '';
      this.email = email || '';
      this.createAt = createAt || '';
   }
}