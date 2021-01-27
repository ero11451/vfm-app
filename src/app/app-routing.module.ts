import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './db/service/auth-guard.service';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./page/home/home.module').then( m => m.HomePageModule),
  },
  {
    path: 'wallet',
    loadChildren: () => import('./page/payment/wallet/wallet.module').then( m => m.WalletPageModule)
  },
 
  {
    path: 'fondwallet',
    loadChildren: () => import('./page/payment/founding/founding.module').then( m => m.FoundingPageModule)
  },
  {
    path: 'location',
    loadChildren: () => import('./page/alllocation/location/location.module').then( m => m.LocationPageModule)
  },
  {
    path: 'bible',
    loadChildren: () => import('./page/bible/bible/bible.module').then( m => m.BiblePageModule)
  },
  {
    path: 'devotion',
    loadChildren: () => import('./page/allDevotional/devolotion/devolotion.module').then( m => m.DevolotionPageModule)
  },
  {
    path: 'group',
    loadChildren: () => import('./page/community/group/group.module').then( m => m.GroupPageModule)
  },
 
  {
    path: 'giving/:walletBallance',
    loadChildren: () => import('./page/payment/giving/giving.module').then( m => m.GivingPageModule)
  },
  {
    path: 'messgaelist/:channelId',
    loadChildren: () => import('./page/message/messgaedetail/messgaedetail.module').then( m => m.MessgaedetailPageModule)
  },
  {
    path: 'message',
    loadChildren: () => import('./page/message/messgaelist/messgaelist.module').then( m => m.MessgaelistPageModule)
  },
  {
    path: 'paymentlist',
    loadChildren: () => import('./page/payment/paymentlist/paymentlist.module').then( m => m.PaymentlistPageModule)
  },
  {
    path: 'menu',
    loadChildren: () => import('./container/menu/menu.module').then( m => m.MenuPageModule)
  },
  {
    path: 'edit',
    loadChildren: () => import('./page/profile/edit-profile/edit-profile.module').then( m => m.EditProfilePageModule)
  },
  {
    path: 'profile/:userid',
    loadChildren: () => import('./page/profile/profile/profile.module').then( m => m.ProfilePageModule)
  },

  {
    path: 'setting',
    loadChildren: () => import('./container/setting/setting.module').then( m => m.SettingPageModule)
  },
  {
    path: 'makepost',
    loadChildren: () => import('./page/community/makepost/makepost.module').then( m => m.MakepostPageModule)
  },
  {
    path: 'comment/:postid',
    loadChildren: () => import('./page/community/comment/comment.module').then( m => m.CommentPageModule)
  },
  {
    path: 'logout',
    loadChildren: () => import('./container/logout/logout.module').then( m => m.LogoutPageModule)
  },
  {
    path: 'feedback',
    loadChildren: () => import('./container/feedback/feedback.module').then( m => m.FeedbackPageModule)
  },
  {
    path: 'banktransfer',
    loadChildren: () => import('./page/payment/foundwallet/foundwallet.module').then( m => m.FoundwalletPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./page/reg/login/login.module').then( m => m.LoginPageModule),
  },
  {
    path: 'register',
    loadChildren: () => import('./page/reg/register/register.module').then( m => m.RegisterPageModule),
  },

  {
    path: 'chapter/:name',
    loadChildren: () => import('./page/bible/chapter/chapter.module').then( m => m.ChapterPageModule)
  },
  {
    path: 'signup',
    loadChildren: () => import('./page/reg/signup/signup.module').then( m => m.SignupPageModule)
  },
  {
    path: 'market',
    loadChildren: () => import('./page/marketplace/market/market.module').then( m => m.MarketPageModule)
  },
  {
    path: 'nosevice',
    loadChildren: () => import('./page/mainservice/nosevice/nosevice.module').then( m => m.NosevicePageModule)
  },
  {
    path: 'celebrationcard/:walletamount',
    loadChildren: () => import('./page/payment/celebrationcard/celebrationcard.module').then( m => m.CelebrationcardPageModule)
  },
  {
    path: 'subscription',
    loadChildren: () => import('./page/payment/subcription/subcription.module').then( m => m.SubcriptionPageModule)
  },
  {
    path: 'productdetail/:pid',
    loadChildren: () => import('./page/marketplace/productdetail/productdetail.module').then( m => m.ProductdetailPageModule)
  },

  {
    path: 'uploaddevotional',
    loadChildren: () => import('./page/allDevotional/uploaddevotional/uploaddevotional.module').then( m => m.UploaddevotionalPageModule)
  },
  {
    path: 'search',
    loadChildren: () => import('./page/community/search/search.module').then( m => m.SearchPageModule)
  },
 
  {
    path: 'mypost',
    loadChildren: () => import('./page/profile/mypost/mypost.module').then( m => m.MypostPageModule)
  },
  {
    path: 'successful',
    loadChildren: () => import('./page/payment/successful/successful.module').then( m => m.SuccessfulPageModule)
  },
  {
    path: 'forget',
    loadChildren: () => import('./page/reg/forget/forget.module').then( m => m.ForgetPageModule)
  },
  {
    path: 'notelist',
    loadChildren: () => import('./page/note/notelist/notelist.module').then( m => m.NotelistPageModule)
  },
  {
    path: 'notedetail/:noteid',
    loadChildren: () => import('./page/note/notedetail/notedetail.module').then( m => m.NotedetailPageModule)
  },
  {
    path: 'devonationdetail/:id',
    loadChildren: () => import('./page/allDevotional/devonationdetail/devonationdetail.module').then( m => m.DevonationdetailPageModule)
  },
  {
    path: 'pastor',
    loadChildren: () => import('./page/pastor/pastor.module').then( m => m.PastorPageModule)
  },
  {
    path: 'makenote',
    loadChildren: () => import('./page/note/makenote/makenote.module').then( m => m.MakenotePageModule)
  },
  {
    path: 'homecell',
    loadChildren: () => import('./page/alllocation/homecell/homecell.module').then( m => m.HomecellPageModule)
  },
  {
    path: 'my-purchase',
    loadChildren: () => import('./page/profile/my-purchase/my-purchase.module').then( m => m.MyPurchasePageModule)
  },


];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
