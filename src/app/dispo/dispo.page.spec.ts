import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DispoPage } from './dispo.page';
import { IonicModule } from '@ionic/angular';

describe('DispoPage', () => {
  let component: DispoPage;
  let fixture: ComponentFixture<DispoPage>;

  beforeEach(async () => {
      await TestBed.configureTestingModule({
        declarations: [DispoPage],
        imports: [IonicModule.forRoot(), HttpClientModule]
      }).compileComponents();
  
    fixture = TestBed.createComponent(DispoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
