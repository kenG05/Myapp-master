import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ConductorPage } from './conductor.page';
import { IonicModule } from '@ionic/angular';

describe('ConductorPage', () => {
  let component: ConductorPage;
  let fixture: ComponentFixture<ConductorPage>;

  beforeEach(async () => {
      await TestBed.configureTestingModule({
        declarations: [ConductorPage],
        imports: [IonicModule.forRoot(), HttpClientModule]
      }).compileComponents();
  
    fixture = TestBed.createComponent(ConductorPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
