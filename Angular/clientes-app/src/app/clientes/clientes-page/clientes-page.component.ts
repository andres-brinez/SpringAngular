import { Component, OnInit } from '@angular/core';
import { Cliente } from '../Cliente';
import { ClienteService } from '../cliente.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-clientes-page',
  templateUrl: './clientes-page.component.html',
  // styleUrls: ['./clientes-page.component.css']
})
export class ClientesPageComponent implements OnInit {

  clientes: Cliente[] = [] // Se crea un array de objetos de tipo Cliente

  // Inyección de dependencias de ClienteService en el constructor de la clase para poder utilizarlo
  constructor(private clienteService: ClienteService) { }

  ngOnInit(): void {

    let page = 0; // Empieza en la página 0
    this.clienteService.getClientespage(page).subscribe(
      response => {
        this.clientes = response.content as Cliente[]; // Se convierte la respuesta a un array de clientes
      }
    );


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
}