import { Component, OnInit } from '@angular/core';
import { Cliente } from '../Cliente';
import { ClienteService } from '../cliente.service';
import { ActivatedRoute } from '@angular/router'; // Se necesita para obtener el id del usuario de la irl 

@Component({
  selector: 'detalle-cliente',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.css']
})
export class DetalleComponent implements OnInit {

  cliente:Cliente;
  titulo:string="Detalle del cliente";


  constructor(private clienteService:ClienteService,private activateRoute: ActivatedRoute) {
    this.cliente=new Cliente();
   }

  ngOnInit(): void {

    // Cuando se inicialize el componente se suscribe para cuando cambia el parametro del id e nla url para obtener el detalle del cliente
    this.activateRoute.paramMap.subscribe(params=>{
      let id:number=+params.get('id') ! | -1; // Se obtiene el id del cliente de la url, si es null se asigna -1 para representar que es null
      if(id != -1){
        this.clienteService.getCliente(id).subscribe(cliente=>{
          this.cliente=cliente;
        });
      }
    });

  }

}
