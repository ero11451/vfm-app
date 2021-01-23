import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { IonhelperService } from 'src/app/helper/ionhelper.service';
import { NavController } from '@ionic/angular';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/auth';
import { AuthService } from 'src/app/db/service/auth.service';
import * as firebase from 'firebase';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {


  constructor(
    private navCtrl: NavController,
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private router: Router,
    private afAuth: AngularFireAuth,
    private ion: IonhelperService
  
    ) { }

  // tslint:disable-next-line: variable-name
  validations_form: FormGroup;
  errorMessage: string = '';

  // tslint:disable-next-line: variable-name
  validation_messages = {
      email: [
        { type: 'required', message: 'Email is required.' },
        { type: 'pattern', message: 'Please enter a valid email.' }
      ],
      password: [
        { type: 'required', message: 'Password is required.' },
        { type: 'minlength', message: 'Password must be at least 5 characters long.' }
      ]
    };

  ngOnInit() {
    this.validations_form = this.formBuilder.group({
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])),
      password: new FormControl('', Validators.compose([
        Validators.minLength(5),
        Validators.required
      ])),
    });
  }


  loginUser(value) {
    this.ion.ionLoading('please wait' , 1000);
    this.authService.SignIn(value.email, value.password)
      .then(res => {
        console.log(res);
        this.errorMessage = "";
        this.afAuth.currentUser.then(user => {
          this.ion.ionToast('welcome back', 3000 , '')
          console.log(user + 'user id will go some wort like' + user.uid);
          return this.router.navigate(['tabs/home']);
        });
      }, err => {
        this.errorMessage = err.message;
        this.ion.ionToast('there was an error', 3000, 'primary');
      }).catch(err =>  this.ion.ionToast('there was an error', 3000, 'primary'));
  }

  goToRegisterPage() {
    this.navCtrl.navigateForward('/reg');
  }
  resetPassword(value): Promise<void> {
    return firebase.default.auth().sendPasswordResetEmail(value.email);
  }
}