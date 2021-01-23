import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { NotelistPage } from './notelist.page';

describe('NotelistPage', () => {
  let component: NotelistPage;
  let fixture: ComponentFixture<NotelistPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NotelistPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(NotelistPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
