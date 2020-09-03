import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoisirAdminComponent } from './loisir-admin.component';

describe('LoisirAdminComponent', () => {
  let component: LoisirAdminComponent;
  let fixture: ComponentFixture<LoisirAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoisirAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoisirAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
