import { EventEmitter, Injectable } from '@angular/core'; // EventEmiiter se utiliza para crear y emitir eventos personalizados en un componente.

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  modal:boolean=false;
  
  private _notificarUpload = new EventEmitter<any>(); // Se crea un evento para notificar cuando se sube una foto

  constructor() { }

  // Metodo get del atributo privado _notificarUpload
  get notificarUpload():EventEmitter<any> {
    return this._notificarUpload;
  }

  abrirModal(){
    this.modal=true;
    
  }

  cerrarModal(){
    this.modal=false;
  }

    
}
