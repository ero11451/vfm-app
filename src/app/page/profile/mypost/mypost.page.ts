import { Component, Input, OnInit } from '@angular/core';
import { Router, Routes } from '@angular/router';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-mypost',
  templateUrl: './mypost.page.html',
  styleUrls: ['./mypost.page.scss'],
})
export class MypostPage implements OnInit {

  @Input() userid: any;

  constructor(
    private modalController: ModalController,
    private router: Router
    ) { 
  }

  ngOnInit() {
  console.log('all my post', this.userid)
  }
  close(){
   this.modalController.dismiss()
  }
 async viweComment( postid){
     await this.modalController.dismiss()
     this.router.navigate(['/comment', postid])
  }
}
