import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MyPurchasePage } from './my-purchase.page';

describe('MyPurchasePage', () => {
  let component: MyPurchasePage;
  let fixture: ComponentFixture<MyPurchasePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyPurchasePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MyPurchasePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
