import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MakenotePageRoutingModule } from './makenote-routing.module';

import { MakenotePage } from './makenote.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MakenotePageRoutingModule
  ],
  declarations: [MakenotePage]
})
export class MakenotePageModule {}
