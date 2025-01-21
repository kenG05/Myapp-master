import { Component } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { AnimationController } from '@ionic/angular';
<<<<<<< Updated upstream
import { AuthService } from '../service/auth.service';
=======
import { AuthService } from '../Servicios/auth.service';
>>>>>>> Stashed changes
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false,
})
export class HomePage {
  user = {
    usuario: '',
    password: '',
  };

  msj = '';
  carga= false;
<<<<<<< Updated upstream
  constructor(private router: Router, private animation: AnimationController,private auth:AuthService) {}
=======
  constructor(private router: Router, 
    private animation: AnimationController, 
    private auth: AuthService) {}
>>>>>>> Stashed changes

  conectar() {
    // Validación: el campo de usuario no puede estar vacío
    if (this.user.usuario.length === 0) {
      this.msj = 'El campo de usuario no puede estar vacío.';
      return;
    }
  
    // Validación: el campo de contraseña no puede estar vacío
    if (this.user.password.length === 0) {
      this.msj = 'El campo de contraseña no puede estar vacío.';
      return;
    }
  
    // Validación: la contraseña debe tener al menos 6 caracteres
    if (this.user.password.length < 6) {
      this.msj = 'La contraseña debe tener al menos 6 caracteres.';
      return;
    }
  
    // Validación de credenciales
    if (this.auth.login(this.user.usuario, this.user.password)){
      let navigationExtras: NavigationExtras = {
        state: { user: this.user },
      };
      
      this.carga = true;
      this.msj = 'Conexión exitosa. Redirigiendo...';
  
      setTimeout(() => {
        this.router.navigate(['/perfil'], navigationExtras);
        this.msj = '';
        this.carga = false;
      }, 3000);
    } else {
      this.msj = 'Usuario o contraseña incorrectos.';
    }
  }
  

  ngAfterContentInit(){
    this.animacionLogin();
  }

  animacionLogin(){
    const imagen = document.querySelector(
      '#container ion-card ion-card-header ion-img'
    ) as HTMLElement;

    const animacion = this.animation
    .create()
    .addElement(imagen)
    .duration(3000)
    .iterations(Infinity)
    .keyframes(
      [
        { 
          offset: 0, 
          opacity: '1', 
          transform: 'scale(1)' 
        },
        { 
          offset: 0.25, 
          opacity: '0.7', 
          transform: 'scale(1.2)' 
        },
        { 
          offset: 0.5, 
          opacity: '0.5', 
          transform: 'scale(1)' 
        },
        { 
          offset: 0.75, 
          opacity: '0.3', 
          transform: 'scale(0.8)' 
        },
        { 
          offset: 1, 
          opacity: '1', 
          transform: 'scale(1)' 
        },
      ]
    );
  
  animacion.play();
  }
}




