import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MakepostPage } from './makepost.page';

describe('MakepostPage', () => {
  let component: MakepostPage;
  let fixture: ComponentFixture<MakepostPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MakepostPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MakepostPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
