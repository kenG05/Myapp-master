import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
<<<<<<< Updated upstream
import { AuthService } from '../service/auth.service';
=======
import { AuthService } from '../Servicios/auth.service';
>>>>>>> Stashed changes
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
  standalone: false,
})
export class PerfilPage implements OnInit {

<<<<<<< Updated upstream
  constructor(private auth: AuthService, private router: Router, private toast: ToastController) { }
=======
  constructor(
    private auth: AuthService,
    private router: Router,
    private toast: ToastController

  ) {}
>>>>>>> Stashed changes

  user = {
    usuario: '',
    password: '',
  };

  nombreUsuario = '';
  ngOnInit() { }
  ngAfterContentInit() {
    this.user = history.state.user;
    this.nombreUsuario = this.user.usuario;
  }

<<<<<<< Updated upstream
  logout() {
    this.auth.logout();
    this.router.navigate(['/home']);
    this.generarToast('Usuario Desconectado');
=======
  logout(){
    this.auth.logout();
    this.router.navigate(['/home']);
    this.generarToast("Usuario Desconectado");
>>>>>>> Stashed changes
  }

  generarToast(message: string) {
    const toast = this.toast.create({
<<<<<<< Updated upstream
      message: message,
      duration: 3000,
      position: 'bottom',
    });
=======
      message : message,
      duration: 3000,
      position: 'bottom',
    });

>>>>>>> Stashed changes
    toast.then((res) => {
      res.present();
    });
  }

<<<<<<< Updated upstream
=======
 
>>>>>>> Stashed changes

}

