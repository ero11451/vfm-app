import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MakepostPageRoutingModule } from './makepost-routing.module';

import { MakepostPage } from './makepost.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MakepostPageRoutingModule
  ],
  declarations: [MakepostPage]
})
export class MakepostPageModule {}
