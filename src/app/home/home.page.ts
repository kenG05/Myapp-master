import { Component } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { AnimationController } from '@ionic/angular';
import { AuthService } from '../Servicios/auth.service';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false,
})
export class HomePage {
  register() {
    this.router.navigate(['/register']);
  }
  user = {
    usuario: '',
    password: '',
  };

  msj = '';
  carga= false;


  constructor(
    private router: Router, 
    private animation: AnimationController, 
    private auth: AuthService) {}


  /*conectar() {
    if (this.user.usuario.length > 0 && this.user.password.length > 0) {
      this.auth.loginAPI(this.user.usuario, this.user.password).then((res) => {
        if (res) {
          let navigationExtras: NavigationExtras = {
            state: { user: this.user },
          };
          this.carga = true;
          this.animacionLogin();
          this.msj = 'Conexion Exitosa';
       
          setTimeout(() => {
            this.router.navigate(['/perfil'], navigationExtras);
            this.msj = '';
            this.carga = false;
          }, 3000);
        } else {
          this.msj = 'Credenciales erroneas';
        }
      });
    } else {
      this.msj = 'Credenciales no pueden estar vacias';
    }
  } */

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
    
      // Validación de credenciales (manejando la promesa)
      this.auth.loginAPI(this.user.usuario, this.user.password).then((res) => {
        if (res) {
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
      }).catch((error) => {
        // Manejo de errores
        console.error('Error en la autenticación:', error);
        this.msj = 'Hubo un error al procesar la solicitud.';
      });
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




