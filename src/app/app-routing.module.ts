import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

import { authGuard } from './Guards/auth.guard';


const routes: Routes = [
  {
    path: '',
    redirectTo: 'home', // Redirige directamente a 'home'
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomePageModule)
  },
  {
    path: 'perfil',


    loadChildren: () => import('./perfil/perfil.module').then(m => m.PerfilPageModule),
    canActivate: [authGuard],

  },
 
  {
    path: 'password',
    loadChildren: () => import('./password/password.module').then(m => m.PasswordPageModule)
  },
  {
    path: 'viewmail',
    loadChildren: () => import('./viewmail/viewmail.module').then( m => m.ViewmailPageModule)
  },
  {
    path: 'register',
    loadChildren: () =>
      import('./register/register.module').then((m) => m.RegisterPageModule),
  },
  {
    path: 'error',
    loadChildren: () =>
      import('./error/error.module').then((m) => m.ErrorPageModule),
  },
  {
    path: 'dispo',
    loadChildren: () => 
      import('./dispo/dispo.module').then((m) => m.DispoPageModule),
     
  },

  {
    path: 'splash',
    loadChildren: () => import('./splash/splash.module').then( m => m.SplashPageModule)
  },
  
  {
    path: 'conductor',
    loadChildren: () => import('./conductor/conductor.module').then(m => m.ConductorPageModule)
  },

  {
    path: '**',
    redirectTo: 'error',
  },

  

  





];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
