import { Component,OnInit } from '@angular/core';
// OnInit es una interfaz de ciclo de vida de Angular que se utiliza para definir un método que se ejecuta después de que se hayan inicializado las propiedades de entrada de un componente. El método ngOnInit() se ejecuta una vez después de que Angular haya inicializado las propiedades de entrada del componente.
//El método ngOnInit() se utiliza con frecuencia para realizar tareas de inicialización en un componente, como cargar datos de un servicio o configurar variables de estado. También se puede utilizar para realizar tareas de configuración adicionales después de que se hayan inicializado las propiedades de entrada.
import { Cliente } from './Cliente';
import { ClienteService } from './cliente.service';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
})
export class ClientesComponent implements OnInit {

  clientes: Cliente[] = [ ] // Se crea un array de objetos de tipo Cliente

  // Se hace inyección de dependencias de ClienteService en el constructor de la clase para poder utilizarlo
  constructor(private clienteService:ClienteService) { }

  ngOnInit() { //El método ngOnInit() se ejecuta una vez después de que Angular haya inicializado las propiedades de entrada del componente.
    
    this.clienteService.getClientes().subscribe(
      clientes=>this.clientes=clientes
    ); // Se llama al método getClientes() del servicio y se suscribe al Observable para recibir la respuesta que son los clientes y se asignan al array de clientes
  }

}
