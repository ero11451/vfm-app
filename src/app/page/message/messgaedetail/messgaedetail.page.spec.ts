import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MessgaedetailPage } from './messgaedetail.page';

describe('MessgaedetailPage', () => {
  let component: MessgaedetailPage;
  let fixture: ComponentFixture<MessgaedetailPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MessgaedetailPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MessgaedetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
