import { NgModule } from '@angular/core'; // Sirve para registrar los componentes, servicios, directivas, etc. que se van a utilizar en la aplicación
import { BrowserModule } from '@angular/platform-browser'; // Sirve para que la aplicación se ejecute en el navegador
import { HttpClientModule } from '@angular/common/http'; //  HttpClient sirve para hacer peticiones HTTP a un servidor y recibir respuestas en diferentes formatos
import { RouterModule,Routes } from '@angular/router'; // Sirve para registrar las rutas
import { FormsModule, ReactiveFormsModule, } from '@angular/forms'; // FormsModule Sirve para enlazar los datos del formulario con el modelo,ReactiveFormsModule se utiliza para crear formularios reactivos en este caso para el autocomplete


// Angular Material
import {MatAutocompleteModule} from '@angular/material/autocomplete'; // Sirve para el autocomplete, por lo que se debe instalar con npm ng add @angular/material
import {MatInputModule} from '@angular/material/input'; // Es el input de Angular Material
import {MatFormFieldModule} from '@angular/material/form-field'; // Es el form field de Angular Material



//Componentes
import { AppComponent } from './appComponent/app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { ClientesComponent } from './clientes/clientes.component';
import { FormComponent } from './clientes/form/form.component';
import { ClienteService } from './clientes/cliente.service';
import { ClientesPageComponent } from './clientes/clientes-page/clientes-page.component';
import { PaginatorComponent } from './paginator/paginator.component';
import { DetalleComponent } from './clientes/detalle/detalle.component';
import { LoginComponent } from './usuarios/login.component';
import { DetalleFacturaComponent } from './facturas/detalle-factura.component';
import { FacturasComponent } from './facturas/facturas.component';

// Constante con un arreglo de las rutas
const routes: Routes = [
  {path: '', redirectTo: '/clientes', pathMatch: 'full'},
  {path: 'clientes', component: ClientesComponent},
  {path: 'clientes/form', component: FormComponent},
  {path: 'clientes/form/:id', component: FormComponent},
  {path: 'clientes/page/:page', component: ClientesPageComponent},
  {path: 'login', component: LoginComponent},
  {path: 'facturas/:id', component: DetalleFacturaComponent},
  {path: 'facturas/form/:clienteId', component: FacturasComponent},

];

// Decorador que registra los componentes, servicios, directivas, etc. que se van a utilizar en la aplicación
@NgModule({
  declarations: [ // Aquí se registran los componentes
    AppComponent,
    HeaderComponent,
    FooterComponent,
    ClientesComponent,
    FormComponent,
    ClientesPageComponent,
    PaginatorComponent,
    DetalleComponent,
    LoginComponent,
    DetalleFacturaComponent,
    FacturasComponent
  ],
  // Aquí se registran los módulos que se van a utilizar en la aplicación
  imports: [ 
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(routes), // esto es para registrar las rutas
    FormsModule,
    // Angular Material
    ReactiveFormsModule,
    MatAutocompleteModule,
    MatInputModule,
    MatFormFieldModule


  ],

  providers: [ClienteService], // Indica los servicios que se van a utilizar en la aplicación globalmente

  bootstrap: [AppComponent] 
})

export class AppModule { }

