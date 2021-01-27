import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';
import { NotesService } from 'src/app/db/service/notes.service';

@Component({
  selector: 'app-notedetail',
  templateUrl: './notedetail.page.html',
  styleUrls: ['./notedetail.page.scss'],
})
export class NotedetailPage implements OnInit {
  noteid
  noteContent
  constructor(
    private route: ActivatedRoute,
    private noteSer: NotesService,
    private  db: AngularFirestore,
    ) { }
  text = "orem ipsum dolor sit amet consectetur adipisicing elit. Cumque quibusdam repellat vero voluptatibus voluptatum tempore totam facilis autem soluta aliquam? "
  ngOnInit() {
    if (this.route.snapshot.params['noteid']) {
      this.noteid = this.route.snapshot.paramMap.get('noteid');
      console.log(this.noteid);
      }
      this.getNote()
  }

  getNote(){
    this.noteSer.getNotebyId(this.noteid).subscribe(data => {
      this.noteContent = data.content
    }
    )
  }

  submiteUpate(){
    
    this.db.doc('notes/' + this.noteid).update({content:this.noteContent,});
    this.noteContent
  }
}
