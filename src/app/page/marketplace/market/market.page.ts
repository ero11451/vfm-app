import { Component, OnInit, ViewChild } from '@angular/core';
import { IonSlides } from '@ionic/angular';
import { Observable } from 'rxjs';
import { IonhelperService } from 'src/app/helper/ionhelper.service';
import { WbserviceService } from '../../../allapi/wbservice.service';

@Component({
  selector: 'app-market',
  templateUrl: './market.page.html',
  styleUrls: ['./market.page.scss'],
})
export class MarketPage implements OnInit {

  @ViewChild('slides', { static: true }) slider: IonSlides;  
  segment = 0;

  posts$: Observable<any>;
  constructor(

    private ion: IonhelperService,
    private postSrvc: WbserviceService,
  ) { }
  ngOnInit(){
    this.loadData()
    this.postSrvc.fetchPosts().subscribe(res =>  {
      console.log('res of product', res) 
    })
  }
  async segmentChanged(ev: any) {
    await this.slider.slideTo(this.segment);
  }
  async slideChanged() {
    this.segment = await this.slider.getActiveIndex();
  }

  loadData(refresh = false, refresher?) {
     this.postSrvc.fetchPosts(refresh).subscribe(res => {
          this.posts$ = res;
          console.log('product', res[0].name );
          if (refresher) {
            refresher.target.complete();
          }
        });
      if (refresher) {
          refresher.target.complete();
        }
    }

  }