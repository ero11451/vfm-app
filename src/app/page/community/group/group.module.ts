import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GroupPageRoutingModule } from './group-routing.module';

import { GroupPage } from './group.page';
import { SearchPage } from '../search/search.page';
import {NgPipesModule} from 'ngx-pipes';
import { NgxIonicImageViewerModule } from 'ngx-ionic-image-viewer';
import { TestimonyComponent } from '../testimony/testimony.component';
import { UpdateandeventsComponent } from '../updateandevents/updateandevents.component';
import { CelebrationComponent } from '../celebration/celebration.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GroupPageRoutingModule,
    NgPipesModule,
    NgxIonicImageViewerModule
  ],
  declarations: [GroupPage , SearchPage, TestimonyComponent , UpdateandeventsComponent , CelebrationComponent]
})
export class GroupPageModule {}
