import { Injectable } from '@angular/core';
import { InAppBrowser, InAppBrowserOptions } from '@ionic-native/in-app-browser/ngx';
import { CallNumber } from '@ionic-native/call-number/ngx';
import { IonhelperService } from './ionhelper.service';

@Injectable({
  providedIn: 'root'
})
export class NativehelpService {
  options : InAppBrowserOptions = {
    location : 'yes',//Or 'no' 
    hidden : 'no', //Or  'yes'
    clearcache : 'yes',
    clearsessioncache : 'yes',
    zoom : 'yes',//Android only ,shows browser zoom controls 
    hardwareback : 'yes',
    mediaPlaybackRequiresUserAction : 'no',
    shouldPauseOnSuspend : 'no', //Android only 
    closebuttoncaption : 'Close', //iOS only
    disallowoverscroll : 'no', //iOS only 
    toolbar : 'yes', //iOS only 
    enableViewportScale : 'no', //iOS only 
    allowInlineMediaPlayback : 'no',//iOS only 
    presentationstyle : 'pagesheet',//iOS only 
    fullscreen : 'no',//Windows only    
};
  constructor(
    private theInAppBrowser: InAppBrowser,
    private callNumber: CallNumber,
    private ion: IonhelperService
    ) {}

  openWebPage(sitepage){
    let target = "_self";
    this.theInAppBrowser.create(sitepage,target,this.options);
  }
  openPhone(phonenumber){
    
this.callNumber.callNumber(phonenumber, true)
    .then(res =>  { 
      this.ion.ionToast('your phone dialer was launched successfully', 2000, 'primary')
      console.log('Launched dialer!', res)}
    )
    .catch(err =>   {
      console.log('Error launching dialer', err)
      this.ion.ionToast('there was an error with your dialer', 2000,'danger')
    });
      }
}
