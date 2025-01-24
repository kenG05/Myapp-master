import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'; 
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

  
    if (!this.user.email.trim()) {
      this.msj = 'El correo electrónico no puede estar vacío.';
      return;
    }


    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(this.user.email)) {
      this.msj = 'El formato del correo electrónico no es válido.';
      return;
    }

    if (this.user.email.trim().length > 20) {
      this.msj = 'El correo electrónico no puede exceder los 20 caracteres.';
      return;
    }

 
    this.msj = 'Correo verificado correctamente. Redireccionando...';
    setTimeout(() => {
      this.msj = ''; 
      this.siguiente();
    }, 2000);
  }

 
  siguiente() {
    this.router.navigate(['/viewmail']);
  }
}
