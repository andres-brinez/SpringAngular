import { Component, OnInit } from '@angular/core';
import { Factura } from './models/factura';
import { ClienteService } from '../clientes/cliente.service';
import { ActivatedRoute } from '@angular/router';
import { FormControl } from '@angular/forms';
import { Observable, map, startWith, tap } from 'rxjs';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { Producto } from './models/producto';
import { Itemfactura } from './models/itemfactura';

@Component({
  selector: 'app-facturas',
  templateUrl: './facturas.component.html',
})
export class FacturasComponent implements OnInit {

  titulo: string = 'Nueva Factura';
  factura: Factura = new Factura();

  // Autocomplete usando Angular Material
  myControl = new FormControl('');
  options: string[] = ['One', 'Two', 'Three'];
  public filteredOptions: Observable<string[]> = new Observable<string[]>();


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

    // Autocomplete usando Angular Material

   this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || '')),
      tap((value) => console.log(value))
    );
  }
  

  // Filtra los valores de acuerdo a lo que se escribe en el input y devuelve una lista con las coincidencias
  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    let lista=this.options.filter(option => option.toLowerCase().includes(filterValue))
    console.log(lista);
    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }

  // Se selecciona un valor del autocomplete
  seleccionarProducto(event: MatAutocompleteSelectedEvent): void {
    console.log(event.option.value);
    let producto=event.option.value as Producto; // Se  obtiene el producto seleccionado
    console.log(producto);

    let nuevoItem= new Itemfactura(); 
    nuevoItem.producto=producto; 
    this.factura.items.push(nuevoItem);

    // Al selecionar un producto se limpia el input
    this.myControl.setValue('');
    event.option.focus();
    event.option.deselect(); // Se deselecciona el producto
  }


}
