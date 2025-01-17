import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ViewmailPage } from './viewmail.page';

const routes: Routes = [
  {
    path: '',
    component: ViewmailPage, // Componente no standalone
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ViewmailPageRoutingModule {}
