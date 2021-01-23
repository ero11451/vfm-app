import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GivingPageRoutingModule } from './giving-routing.module';

import { GivingPage } from './giving.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GivingPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [GivingPage , ]
})
export class GivingPageModule {}
