import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DispoPage } from './dispo.page';

const routes: Routes = [
  {
    path: '',
    component: DispoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DispoPageRoutingModule {}
