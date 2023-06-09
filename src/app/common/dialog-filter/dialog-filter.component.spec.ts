import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogFilterComponent } from './dialog-filter.component';

describe('DialogFilterComponent', () => {
  let component: DialogFilterComponent;
  let fixture: ComponentFixture<DialogFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogFilterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
