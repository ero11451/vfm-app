import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ModalController } from '@ionic/angular';
interface Bible {
  abbrev: string;
  chapters: Array<string[]>;
  name: string;

}
@Component({
  selector: 'app-chapter',
  templateUrl: './chapter.page.html',
  styleUrls: ['./chapter.page.scss'],
})
export class ChapterPage implements OnInit {

  book: Bible;
  books: Bible[];
  bookName: string;
  constructor(
    private http: HttpClient , 
    private modalController: ModalController,
    private route: ActivatedRoute,
    ) {
    // this.getBible()
   }
  
  ngOnInit() { 
    this.getBible()
    this.bookName = this.route.snapshot.paramMap.get('name');
   }
  close(){
    this.modalController.dismiss();
  }
  getBible(){
    
   this.http.get<Bible[]>('assets/data/mcbible.json').subscribe((data) => {
        // tslint:disable-next-line: no-shadowed-variable
        this.books = data.filter(data => data.name == this.bookName );
        this.book = this.books[0];
      console.log('this is come,', this.book)
      }, err => {
        console.error('this is an error form the hell', err)
      });
  }
 
}
