import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MesssageComponent } from './message.component';

describe('MesssageComponent', () => {
  let component: MesssageComponent;
  let fixture: ComponentFixture<MesssageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MesssageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MesssageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
