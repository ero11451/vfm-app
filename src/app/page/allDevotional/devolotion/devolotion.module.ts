import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DevolotionPageRoutingModule } from './devolotion-routing.module';

import { DevolotionPage } from './devolotion.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DevolotionPageRoutingModule
  ],
  declarations: [DevolotionPage]
})
export class DevolotionPageModule {}
