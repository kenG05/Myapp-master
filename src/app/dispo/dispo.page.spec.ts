import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DispoPage } from './dispo.page';

describe('DispoPage', () => {
  let component: DispoPage;
  let fixture: ComponentFixture<DispoPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(DispoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
