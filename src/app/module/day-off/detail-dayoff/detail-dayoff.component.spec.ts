import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailDayoffComponent } from './detail-dayoff.component';

describe('DetailDayoffComponent', () => {
  let component: DetailDayoffComponent;
  let fixture: ComponentFixture<DetailDayoffComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailDayoffComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailDayoffComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
