import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { HomecellPage } from './homecell.page';

describe('HomecellPage', () => {
  let component: HomecellPage;
  let fixture: ComponentFixture<HomecellPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomecellPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(HomecellPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
