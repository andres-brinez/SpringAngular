import { Injectable } from '@angular/core'; 
import { HttpClient } from '@angular/common/http'; //  HttpClient sirve para hacer peticiones HTTP a un servidor y recibir respuestas en diferentes formatos
import { Cliente } from './Cliente';
import { Observable } from 'rxjs';

/*
Observable se utiliza con frecuencia para manejar solicitudes HTTP y eventos del usuario.
Por ejemplo, cuando se realiza una solicitud HTTP con HttpClient, la respuesta del servidor se devuelve como un Observable. 
También se puede utilizar Observable para manejar eventos del usuario, como clics de botón o cambios de entrada
.*/

// @Injectable()  indica que la clase es un servicio y que puede ser inyectada en otros componentes o servicios.
// La clase servicio se encarga de la lógica de negocio de la aplicación
@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  //guarda  la URL del recurso donde se encuentra el listado de clientes en una variable
  private urlEndPoint:string = "http://localhost:8080/api/clientes";

  // Se hace inyección de dependencias de HttpClient en el constructor de la clase para poder utilizarlo
  constructor(private http:HttpClient ) {}

  // Método que obtiene el listado de clientes
  getClientes(): Observable<Cliente[]> { 
    // Se hace la petición GET al servidor y se le pasa la URL del recurso
    // Se utiliza el método get() de HttpClient para hacer la petición
    // Hace la petición y se suscribe al Observable para recibir la respuesta
    // y se convierte la respuesta a un arreglo de clientes porqu3 viene en formato JSON, esto es un casteo <Tipo de dato> 
    // Se retorna un Observable que contiene un arreglo de clientes

    // Se hace el casteo con map
    // return this.http.get(this.urlEndPoint).pipe(
    //   map(response => response as Cliente[])
    // );

    return this.http.get<Cliente[]>(this.urlEndPoint);
  }
}
