import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
<<<<<<< Updated upstream
=======
import { authGuard } from './Guards/auth.guard';
>>>>>>> Stashed changes

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
<<<<<<< Updated upstream
    loadChildren: () => import('./perfil/perfil.module').then(m => m.PerfilPageModule)
=======
    loadChildren: () => import('./perfil/perfil.module').then(m => m.PerfilPageModule),
    canActivate: [authGuard],
>>>>>>> Stashed changes
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
    path: 'error',
<<<<<<< Updated upstream
    loadChildren: () =>
      import('./error/error.module').then((m) => m.ErrorPageModule),
  },
  {
    path: '**',
    redirectTo: 'error',
  },


=======
    loadChildren: () => import('./error/error.module').then( m => m.ErrorPageModule)
  },


  {
    path: 'error',
    loadChildren: () =>
      import('./error/error.module').then((m) =>m.ErrorPageModule),
  },

  {
    path: '**',
    redirectTo: 'error',
  },


>>>>>>> Stashed changes
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
