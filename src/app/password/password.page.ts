import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'; // Solo Router es necesario
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-password',
  templateUrl: './password.page.html',
  styleUrls: ['./password.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
})
export class PasswordPage implements OnInit {

  user = {
    email: '',
  };

  msj = '';

  constructor(private router: Router) {}

  ngOnInit() {}

  goHome() {
    this.router.navigate(['/home']);
  }

  conectar() {
    this.msj = '';
    
    // Validación: el correo no puede estar vacío
    if (this.user.email.length === 0) {
      this.msj = 'El correo electrónico no puede estar vacío.';
      return;
    }

    // Validación: el formato del correo debe ser válido
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(this.user.email)) {
      this.msj = 'El formato del correo electrónico no es válido.';
      return;
    }

    // Validación: el correo no puede exceder los 50 caracteres
    if (this.user.email.length > 20) {
      this.msj = 'El correo electrónico no puede exceder los 20 caracteres.';
      return;
    }

    // Simulación de conexión (puedes reemplazar esta parte con la lógica real)
    this.msj = 'Correo verificado correctamente. Redireccioanado...';
    setTimeout(() => {
      this.msj = ''; // Limpia el mensaje después de unos segundos
      this.siguiente();
    }, 2000);
  }

  siguiente() {
    this.router.navigate(['/viewmail']);
  }
}
