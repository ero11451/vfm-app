import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FoundwalletPageRoutingModule } from './foundwallet-routing.module';

import { FoundwalletPage } from './foundwallet.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FoundwalletPageRoutingModule
  ],
  declarations: [FoundwalletPage]
})
export class FoundwalletPageModule {}
