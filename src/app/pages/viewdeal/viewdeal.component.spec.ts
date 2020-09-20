import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewdealComponent } from './viewdeal.component';

describe('ViewdealComponent', () => {
  let component: ViewdealComponent;
  let fixture: ComponentFixture<ViewdealComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewdealComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewdealComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
