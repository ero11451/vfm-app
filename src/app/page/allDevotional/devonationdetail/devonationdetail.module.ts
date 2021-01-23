import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DevonationdetailPageRoutingModule } from './devonationdetail-routing.module';

import { DevonationdetailPage } from './devonationdetail.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DevonationdetailPageRoutingModule
  ],
  declarations: [DevonationdetailPage]
})
export class DevonationdetailPageModule {}
