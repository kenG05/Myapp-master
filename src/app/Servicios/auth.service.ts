import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private static isLogged:boolean = false;
  constructor() { }

  login(user:string,pass:string): boolean {
    if(
      (user == 'Bellota' || user == 'bellota@gmail.com' )&& 
      pass== '123456'
 ) {
  AuthService.isLogged = true;
  return true;
 } else {
   return false;
 }
}

 isConnected(): boolean{
   return AuthService.isLogged;
 }

 logout(){
   AuthService.isLogged = false;
 }
}

