import { Component, OnInit } from '@angular/core';
import { Cliente } from '../Cliente';
import { ClienteService } from '../cliente.service';
import { Router, ActivatedRoute } from '@angular/router'; //Router se utiliza para redireccionar a otra vista ActivatedRoute se utiliza para obtener el parámetro de la URL
import swal from 'sweetalert2'; // Se importa la librería de alertas
import { Region } from '../region';
//OnInit se utiliza para realizar tareas de inicialización después de que se hayan inicializado las propiedades de entrada del componente.


@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
})


export class FormComponent implements OnInit {

  public cliente: Cliente = new Cliente();
  public regiones:Region[]=[];
  public titulo: string = "Crear Cliente";

  public errores: string[]=[]; // Se declara un arreglo de errores que vienen desde el backned 

  constructor(private clienteService: ClienteService, private router: Router, private activateRouter: ActivatedRoute) { }

  ngOnInit(): void {
    this.cargarCliente();
  
  }

  cargarCliente(): void {
    // Se suscribe al Observable para recibir el cliente, pero antes se obtiene el id del cliente de la URL con ActivatedRoute
    this.activateRouter.params.subscribe(params => {
      let id = params['id']
      if (id)  // si el id existe
      {
        this.clienteService.getCliente(id).subscribe((cliente) => this.cliente = cliente) // Se obtiene el cliente con el id y se asigna a la variable cliente
      }
    })
    // Se necesita obtener las regiones para mostrarlas en el formulario en un select
    this.clienteService.getRegiones().subscribe(regiones => this.regiones =regiones  ); // Se obtienen las regiones y se asignan a la lista regiones
  }


  update(): void {

    this.clienteService.update(this.cliente)
      .subscribe(response => {
        this.router.navigate(['/clientes']) // Se redirecciona a la lista de clientes
        swal.fire('Cliente Actualizado', `Cliente ${response.cliente.nombre} actualizado con éxito!`, 'success') // Se muestra una alerta en el componente a través de la librería sweetalert2
      },
        // Se puede manejar cuando sale algo mal en el servidor
        err => {
          this.errores = err.error.errors as string[]; // Se asigna el error al arreglo de errores
          console.error('Código del error desde el backend: ' + err.status);
          console.error(err.error.errors);
        }

      )
  }

  // Metodo que se llama cuando se envia el formulario
  createCliente(): void {
    this.clienteService.create(this.cliente)
      .subscribe(response => {
        // console.log(cliente),
        this.router.navigate(['/clientes']) // Se redirecciona a la lista de clientes
        swal.fire('Nuevo cliente', `Cliente ${response.cliente.nombre} creado con éxito!`, 'success') // Se muestra una alerta en el componente a través de la librería sweetalert2
      },
        // Se puede manejar cuando sale algo mal en el servidor
        err => {
          this.errores = err.error.errors as string[]; // Se asigna el error al arreglo de errores
          console.error('Código del error desde el backend: ' + err.status);
          console.error(err.error.errors);
        }
      );
  }



}
