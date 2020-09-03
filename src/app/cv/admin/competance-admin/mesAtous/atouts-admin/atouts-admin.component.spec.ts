import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AtousAdminComponent } from './atouts-admin.component';

describe('AtoutsAdminComponent', () => {
  let component: AtousAdminComponent;
  let fixture: ComponentFixture<AtousAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AtousAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AtousAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
