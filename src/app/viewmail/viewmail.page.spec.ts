import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ViewmailPage } from './viewmail.page';

describe('ViewmailPage', () => {
  let component: ViewmailPage;
  let fixture: ComponentFixture<ViewmailPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewmailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
