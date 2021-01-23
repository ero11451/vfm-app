import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MessgaelistPageRoutingModule } from './messgaelist-routing.module';

import { MessgaelistPage } from './messgaelist.page';

import {NgPipesModule} from 'ngx-pipes';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MessgaelistPageRoutingModule,
    NgPipesModule
  ],
  declarations: [MessgaelistPage]
})
export class MessgaelistPageModule {}
