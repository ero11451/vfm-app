import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NosevicePageRoutingModule } from './nosevice-routing.module';

import { NosevicePage } from './nosevice.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NosevicePageRoutingModule
  ],
  declarations: [NosevicePage]
})
export class NosevicePageModule {}
