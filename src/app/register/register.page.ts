import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../Servicios/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: false,
})
export class RegisterPage implements OnInit {
  constructor(
    private router: Router,
    private auth: AuthService
  ) {}

  user = {
    usuario: '',
    correo: '',
    password: '',
  };

  msj: string = '';  // Variable para mostrar mensajes de error o éxito

  ngOnInit() {}

  goHome() {
    this.router.navigate(['/home']);
  }

  registrar() {
    this.msj = '';  // Limpiar mensaje antes de validar

    // Validación de campos vacíos
    if (this.user.usuario.length === 0) {
      this.msj = 'El campo de usuario no puede estar vacío.';
      return;
    }

    if (this.user.password.length === 0) {
      this.msj = 'El campo de contraseña no puede estar vacío.';
      return;
    }

    if (this.user.correo.trim().length === 0) {
      this.msj = 'El campo de correo no puede estar vacío.';
      return;
    }

    // Validación de longitud
    if (this.user.usuario.length > 20) {
      this.msj = 'El nombre de usuario no puede exceder los 20 caracteres.';
      return;
    }

    if (this.user.password.length < 6 || this.user.password.length > 20) {
      this.msj = 'La contraseña debe tener entre 6 y 20 caracteres.';
      return;
    }

    if (this.user.correo.length > 50) {
      this.msj = 'El correo no puede exceder los 50 caracteres.';
      return;
    }

    // Registro de usuario
    this.auth.registerAPI(this.user.usuario, this.user.correo, this.user.password).then((res) => {
      if (res) {
        this.msj = 'Registro Exitoso. Redireccionando...';
        setTimeout(() => {
          this.router.navigate(['/home']);
        }, 1500);
      } else {
        this.msj = 'Correo o usuario ya existen.';
      }
    }).catch((error) => {
      this.msj = 'Hubo un error al procesar la solicitud.';
    });
  }
}
