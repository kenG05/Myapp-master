import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { DispoPageRoutingModule } from './dispo-routing.module';
import { RouterModule, Routes } from '@angular/router';
import { DispoPage } from './dispo.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DispoPageRoutingModule
  ],
  declarations: [DispoPage]
})
export class DispoPageModule {}
