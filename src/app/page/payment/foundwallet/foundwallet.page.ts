import { Component, OnInit } from '@angular/core';
import {Flutterwave, InlinePaymentOptions, PaymentSuccessResponse} from "flutterwave-angular-v3";
import { AuthService } from 'src/app/db/service/auth.service';
import { UserService } from 'src/app/db/service/user.service';
import { IonhelperService } from 'src/app/helper/ionhelper.service';
 
@Component({
  selector: 'app-foundwallet',
  templateUrl: './foundwallet.page.html',
  styleUrls: ['./foundwallet.page.scss'],
})
export class FoundwalletPage implements OnInit {

  username :string
  userEamil :string
  userId :string
  displayImage:string
  phoneNumber:number
 //Inject the flutterwave service 
 constructor(
   private flutterwave: Flutterwave ,
   private ion : IonhelperService,
   public userSer: UserService,
  public auth: AuthService,) {
  this.amount = 0;

 }
  ngOnInit() {  
    this.getCurrentUser()
   }
  currency:string;
  Prayerpoints:string;
  amount: number ;

  publicKey = "FLWPUBK_TEST-2f74d912a92c6c93957868a71f0c7f73-X";
 


 customizations = {
   title: 'Voice OF freedom', 
   description: 'Give to God', 
   logo: 'https://flutterwave.com/images/logo-colored.svg'}

 meta = {'counsumer_id': '7898', 'consumer_mac': 'kjs9s8ss7dd'}

    makePayment()  {
      const customerDetails = { 
        name: this.username, 
        email: this.userEamil, 
        phone_number: this.phoneNumber}
      if (!this.amount && !this.Prayerpoints  && !this.currency ) {
       this.ion.ionToast('enter a value', 2000, 'primary')
      }else{
       console.log(this.amount, this.Prayerpoints, this.currency)
       const  paymentData: InlinePaymentOptions = {
          public_key: this.publicKey,
          tx_ref: this.generateReference(),
          amount: this.amount,
          currency: this.currency,
          payment_options: 'card,ussd',
          redirect_url: '',
          meta: this.meta,
          customer: customerDetails,
          customizations: this.customizations,
          callback: this.makePaymentCallback,
          onclose: this.closedPaymentModal,
          callbackContext: this
      }
      this.flutterwave.inlinePay(paymentData)
    }

    }
    makePaymentCallback(response: PaymentSuccessResponse): void {
      console.log("Payment callback", response);
    }
    closedPaymentModal(): void {
      console.log('payment is closed');
    }
    generateReference(): string {
      let date = new Date();
      return date.getTime().toString();
    }


  getCurrentUser() {
    this.auth.getAuthState()(
      user => {
        if (user) {
          console.log('user information', user)
          this.userSer.retrieveUserDocument(user.uid).subscribe(
            userDoc => {
              console.log('user information', )
              if (userDoc) {
                this.displayImage = userDoc.userImage;
                this.username = userDoc.displayName;
                this.userEamil = userDoc.email;
                this.userId = userDoc.uid;
                this.phoneNumber = userDoc.phoneNumber
              }
            });
        } else {

        }
    });
  }
}
