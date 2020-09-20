import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditdealComponent } from './editdeal.component';

describe('EditdealComponent', () => {
  let component: EditdealComponent;
  let fixture: ComponentFixture<EditdealComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditdealComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditdealComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
