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
    FormsModule
    
  ],

  providers: [ClienteService], // Indica los servicios que se van a utilizar en la aplicación globalmente

  bootstrap: [AppComponent] 
})

export class AppModule { }

