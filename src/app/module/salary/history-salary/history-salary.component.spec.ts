import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistorySalaryComponent } from './history-salary.component';

describe('HistorySalaryComponent', () => {
  let component: HistorySalaryComponent;
  let fixture: ComponentFixture<HistorySalaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HistorySalaryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HistorySalaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
