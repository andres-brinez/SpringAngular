import { Component, Input } from '@angular/core';

@Component({
  selector: 'paginator-nav',
  templateUrl: './paginator.component.html',
})
export class PaginatorComponent {
  // @Input() se utiliza para recibir el paginador del componente clientes-page, es como una forma de inyección de dependencias
  @Input() paginador:any;
  paginas: number[]=[]; // Se crea un array de numeros para almacenar las paginas que se van a mostrar en el paginador

  constructor() { }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.paginas = new Array(this.paginador.totalPages).fill(0).map((_valor, indice) => indice + 1);
  }

}
