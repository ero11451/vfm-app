import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { NotesService } from 'src/app/db/service/notes.service';

@Component({
  selector: 'app-notelist',
  templateUrl: './notelist.page.html',
  styleUrls: ['./notelist.page.scss'],
})
export class NotelistPage implements OnInit {
  allnotes
  
  private unsubscribe$ = new Subject<void>();
  constructor(
    private noteService: NotesService,
    private fauth: AngularFireAuth
  ) { 
    this.getNotes()
  }

  ngOnInit() {
    this.getNotes()

    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
  getNotes(){
    this.fauth.currentUser.then(user => 
      this.noteService.getMyNotes(user.uid)
        .pipe(takeUntil(this.unsubscribe$))
    .subscribe(result => {
    this.allnotes = result;
    
    console.log('this are all the notes', result);
    })
      )
  
  }
  deteleNote(noteid){
    this.noteService.deleteNote(noteid)
  }

}
