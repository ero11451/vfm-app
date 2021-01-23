import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DevonationdetailPage } from './devonationdetail.page';

describe('DevonationdetailPage', () => {
  let component: DevonationdetailPage;
  let fixture: ComponentFixture<DevonationdetailPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DevonationdetailPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DevonationdetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
