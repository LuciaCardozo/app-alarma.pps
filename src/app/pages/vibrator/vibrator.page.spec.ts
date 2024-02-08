import { ComponentFixture, TestBed } from '@angular/core/testing';
import { VibratorPage } from './vibrator.page';

describe('VibratorPage', () => {
  let component: VibratorPage;
  let fixture: ComponentFixture<VibratorPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(VibratorPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
