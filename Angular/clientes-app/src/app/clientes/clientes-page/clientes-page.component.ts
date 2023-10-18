import { Component, OnInit } from '@angular/core';
import { Cliente } from '../Cliente';
import { ClienteService } from '../cliente.service';
import Swal from 'sweetalert2';
import { ActivatedRoute } from '@angular/router'; // Se encarga de obtener el parametro de la ruta

@Component({
  selector: 'app-clientes-page',
  templateUrl: './clientes-page.component.html',
  // styleUrls: ['./clientes-page.component.css']
})
export class ClientesPageComponent implements OnInit {

  clientes: Cliente[] = [] // Se crea un array de objetos de tipo Cliente
  paginador: any; // Esto se inyecta al componente paginator para poder utilizarlo

  // Inyección de dependencias de ClienteService en el constructor de la clase para poder utilizarlo
  constructor(private clienteService: ClienteService , private activateRoute: ActivatedRoute) { }

  ngOnInit(): void {

    // ActivatedRouted se utiliza para obtener el parámetro de la URL de forma actualizada, es decir que cuando cambia el parametro de la ruta se ejcuta el codigo 
    // Esto es gracias a que es un observable y se puede suscribir, por lo que está pendiente de los cambios en la ruta 
    // this.activateRoute.paramMap se encarga de suscribir un obsevador cada vez que cambia el parametro en la ruta se refresca la informacion con el nuevo page de informacion de clientes
    this.activateRoute.paramMap.subscribe(params => {
      //Se recupera el parámetro page de la url para obtener la pagina que se quiere ver
      // + convierte a tipe number
      let page:number = +params.get('page')! | 0;  // Se obtiene el parámetro page de la url y Asigna 0 si page es null

      this.clienteService.getClientespage(page).subscribe(
        // response tiene mucha información de la páginación como el número de paginas, el contenido etc.
        response => {
          this.clientes = response.content as Cliente[]; // Se convierte la respuesta a un array de clientes
          this.paginador = response; // Se asigna el paginador de la respuesta a la variable paginador, esto es para poder utilizarlo en el componente paginator
        }
      );
    });
  
      
    
    
    
   


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
