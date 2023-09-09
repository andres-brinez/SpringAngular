import { Component } from '@angular/core';

@Component({
  selector: 'app-root', // el selector es el nombre de la etiqueta que se va a usar en el html(index.html) y esta etiqueta se va a reemplazar por el contenido del template
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'clientes-app';
}
