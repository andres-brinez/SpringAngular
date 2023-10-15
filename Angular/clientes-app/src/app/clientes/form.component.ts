import { Component, OnInit } from '@angular/core';
import { Cliente } from './Cliente';
//OnInit se utiliza para realizar tareas de inicialización después de que se hayan inicializado las propiedades de entrada del componente.


@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
})


export class FormComponent implements OnInit {

  public cliente:Cliente = new Cliente()
  public titulo:string = "Crear Cliente";

  constructor() { }

  ngOnInit(): void {
  }

  // Metodo que se llama cuando se envia el formulario
  public onSubmit():void{
    console.log("Clicked!");
    console.log(this.cliente);
  }

}
