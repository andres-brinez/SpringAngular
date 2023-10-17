import { Injectable } from '@angular/core'; // Injectable se utiliza para inyectar dependencias en una clase
import { HttpClient, HttpHeaders } from '@angular/common/http'; //  HttpClient sirve para hacer peticiones HTTP a un servidor y recibir respuestas en diferentes formatos
import { Cliente } from './Cliente';
import { Observable, map } from 'rxjs'; // Observable sirve para manejar eventos asíncronos
import { catchError, throwError } from 'rxjs'; // catchError sirve para manejar errores en los Observables
import Swal from 'sweetalert2';
import { Router } from '@angular/router'; // Sirve para manejar rutas y hacer redirecciones

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
  private urlEndPoint: string = "http://localhost:8080/api/clientes";
  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' }) // Se crea un objeto de tipo HttpHeaders para enviar el tipo de contenido que se está enviando en el cuerpo de la petición


  // Se hace inyección de dependencias de HttpClient en el constructor de la clase para poder utilizarlo
  constructor(private http: HttpClient, private router: Router) { }

  // Obtiene el listado de clientes
  getClientes(): Observable<Cliente[]> {
    // Se hace la petición GET al servidor y se le pasa la URL del recurso
    // Se utiliza el método get() de HttpClient para hacer la petición
    // Hace la petición y se suscribe al Observable para recibir la respuesta
    // y se convierte la respuesta a un arreglo de clientes porqu3 viene en formato JSON, esto es un casteo <Tipo de dato> 
    // Se retorna un Observable que contiene un arreglo de clientes



    // Así se hace el casteo sin map de forma mas sencilla
    //return this.http.get<Cliente[]>(this.urlEndPoint);

    // Se hace el casteo con map
    return this.http.get(this.urlEndPoint).pipe(
      map(response => {

        let cliente = response as Cliente[]; // Se castea la respuesta a un arreglo de clientes
        return cliente.map(cliente => { // Se recorre el arreglo de clientes
          cliente.nombre = cliente.nombre.toUpperCase(); // Se convierte el nombre del cliente a mayúsculas
          return cliente; // Se retorna el cliente
        });
      })
    );
  }

  // Crea un cliente
  // Se recibe un objeto de tipo cliente y se retorna un Observable de cualquier tipo,
  create(cliente: Cliente): Observable<any> {
    // Se hace la petición POST al servidor y se le pasa la URL del recurso, el cliente que se va a crear y el tipo de contenido que se está enviando en el cuerpo de la petición
    return this.http.post<Cliente>(this.urlEndPoint, cliente, { headers: this.httpHeaders }).pipe(
      catchError(e => { // Si se produce un error durante la solicitud, se captura el error

        if (e.status == 400) {
          return throwError(e); // Se retorna el error en observable
        }
        console.error(e.error.mensaje); // Se imprime en consola el error
        Swal.fire(e.error.mensaje, e.error.error, 'error'); // Se muestra un mensaje de error que se recibe del servidor(backend) 
        return throwError(e); // Se retorna el error en observable
      })
    );
  }

  // Obtener Cliente
  // Se recibe un id de tipo number y se retorna un Observable de tipo cliente
  getCliente(id: number): Observable<Cliente> {
    // Se hace la petición GET al servidor con el id del cliente y se le pasa la URL del recurso
    return this.http.get<Cliente>(`${this.urlEndPoint}/${id}`).pipe(
      catchError(e => { // Si se produce un error durante la solicitud, se captura el error
        this.router.navigate(['/clientes']); // Se redirecciona a la ruta clientes
        console.error(e.error.mensaje); // Se imprime en consola el error
        Swal.fire('Error al editar', e.error.mensaje, 'error'); // Se muestra un mensaje de error que se recibe del servidor(backend) 
        return throwError(e); // Se retorna el error
      },
      )
    );
  }

  // Actualizar Cliente
  // Se recibe un cliente de tipo Cliente que tiene los datos a actualizar 
  update(cliente: Cliente): Observable<any> {
    // Se hace la petición PUT al servidor con el id del cliente, el cliente que se va a actualizar y el tipo de contenido que se está enviando en el cuerpo de la petición
    return this.http.put<Cliente>(`${this.urlEndPoint}/${cliente.id}`, cliente, { headers: this.httpHeaders }).pipe(
      catchError(e => { // Si se produce un error durante la solicitud, se captura el error
        if (e.status == 400) {
          return throwError(e); // Se retorna el error en observable
        }
        console.error(e.error.mensaje); // Se imprime en consola el error
        Swal.fire(e.error.mensaje, e.error.error, 'error'); // Se muestra un mensaje de error que se recibe del servidor(backend) 
        return throwError(e); // Se retorna el error
      })
    );
  }

  // Eliminar Cliente
  // Se recibe un id de tipo number y se retorna un  Observable de cualquier tipo
  delete(id: number): Observable<any> {
    // Se hace la petición DELETE al servidor con el id del cliente y se le pasa la URL del recurso
    return this.http.delete<Cliente>(`${this.urlEndPoint}/${id}`, { headers: this.httpHeaders }).pipe(
      catchError(e => { // Si se produce un error durante la solicitud, se captura el error
        console.error(e.error.mensaje); // Se imprime en consola el error
        Swal.fire(e.error.mensaje, e.error.error, 'error'); // Se muestra un mensaje de error que se recibe del servidor(backend) 
        return throwError(e); // Se retorna el error
      })
    );
  }

}
