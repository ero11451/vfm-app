import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IonicModule } from '@ionic/angular';

import { LogoutPageRoutingModule } from './logout-routing.module';

import { LogoutPage } from './logout.page';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    LogoutPageRoutingModule
  ],
  declarations: [LogoutPage]
})
export class LogoutPageModule {}
