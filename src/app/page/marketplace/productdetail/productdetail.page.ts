import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { WbserviceService } from 'src/app/allapi/wbservice.service';
import { AuthService } from 'src/app/db/service/auth.service';
import { UserService } from 'src/app/db/service/user.service';
import { IonhelperService } from 'src/app/helper/ionhelper.service';

import {Flutterwave, InlinePaymentOptions, PaymentSuccessResponse} from "flutterwave-angular-v3";
@Component({
  selector: 'app-productdetail',
  templateUrl: './productdetail.page.html',
  styleUrls: ['./productdetail.page.scss'],
})
export class ProductdetailPage implements OnInit {

  pid
  description
  name
  image
  price
  sale_price
  stock_status
  regular_price

  // payment
  
  username :string
  userEamil :string
  userId :string
  displayImage:string
  phoneNumber:number
  constructor(
    private activatedRoute: ActivatedRoute,
    private postSrvc: WbserviceService,

    private flutterwave: Flutterwave ,
    private ion : IonhelperService,
    public userSer: UserService,
   public auth: AuthService,) {
  
      this.loadData()
    }
  ngOnInit() {
    this.pid = this.activatedRoute.snapshot.params.pid;
    this.loadData()
  }
  loadData() {
    this.postSrvc.getProduct(this.pid).subscribe(res => {
         this.description = res;
         this.name = res.name
         this.image = res.images[0].src
         this.price = res.price
         this.sale_price = res.sale_price
         this.stock_status = res.stock_status
         this.regular_price  = res.regular_price
         console.log('this is the deatiel', res)
       })
   }
   
   currency:string;
   Prayerpoints:string;
   amount: number ;
 
   publicKey = "FLWPUBK_TEST-2f74d912a92c6c93957868a71f0c7f73-X";
  
 
 
  customizations = {
    title: 'Voice OF freedom', 
    description: 'Give to God', 
    logo: 'https://flutterwave.com/images/logo-colored.svg'}
 
 
  makePayment()  {       

    const meta = {'counsumer_id': this.userId, 'consumer_mac': 'kjs9s8ss7dd'}

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
           amount: this.price,
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
