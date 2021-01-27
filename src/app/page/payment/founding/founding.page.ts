import { Component, OnInit, ViewChild } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { IonSlides, ModalController } from '@ionic/angular';
import { Flutterwave, InlinePaymentOptions, PaymentSuccessResponse } from 'flutterwave-angular-v3';
import { Observable } from 'rxjs';
import { User } from 'src/app/db/model/user';
import { AuthService } from 'src/app/db/service/auth.service';
import { UserService } from 'src/app/db/service/user.service';
import { IonhelperService } from 'src/app/helper/ionhelper.service';
@Component({
  selector: 'app-founding',
  templateUrl: './founding.page.html',
  styleUrls: ['./founding.page.scss'],
})
export class FoundingPage implements OnInit {
  userEmail
  userName
  userPhone
  userId
  currency
  Prayerpoints;
  amount: number ;

  publicKey = "FLWPUBK_TEST-2f74d912a92c6c93957868a71f0c7f73-X";
 

  @ViewChild('slides', { static: true }) slider: IonSlides;  
  segment = 0;
  async segmentChanged(ev: any) {
    await this.slider.slideTo(this.segment);
  }

  async slideChanged() {
    this.segment = await this.slider.getActiveIndex();
  }
  constructor(
    private auth : AuthService, 
    private flutterwave: Flutterwave ,
    private userSer : UserService,
    public authFire: AngularFireAuth,
    private ion: IonhelperService,
    private modalController: ModalController
    ) { }

  ngOnInit() {
    this.getUserDetails()
  }

  getUserDetails(){
    this.authFire.currentUser.then(user => {
        this.userId = user.uid
        this.userSer.retrieveUserDocumentFromID(user.uid).subscribe(user => {
          console.log(user)
           this.userEmail = user.email
           this.userName  = user.displayName
           this.userPhone = user.phoneNumber
      });
    })
  }
  fundWallWith(amount){
    this.auth.fundWallet(amount)
   }
  
 

 customizations = {
   title: 'Fund your E-wallet', 
   description: 'Just pay and your e-wallet will be credited ', 
   logo: 'https://flutterwave.com/images/logo-colored.svg'}


    makePayment()  {
     if (this.amount < 999 ) {
      return  this.ion.ionLoading('You can only fund your wallet with 1000 or more',3000 )
     }
     if (!this.currency) {
      return  this.ion.ionLoading('please select a currency', 2000)
     }else{
     const  meta = {'counsumer_id': this.userId, 'consumer_mac': 'kjs9s8ss7dd'}
     const  customerDetails = { 
        name: this.userName, 
        email: this.userEmail, 
        phone_number: this.userPhone
       }
      console.log('you did not enter any input please inter an input')
      const  paymentData: InlinePaymentOptions = {
          public_key: this.publicKey,
          tx_ref: this.generateReference(),
          amount: this.amount,
          currency: this.currency,
          payment_options: 'card,ussd',
          redirect_url: '',
          meta: meta,
          customer: customerDetails,
          customizations: this.customizations,
          callback: this.makePaymentCallback,
          onclose: this.closedPaymentModal,
          callbackContext: this
      }
      this.flutterwave.inlinePay(paymentData)
      if (this.currency == 'NGN')   this.amount = this.amount 
      if (this.currency ==  'USD')  this.amount = this.amount * 350
    }
    }
    
    makePaymentCallback(response: PaymentSuccessResponse): void {
      console.log("Payment callback", response);
      this.fundWallWith(this.amount)
    }
    closedPaymentModal(): void {
      console.log('payment is closed');
    }
    generateReference(): string {
      let date = new Date();
      return date.getTime().toString();
    }
    close(){
     this.modalController.dismiss()
    }
}