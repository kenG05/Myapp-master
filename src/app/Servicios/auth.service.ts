import { Injectable } from '@angular/core';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  private static isLogged : boolean = false;
  private storage:LocalStorageService = new LocalStorageService();
  constructor() { }

  login(user: string,  pass:string): boolean {
    if(
      (user == 'Bellota' || user == 'bellota@gmail.com' )  && 
      pass== '123456'
 ) {
  AuthService.isLogged = true;
  return true;
 } else {
   return false;
 }
}
loginStorage(user: string, pass: string): boolean {
  //Obtenemos la lista de usuarios
  const listaUsuarios = this.storage.getItem('users') || [];
  //Filtramos la lista segun su usuario/correo y su contraseña
  //Si encuentra retorna un objeto usuario , sino , null
  const conectado = listaUsuarios.find(
    (userFind: any) =>
      (userFind.username == user || userFind.correo == user) &&
      userFind.pass == pass
  );
  //Si conectado tiene valor , las credenciales fueron validas
    //EN caso contrario , se le niega el acceso
    if (conectado) {
      //Guardamos el usuario encontrado en el almacenamiento local
      this.storage.setItem('conectado', conectado);
      return true;
    } else {
      return false;
    }
  }
  registrar(user: string, correo: string, pass: string) {
    //Recuperamos la lista de usuarios
    const listaUsuarios = this.storage.getItem('users') || [];
    //Comparamos usuario y correo para validar que no existan en el registro de usuarios
    if (
      listaUsuarios.find(
        (userFind: any) =>
          userFind.username == user || userFind.correo == correo
      )
    ) {
      return false;
    }
   //Creamos una nueva entidad de usuario
   const nuevoUsuario = {
    id: listaUsuarios.length + 1,
    username: user,
    correo: correo,
    pass: pass,
  };
  //Agregamos a la lista
  listaUsuarios.push(nuevoUsuario);
  //Devolvemos el registro de usuarios a su lugar
  this.storage.setItem('users', listaUsuarios);
  return true;
}

isConnected(): boolean {
  return this.storage.getItem('conectado') !== null;
}

logout() {
  this.storage.removeItem('conectado');
}
}

