import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvoiveComponent } from './invoive.component';

describe('InvoiveComponent', () => {
  let component: InvoiveComponent;
  let fixture: ComponentFixture<InvoiveComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InvoiveComponent]
    });
    fixture = TestBed.createComponent(InvoiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
