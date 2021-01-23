import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProfilePageRoutingModule } from './profile-routing.module';

// tslint:disable-next-line: ordered-imports
import { UserDetailComponent } from '../user-detail/user-detail.component';
import { ProfilePage } from './profile.page';
import { NgxIonicImageViewerModule } from 'ngx-ionic-image-viewer';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProfilePageRoutingModule,
    NgxIonicImageViewerModule
  ],
  declarations: [
    ProfilePage,
    UserDetailComponent,
  
    ]
})
export class ProfilePageModule {}
