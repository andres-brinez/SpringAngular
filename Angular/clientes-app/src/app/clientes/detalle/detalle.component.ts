import { Component, Input, OnInit } from '@angular/core'; // @Input() es un decorador  que se utiliza para indicar que una propiedad de un componente puede ser recibida como entrada desde otro componente
import { Cliente } from '../Cliente';
import { ClienteService } from '../cliente.service';
import Swal from 'sweetalert2';
import { HttpEventType } from '@angular/common/http';
import { ModalService } from './modal.service';

@Component({
  selector: 'detalle-cliente',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.css']
})
export class DetalleComponent implements OnInit {

  @Input() cliente: Cliente; // Se recibe un cliente de tipo Cliente , @Input() indica que se inyecta un cliente desde el componente padre
  titulo: string = "Detalle del cliente";
  fotoSeleccionada: File;
  progreso: number = 0;


  constructor(private clienteService: ClienteService,public modalService:ModalService) {
    this.cliente = new Cliente();
    this.fotoSeleccionada = new File([""], '');
  }

  ngOnInit(): void {
    // este metodo ya no sirve porque ya no se obtiene el cliente de esta manera, sino que se muestra en un modal
    // Cuando se inicialize el componente se suscribe para cuando cambia el parametro del id e nla url para obtener el detalle del cliente
    // this.activateRouter.params.subscribe(params => {
    //   let id = params['id']; // Se obtiene el id del cliente de la url, si es null se asigna -1 para representar que es null
    //   console.log(id);
    //   if (id) {
    //     this.clienteService.getCliente(id).subscribe(cliente => {
    //       this.cliente = cliente;
    //     });
    //   }
    // });


  }

  // A travéz del evento que se recibe del input se obtiene el archivo
  seleccionarFoto(event: any): void {
    this.progreso = 0; // Se inicializa el progreso en 0
    this.fotoSeleccionada = event.target.files[0]; // Se obtiene el archivo
    console.log(this.fotoSeleccionada);

    // Validar que el archivo sea de tipo imagen
    if (this.fotoSeleccionada.type.indexOf('image') < 0) {
      Swal.fire('Error al seleccionar la foto', `El archivo debe ser de tipo imagen`, 'error');
      this.fotoSeleccionada = new File([""], ''); // Se limpia el archivo
    }

  }

  // Se sube la foto
  subirFoto(): void {
    if (this.fotoSeleccionada.name == "") { // si el nombre del archivo es vacio significa que no se seleccionó una foto
      console.log("Debe seleccionar una foto");
      Swal.fire('Error al subir', `Debe seleccionar una foto`, 'error');
    } else {
        this.clienteService.subirFoto(this.fotoSeleccionada, this.cliente.id).subscribe(event => {
          if (event.type === HttpEventType.UploadProgress) { // Si el evento es de tipo UploadProgress es deicr que se está subirndo  se obtiene el progreso de la subida de la imagen
            this.progreso = Math.round((event.loaded / event.total! | 0) * 100); // Se calcula el progreso de la subida de la imagen
          }
          else if (event.type === HttpEventType.Response) { // Si el evento es de tipo Response es decir que se ha subido la imagen
            let response: any = event.body; // Se obtiene la respuesta del servidor
            this.cliente = response.cliente as Cliente; // Se obtiene el cliente con su nueva foto

            this.modalService.notificarUpload.emit(this.cliente); // Se emite el evento para notificar que se subió una foto,y se devuelve el cliente con su nueva foto

            Swal.fire('La foto se ha subido correctamente', response.mensaje, 'success');
          }
      });
    }
  }

  cerrarModal(){
    this.modalService.cerrarModal();
    this.fotoSeleccionada = new File([""], ''); // Se limpia el archivo
    this.progreso=0;
  }

}
