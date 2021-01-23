import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MessgaedetailPageRoutingModule } from './messgaedetail-routing.module';

import { MessgaedetailPage } from './messgaedetail.page';
import { NgPipesModule } from 'ngx-pipes';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MessgaedetailPageRoutingModule,
    NgPipesModule
  ],
  declarations: [MessgaedetailPage]
})
export class MessgaedetailPageModule {}
