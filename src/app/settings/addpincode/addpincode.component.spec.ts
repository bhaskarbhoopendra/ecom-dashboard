import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddpincodeComponent } from './addpincode.component';

describe('AddpincodeComponent', () => {
  let component: AddpincodeComponent;
  let fixture: ComponentFixture<AddpincodeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddpincodeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddpincodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
