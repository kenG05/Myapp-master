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
  
    // Verificar si el correo está vacío
    if (this.user.email.length === 0) {
      this.msj = 'El correo electrónico no puede estar vacío';
      return;
    }
  
  
  }
}
