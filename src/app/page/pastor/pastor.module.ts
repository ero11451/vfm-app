import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PastorPageRoutingModule } from './pastor-routing.module';

import { PastorPage } from './pastor.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PastorPageRoutingModule
  ],
  declarations: [PastorPage]
})
export class PastorPageModule {}
