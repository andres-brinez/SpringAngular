import { HttpClient } from '@angular/common/http'; // Importar para poder hacer peticiones http al backend
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Factura } from '../models/factura';

@Injectable({
  providedIn: 'root'
})
export class FacturasService {

  private urlEndPoint: string = 'http://localhost:8080/api/facturas';

  // Inyeccion de dependencias
  constructor(private http: HttpClient) { }

  // Metodo para obtener las facturas de un cliente
  // Retorna un Observable de tipo Factura 
  // Un Observable es un objeto que representa un flujo de datos asincrono
  getFacturas(id: number):Observable<Factura> {
    return this.http.get<Factura>(`${this.urlEndPoint}/${id}`);
  }
}
