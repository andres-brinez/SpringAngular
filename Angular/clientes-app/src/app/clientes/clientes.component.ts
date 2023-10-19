import { Component, OnInit } from '@angular/core';
// OnInit es una interfaz de ciclo de vida de Angular que se utiliza para definir un método que se ejecuta después de que se hayan inicializado las propiedades de entrada de un componente. El método ngOnInit() se ejecuta una vez después de que Angular haya inicializado las propiedades de entrada del componente.
//El método ngOnInit() se utiliza con frecuencia para realizar tareas de inicialización en un componente, como cargar datos de un servicio o configurar variables de estado. También se puede utilizar para realizar tareas de configuración adicionales después de que se hayan inicializado las propiedades de entrada.
import { Cliente } from './Cliente';
import { ClienteService } from './cliente.service';
import Swal from 'sweetalert2';
import { ModalService } from './detalle/modal.service';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
})
export class ClientesComponent implements OnInit {

  clientes: Cliente[] = [] // Se crea un array de objetos de tipo Cliente
  clienteSelecionado:Cliente; // Se crea un objeto de tipo Cliente

  // Se hace inyección de dependencias de ClienteService en el constructor de la clase para poder utilizarlo
  constructor(private clienteService: ClienteService,private modalService:ModalService) {
    this.clienteSelecionado=new Cliente();
   }

  ngOnInit() { //El método ngOnInit() se ejecuta una vez después de que Angular haya inicializado las propiedades de entrada del componente.

    this.clienteService.getClientes().subscribe(
      clientes => this.clientes = clientes // funcion anonima
      // function(clientes){
      // this.clientes=clientes  
      //}
    ); // Se llama al método getClientes() del servicio y se suscribe al Observable para recibir la respuesta que son los clientes y se asignan al array de clientes
  }

  // El objeto cliente que se recibe como parámetro viene del botón eliminar del componente clientes.component.html
  delete(cliente: Cliente): void {
    // Se llama al método delete() del servicio y se suscribe al Observable para recibir la respuesta que es el cliente que se eliminó
    // swal para preguntar si se quiere eliminar el cliente, are you sure?
    Swal.fire({
      title: '¿Estás seguro?',
      text: `¿Seguro que desea eliminar al cliente ${cliente.nombre} ${cliente.apellido}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: '!Sí, eliminar',
      cancelButtonText: '!No, cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.clienteService.delete(cliente.id).subscribe(
          response => {
            // Se filtra el cliente que se eliminó para que no esté en el array de clientes, esto es para que se actualice la lista de clientes en la vista
            this.clientes = this.clientes.filter(cli => cli !== cliente)  // compara cada cliente (cli) y verifica que sea diferente al cliente que se eliminó para agregarlo al array de clientes
            console.log(cliente)
            Swal.fire(
              'Eliminado!',
              `Cliente ${cliente.nombre} eliminado con éxito.`,
              'success'
            )
          }
        )
      }
    })


  }

  // Se encarga del modal
  abrirModal(cliente:Cliente){
    this.clienteSelecionado=cliente;
  }

}
