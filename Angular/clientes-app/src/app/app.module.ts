import { NgModule } from '@angular/core'; // Sirve para registrar los componentes, servicios, directivas, etc. que se van a utilizar en la aplicación
import { BrowserModule } from '@angular/platform-browser'; // Sirve para que la aplicación se ejecute en el navegador
import { HttpClientModule } from '@angular/common/http'; //  HttpClient sirve para hacer peticiones HTTP a un servidor y recibir respuestas en diferentes formatos
import { RouterModule,Routes } from '@angular/router'; // Sirve para registrar las rutas
import { FormsModule } from '@angular/forms'; // Sirve para enlazar los datos del formulario con el modelo


//Componentes
import { AppComponent } from './appComponent/app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { ClientesComponent } from './clientes/clientes.component';
import { FormComponent } from './clientes/form.component';

// Constante con un arreglo de las rutas
const routes: Routes = [
  {path: '', redirectTo: '/clientes', pathMatch: 'full'},
  {path: 'clientes', component: ClientesComponent} // ruta por defecto
];

// Decorador que registra los componentes, servicios, directivas, etc. que se van a utilizar en la aplicación
@NgModule({
  declarations: [ // Aquí se registran los componentes
    AppComponent,
    HeaderComponent,
    FooterComponent,
    ClientesComponent,
    FormComponent
  ],
  // Aquí se registran los módulos que se van a utilizar en la aplicación
  imports: [ 
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(routes), // esto es para registrar las rutas
    FormsModule
    
    

  ],

  providers: [],

  bootstrap: [AppComponent] 
})

export class AppModule { }

