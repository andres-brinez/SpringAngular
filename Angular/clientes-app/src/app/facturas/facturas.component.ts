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

    let lista = this.options.filter(option => option.toLowerCase().includes(filterValue))
    console.log(lista);
    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }

  // Actualizar la cantidad del producto en la factura
  // Se recibe el id del producto
  // Se recibe el evento que se genera cuando se cambia la cantidad del producto en el input
  // Se actualiza la cantidad del producto en la factura
  // Se recorre la lista de items de la factura y se actualiza la cantidad del producto
  // Actualiza la cantidad del producto en la factura
  actualizarCantidad(id: number, event: any): void {
    let cantidad: number = event.target.value as number;

    if (cantidad == 0) {
      return this.eliminarItemFactura(id);
    }

    this.factura.items = this.factura.items.map((item: Itemfactura) => {
      if (id === item.producto.id) {
        item.cantidad = cantidad;
      }
      return item;
    });
  }


  // Se selecciona un valor del autocomplete
  seleccionarProducto(event: MatAutocompleteSelectedEvent): void {
    console.log(event.option.value);
    let producto = event.option.value as Producto; // Se  obtiene el producto seleccionado
    console.log(producto);

    // Valida si existe ya un prodocuto en la factura para no agregarlo de nuevo sino que se incrementa la cantidad
    if (this.existeItem(producto)) {

      this.incrementarCantidad(producto.id);
    }
    else {
      let nuevoItem = new Itemfactura();
      nuevoItem.producto = producto;
      this.factura.items.push(nuevoItem);
    }

    // Al selecionar un producto se limpia el input
    this.myControl.setValue('');
    event.option.focus();
    event.option.deselect(); // Se deselecciona el producto

  }

  // Valida si existe ya un prodocuto en la factura para no agregarlo de nuevo
  existeItem(producto: Producto): boolean {
    let existe = false;

    this.factura.items.forEach((item: Itemfactura) => {
      if (producto.id === item.producto.id) {
        existe = true;
      }
    });
    return existe;
  }

  incrementarCantidad(id: number): void {
    this.factura.items = this.factura.items.map((item: Itemfactura) => {
      if (id === item.producto.id) {
        ++item.cantidad;
      }
      return item;
    });
  }

  // Actualiza el precio total de la factura
  actualizarPrecioTotal(): void {
    this.factura.total = this.factura.items.reduce((acumulador, item) => acumulador + item.calcularImporte(), 0);
  }

  // Elimina un item de la factura
  eliminarItemFactura(id: number): void {
    this.factura.items = this.factura.items.filter((item: Itemfactura) => id !== item.producto.id);
  }



}
