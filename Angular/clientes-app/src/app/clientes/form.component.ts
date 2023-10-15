import { Component, OnInit } from '@angular/core';
import { Cliente } from './Cliente';
import { ClienteService } from './cliente.service';
import { Router, ActivatedRoute } from '@angular/router'; // ActivatedRoute se utiliza para obtener el parámetro de la URL
import swal from 'sweetalert2'; // Se importa la librería de alertas
//OnInit se utiliza para realizar tareas de inicialización después de que se hayan inicializado las propiedades de entrada del componente.


@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
})


export class FormComponent implements OnInit {

  public cliente:Cliente = new Cliente()
  public titulo:string = "Crear Cliente";

  constructor(private clienteService:ClienteService,private router:Router) { }

  ngOnInit(): void {
  }

  // Metodo que se llama cuando se envia el formulario
  public createCliente():void{
    this.clienteService.create(this.cliente)
    .subscribe(cliente => {
      // console.log(cliente),
      this.router.navigate(['/clientes']) // Se redirecciona a la lista de clientes
      swal.fire('Nuevo cliente', `Cliente ${cliente.nombre} creado con éxito!`, 'success') // Se muestra una alerta en el componente a través de la librería sweetalert2
    } 
    );
  }

}
