import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { PasswordPageRoutingModule } from './password-routing.module';
import { PasswordPage } from './password.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PasswordPageRoutingModule,
    PasswordPage, // Importa el componente standalone
  ],
})
export class PasswordPageModule {}
