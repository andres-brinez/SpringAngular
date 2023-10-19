import { Component, OnInit } from '@angular/core';
import { Cliente } from '../Cliente';
import { ClienteService } from '../cliente.service';
import { ActivatedRoute } from '@angular/router'; // Se necesita para obtener el id del usuario de la irl 
import Swal from 'sweetalert2';

@Component({
  selector: 'detalle-cliente',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.css']
})
export class DetalleComponent implements OnInit {

  cliente:Cliente;
  titulo:string="Detalle del cliente";
  fotoSeleccionada:File;


  constructor(private clienteService:ClienteService,private activateRouter: ActivatedRoute) {
    this.cliente=new Cliente();
    this.fotoSeleccionada=new File([""],'');
   }

  ngOnInit(): void {

    // Cuando se inicialize el componente se suscribe para cuando cambia el parametro del id e nla url para obtener el detalle del cliente
    this.activateRouter.params.subscribe(params=>{
      let id=params['id']; // Se obtiene el id del cliente de la url, si es null se asigna -1 para representar que es null
      console.log(id);
      if(id){
        this.clienteService.getCliente(id).subscribe(cliente=>{
          this.cliente=cliente;
        });
      }
    });

    
  }

  // A travéz del evento que se recibe del input se obtiene el archivo
  seleccionarFoto(event:any):void {

    this.fotoSeleccionada=event.target.files[0]; // Se obtiene el archivo
    console.log(this.fotoSeleccionada);

    // Validar que el archivo sea de tipo imagen
    if(this.fotoSeleccionada.type.indexOf('image')<0){
      Swal.fire('Error al seleccionar la foto',`El archivo debe ser de tipo imagen`,'error');
      this.fotoSeleccionada=new File([""],''); // Se limpia el archivo
    }

  }

  // Se sube la foto
  subirFoto():void{
    if(this.fotoSeleccionada.name==""){ // si el nombre del archivo es vacio significa que no se seleccionó una foto
      console.log("Debe seleccionar una foto");
      Swal.fire('Error al subir',`Debe seleccionar una foto`,'error');
    } else{
      this.clienteService.subirFoto(this.fotoSeleccionada,this.cliente.id).subscribe(cliente=>{
        this.cliente=cliente; // Se guarda el cliente con su nueva foto
        Swal.fire('La foto se ha subido correctamente',`La foto se ha subido con éxito: ${this.cliente.foto}`,'success');
      });
    } 

  }


}
