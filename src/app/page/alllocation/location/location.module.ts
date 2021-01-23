import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LocationPageRoutingModule } from './location-routing.module';

import { LocationPage } from './location.page';
import { BranchlocationComponent } from '../branchlocation/branchlocation.component';
import { HomecelllocationComponent } from '../homecelllocation/homecelllocation.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LocationPageRoutingModule
  ],
  declarations: [LocationPage,BranchlocationComponent, HomecelllocationComponent]
})
export class LocationPageModule {}
