import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { ViewmailPageRoutingModule } from './viewmail-routing.module';
import { ViewmailPage } from './viewmail.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ViewmailPageRoutingModule,
  ],
  declarations: [ViewmailPage], // Declaración del componente
})
export class ViewmailPageModule {}
