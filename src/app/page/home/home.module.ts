
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HomePageRoutingModule } from './home-routing.module';

import { HomePage } from './home.page';
import { CelebrationcardComponent } from '../../container/celebrationcard/celebrationcard.component';
import { NgPipesModule } from 'ngx-pipes';
import { HearderComponent } from 'src/app/container/hearder/hearder.component';
import { Angular4PaystackModule } from 'angular4-paystack';


@NgModule({
  imports: [

    Angular4PaystackModule.forRoot('pk_test_f3d0fe02c3b6e503123604db32b74608f84083c3'),
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
    NgPipesModule,
    // HearderComponent
  ],
  declarations: [HomePage,  CelebrationcardComponent]
})
export class HomePageModule {}
