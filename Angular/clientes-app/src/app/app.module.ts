import { NgModule } from '@angular/core'; // Sirve para registrar los componentes, servicios, directivas, etc. que se van a utilizar en la aplicación
import { BrowserModule } from '@angular/platform-browser'; // Sirve para que la aplicación se ejecute en el navegador
import { HttpClientModule } from '@angular/common/http'; //  HttpClient sirve para hacer peticiones HTTP a un servidor y recibir respuestas en diferentes formatos
import { RouterModule,Routes } from '@angular/router';

//Componentes
import { AppComponent } from './appComponent/app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { ClientesComponent } from './clientes/clientes.component';

// Constante con un arreglo de las rutas
const routes: Routes = [
  {path: '', redirectTo: '/clientes', pathMatch: 'full'},
  {path: 'clientes', component: ClientesComponent} // ruta por defecto
];
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    ClientesComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(routes) // esto es para registrar las rutas
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

