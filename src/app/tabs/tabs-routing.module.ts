import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../db/service/auth-guard.service';
import { TabsPage } from './tabs.page';
import { RoutnetworkguardService } from '../helper/routnetworkguard.service';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'home',
        loadChildren: () => import('../page/home/home.module').then(m => m.HomePageModule),
        canActivate: [AuthGuard],
      },
      {
        path: 'profile/:userid',
        loadChildren: () => import('../page/profile/profile/profile.module').then(m => m.ProfilePageModule),
        canActivate: [AuthGuard],
      },
      {
        path: 'messsage',
        loadChildren: () => import('../page/message/messgaelist/messgaelist.module').then(m => m.MessgaelistPageModule),
        canActivate: [AuthGuard],
      },
      {
        path: 'wallet',
        loadChildren: () => import('../page/payment/wallet/wallet.module').then(m => m.WalletPageModule),
        canActivate: [AuthGuard],
      },
      {
        path: 'noservice',
        loadChildren: () => import('../page/mainservice/nosevice/nosevice.module').then(m => m.NosevicePageModule),
        canActivate: [AuthGuard],
      },
  
      {
        path: 'community',
        loadChildren: () => import('../page/community/group/group.module').then(m => m.GroupPageModule),
        canActivate: [AuthGuard],
      },
      {
        path: 'market',
        loadChildren: () => import('../page/marketplace/market/market.module').then(m => m.MarketPageModule),
        canActivate: [AuthGuard],
      },
      {
        path: "devotion",
        loadChildren: () => import('../page/allDevotional/devolotion/devolotion.module').then(m => m.DevolotionPageModule),
        canActivate: [],
      },
      {
        path: '',
        redirectTo: '/tabs/home',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: '',
    redirectTo: '/tabs/home',
    pathMatch: 'full',
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabsPageRoutingModule {}
