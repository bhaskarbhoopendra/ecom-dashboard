import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditpincodeComponent } from './editpincode.component';

describe('EditpincodeComponent', () => {
  let component: EditpincodeComponent;
  let fixture: ComponentFixture<EditpincodeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditpincodeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditpincodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
