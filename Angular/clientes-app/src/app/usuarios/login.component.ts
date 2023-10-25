import { Component } from '@angular/core';
import { Usuario } from './usuario';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  // styleUrls: ['./login.component.css']
})
export class LoginComponent {


  titulo: string = 'Por favor Sign In!';
  usuario: Usuario;

  constructor() {
    this.usuario = new Usuario();
  }

  login(): void {
    console.log(this.usuario);

    // Validar que el usuario y la contraseña no estén vacíos con swal
    if (this.usuario.username == "" || this.usuario.password == "") {
      // Se muestra un mensaje de error
       Swal.fire('Error Login', 'Username o password vacías!', 'error');
      return;
    }
    

  }

}
