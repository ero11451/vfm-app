import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { WalletServiceService } from 'src/app/db/service/wallet-service.service';
import { IonhelperService } from 'src/app/helper/ionhelper.service';

@Component({
  selector: 'app-giving',
  templateUrl: './giving.page.html',
  styleUrls: ['./giving.page.scss'],
})
export class GivingPage implements OnInit {


  walletBallance

  constructor(
    private formBuilder: FormBuilder,
    public afAuth: AngularFireAuth,
    private walletSer : WalletServiceService,
    private activatedRoute: ActivatedRoute,
    private ion: IonhelperService
    ) { }
// tslint:disable-next-line: variable-name
  validations_form: FormGroup;
  // tslint:disable-next-line: variable-name
  validation_messages = {
    propose: [
      { type: 'required', message: 'Username is required.' },
      { type: 'minlength', message: 'Enter a valid username.' }
    ],
    amount: [
      { type: 'required', message: 'phone number is required.' },
      { type: 'minlength', message: 'Enter a valid phone number.' }
    ],
    preyerPoint: [
      { type: 'required', message: 'Email is required.' },
      { type: 'pattern', message: 'Enter a valid email.' }
    ]
  };
  ngOnInit() {
    this.walletBallance = this.activatedRoute.snapshot.params.walletBallance;
    console.log(this.walletBallance)
    this.validations_form = this.formBuilder.group({
      propose: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(5),
      ])),
      amount:new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(1),
        Validators.nullValidator,
      ])),
      preyerPoint: new FormControl('', Validators.compose([
        Validators.required,
      ])),
   
    });
    this.getWalerBallance()
  }
 
tryRegister(value) {
  if (value.amount > this.walletBallance) {
    this.ion.ionAlert('error', 'insufficient funds' , 'please fund you wallet')
  }
  else{
      this.walletSer.defundWallet(value.amount)
  }

}
getWalerBallance(){
    this.afAuth.currentUser.then(user => {
        console.log('user detail', user)
    })
  }

}
