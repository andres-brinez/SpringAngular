import { Component, OnInit } from '@angular/core';
import { Factura } from './models/factura';
import { ClienteService } from '../clientes/cliente.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-facturas',
  templateUrl: './facturas.component.html',
})
export class FacturasComponent implements OnInit {

  titulo: string = 'Nueva Factura';
  factura: Factura = new Factura();

  constructor(private clienteService: ClienteService, private activateRoute: ActivatedRoute) { }

  ngOnInit(): void {
    /* params es una forma de acceder a los parámetros de la URL de forma sincrónica,
     mientras que paramMap es una forma de acceder a los parámetros de la URL de forma asíncrona mediante un observable. */
    this.activateRoute.params.subscribe(params => {
      let clienteId = params['clienteId'];
      if (clienteId != null) {
        console.log(clienteId);
        this.clienteService.getCliente(clienteId).subscribe(
          cliente => this.factura.cliente = cliente // Se asigna el cliente que se obtiene del servicio al cliente de la factura
        );
        // console.log(this.factura);

      }
    });
  }

}
