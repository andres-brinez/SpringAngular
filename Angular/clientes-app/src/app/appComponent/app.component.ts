import { Component } from '@angular/core';

@Component({
  selector: 'app-root', // el selector es el nombre de la etiqueta que se va a usar en el templat y esta etiqueta se va a reemplazar por el contenido del template
  templateUrl: './app.component.html', // es el template que en el que se va a mostrar el contenido del componente
  styleUrls: ['./app.component.css'] // son los esitlos que se van a aplicar al template (componente) y no a los demas, van en [] porque pueden ser varios separados por ,
})
export class AppComponent {
  title = 'clientes-app';
  nombre = 'Felipe';
}
