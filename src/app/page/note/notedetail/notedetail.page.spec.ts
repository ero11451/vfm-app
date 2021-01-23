import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { NotedetailPage } from './notedetail.page';

describe('NotedetailPage', () => {
  let component: NotedetailPage;
  let fixture: ComponentFixture<NotedetailPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NotedetailPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(NotedetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
