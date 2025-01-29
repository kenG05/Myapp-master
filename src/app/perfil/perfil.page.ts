import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../Servicios/auth.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
  standalone: false,
})
export class PerfilPage implements OnInit {



  constructor(
    private auth: AuthService,
    private router: Router,
    private toast: ToastController

  ) {}


  user = {
    usuario: '',
    password: '',
  };

  nombreUsuario = '';

  ngOnInit() { }

  ngAfterContentInit() {
    if(history.state?.user){
      this.user = history.state.user;
      this.nombreUsuario = this.user.usuario;
    }else{
      this.generarToast('Sesion Invalida');
      this.router.navigate(['/home']);
    }
    
  }


  logout() {
    this.auth.logout();
    this.router.navigate(['/home']);
    this.generarToast('Usuario Desconectado');


  }

 

  generarToast(message: string) {
    const toast = this.toast.create({

      message: message,
      duration: 3000,
      position: 'bottom',
    });

    toast.then((res) => {
      res.present();
    });
  }


}

